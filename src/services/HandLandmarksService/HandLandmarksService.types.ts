import { HandLandmarks } from '../HandTrackingService/HandTrackingService.types';
import { ReadonlyPoint3D } from '../../structures/Point3D/Point3D.types';

export interface HandleHandLandmarks {
  setNewFingerPosition(position: HandLandmarks): void;
  getFingerTips(): FingersTips;
}

/**
 * Documentation can be found under ***[this url](https://google.github.io/mediapipe/solutions/hands#javascript-solution-api)***.
 * Graphical representation of hand landmarks
 * ![hand landmarks](https://mediapipe.dev/images/mobile/hand_landmarks.png)
 */
export type FingersTips = [
  THUMB_TIP: ReadonlyPoint3D,
  INDEX_FINGER_TIP: ReadonlyPoint3D,
  MIDDLE_FINGER_TIP: ReadonlyPoint3D,
  RING_FINGER_TIP: ReadonlyPoint3D,
  PINKY_FINGER_TIP: ReadonlyPoint3D
];
