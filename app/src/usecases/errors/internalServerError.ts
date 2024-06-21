// 500エラー

export const internalServerError = "InternalServerError";
export class InternalServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = internalServerError;
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}
