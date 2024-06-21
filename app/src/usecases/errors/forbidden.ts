// 403エラー

export const forbiddenError = "ForbiddenError";
export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = forbiddenError;
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}
