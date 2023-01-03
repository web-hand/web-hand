export interface CameraServiceProps {
  width: number;
  height?: number;
  streamWrapper?: HTMLVideoElement;
}

export interface ICameraService extends Required<Pick<CameraServiceProps, 'streamWrapper'>> {
  rawStream?: MediaStream;

  initialize(): Promise<void>;
  start(): Promise<void>;
  stop(): void;
  destroy(): void;
}
