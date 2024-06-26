import { mockWait } from "@/adapters/util/mockutil";
import { User } from "@/domains/user/entity";
import { InternalServerError } from "@/usecases/errors/internalServerError";
import { NotFoundError } from "@/usecases/errors/notFoundError";
import { RequestTimeoutError } from "@/usecases/errors/requestTimeoutError";
import { UserAPI } from "@/usecases/ports/user";
import { generateRandomInteger } from "@/utils/random";

export const useInMemoryUserAPI = (hasError: boolean): UserAPI => ({
  findMe: async (): Promise<User> => {
    // 認証の待機のシミュレーションのためwait
    await mockWait(2000);
    if (hasError) {
      switch (generateRandomInteger(3)) {
        case 0:
          throw new InternalServerError("ユーザー情報の取得に失敗しました");
        case 1:
          throw new NotFoundError("ユーザー情報が見つけられませんでした");
        case 2:
          throw new RequestTimeoutError("タイムアウトしました");
        default:
          throw new InternalServerError("ユーザー情報の取得に失敗しました");
      }
    }
    return {
      id: "mock",
      name: "mockName",
    };
  },
});
