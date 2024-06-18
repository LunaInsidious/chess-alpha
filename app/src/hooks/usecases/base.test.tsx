import { act, renderHook } from "@testing-library/react";

import { useUseCase } from "@/hooks/usecases/base";

const mockExec = jest.fn();
const mockSuccessCallback = jest.fn();
const mockFailedCallback = jest.fn();

describe("useUseCase", () => {
  beforeEach(() => {
    mockExec.mockClear();
    mockSuccessCallback.mockClear();
    mockFailedCallback.mockClear();
  });
  describe("初期化", () => {
    test("初期値が代入されているだけか", async () => {
      const { hasFailed, isExecuting, error } = renderHook(() => useUseCase())
        .result.current;
      expect(hasFailed).toBe(false);
      expect(isExecuting).toBe(false);
      expect(error).toEqual(undefined);
    });
  });
  describe("useCaseを実行する", () => {
    test("usecaseは一回だけ実行されて成功すると、成功のコールバックが起きる", async () => {
      const { execUseCase } = renderHook(() => useUseCase()).result.current;

      await act(async () => {
        execUseCase({
          exec: mockExec,
          failedCallback: mockFailedCallback,
          successCallback: mockSuccessCallback,
        });
        await Promise.resolve();
      });

      const { hasFailed, isExecuting, error } = renderHook(() => useUseCase())
        .result.current;

      expect(hasFailed).toBe(false);
      expect(isExecuting).toBe(false);
      expect(error).toEqual(undefined);

      expect(mockExec).toHaveBeenCalledTimes(1);
      expect(mockSuccessCallback).toHaveBeenCalledTimes(1);
      expect(mockFailedCallback).toHaveBeenCalledTimes(0);
    });
    test("usecaseは一回だけ実行されて失敗すると、失敗時のコールバックが発生する", async () => {
      // execを失敗させる実装
      mockExec.mockImplementation(() => {
        throw new Error("error");
      });

      // フックスのレンダリング
      const { execUseCase } = renderHook(() => useUseCase()).result.current;

      // execUsecaseの実行
      await act(async () => {
        execUseCase({
          exec: mockExec,
          failedCallback: mockFailedCallback,
          successCallback: mockSuccessCallback,
        });
        await Promise.resolve();
      });

      const { hasFailed, isExecuting, error } = renderHook(() => useUseCase())
        .result.current;

      expect(hasFailed).toBe(false);
      expect(isExecuting).toBe(false);
      expect(error).toEqual(undefined);

      expect(mockExec).toHaveBeenCalledTimes(1);
      expect(mockFailedCallback).toHaveBeenCalledTimes(1); // 失敗コールバックが起こる
      expect(mockSuccessCallback).toHaveBeenCalledTimes(0); // 成功コールバックはおきない
    });
  });
  describe("コールバックを設定せずuseCaseを実行する", () => {
    test("usecaseは一回だけ実行されて成功してもコールバックは起きない", async () => {
      const { execUseCase } = renderHook(() => useUseCase()).result.current;

      await act(async () => {
        // コールバックを指定しない
        execUseCase({
          exec: mockExec,
        });
        await Promise.resolve();
      });

      const { hasFailed, isExecuting, error } = renderHook(() => useUseCase())
        .result.current;

      expect(hasFailed).toBe(false);
      expect(isExecuting).toBe(false);
      expect(error).toEqual(undefined);

      expect(mockExec).toHaveBeenCalledTimes(1);
      expect(mockSuccessCallback).toHaveBeenCalledTimes(0);
      expect(mockFailedCallback).toHaveBeenCalledTimes(0);
    });
    test("usecaseは一回だけ実行されて失敗しても、コールバックはおきない", async () => {
      // execを失敗させる実装
      mockExec.mockImplementation(() => {
        throw new Error("error");
      });

      // フックスのレンダリング
      const { execUseCase } = renderHook(() => useUseCase()).result.current;

      // execUsecaseの実行
      await act(async () => {
        // コールバックを指定しない
        execUseCase({
          exec: mockExec,
        });
        await Promise.resolve();
      });

      const { hasFailed, isExecuting, error } = renderHook(() => useUseCase())
        .result.current;

      expect(hasFailed).toBe(false);
      expect(isExecuting).toBe(false);
      expect(error).toEqual(undefined);

      expect(mockExec).toHaveBeenCalledTimes(1);
      expect(mockFailedCallback).toHaveBeenCalledTimes(0);
      expect(mockSuccessCallback).toHaveBeenCalledTimes(0);
    });
  });
});
