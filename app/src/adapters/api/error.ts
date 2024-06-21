// エラー処理用の高階関数
import axios from "axios";

import { BadRequestError } from "@/usecases/errors/badRequestError";
import { ConflictError } from "@/usecases/errors/conflictError";
import { InternalServerError } from "@/usecases/errors/internalServerError";
import { NotFoundError } from "@/usecases/errors/notFoundError";
import { UnauthorizedError } from "@/usecases/errors/unauthorizedError";

/**
 * @param fn apiを叩く関数
 * @returns エラーハンドリングを行うようにラップされた関数
 */
function withErrorHandling<ArgsType extends unknown[], ResponseType>(
  fn: (...args: ArgsType) => Promise<ResponseType>,
): (...args: ArgsType) => Promise<ResponseType> {
  return async (...args: ArgsType): Promise<ResponseType> => {
    try {
      return await fn(...args);
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        throw error;
      }
      switch (error.response?.status) {
        case 400:
          throw new BadRequestError(error.response.data.message);
        case 401:
          throw new UnauthorizedError(error.response.data.message);
        case 404:
          throw new NotFoundError(error.response.data.message);
        case 409:
          throw new ConflictError(error.response.data.message);
        case 500:
          throw new InternalServerError(error.response.data.message);
        default:
          throw error;
      }
    }
  };
}

/**
 * @param apiObj apiのinterfaceを満たす関数を持つオブジェクト
 * @returns エラーハンドリングを行うようにラップされたapiのinterfaceを満たす関数を持つオブジェクト
 */
export function wrapWithErrorHandler<ObjType extends object>(
  apiObj: ObjType,
): ObjType {
  const result = Object.entries(apiObj).reduce(
    (acc: Record<string, unknown>, [key, value]) => {
      if (typeof value === "function") {
        acc[key] = withErrorHandling(value);
      } else {
        acc[key] = value;
      }
      return acc;
    },
    {},
  );

  return result as ObjType;
}
