import * as chai from 'chai';
import { NAVIGATOR } from './mocks/NAVIGATOR.mock';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

Object.defineProperty(window, 'navigator', {
  get: () => {
    return NAVIGATOR;
  },
});
