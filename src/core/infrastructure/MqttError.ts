export default class MqttError extends Error {
  private constructor(message?: string) {
    super(message);

    this.name = this.constructor.name;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  static create(message?: string): MqttError {
    const error = new MqttError(message);

    if (typeof Error.captureStackTrace === 'function') {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      Error.captureStackTrace(error, MqttError.create);
    } else {
      error.stack = new Error(message).stack;
    }

    return error;
  }
}
