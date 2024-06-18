// 400エラー

export const badRequestError = "BadRequestError";
export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = badRequestError;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
