export class CanNotFindCameraError extends Error {
  constructor(error: DOMException) {
    super(`Ca not find camera or it is unavailable. Please make sure that app has enough privileges to use your camera`);
    console.error(error);
  }
}
