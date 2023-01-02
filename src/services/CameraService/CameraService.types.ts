export interface CameraServiceProps {
  width: number;
  height: number;

  streamWrapper?: HTMLVideoElement;
}

export interface ICameraService extends Required<Pick<CameraServiceProps, 'streamWrapper'>> {
  rawStream?: MediaStream;

  initialize(): void;
  stop(): void;
  start(): void;
  destroy(): void;
}
