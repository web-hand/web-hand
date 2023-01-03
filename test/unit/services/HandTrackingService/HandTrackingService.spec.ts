import * as sinon from 'sinon';
import { afterEach, beforeEach, describe, it } from 'mocha';
import { CanNotPerformPredictionError } from '../../../../src/errors/CanNotPerformPredictionError';
import { expect } from 'chai';
import { Hands } from '@mediapipe/hands';
import { HANDS_INITIALIZE_STUB } from '../../../stubs/MEDIA_PIPE_HANDS.stub';
import { HandTrackingService } from '../../../../src/services/HandTrackingService/HandTrackingService';
import { IHandTrackingService } from '../../../../src/services/HandTrackingService/HandTrackingService.types';
import { ServiceUnavailableError } from '../../../../src/errors/ServiceUnavailableError';
import { SinonSpy } from 'sinon';

describe(HandTrackingService.name, () => {
  let handTrackingService: IHandTrackingService;
  beforeEach(() => {
    handTrackingService = new HandTrackingService();
  });
  afterEach(() => {
    HANDS_INITIALIZE_STUB.resetHistory();
  });
  describe(HandTrackingService.prototype.initialize.name, () => {
    it('should call hands initialize if app was NOT initialized', async () => {
      await handTrackingService.initialize();
      expect(HANDS_INITIALIZE_STUB).to.have.been.calledOnce;
    });
    it('should NOT call hands initialize 2nd if app was initialized 2 times', async () => {
      await handTrackingService.initialize();
      await handTrackingService.initialize();
      expect(HANDS_INITIALIZE_STUB).to.have.been.calledOnce;
    });
  });
  describe(HandTrackingService.prototype.start.name, () => {
    let initializeSpy: SinonSpy;
    beforeEach(() => {
      initializeSpy = sinon.spy(handTrackingService, 'initialize');
    });
    afterEach(() => {
      initializeSpy.restore();
    });
    it('should call initialize method only once if service was activated', async () => {
      await handTrackingService.start();
      await handTrackingService.start();
      expect(initializeSpy).to.have.been.calledOnce;
    });
    it('should NOT call initialize if service was already initialized', async () => {
      await handTrackingService.initialize();
      await handTrackingService.start();
      expect(initializeSpy).to.have.been.calledOnce;
    });
    it('should call initialize method if service was NOT initialized', async () => {
      await handTrackingService.start();
      expect(initializeSpy).to.have.been.calledOnce;
    });
  });
  describe(HandTrackingService.prototype.requestPrediction.name, () => {
    it('should call media pipe .send method if prediction was requested', async () => {
      const handsSendStub = sinon.stub(Hands.prototype, 'send').returns(Promise.resolve());
      await handTrackingService.start();
      await handTrackingService.requestPrediction();
      expect(handsSendStub).to.have.been.calledOnce;
      handsSendStub.restore();
    });
    it('should NOT call media pipe .send method if prediction was requested but service is inactive', async () => {
      const handsSendStub = sinon.stub(Hands.prototype, 'send').returns(Promise.resolve());
      await handTrackingService.start();
      handTrackingService.stop();
      await expect(handTrackingService.requestPrediction()).to.be.rejectedWith(ServiceUnavailableError);
      expect(handsSendStub).to.have.not.been;
      handsSendStub.restore();
    });
    it('should throw an error if can not perform prediction', async () => {
      const handsSendStub = sinon.stub(Hands.prototype, 'send').returns(Promise.reject(new CanNotPerformPredictionError('test')));
      await handTrackingService.start();
      await expect(handTrackingService.requestPrediction()).to.be.rejectedWith(CanNotPerformPredictionError);
      expect(handsSendStub).to.have.been;
      handsSendStub.restore();
    });
  });
});
