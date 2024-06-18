import { useAuthDriverForAxios } from "@/adapters/api/auth";
import { useAuthAPI } from "@/adapters/api/auth/api";
import { useInMemoryUserAPI } from "@/adapters/api/user/mock";
import { Token } from "@/domains/auth/entity";
import { LoginReq } from "@/usecases/dto/auth";
import { login } from "@/usecases/interactors/auth";
import { findMe } from "@/usecases/interactors/user";

export const useGetTokenInCache = (): (() => Token) => () => ({
  tokenType: "Bearer",
  accessToken: "mockToken",
});

// User
export const useFindMe = () => {
  const deps = {
    api: useInMemoryUserAPI(false),
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
