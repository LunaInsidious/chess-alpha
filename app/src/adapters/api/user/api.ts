import axios from "axios";

import { wrapWithErrorHandler } from "@/adapters/api/error";
import { UserRes, userFromRes } from "@/adapters/api/user/schema";
import { User } from "@/domains/user/entity";
import { UserAPI } from "@/usecases/ports/user";

const uri = "users";

export const useUserAPI = (): UserAPI =>
  wrapWithErrorHandler({
    findMe: async (): Promise<User> => {
      const ret = await axios.get<UserRes>(`${uri}/me`);
      return userFromRes(ret.data);
    },
  });
