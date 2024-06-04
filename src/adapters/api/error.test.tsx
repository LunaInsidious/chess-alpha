import "@testing-library/jest-dom";

import { AxiosError, AxiosRequestHeaders } from "axios";

import { wrapWithErrorHandler } from "@/adapters/api/error";
import { BadRequestError } from "@/usecases/errors/badRequestError";
import { ConflictError } from "@/usecases/errors/conflictError";
import { InternalServerError } from "@/usecases/errors/internalServerError";
import { NotFoundError } from "@/usecases/errors/notFoundError";
import { UnauthorizedError } from "@/usecases/errors/unauthorizedError";

describe("wrapWithErrorHandler 単体テスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockCreate = jest.fn();
  const mockAPI = {
    create: mockCreate,
    value: "mockString",
    num: 1,
    bool: true,
    obj: { key: "value" },
  };

  test("APIが成功すればレスポンスがそのまま返る。関数以外もそのまま", async () => {
    mockCreate.mockImplementation(() =>
      Promise.resolve({ id: "successId", userType: "generalUser" }),
    );

    expect.assertions(5);
    expect(wrapWithErrorHandler(mockAPI).create()).resolves.toEqual({
      id: "successId",
      userType: "generalUser",
    });
    expect(wrapWithErrorHandler(mockAPI).value).toEqual("mockString");
    expect(wrapWithErrorHandler(mockAPI).num).toEqual(1);
    expect(wrapWithErrorHandler(mockAPI).bool).toEqual(true);
    expect(wrapWithErrorHandler(mockAPI).obj).toEqual({ key: "value" });
  });
  test("400エラーが返るとBadRequestErrorが返る。関数以外はそのまま", async () => {
    mockCreate.mockImplementation(async () => {
      const err = new AxiosError();
      err.response = {
        status: 400,
        data: { message: "Bad Request Error" },
        statusText: "Bad Request",
        headers: {},
        config: {
          headers: {} as AxiosRequestHeaders,
        },
      };
      throw err;
    });

    expect.assertions(6);
    await expect(wrapWithErrorHandler(mockAPI).create()).rejects.toThrow(
      BadRequestError,
    );
    await expect(wrapWithErrorHandler(mockAPI).create()).rejects.toThrow(
      "Bad Request Error",
    );
    expect(wrapWithErrorHandler(mockAPI).value).toEqual("mockString");
    expect(wrapWithErrorHandler(mockAPI).num).toEqual(1);
    expect(wrapWithErrorHandler(mockAPI).bool).toEqual(true);
    expect(wrapWithErrorHandler(mockAPI).obj).toEqual({ key: "value" });
  });
  test("401エラーが返るとUnauthorizedErrorが返る", async () => {
    mockCreate.mockImplementation(async () => {
      const err = new AxiosError();
      err.response = {
        status: 401,
        data: { message: "Unauthorized Error" },
        statusText: "Unauthorized",
        headers: {},
        config: {
          headers: {} as AxiosRequestHeaders,
        },
      };
      throw err;
    });

    expect.assertions(2);
    await expect(wrapWithErrorHandler(mockAPI).create()).rejects.toThrow(
      UnauthorizedError,
    );
    await expect(wrapWithErrorHandler(mockAPI).create()).rejects.toThrow(
      "Unauthorized Error",
    );
  });
  test("404エラーが返るとNotFoundErrorが返る", async () => {
    mockCreate.mockImplementation(async () => {
      const err = new AxiosError();
      err.response = {
        status: 404,
        data: { message: "Not Found Error" },
        statusText: "Not Found",
        headers: {},
        config: {
          headers: {} as AxiosRequestHeaders,
        },
      };
      throw err;
    });

    expect.assertions(2);
    await expect(wrapWithErrorHandler(mockAPI).create()).rejects.toThrow(
      NotFoundError,
    );
    await expect(wrapWithErrorHandler(mockAPI).create()).rejects.toThrow(
      "Not Found Error",
    );
  });
  test("409エラーが返るとConflictErrorが返る", async () => {
    mockCreate.mockImplementation(async () => {
      const err = new AxiosError();
      err.response = {
        status: 409,
        data: { message: "Conflict Error" },
        statusText: "Conflict",
        headers: {},
        config: {
          headers: {} as AxiosRequestHeaders,
        },
      };
      throw err;
    });

    expect.assertions(2);
    await expect(wrapWithErrorHandler(mockAPI).create()).rejects.toThrow(
      ConflictError,
    );
    await expect(wrapWithErrorHandler(mockAPI).create()).rejects.toThrow(
      "Conflict Error",
    );
  });
  test("500エラーが返るとInternalServerErrorが返る", async () => {
    mockCreate.mockImplementation(async () => {
      const err = new AxiosError();
      err.response = {
        status: 500,
        data: { message: "Internal Server Error" },
        statusText: "Internal Server Error",
        headers: {},
        config: {
          headers: {} as AxiosRequestHeaders,
        },
      };
      throw err;
    });

    expect.assertions(2);
    await expect(wrapWithErrorHandler(mockAPI).create()).rejects.toThrow(
      InternalServerError,
    );
    await expect(wrapWithErrorHandler(mockAPI).create()).rejects.toThrow(
      "Internal Server Error",
    );
  });
  test("エラーハンドリングで扱っていないステータスコードが返るとAxiosErrorがそのまま返る", async () => {
    mockCreate.mockImplementation(async () => {
      const err = new AxiosError();
      err.response = {
        status: 418,
        data: { message: "I'm a teapot" },
        statusText: "I'm a teapot",
        headers: {},
        config: {
          headers: {} as AxiosRequestHeaders,
        },
      };
      throw err;
    });

    expect.assertions(1);
    await expect(wrapWithErrorHandler(mockAPI).create()).rejects.toThrow(
      AxiosError,
    );
  });
  test("AxiosErrorでないエラーが返るとそのエラーがそのまま返る", async () => {
    mockCreate.mockImplementation(async () => {
      throw new Error("Bad Request Error");
    });

    expect.assertions(2);
    await expect(wrapWithErrorHandler(mockAPI).create()).rejects.toThrow(Error);
    await expect(wrapWithErrorHandler(mockAPI).create()).rejects.toThrow(
      "Bad Request Error",
    );
  });
});
