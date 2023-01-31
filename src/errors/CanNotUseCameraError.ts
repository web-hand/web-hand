export class CanNotUseCameraError extends Error {
  constructor(error: DOMException) {
    super(`Can not find camera or it is unavailable. Please make sure that app has enough privileges to use your camera`);
    console.error(error);
  }
}
