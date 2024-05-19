export type LoginReq = {
  loginId: string;
  password: string;
};

export const newLoginReq = (): LoginReq => ({
  loginId: "",
  password: "",
});
