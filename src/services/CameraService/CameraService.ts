import { CameraServiceProps, ICameraService } from './CameraService.types';
import { CanNotUseCameraError } from '../../errors/CanNotUseCameraError';
import { DEFAULT_CAMERA_CONSTRAINTS } from './CameraService.constants';
import { isDefined } from '../../utils/isDefined';

export class CameraService implements ICameraService {
  rawStream?: MediaStream;
  streamWrapper: HTMLVideoElement;

  private readonly cameraConstraints: MediaStreamConstraints;

  constructor({ cameraConstraints = {}, streamWrapper }: CameraServiceProps = {}) {
    this.cameraConstraints = {
      ...DEFAULT_CAMERA_CONSTRAINTS,
      ...cameraConstraints,
    };
    this.streamWrapper = this.createVideoStreamer(streamWrapper);
  }

  async start(): Promise<void> {
    if (this.isVideoPlaying()) {
      return;
    }
    return await this.streamWrapper.play();
  }

  async initialize(): Promise<void> {
    if (isDefined(this.streamWrapper.srcObject)) {
      console.warn('Stream has been already initialized');
      return;
    }
    const videoStream = await this.getWebCamStream();
    if (videoStream) {
      this.rawStream = videoStream;
      this.streamWrapper.srcObject = videoStream;
    }
  }

  stop(): void {
    this.streamWrapper.pause();
  }

  destroy(): void {
    this.stop();
    this.streamWrapper.remove();
  }

  private isVideoPlaying(): boolean {
    return (
      this.streamWrapper.currentTime > 0 &&
      !this.streamWrapper.paused &&
      !this.streamWrapper.ended &&
      this.streamWrapper.readyState > this.streamWrapper.HAVE_CURRENT_DATA
    );
  }

  private createVideoStreamer(displayWrapper?: HTMLVideoElement): HTMLVideoElement {
    const wrapper = displayWrapper ?? document.createElement('video');
    wrapper.muted = true;
    return wrapper;
  }

  private async getWebCamStream(): Promise<MediaStream | void> {
    return await window.navigator.mediaDevices.getUserMedia(this.cameraConstraints).catch((err: DOMException) => {
      throw new CanNotUseCameraError(err);
    });
  }
}
