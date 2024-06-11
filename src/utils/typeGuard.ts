/**
 * 引数がstringならばtrueを返す関数です。
 * この関数を使うことで、型ガードを行うことができます。
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * 引数がnumberならばtrueを返す関数です。
 * この関数を使うことで、型ガードを行うことができます。
 */
export function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

/**
 * 引数がnullまたはundefinedならばtrueを返す関数です。
 * この関数を使うことで、型ガードを行うことができます。
 */
export function isNullOrUndefined(value: unknown): value is null | undefined {
  // `==`でnullとundefinedが判定できる。
  return value == null
}

/**
 * 引数がDateまたはundefinedならばtrueを返す関数です。
 * この関数を使うことで、型ガードを行うことができます。
 */
export function isDateOrUndefined(date: unknown): date is Date | undefined {
  return date instanceof Date || isNullOrUndefined(date)
}

/**
 * 引数がFileまたはundefinedならばtrueを返す関数です。
 * この関数を使うことで、型ガードを行うことができます。
 */
export function isFileOrUndefined(value: unknown): value is File | undefined {
  return value instanceof File || isNullOrUndefined(value)
}

/**
 * 引数が配列ならばtrueを返す関数です。
 * この関数を使うことで、型ガードを行うことができます。
 * また、第二引数に型ガード関数を渡すことで、配列の中身の型も保証することができます。
 * オーバーロードをしなければ、型引数のみで型ガードを行うことができ、配列の中身の型が安全でなくなるため、
 * オーバーロードを用いています。
 */
// isArray関数のオーバーロード
export function isArray<ArrayType>(
  value: unknown,
  typeGuard: (item: unknown) => item is ArrayType,
): value is ArrayType[];
export function isArray(value: unknown): value is unknown[];

// isArray関数の実装
export function isArray<ArrayType>(
  value: unknown,
  typeGuard?: (item: unknown) => item is ArrayType,
): value is ArrayType[] {
  return Array.isArray(value) && (isNullOrUndefined(typeGuard) || value.every(typeGuard));
}

/**
 * 引数がstringまたはnumberまたはsymbolならばtrueを返す関数です。
 * この関数を使うことで、型ガードを行うことができます。
 * 主にオブジェクトのキーを判定する際に使用します。
 */
export function isStringOrNumberOrSymbol(
  key: unknown,
): key is string | number | symbol {
  return (
    typeof key === "string" ||
    typeof key === "number" ||
    typeof key === "symbol"
  );
}

/**
 * 引数が指定したオブジェクトのキーまたはキーの配列ならばtrueを返す関数です。
 * この関数を使うことで、型ガードを行うことができます。
 */
export function isKeysOf<T extends Record<string, unknown>>(
  keys: unknown,
  obj: T,
): keys is (keyof T)[] {
  if (isStringOrNumberOrSymbol(keys)) {
    return keys in obj;
  }
  return (
    isArray(keys, isStringOrNumberOrSymbol) && keys.every((key) => key in obj)
  );
}
