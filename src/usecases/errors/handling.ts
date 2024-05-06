/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequestError } from "@/usecases/errors/BadRequestError";
import { ConflictError } from "@/usecases/errors/ConflictError";
import { ForbiddenError } from "@/usecases/errors/Forbidden";
import { InternalServerError } from "@/usecases/errors/InternalServerError";
import { NotFoundError } from "@/usecases/errors/NotFoundError";
import { RequestTimeoutError } from "@/usecases/errors/RequestTimeoutError";
import { TooManyRequestsError } from "@/usecases/errors/TooManyRequestsError";
import { UnauthorizedError } from "@/usecases/errors/UnauthorizedError";

// 400
export const isBadRequestError = (e: any): e is BadRequestError => {
  if (e != null) {
    return e.name === "BadRequestError";
  }
  return false;
};

// 401
export const isUnauthorizedError = (e: any): e is UnauthorizedError => {
  if (e != null) {
    return e.name === "UnauthorizedError";
  }
  return false;
};

// 403
export const isForbiddenError = (e: any): e is ForbiddenError => {
  if (e != null) {
    return e.name === "ForbiddenError";
  }
  return false;
};

// 404
export const isNotFoundError = (e: any): e is NotFoundError => {
  if (e != null) {
    return e.name === "NotFoundError";
  }
  return false;
};

// 408
export const isRequestTimeout = (e: any): e is RequestTimeoutError => {
  if (e != null) {
    return e.name === "TimeoutError";
  }
  return false;
};

// 409
export const isConflict = (e: any): e is ConflictError => {
  if (e != null) {
    return e.name === "ConflictError";
  }
  return false;
};

export const isTooManyRequest = (e: any): e is TooManyRequestsError => {
  if (e != null) {
    return e.name === "ManyRequestsError";
  }
  return false;
};

// 500
export const isInternalServerError = (e: any): e is InternalServerError => {
  if (e != null) {
    return e.name === "InternalError";
  }
  return false;
};
