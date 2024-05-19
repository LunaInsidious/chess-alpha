export type Token = {
  accessToken: string;
  tokenType: string;
};

export const newToken = (): Token => ({
  tokenType: "",
  accessToken: "",
});
