import { LoginReq, Token } from "@/domains/auth/token";

export interface AuthAPI {
  login(req: LoginReq): Promise<Token>;
}

export interface Auth {
  saveAuthInfo(authInfo: Token): void;

  getAuthInfo(): Token;

  resetAuthInfo(): void;
}
