import * as sinon from 'sinon';
import { after, afterEach, before, beforeEach, describe, it } from 'mocha';
import { HTML_MEDIA_ELEMENT_PAUSE_STUB, HTML_MEDIA_ELEMENT_PLAY_STUB } from '../../stubs/HTML_MEDIA_ELEMENT.stub';
import { CameraService } from '../../../src/services/CameraService/CameraService';
import { createManualMock } from '../../createManualMock';
import { expect } from 'chai';
import { ICameraService } from '../../../src/services/CameraService/CameraService.types';
import { MEDIA_DEVICES } from '../../mocks/MEDIA_DEVICE.mock';
import { SinonSpy } from 'sinon';

describe(CameraService.name, () => {
  let cameraService: ICameraService;
  beforeEach(() => {
    cameraService = new CameraService();
  });
  describe(CameraService.prototype.initialize.name, () => {
    const getUserMediaSpy: SinonSpy = sinon.spy(MEDIA_DEVICES, 'getUserMedia');
    afterEach(() => {
      getUserMediaSpy.resetHistory();
    });
    after(() => {
      getUserMediaSpy.restore();
    });
    it('should ask for camera access if service was NOT initialized yet', async () => {
      await cameraService.initialize();
      expect(getUserMediaSpy).to.have.been.callCount(1);
    });
    it('should NOT ask for camera access if service was initialized yet', async () => {
      cameraService.streamWrapper.srcObject = createManualMock<MediaStream>({});
      await cameraService.initialize();
      expect(getUserMediaSpy).to.have.been.callCount(0);
    });
  });
  describe(CameraService.prototype.start.name, () => {
    before(async () => {
      await cameraService.initialize();
    });
    afterEach(() => {
      HTML_MEDIA_ELEMENT_PLAY_STUB.resetHistory();
    });
    it('should play stream', async () => {
      await cameraService.start();
      expect(HTML_MEDIA_ELEMENT_PLAY_STUB).to.have.been.callCount(1);
    });
  });
  describe(CameraService.prototype.stop.name, () => {
    before(async () => {
      await cameraService.initialize();
      await cameraService.start();
    });
    afterEach(() => {
      HTML_MEDIA_ELEMENT_PAUSE_STUB.resetHistory();
    });
    it('should stop stream', () => {
      cameraService.stop();
      expect(HTML_MEDIA_ELEMENT_PAUSE_STUB).to.have.been.callCount(1);
    });
  });
  describe(CameraService.prototype.destroy.name, () => {
    before(async () => {
      await cameraService.initialize();
      await cameraService.start();
    });
    afterEach(() => {
      HTML_MEDIA_ELEMENT_PAUSE_STUB.resetHistory();
    });
    it('should stop stream', () => {
      cameraService.destroy();
      expect(HTML_MEDIA_ELEMENT_PAUSE_STUB).to.have.been.callCount(1);
    });
  });
});
