import { Coordinates3D, HandVector, IHandTrackingService } from './HandTrackingService.type';
import { Hands, HandsInterface, Options, Results, ResultsListener } from '@mediapipe/hands';
import { CanNotFindCameraError } from '../errors/CanNotFindCameraError';
import { CanNotPerformPredictionError } from '../errors/CanNotPerformPredictionError';
import { isDefined } from '../utils/isDefined';
import { ServiceUnavailableError } from '../errors/ServiceUnavailableError';

export class HandTrackingService implements IHandTrackingService {
  private static MODEL_SOURCE = 'https://cdn.jsdelivr.net/npm/@mediapipe/hands/';
  private isActive: boolean;
  private isInitialized: boolean;
  private videoSource: MediaStream | undefined;
  private handCoordinates: Coordinates3D[][] = [];

  private readonly hands: HandsInterface;
  private readonly videoElement: HTMLVideoElement;

  constructor(videoSource?: MediaStream, settings?: Options) {
    this.isActive = false;
    this.isInitialized = false;
    this.videoElement = document.createElement('video');
    this.videoSource = videoSource;
    this.hands = new Hands({
      locateFile: (file) => {
        return `${HandTrackingService.MODEL_SOURCE}${file}`;
      },
    });
    this.hands.setOptions({
      maxNumHands: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
      modelComplexity: 1,
      ...settings,
    });
  }

  async initialize(): Promise<void> {
    await this.hands.initialize();
    this.isInitialized = true;
    document.body.append(this.videoElement); // TODO(GH-38): we have to replace this with canvas element + do not attach element to DOM
  }

  async start(): Promise<void> {
    if (this.isActive) {
      return;
    }
    if (!this.isInitialized) {
      await this.initialize();
    }
    if (!isDefined(this.videoSource)) {
      this.videoSource = await this.getCamera();
    }
    this.videoElement.srcObject = this.videoSource;
    await this.videoElement.play();
    this.hands.onResults(this.handlePrediction);
    this.isActive = true;
  }

  stop(): void {
    if (this.isActive) {
      this.videoElement.pause();
      this.videoElement?.remove();
      this.isActive = false;
    }
  }

  async requestPrediction(): Promise<HandVector> {
    if (!this.isActive) {
      throw new ServiceUnavailableError(HandTrackingService.name, `Can not request prediction if service wasn't activated`);
    }
    await this.predict();
    return this.handCoordinates;
  }

  private async predict(): Promise<void> {
    await this.hands.send({ image: this.videoElement }).catch((e) => {
      throw new CanNotPerformPredictionError(e);
    });
  }

  private handlePrediction: ResultsListener = (results: Results) => {
    this.handCoordinates = results.multiHandLandmarks;
  };

  private async getCamera(): Promise<MediaStream> {
    const constraints: MediaStreamConstraints = {
      audio: false,
      video: { facingMode: 'environment', frameRate: { ideal: 30 }, width: { max: 1280 } },
    };
    return await window.navigator.mediaDevices.getUserMedia(constraints).catch((reason: DOMException) => {
      throw new CanNotFindCameraError(reason);
    });
  }
}
