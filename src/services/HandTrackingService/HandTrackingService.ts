import type { HandLandmarks, HandTrackingServiceProps, IHandTrackingService } from './HandTrackingService.types';
import { Hands, HandsInterface, Results, ResultsListener } from '@mediapipe/hands';
import { CameraService } from '../CameraService/CameraService';
import { CanNotPerformPredictionError } from '../../errors/CanNotPerformPredictionError';
import type { ICameraService } from '../CameraService/CameraService.types';
import { ServiceUnavailableError } from '../../errors/ServiceUnavailableError';

export class HandTrackingService implements IHandTrackingService {
  private static readonly MODEL_SOURCE = 'https://cdn.jsdelivr.net/npm/@mediapipe/hands/';
  private isActive: boolean;
  private isInitialized: boolean;
  private handCoordinates: HandLandmarks[] = [];

  private readonly cameraService: ICameraService;
  private readonly hands: HandsInterface;

  constructor({ cameraServiceProps, modelSettings = {} }: HandTrackingServiceProps = {}) {
    this.isActive = false;
    this.isInitialized = false;
    this.cameraService = new CameraService(cameraServiceProps ?? {});
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
      ...modelSettings,
    });
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }
    await Promise.all([this.cameraService.initialize(), this.hands.initialize()]);
    this.isInitialized = true;
  }

  async start(): Promise<void> {
    if (this.isActive) {
      return;
    }
    if (!this.isInitialized) {
      await this.initialize();
    }
    await this.cameraService.start();
    this.hands.onResults(this.handlePrediction);
    this.isActive = true;
  }

  stop(): void {
    if (this.isActive) {
      this.isActive = false;
      this.cameraService.stop();
    }
  }

  async requestPrediction(): Promise<HandLandmarks[]> {
    if (!this.isActive) {
      throw new ServiceUnavailableError(HandTrackingService.name, `Can not request prediction if service wasn't activated`);
    }
    await this.predict();
    return this.handCoordinates;
  }

  private async predict(): Promise<void> {
    await this.hands.send({ image: this.cameraService.streamWrapper }).catch((e) => {
      throw new CanNotPerformPredictionError(e);
    });
  }

  private handlePrediction: ResultsListener = (results: Results) => {
    this.handCoordinates = results.multiHandLandmarks as HandLandmarks[];
  };
}
