import * as sinon from 'sinon';
import { Hands } from '@mediapipe/hands';

export const HANDS_INITIALIZE_STUB = sinon.stub(Hands.prototype, 'initialize').returns(Promise.resolve());
