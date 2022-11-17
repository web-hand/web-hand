export interface Coordinates3D {
  x: number;
  y: number;
  z: number;
}

export type HandVector = Coordinates3D[][];

export interface IHandTrackingService {
  start(): Promise<void>;
  stop(): void;
  requestPrediction(): Promise<HandVector>;
}
