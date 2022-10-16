export type coordinates = {
  x: number;
  y: number;
  z: number;
};

type OneOrTwo = 1 | 2;
type ZeroOrOne = 0 | 1;

export type Settings = {
  videoSourceObect?: MediaStream;
  handsNumber?: OneOrTwo;
  minDetectionConfidence?: number;
  minTrackingConfidence?: number;
  modelComplexity?: ZeroOrOne;
};

export type HandVector = coordinates[][];

export interface IHandTrackingService {
  start(): Promise<void>;
  stop(): void;
  requestPrediction(): Promise<HandVector>;
}
