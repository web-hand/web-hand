// THIS IS DEMO FILE ONLY FOR DEV TESTING
import { HandTrackingService } from '../src/HandTrackingService/HandTrackingService';

const HTS = new HandTrackingService({});
const intervalDelay = 1000;
const loader = async () => {
  await HTS.start()
    .then(() => {
      console.log(HTS.isRunning);
    })
    .then(() => {
      window.setInterval(() => {
        HTS.requestPrediction().catch((error: string) => {
          throw new Error(`Cannot create camera: ${error}`);
        });
      }, intervalDelay);
    });
};

loader().catch((error: string) => {
  throw new Error(`Cannot create camera: ${error}`);
});
