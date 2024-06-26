import axios from "axios";

import {
  APIReqFromLoginReq,
  APIResAuthInfo,
  AuthInfoFromAPIRes,
} from "@/adapters/api/auth/schema";
import { wrapWithErrorHandler } from "@/adapters/api/error";
import { Token } from "@/domains/auth/entity";
import { LoginReq } from "@/usecases/dto/auth";
import { AuthAPI } from "@/usecases/ports/auth";

export const url = "auth";

export const useAuthAPI = (): AuthAPI =>
  wrapWithErrorHandler({
    login: async (l: LoginReq): Promise<Token> => {
      const req = APIReqFromLoginReq(l);
      const res = await axios.post<APIResAuthInfo>(`${url}/access-token`, req);
      return AuthInfoFromAPIRes(res.data);
    },
  });
