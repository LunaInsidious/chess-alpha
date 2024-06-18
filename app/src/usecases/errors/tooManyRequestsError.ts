// 429エラー

export const tooManyRequestsError = "TooManyRequestsError";
export class TooManyRequestsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = tooManyRequestsError;
    Object.setPrototypeOf(this, TooManyRequestsError.prototype);
  }
}
