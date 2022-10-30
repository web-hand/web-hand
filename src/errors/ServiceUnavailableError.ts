export class ServiceUnavailableError extends Error {
  constructor(serviceName: string, reason: string) {
    super(`Service **${serviceName}** is not available. Reason: \n${reason}`);
  }
}
