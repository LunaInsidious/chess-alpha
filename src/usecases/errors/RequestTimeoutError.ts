// 408エラー
export class RequestTimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TimeoutError";
    Object.setPrototypeOf(this, RequestTimeoutError.prototype);
  }
}
