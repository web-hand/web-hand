import { FingersTips, HandleHandLandmarks } from './HandLandmarksService.types';
import { HandLandmarks } from '../HandTrackingService/HandTrackingService.types';
import { IPoint3D } from '../../structures/Point3D/Point3D.types';
import { Point3D } from '../../structures/Point3D/Point3D';

export class HandLandmarksService implements HandleHandLandmarks {
  private readonly landmarks = Array.from<undefined, IPoint3D>({ length: 21 }, () => {
    return new Point3D(0, 0, 0);
  });

  constructor(handLandmarks: HandLandmarks) {
    this.setNewFingerPosition(handLandmarks);
  }

  getFingerTips(): FingersTips {
    const fingerTipDivider = 4;
    const fingerTips: FingersTips = [] as unknown as FingersTips;
    for (let i = fingerTipDivider; i < this.landmarks.length; i += fingerTipDivider) {
      fingerTips.push(this.landmarks[i]);
    }
    return fingerTips;
  }

  setNewFingerPosition(positions: HandLandmarks): void {
    for (let i = 0; i < positions.length; i++) {
      this.landmarks[i].setPosition(positions[i]);
    }
  }
}
