// 404エラー

export const notFoundError = "NotFoundError";
export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = notFoundError;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
