interface ResultOk<T> {
  value: T;
}

interface ResultFail {
  error: string | Error;
}

export default class Result<T> {
  error?: string | Error;

  value?: T;

  constructor({ error, value }: { error?: string | Error; value?: T }) {
    this.error = error;
    this.value = value;
  }

  failed(): this is ResultFail {
    return !!this.error;
  }

  succeded(): this is ResultOk<T> {
    return !this.failed();
  }

  static ok<S>(value?: S): Result<S> {
    return new Result({ value });
  }

  static fail<S>(error: string | Error): Result<S> {
    return new Result({ error });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static combine(results: Result<any>[]): Result<void> {
    return results.find(result => result.failed()) || Result.ok();
  }
}
