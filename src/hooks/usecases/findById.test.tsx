/* eslint-disable @typescript-eslint/no-explicit-any */
import { act, renderHook } from "@testing-library/react";
import { useParams } from "react-router-dom";

import { FindByIdHookType, useFindById } from "@/hooks/usecases/findById";

export type TestModel = {
  id: string;
  name: string;
};

export const newTestModel = (): TestModel => ({
  id: "initTestModelId",
  name: "initTestModelName",
});

type ResultType = {
  current: FindByIdHookType<TestModel>;
};

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
}));

describe("useFindById", () => {
  const mockFindByID = jest.fn();

  beforeEach(() => {
    mockFindByID.mockClear();
  });

  describe("パスパラメータにidが含まれている", () => {
    beforeEach(() => {
      (useParams as jest.Mock).mockReturnValue({ id: "testId" });
    });
    test("useFindByIdがレンダリングされて結果が返却される", async () => {
      mockFindByID.mockImplementation(() => ({
        id: "testId",
        name: "testName",
      }));

      // フックスをレンダリングする
      let result: ResultType = {} as ResultType;
      await act(async () => {
        result = renderHook(() =>
          useFindById(mockFindByID, newTestModel),
        ).result;
        await Promise.resolve();
      });

      expect(result.current.id).toBe("testId");
      expect(result.current.ret).toEqual({
        id: "testId",
        name: "testName",
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(undefined);
      expect(result.current.hasFailed).toBe(false);
      expect(mockFindByID).toHaveBeenCalledTimes(1);
      expect(mockFindByID).toHaveBeenCalledWith("testId");
    });
    test("パスパラメータではなくKeyで取得、結果が返却される", async () => {
      mockFindByID.mockImplementation(() => ({
        id: "testId",
        name: "testName",
      }));
      // フックスをレンダリングする
      let result: ResultType = {} as ResultType;
      await act(async () => {
        result = renderHook(
          () => useFindById(mockFindByID, newTestModel, { key: "key" }), // keyを付与する
        ).result;
        await Promise.resolve();
      });

      expect(result.current.ret).toEqual({
        id: "testId",
        name: "testName",
      });
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(undefined);
      expect(result.current.hasFailed).toBe(false);
      expect(mockFindByID).toHaveBeenCalledTimes(1);
      expect(mockFindByID).toHaveBeenCalledWith("key");
    });
    test("apiからの取得の失敗がフックスに反映される", async () => {
      mockFindByID.mockImplementation(() => {
        throw new Error("error");
      });
      // フックスをレンダリングする
      let result: ResultType = {} as ResultType;
      await act(async () => {
        result = renderHook(() =>
          useFindById(mockFindByID, newTestModel),
        ).result;
        await Promise.resolve();
      });

      expect(result.current.ret).toEqual({
        id: "initTestModelId",
        name: "initTestModelName",
      });
      expect(result.current.isLoading).toBe(false);
      expect(result.current.hasFailed).toBe(true);
      expect(mockFindByID).toThrowError(new Error("error"));
    });
  });
  describe("パスパラメータからidが取得できない", () => {
    beforeEach(() => {
      (useParams as jest.Mock).mockReturnValue({ id: undefined });
    });
    test("引数が足りないのでapiはコールされない", async () => {
      mockFindByID.mockImplementation(() => ({
        id: "testId",
        name: "testName",
      }));

      // フックスをレンダリングする
      let result: ResultType = {} as ResultType;
      await act(async () => {
        result = renderHook(() =>
          useFindById(mockFindByID, newTestModel),
        ).result;
        await Promise.resolve();
      });

      expect(result.current.id).toBe(undefined);
      expect(result.current.ret).toEqual({
        id: "initTestModelId",
        name: "initTestModelName",
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toEqual(new Error("id not found"));
      expect(result.current.hasFailed).toBe(true);
      expect(mockFindByID).toHaveBeenCalledTimes(0);
    });
    test("keyが指定されているとapiはコールされる", async () => {
      mockFindByID.mockImplementation(() => ({
        id: "testId",
        name: "testName",
      }));

      // フックスをレンダリングする
      let result: ResultType = {} as ResultType;
      await act(async () => {
        result = renderHook(() =>
          useFindById(mockFindByID, newTestModel, { key: "key" }),
        ).result;
        await Promise.resolve();
      });

      expect(result.current.id).toBe(undefined);
      expect(result.current.ret).toEqual({
        id: "testId",
        name: "testName",
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toEqual(undefined);
      expect(result.current.hasFailed).toBe(false);
      expect(mockFindByID).toHaveBeenCalledTimes(1);
      expect(mockFindByID).toHaveBeenCalledWith("key");
    });
  });
});
