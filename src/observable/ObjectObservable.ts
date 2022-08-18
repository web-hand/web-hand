import type { DataStructureProxy, DisposeCallback, IObjectObservable, SubscribeCallback } from './ObjectObservable.type';
import { isDefined } from '../utils/isDefined';

export class ObjectObservable<T extends Record<PropertyKey, unknown>> implements IObjectObservable<T> {
  private notifyLock = false;
  private readonly subscribers: Map<SubscribeCallback<T>, DisposeCallback | undefined> = new Map();
  private readonly proxy: DataStructureProxy<T>;

  constructor(value: T) {
    this.proxy = this.createProxy(value);
  }

  /**
   * @returns observable value
   */
  get value(): T {
    return this.proxy;
  }

  /**
   * By updating observable value by this setter you will trigger subscribers callback only once
   *
   * @param newValue new key values
   */
  set value(newValue: T) {
    this.updateManyKeysAtOnce(newValue);
  }

  /**
   *
   * @param subscriptionCallback function that will be triggered if any object key will change value
   * @param disposeCallback function that will be called if someone unsubscribes
   */
  public subscribe(subscriptionCallback: SubscribeCallback<T>, disposeCallback?: DisposeCallback): void {
    this.subscribers.set(subscriptionCallback, disposeCallback);
  }

  /**
   * If disposer callback exists for given subscriber than before we delete subscriber first we will call disposer callback
   *
   * @param subscriptionCallback function that should not be triggered anymore for any key values changes
   */
  public unsubscribe(subscriptionCallback: SubscribeCallback<T>): boolean {
    const disposer = this.subscribers.get(subscriptionCallback);
    if (isDefined(disposer)) {
      disposer();
      return this.subscribers.delete(subscriptionCallback);
    }
    return false;
  }

  /**
   * Dispose whole observable. It means that all current subscribes will be unsubscribed and won't be getting any notifications anymore
   */
  public dispose(): void {
    for (const [subscriptionCallback, disposeCallback] of this.subscribers.entries()) {
      if (disposeCallback) {
        disposeCallback();
      }
      this.subscribers.delete(subscriptionCallback);
    }
  }

  /**
   * This will block sending any notifications for every subscriber
   */
  public lockNotifications(): void {
    this.notifyLock = true;
  }

  /**
   * This will unblock sending any notifications for every subscriber
   */
  public unlockNotifications(): void {
    this.notifyLock = false;
  }

  /**
   * This will trigger all subscribers callbacks only once
   *
   * @param newValue all keys with values you want to update
   */
  public updateManyKeysAtOnce(newValue: Partial<T>): void {
    let shouldCallSubscribers = false;
    this.lockNotifications();
    for (const [key, fieldValue] of Object.entries(newValue)) {
      if (this.value[key] !== fieldValue) {
        shouldCallSubscribers = true;
        this.value[key as keyof T] = fieldValue as T[keyof T];
      }
    }
    this.unlockNotifications();
    if (shouldCallSubscribers) {
      this.callSubscribers();
    }
  }

  /**
   * Calls all observable subscribers
   * @private
   */
  private callSubscribers(): void {
    if (this.notifyLock) {
      return;
    }
    for (const subscriber of this.subscribers.keys()) {
      subscriber(this.value);
    }
  }

  /**
   * Creates JS Proxy from given object
   *
   * @param value object from which you want to create a proxy and start listening on changes
   * @private
   */
  private createProxy(value: T): DataStructureProxy<T> {
    return new Proxy(value, {
      set: this.setTrap,
    });
  }

  /**
   * If user changes any key of observable object and this value will be different from previous one, then all subscribers will be called
   *
   * @param target source object
   * @param key key that has been updated
   * @param newValue new value for the given key
   * @param _receiver source object or source object proxy
   */
  private setTrap = <K extends keyof T>(target: T, key: K, newValue: T[K], _receiver: T): boolean => {
    const oldValue = target[key];
    if (oldValue === newValue) {
      return true;
    }
    target[key] = newValue;
    this.callSubscribers();
    return true;
  };
}
