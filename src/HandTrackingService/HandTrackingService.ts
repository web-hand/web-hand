import { coordinates, HandVector, IHandTrackingService, Settings } from './HandTrackingService.type';
import { Hands } from '@mediapipe/hands';
import { isDefined } from '../utils/isDefined';

export class HandTrackingService implements IHandTrackingService {
  isRunning: boolean;
  hands: Hands;
  videoSourceObect: MediaStream | undefined;
  isInitialize: Promise<void>;
  videoElement: HTMLVideoElement;
  resultsBuffer: coordinates[][];

  constructor(settings: Settings) {
    const defaultHandsNumber = 1;
    const defaultMinTrackingConfidence = 0.5;
    const defaultMinDetectionConfidence = 0.5;
    const defaultModelComplexity = 1;

    this.resultsBuffer = [[{ x: 0, y: 0, z: 0 }]];
    this.videoElement = document.createElement('video');
    this.isRunning = false;

    this.hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });

    this.hands.setOptions({
      maxNumHands: settings?.handsNumber ? settings?.handsNumber : defaultHandsNumber,
      minDetectionConfidence: settings?.minDetectionConfidence ? settings?.minDetectionConfidence : defaultMinDetectionConfidence,
      minTrackingConfidence: settings?.minTrackingConfidence ? settings?.minTrackingConfidence : defaultMinTrackingConfidence,
      modelComplexity: settings?.modelComplexity ? settings?.modelComplexity : defaultModelComplexity,
    });
    this.isInitialize = this.hands.initialize().catch((e: string) => {
      console.error(e);
    });

    this.videoSourceObect = settings?.videoSourceObect ? settings?.videoSourceObect : undefined;
  }

  async start(): Promise<void> {
    if (!this.isRunning) {
      await this.isInitialize;
      if (!isDefined(this.videoSourceObect)) {
        this.videoSourceObect = await this.getCamera();
      }
      this.videoElement.srcObject = this.videoSourceObect;
      await this.videoElement.play().catch((e: string) => {
        throw new Error(`Cannot play media streem ${e}`);
      });
      this.isRunning = true;
    }
  }

  private getCamera(): Promise<MediaStream> {
    const constraints = { audio: false, video: { facingMode: 'environment' } };
    return new Promise((resolve) => {
      navigator.mediaDevices
        ?.getUserMedia(constraints)
        .then(resolve)
        .catch((error: string) => {
          throw new Error(`Cannot create camera: ${error}`);
        });
    });
  }

  stop(): void {
    if (this.isRunning) {
      this.videoElement?.remove();
      this.isRunning = false;
    }
  }

  requestPrediction(): Promise<HandVector> {
    const onResults = (results: { multiHandLandmarks: coordinates[][] }) => {
      if (results.multiHandLandmarks) {
        this.resultsBuffer = results.multiHandLandmarks;
      }
    };

    this.hands.onResults(onResults);

    return new Promise((resolve, reject) => {
      if (!this.isRunning) {
        reject('Service is not running yet');
      }
      this.hands
        .send({ image: this.videoElement })
        .then(() => {
          resolve(this.resultsBuffer);
        })
        .catch(() => {
          reject();
        });
    });
  }
}
