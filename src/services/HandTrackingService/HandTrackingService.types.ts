import { CameraServiceProps } from '../CameraService/CameraService.types';
import { Coordinates3D } from '../../structures/Point3D/Point3D.types';
import { Options } from '@mediapipe/hands';

export interface HandTrackingServiceProps {
  modelSettings?: Options;
  cameraServiceProps?: CameraServiceProps;
}

export type HandVector = Coordinates3D[][];

export interface IHandTrackingService {
  requestPrediction(): Promise<HandVector>;
  initialize(): Promise<void>;
  start(): Promise<void>;
  stop(): void;
}
