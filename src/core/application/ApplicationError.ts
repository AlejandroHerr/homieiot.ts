export default class ApplicationError extends Error {
  readonly cause?: Error;

  constructor(message: string, cause?: Error) {
    super(message);
    this.cause = cause;
    this.name = 'ApplicationError';
  }

  static create(error: string | Error): ApplicationError {
    if (error instanceof Error) {
      return new ApplicationError(error.message, error);
    }

    return new ApplicationError(error);
  }
}
