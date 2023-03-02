import { FingersTips } from '../services/HandLandmarksService/HandLandmarksService.types';

/**
 * At the beginning of this function We are assuming that fingers are put in hold gesture (all fingers are close to each other)
 * This is better than assuming that they are not in the gesture because if at least one finger is too far we can finish the loop
 * and do not check rest of pairs as there is no sense of doing this
 *
 * @param fingerTips 5 fingertips landmarks
 * @param threshold max distance between fingers
 */
export function isHoldGesture(fingerTips: FingersTips, threshold = 0.15): boolean {
  for (let i = 0; i < fingerTips.length; i++) {
    for (let j = i + 1; j < fingerTips.length; j++) {
      console.log('DISTANCE: ', fingerTips[i].distanceTo(fingerTips[j]));
      if (fingerTips[i].distanceTo(fingerTips[j]) > threshold) {
        return false;
      }
    }
  }
  return true;
}
