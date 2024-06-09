export type Player = {
  id: string;
  name: string;
};

const generateUniqueId = (): string => {
  const uniqueId = Math.random().toString(32).substring(2);
  return uniqueId;
};

export const createPlayer = (): Player => {
  const id = generateUniqueId();
  return { id, name: "" };
};

export const createInitPlayer = (length: number): Player[] =>
  Array.from({ length }, () => createPlayer());
