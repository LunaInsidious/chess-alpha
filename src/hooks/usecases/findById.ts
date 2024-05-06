import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useUseCase } from "@/hooks/usecases/base";

export type FindByIdHookType<ResponseType> = {
  ret: ResponseType;
  hasFailed: boolean;
  id: string | undefined;
  isLoading: boolean;
  setRet: (r: ResponseType) => void;
  error?: unknown;
};

export const useFindById = <ResponseType>(
  findById: (id: string) => Promise<ResponseType>,
  newRet: () => ResponseType,
  options?: {
    key?: string; // pathParam以外のIDを指定する場合、そのIDを指定する
    successCallback?: (res: ResponseType) => Promise<void>;
    isAllowEmptyId?: boolean;
  },
): FindByIdHookType<ResponseType> => {
  const uc = useUseCase<ResponseType>();

  const { id } = useParams<{ id: string }>();

  const [ret, setRet] = useState<ResponseType>(newRet());

  const findKey = options?.key ?? id; // key が指定されている場合、keyが優先される

  const find = useCallback(async () => {
    await uc.execUseCase({
      exec: async () => {
        // nullまたは空文字の場合はエラー
        const isAllowEmpty = options?.isAllowEmptyId ?? false;
        if (isAllowEmpty && findKey === "") {
          setRet(newRet());
          return newRet();
        }
        if (findKey == null || findKey === "") {
          throw new Error("id not found");
        }
        const result = await findById(findKey);
        setRet(result);
        return result;
      },
      successCallback: options?.successCallback,
    });
  }, [findById]);

  useEffect(() => {
    find();
  }, []);

  return {
    ret,
    hasFailed: uc.hasFailed,
    id,
    isLoading: uc.isExecuting,
    setRet,
    error: uc.error,
  };
};
