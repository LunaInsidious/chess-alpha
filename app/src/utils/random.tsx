/**
 *  0～maxまでの整数をランダムに生成する。
 */
export function generateRandomInteger(max: number) {
  if (max <= 0) return 0;
  return Math.floor(Math.random() * (max + 1));
}
