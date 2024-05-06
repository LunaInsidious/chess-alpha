/** 依存性の注入を行う */

import { useAuthDriverForAxios } from "@/adapters/api/auth";
import { useAuthAPI } from "@/adapters/api/auth/api";
import { useUserAPI } from "@/adapters/api/user/api";
import { LoginReq, Token } from "@/domains/auth/token";
import { login } from "@/usecases/auth";
import { findMe } from "@/usecases/user";

export const useGetTokenInCache = (): (() => Token) => () => ({
  tokenType: "Bearer",
  accessToken: "mockToken",
});

// User
export const useFindMe = () => {
  const deps = {
    api: useUserAPI(),
  };
  return () => findMe(deps);
};

export const useLogin = () => {
  const deps = {
    api: useAuthAPI(),
    auth: useAuthDriverForAxios(),
  };
  return (l: LoginReq) => login(deps, l);
};
