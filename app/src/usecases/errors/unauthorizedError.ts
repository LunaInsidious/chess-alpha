// 401エラー

export const unauthorizedError = "UnauthorizedError";
export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = unauthorizedError;
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
