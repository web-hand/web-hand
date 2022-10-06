// THIS IS DEMO FILE ONLY FOR DEV TESTING
import { HandTrackingService } from '../src/HandTrackingService/HandTrackingService';

const HTS = new HandTrackingService({});
HTS.start()
    .then(() => {
      console.log(HTS.isRunning);
    })


// const intervalDelay = 5000;


// const loader = async () => {
//   await HTS.start()
//     .then(() => {
//       console.log(HTS.isRunning);
//     })
//     .then(() => {
//       window.setInterval(() => {
//         HTS.requestPrediction().catch((error: string) => {
//           throw new Error(`Cannot create camera: ${error}`);
//         });
//       }, intervalDelay);
//     });
// };

// loader().catch((error: string) => {
//   throw new Error(`Cannot create camera: ${error}`);
// });


document.addEventListener('keydown', ()=>{
  console.log('sending...');
  HTS.requestPrediction()
})