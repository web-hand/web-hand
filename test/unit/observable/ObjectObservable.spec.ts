import * as sinon from 'sinon';
import { beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { ObjectObservable } from '../../../src/observable/ObjectObservable';

describe(ObjectObservable.name, () => {
  const sourcePerson = {
    age: 21,
    firstName: 'Jan',
    lastName: 'Kowalski',
  };
  let observableObj: ObjectObservable<typeof sourcePerson>;
  beforeEach(() => {
    observableObj = new ObjectObservable(structuredClone(sourcePerson));
  });
  describe('subscribers lock', () => {
    it('should call subscribers if subscribers are unlocked', () => {
      const subscriberSpy = sinon.spy();
      observableObj.subscribe(subscriberSpy);
      observableObj.lockNotifications();
      observableObj.unlockNotifications();
      observableObj.value.age = 10;
      expect(subscriberSpy).to.been.calledOnce;
    });
    it('should NOT call subscribers if subscribers are locked', () => {
      const subscriberSpy = sinon.spy();
      observableObj.subscribe(subscriberSpy);
      observableObj.unlockNotifications();
      observableObj.lockNotifications();
      observableObj.value.age = 10;
      expect(subscriberSpy).to.not.been.called;
    });
  });
  describe('detect value', () => {
    it('should change single key value', () => {
      const newName = 'Justyna';
      observableObj.value.firstName = newName;

      expect(observableObj.value.firstName).to.be.equal(newName);
    });
  });
  describe('subscribers', () => {
    it('should call subscriber once if only one key value has changed', () => {
      const subscriberSpy = sinon.spy();
      observableObj.subscribe(subscriberSpy);
      observableObj.value.age = 10;
      expect(subscriberSpy).to.have.been.calledOnce;
      expect(subscriberSpy.calledWith(observableObj.value)).to.be.true;
    });
    it('should call every subscriber once if only one key value has changed', () => {
      const subscriberSpy1 = sinon.spy();
      const subscriberSpy2 = sinon.spy();
      observableObj.subscribe(subscriberSpy1);
      observableObj.subscribe(subscriberSpy2);
      observableObj.value.age = 10;
      expect(subscriberSpy1).to.have.been.calledOnce;
      expect(subscriberSpy2).to.have.been.calledOnce;
      expect(subscriberSpy1.calledWith(observableObj.value)).to.be.true;
      expect(subscriberSpy2.calledWith(observableObj.value)).to.be.true;
    });
    it('should call subscriber once for every changed key', () => {
      const subscriberSpy = sinon.spy();
      observableObj.subscribe(subscriberSpy);
      observableObj.value.firstName = 'Justyna';
      observableObj.value.lastName = 'Kowalczyk';
      observableObj.value.age = 10;
      expect(subscriberSpy).to.have.been.callCount(3);
      expect(subscriberSpy.calledWith(observableObj.value)).to.be.true;
    });
    it('should call subscriber once if many keys where overridden with new object', () => {
      const subscriberSpy = sinon.spy();
      const newPerson: typeof sourcePerson = {
        age: 30,
        firstName: 'Justyna',
        lastName: 'Kowalczyk',
      };
      observableObj.subscribe(subscriberSpy);
      observableObj.value = newPerson;
      expect(subscriberSpy).to.have.been.callCount(1);
      expect(subscriberSpy.calledWith(newPerson)).to.be.true;
    });
    it('should call subscribers only once for many changed keys', () => {
      const subscriberSpy = sinon.spy();
      const newValues: Partial<typeof sourcePerson> = {
        age: 11,
        firstName: 'Justyna',
      };
      observableObj.subscribe(subscriberSpy);
      observableObj.updateManyKeysAtOnce(newValues);
      expect(subscriberSpy).to.have.been.callCount(1);
      expect(subscriberSpy.calledWith({ ...sourcePerson, ...newValues })).to.be.true;
    });
    it('should NOT call subscriber if key value has changed changed to same value', () => {
      const subscriberSpy = sinon.spy();
      observableObj.subscribe(subscriberSpy);
      observableObj.value.age = sourcePerson.age;
      expect(subscriberSpy).to.not.been.called;
    });
    it('should NOT call any subscriber if key value has changed to same vale', () => {
      const subscriberSpy1 = sinon.spy();
      const subscriberSpy2 = sinon.spy();
      observableObj.subscribe(subscriberSpy1);
      observableObj.subscribe(subscriberSpy2);
      observableObj.value.age = sourcePerson.age;
      expect(subscriberSpy1).to.not.been.called;
      expect(subscriberSpy2).to.not.been.called;
    });
    it('should NOT call subscribers if all changed keys have same value', () => {
      const subscriberSpy = sinon.spy();
      const newValues: Partial<typeof sourcePerson> = {
        age: sourcePerson.age,
        firstName: sourcePerson.firstName,
      };
      observableObj.subscribe(subscriberSpy);
      observableObj.updateManyKeysAtOnce(newValues);
      expect(subscriberSpy).to.not.been.called;
    });
  });
  describe('disposers', () => {
    it('should call disposer if disposer exists for given subscriber', () => {
      const subscriberSpy = sinon.spy();
      const disposerSpy = sinon.spy();
      observableObj.subscribe(subscriberSpy, disposerSpy);
      observableObj.unsubscribe(subscriberSpy);
      expect(disposerSpy).to.have.been.calledOnce;
    });
    it('should call only disposer of specific subscriber', () => {
      const subscriberSpy1 = sinon.spy();
      const subscriberSpy2 = sinon.spy();
      const disposerSpy1 = sinon.spy();
      const disposerSpy2 = sinon.spy();
      observableObj.subscribe(subscriberSpy1, disposerSpy1);
      observableObj.subscribe(subscriberSpy2, disposerSpy2);
      observableObj.unsubscribe(subscriberSpy2);
      expect(disposerSpy1).to.have.not.been.called;
      expect(disposerSpy2).to.have.been.calledOnce;
    });
    it('should call all created disposers if dispose whole ObjectObservable', () => {
      const subscriberSpy1 = sinon.spy();
      const subscriberSpy2 = sinon.spy();
      const subscriberSpy3 = sinon.spy();
      const disposerSpy1 = sinon.spy();
      const disposerSpy2 = sinon.spy();
      observableObj.subscribe(subscriberSpy1, disposerSpy1);
      observableObj.subscribe(subscriberSpy2, disposerSpy2);
      observableObj.subscribe(subscriberSpy3);
      observableObj.dispose();
      expect(disposerSpy1).to.have.been.calledOnce;
      expect(disposerSpy2).to.have.been.calledOnce;
    });
  });
});
