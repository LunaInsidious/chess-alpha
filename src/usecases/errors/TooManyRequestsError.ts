// 429エラー
export class TooManyRequestsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ManyRequestsError";
    Object.setPrototypeOf(this, TooManyRequestsError.prototype);
  }
}
