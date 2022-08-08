export type DataStructureProxy<T> = T;
export type SubscribeCallback<T> = (value?: T) => void;
export type DisposeCallback = () => void;

export interface IObjectObservable<T extends Record<PropertyKey, unknown>> {
  value: T;

  dispose(): void;
  lockNotifications(): void;
  unlockNotifications(): void;
  updateManyKeysAtOnce(newValue: Partial<T>): void;
  unsubscribe(subscriptionCallback: SubscribeCallback<T>): boolean;
  subscribe(subscriptionCallback: SubscribeCallback<T>, disposeCallback?: DisposeCallback): void;
}
