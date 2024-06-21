import { User } from "@/domains/user/entity";

export interface UserAPI {
  findMe(): Promise<User>;
}
