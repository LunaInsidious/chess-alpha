import { Token } from "@/domains/auth/entity";
import { LoginReq } from "@/usecases/dto/auth";

export interface AuthAPI {
  login(req: LoginReq): Promise<Token>;
}

export interface Auth {
  saveAuthInfo(authInfo: Token): void;

  getAuthInfo(): Token;

  resetAuthInfo(): void;
}
