export type Token = {
  accessToken: string;
  tokenType: string;
};

export type LoginReq = {
  loginId: string;
  password: string;
};

export const newToken = (): Token => ({
  tokenType: "",
  accessToken: "",
});

export const newAuthInfo = (): Token => ({
  tokenType: "",
  accessToken: "",
});

export const newLoginReq = (): LoginReq => ({
  loginId: "",
  password: "",
});
