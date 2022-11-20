export class CanNotPerformPredictionError extends Error {
  constructor(error: unknown) {
    super(`Can not perform prediction`);
    console.error(error);
  }
}
