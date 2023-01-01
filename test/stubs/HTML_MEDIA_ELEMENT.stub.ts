import * as sinon from 'sinon';

export const HTML_MEDIA_ELEMENT_PLAY_STUB = sinon.stub(HTMLMediaElement.prototype, 'play').returns(Promise.resolve());
export const HTML_MEDIA_ELEMENT_PAUSE_STUB = sinon.stub(HTMLMediaElement.prototype, 'pause').returns();
