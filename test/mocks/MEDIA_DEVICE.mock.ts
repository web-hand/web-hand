import { createManualMock } from '../createManualMock';

export const MEDIA_DEVICES: MediaDevices = createManualMock<MediaDevices>({
  getUserMedia: () => {
    return Promise.resolve(
      createManualMock<MediaStream>({
        active: true,
      })
    );
  },
});
