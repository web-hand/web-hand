import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { NAVIGATOR } from './mocks/NAVIGATOR.mock';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
chai.use(chaiAsPromised);

Object.defineProperty(window, 'navigator', {
  get: () => {
    return NAVIGATOR;
  },
});
