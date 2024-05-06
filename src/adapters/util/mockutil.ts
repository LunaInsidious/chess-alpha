// API連携した時のレスポンスまでの時間を再現
export const mockWait = (ms: number) =>
  // eslint-disable-next-line no-promise-executor-return
  new Promise((resolve) => setTimeout(resolve, ms));

export function generateRandomString(maxLength: number) {
  const length = Math.floor(Math.random() * maxLength) + 1; // Generate a random length between 1 and maxLength
  let result = "";
  const characters = "あいうえおかきくけこさしすせそたちつてと";
  const charactersLength = characters.length;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function generateRandomNumber(maxNumber: number) {
  return Math.floor(Math.random() * maxNumber); // Generate a random length between 0 and maxNumber
}
