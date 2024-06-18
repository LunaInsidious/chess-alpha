/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BadRequestError,
  badRequestError,
} from "@/usecases/errors/badRequestError";
import { ConflictError, conflictError } from "@/usecases/errors/conflictError";
import { ForbiddenError, forbiddenError } from "@/usecases/errors/forbidden";
import {
  InternalServerError,
  internalServerError,
} from "@/usecases/errors/internalServerError";
import { NotFoundError, notFoundError } from "@/usecases/errors/notFoundError";
import {
  RequestTimeoutError,
  requestTimeoutError,
} from "@/usecases/errors/requestTimeoutError";
import {
  TooManyRequestsError,
  tooManyRequestsError,
} from "@/usecases/errors/tooManyRequestsError";
import {
  UnauthorizedError,
  unauthorizedError,
} from "@/usecases/errors/unauthorizedError";
import { isNullOrUndefined } from "@/utils/typeGuard";

// 400
export const isBadRequestError = (e: any): e is BadRequestError => {
  if (!isNullOrUndefined(e)) {
    return e.name === badRequestError;
  }
  return false;
};

// 401
export const isUnauthorizedError = (e: any): e is UnauthorizedError => {
  if (!isNullOrUndefined(e)) {
    return e.name === unauthorizedError;
  }
  return false;
};

// 403
export const isForbiddenError = (e: any): e is ForbiddenError => {
  if (!isNullOrUndefined(e)) {
    return e.name === forbiddenError;
  }
  return false;
};

// 404
export const isNotFoundError = (e: any): e is NotFoundError => {
  if (!isNullOrUndefined(e)) {
    return e.name === notFoundError;
  }
  return false;
};

// 408
export const isRequestTimeout = (e: any): e is RequestTimeoutError => {
  if (!isNullOrUndefined(e)) {
    return e.name === requestTimeoutError;
  }
  return false;
};

// 409
export const isConflict = (e: any): e is ConflictError => {
  if (!isNullOrUndefined(e)) {
    return e.name === conflictError;
  }
  return false;
};

export const isTooManyRequest = (e: any): e is TooManyRequestsError => {
  if (!isNullOrUndefined(e)) {
    return e.name === tooManyRequestsError;
  }
  return false;
};

// 500
export const isInternalServerError = (e: any): e is InternalServerError => {
  if (!isNullOrUndefined(e)) {
    return e.name === internalServerError;
  }
  return false;
};
