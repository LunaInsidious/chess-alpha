import { useState } from "react";

import { isNullOrUndefined } from "@/utils/typeGuard";

export type UseCaseHookType<ResponseType> = {
  hasFailed: boolean;
  isExecuting: boolean;
  execUseCase: ({
    exec,
    successCallback,
    failedCallback,
  }: {
    exec: () => Promise<ResponseType>;
    successCallback?: (res: ResponseType) => Promise<void>;
    failedCallback?: () => Promise<void>;
  }) => Promise<void>;
  error?: unknown;
};

/**
 * UseCaseを実行するためのフック
 * hasFailed, isExecuting, execUseCase, errorの基本のstate, 関数を定義している。
 *
 * @returns {UseCaseHookType}
 * hasFailed: UseCaseが失敗したかどうか
 * isExecuting: UseCaseが実行中かどうか
 * execUseCase: UseCaseを実行する関数
 * error: UseCaseが失敗したときのエラー
 *
 * @example hooks/create.tsなどを参照
 */
export const useUseCase = <ResponseType>(): UseCaseHookType<ResponseType> => {
  const [hasFailed, setHasFailed] = useState(false);

  const [isExecuting, setIsExecuting] = useState(false);

  const [error, setError] = useState<unknown>();

  const execUseCase = async ({
    exec,
    successCallback,
    failedCallback,
  }: {
    exec: () => Promise<ResponseType>;
    successCallback?: (res: ResponseType) => Promise<void>;
    failedCallback?: () => Promise<void>;
  }) => {
    setIsExecuting(true);
    setHasFailed(false);
    try {
      const res = await exec();
      if (!isNullOrUndefined(successCallback)) {
        await successCallback(res);
      }
    } catch (e) {
      if (!isNullOrUndefined(failedCallback)) {
        await failedCallback();
      }
      setHasFailed(true);
      setError(e);
    }
    setIsExecuting(false);
  };

  return {
    hasFailed,
    isExecuting,
    execUseCase,
    error,
  };
};
