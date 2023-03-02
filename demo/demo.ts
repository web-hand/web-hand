// THIS IS DEMO FILE ONLY FOR DEV TESTING
/* eslint-disable */

import { isHoldGesture } from "../src/gestureDetectors/isHoldGesture";
import { HandLandmarksService } from "../src/services/HandLandmarksService/HandLandmarksService";
import { HandleHandLandmarks } from "../src/services/HandLandmarksService/HandLandmarksService.types";
import { HandTrackingService } from "../src/services/HandTrackingService/HandTrackingService";
import { HandLandmarks } from "../src/services/HandTrackingService/HandTrackingService.types";
import { Point3D } from "../src/structures/Point3D/Point3D";
import { IPoint3D } from "../src/structures/Point3D/Point3D.types";

const HTS = new HandTrackingService();
const handLandmarksService: HandleHandLandmarks = new HandLandmarksService(
  Array.from<undefined, IPoint3D>({ length: 21 }, () => {
    return new Point3D(0, 0, 0);
  }) as unknown as HandLandmarks
);

const intervalDelay = 30;

const initPoints = (pointsNumber: number) => {
  const pointsArray = [];
  const parent = document.querySelector('#points');
  for (let i = 0; i < pointsNumber; i++) {
    const newPoint = document.createElement('div');
    pointsArray.push(newPoint);
    newPoint.classList.add('point');
    const whichPointsAreTips = 4;
    if (!(i % whichPointsAreTips)) {
      newPoint.style.backgroundColor = 'green';
    }
    parent?.appendChild(newPoint);
  }

  return pointsArray;
};

const movePoints = (points: HTMLElement[], positions: HandLandmarks[]) => {
  const whichHand = 0;
  handLandmarksService.setNewFingerPosition(positions[whichHand]);
  console.log(isHoldGesture(handLandmarksService.getFingerTips()));
  points.forEach((element: HTMLElement, id: number) => {
    element.style.left = `${positions[whichHand][id]?.x * screen.width}px`;
    element.style.top = `${positions[whichHand][id]?.y * screen.height}px`;
  });
};

const loader = async () => {
  await HTS.start();
  const numberOfPointsInHand = 21;
  const points = initPoints(numberOfPointsInHand);
  window.setInterval(() => {
    HTS.requestPrediction()
      .then((positions) => {
        if (positions.length) {
          movePoints(points, positions);
        }
      })
      .catch((error: string) => {
        throw new Error(`Cannot create camera: ${error}`);
      });
  }, intervalDelay);
};

loader().catch((error: string) => {
  throw new Error(`Cannot create camera: ${error}`);
});
