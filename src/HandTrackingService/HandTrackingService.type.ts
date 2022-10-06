export type coordinates = {
  x: number;
  y: number;
  z: number;
};

export type Settings = {
  videoSourceObect?: MediaStream;
  handsNumber?: 1 | 2;
  minDetectionConfidence?: number;
  minTrackingConfidence?: number;
  modelComplexity?: 0 | 1;
};

export type HandVector = coordinates[][];

export interface IHandTrackingService {
  start(): void;
  stop(): void;
  requestPrediction(): Promise<HandVector> ;
}
