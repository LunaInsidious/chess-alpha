// 408エラー

export const requestTimeoutError = "TimeoutError";
export class RequestTimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = requestTimeoutError;
    Object.setPrototypeOf(this, RequestTimeoutError.prototype);
  }
}
