export type User = {
  id: string;
  name: string;
};

export const newUser = (): User => ({
  id: "",
  name: "",
});
