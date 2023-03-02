import { CameraServiceProps } from '../CameraService/CameraService.types';
import { Coordinates3D } from '../../structures/Point3D/Point3D.types';
import { Options } from '@mediapipe/hands';

export interface HandTrackingServiceProps {
  modelSettings?: Options;
  cameraServiceProps?: CameraServiceProps;
}

/**
 * Documentation can be found under ***[this url](https://google.github.io/mediapipe/solutions/hands#javascript-solution-api)***.
 * Graphical representation of hand landmarks
 * ![hand landmarks](https://mediapipe.dev/images/mobile/hand_landmarks.png)
 */
export type HandLandmarks = [
  WRIST: Coordinates3D,
  THUMB_CMC: Coordinates3D,
  THUMB_MCP: Coordinates3D,
  THUMB_IP: Coordinates3D,
  THUMB_TIP: Coordinates3D,
  INDEX_FINGER_MCP: Coordinates3D,
  INDEX_FINGER_PIP: Coordinates3D,
  INDEX_FINGER_DIP: Coordinates3D,
  INDEX_FINGER_TIP: Coordinates3D,
  MIDDLE_FINGER_MCP: Coordinates3D,
  MIDDLE_FINGER_PIP: Coordinates3D,
  MIDDLE_FINGER_DIP: Coordinates3D,
  MIDDLE_FINGER_TIP: Coordinates3D,
  RING_FINGER_MCP: Coordinates3D,
  RING_FINGER_PIP: Coordinates3D,
  RING_FINGER_DIP: Coordinates3D,
  RING_FINGER_TIP: Coordinates3D,
  PINKY_FINGER_TIP: Coordinates3D,
  PINKY_FINGER_TIP: Coordinates3D,
  PINKY_FINGER_TIP: Coordinates3D,
  PINKY_FINGER_TIP: Coordinates3D
];

export interface IHandTrackingService {
  requestPrediction(): Promise<HandLandmarks[]>;
  initialize(): Promise<void>;
  start(): Promise<void>;
  stop(): void;
}
