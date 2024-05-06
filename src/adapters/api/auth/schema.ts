import { z } from "zod";

import { LoginReq, Token } from "@/domains/auth/token";

export type APIReqLoginReq = {
  loginId: string;
  password: string;
};

export const APIResAuthInfoParser = z.object({
  accessToken: z.string(),
  tokenType: z.string(),
});

export type APIResAuthInfo = z.infer<typeof APIResAuthInfoParser>;

export const APIReqFromLoginReq = (l: LoginReq): APIReqLoginReq => ({
  loginId: l.loginId,
  password: l.password,
});

export const AuthInfoFromAPIRes = (t: APIResAuthInfo): Token => ({
  tokenType: t.tokenType,
  accessToken: t.accessToken,
});
