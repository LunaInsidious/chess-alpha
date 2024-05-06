import { User } from "@/domains/user/entity";

export type UserRes = {
  userId: string;
};

export const userFromRes = (res: UserRes): User => ({
  id: res.userId,
});
