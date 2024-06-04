// 409エラー

export const conflictError = "ConflictError";
export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = conflictError;
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}
