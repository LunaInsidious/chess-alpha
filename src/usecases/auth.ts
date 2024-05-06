import { LoginReq, Token } from "@/domains/auth/token";
import { Auth, AuthAPI } from "@/usecases/ports/auth";

export const login = async (
  deps: { api: AuthAPI; auth: Auth },
  l: LoginReq,
): Promise<Token> => {
  const ret: Token = await deps.api.login(l);
  const authInfo: Token = {
    accessToken: ret.accessToken,
    tokenType: ret.tokenType,
  };
  deps.auth.saveAuthInfo(authInfo);
  return authInfo;
};

export const getAuthInfoInCookie = (deps: { auth: Auth }): Token => {
  const ret = deps.auth.getAuthInfo();
  deps.auth.saveAuthInfo(ret);
  return ret;
};
