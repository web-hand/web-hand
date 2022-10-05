import { createManualMock } from '../createManualMock';
import { MEDIA_DEVICES } from './MEDIA_DEVICE.mock';

export const NAVIGATOR = createManualMock<Navigator>({
  mediaDevices: MEDIA_DEVICES,
});
