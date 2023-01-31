export const DEFAULT_CAMERA_CONSTRAINTS: MediaStreamConstraints = {
  audio: false,
  video: { facingMode: 'environment', frameRate: 30, width: { max: 1280 } },
};
