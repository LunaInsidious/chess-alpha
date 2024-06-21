import { generateUniqueId } from "@/utils/uniqueId";

export type User = {
  id: string;
  name: string;
};

export const newUser = (): User => {
  const id = generateUniqueId();
  return { id, name: "" };
};

export const getNewUsers = (length: number): User[] =>
  Array.from({ length }, () => newUser());
