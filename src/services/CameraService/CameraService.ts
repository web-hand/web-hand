import { CameraServiceProps, ICameraService } from './CameraService.types';
import { CanNotUseCameraError } from '../../errors/CanNotUseCameraError';
import { isDefined } from '../../utils/isDefined';

export class CameraService implements ICameraService {
  private static readonly DEFAULT_ASPECT_RATIO = 4 / 3;

  rawStream?: MediaStream;
  streamWrapper: HTMLVideoElement;

  constructor({ width, height, streamWrapper }: CameraServiceProps) {
    this.streamWrapper = this.createVideoStreamer(width, height, streamWrapper);
  }

  async start(): Promise<void> {
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

  private createVideoStreamer(width: number, height?: number, displayWrapper?: HTMLVideoElement): HTMLVideoElement {
    const wrapper = displayWrapper ?? document.createElement('video');
    wrapper.muted = true;
    wrapper.width = width;
    if (isDefined(height)) {
      wrapper.height = height;
    } else {
      wrapper.height = wrapper.videoHeight / (wrapper.videoWidth / width) || width / CameraService.DEFAULT_ASPECT_RATIO;
    }
    return wrapper;
  }

  private async getWebCamStream(): Promise<MediaStream | void> {
    return await window.navigator.mediaDevices.getUserMedia({ audio: false, video: true }).catch((err: DOMException) => {
      throw new CanNotUseCameraError(err);
    });
  }
}
