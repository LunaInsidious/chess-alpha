/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";
import { act, renderHook, waitFor } from "@testing-library/react";

import { AuthProvider, AuthType } from "@/components/providers/AuthProvider";
import { useAuth } from "@/hooks/auth";

const mockUseFindMe = jest.fn();
const mockUseGetTokenInCache = jest.fn();

jest.mock("@/hooks/injections", () => ({
  useFindMe: () => mockUseFindMe,
  useGetTokenInCache: () => mockUseGetTokenInCache,
}));

describe("useAuth", () => {
  beforeEach(() => {
    mockUseFindMe.mockClear();
    mockUseGetTokenInCache.mockClear();
  });
  test("AuthProviderの初期値としてログイン成功情報が格納されている", async () => {
    // モックの実装
    mockUseFindMe.mockImplementation(() =>
      Promise.resolve({ id: "successId", name: "mockName" }),
    );
    mockUseGetTokenInCache.mockImplementation(() => ({
      accessToken: "mockToken",
      tokenType: "Bearer",
    }));

    // AuthProviderをラップしたフックスの作成
    let wrapper;
    await act(() => {
      wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>;
    });
    const { result } = renderHook(() => useAuth(), {
      wrapper,
    });

    // ログインに成功しているか
    const expected: AuthType = {
      isFindingMeNow: false,
      token: {
        accessToken: "mockToken",
        tokenType: "Bearer",
      },
      user: {
        id: "successId",
        name: "mockName",
      },
      isLoggedIn: true,
    };
    await waitFor(() => expect(result.current.auth).toEqual(expected));
  });
  // test("findMeAPIが失敗すると、ログインが失敗する", async () => {
  //   // モックの実装
  //   // findMe APIが失敗したとき
  //   mockUseFindMe.mockImplementation(() => {
  //     throw new Error("error");
  //   });
  //   mockUseGetTokenInCache.mockImplementation(() => ({
  //     accessToken: "mockToken",
  //     tokenType: "Bearer",
  //   }));

  //   // AuthProviderをラップしたフックスの作成
  //   let wrapper;
  //   await act(() => {
  //     wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>;
  //   });
  //   const { result } = renderHook(() => useAuth(), {
  //     wrapper,
  //   });

  //   // ログインに失敗しているかどうか確認
  //   const expected: AuthType = {
  //     isFindingMeNow: false,
  //     token: {
  //       accessToken: "",
  //       tokenType: "",
  //     },
  //     user: {
  //       id: "",
  //       name: "",
  //     },
  //     isLoggedIn: false,
  //   };
  //   await waitFor(() => expect(result.current.auth).toEqual(expected));
  // });
});
