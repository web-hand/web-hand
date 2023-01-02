export interface Coordinates3D {
  x: number;
  y: number;
  z: number;
}

export type HandVector = Coordinates3D[][];

export interface IHandTrackingService {
  requestPrediction(): Promise<HandVector>;
  initialize(): Promise<void>;
  start(): Promise<void>;
  stop(): void;
}
