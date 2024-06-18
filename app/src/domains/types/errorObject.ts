export type ErrorObject = {
  hasError: boolean;
  errorMessage: string;
};

export const noError = (): ErrorObject => ({
  hasError: false,
  errorMessage: "",
});

/**
 * @param hasError エラー状態であるかどうかを示す
 * @param errorMessage 表示するエラーメッセージ
 */
export const error = (errorMessage: string): ErrorObject => ({
  hasError: true,
  errorMessage,
});
