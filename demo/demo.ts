// THIS IS DEMO FILE ONLY FOR DEV TESTING
import { Coordinates3D } from '../src/structures/Point3D/Point3D.types';
import { HandTrackingService } from '../src/services/HandTrackingService/HandTrackingService';

const HTS = new HandTrackingService();

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

const movePoints = (points: HTMLElement[], positions: Coordinates3D[][]) => {
  const whichHand = 0;
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
