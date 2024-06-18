import { ErrorObject, noError } from "@/domains/types/errorObject";
import { isNullOrUndefined } from "@/utils/typeGuard";

export type ValidationObject<ObjType> = {
  key: keyof ObjType;
  /**
   * バリデーション関数
   * @param obj
   * @param index arrayの特定のindexに対するvalidationの場合に指定
   * @returns
   */
  validate: (obj: ObjType, index?: number) => ErrorObject;
};

export type Validations<ObjType> = ValidationObject<ObjType>[];

/**
 * オブジェクト内のある項目（key）を指定してバリデーションする
 *
 * @template T
 * @param {ObjType} obj - バリデーション対象オブジェクト
 * @param {keyof ObjType} key - `obj`内のバリデーションを行うキー
 * @param {Validations<ObjType>} validations - `obj`キーとバリデーション関数を格納したオブジェクト配列
 * @param {number} [index] - 配列型のプロパティのindex
 * @returns {ErrorObject} - バリデーション結果
 */
export const validateByKey = <ObjType>(
  obj: ObjType,
  key: keyof ObjType,
  validations: Validations<ObjType>,
  index?: number,
): ErrorObject => {
  const validateObj = validations.find((v) => v.key === key);
  if (isNullOrUndefined(validateObj)) {
    return noError();
  }
  return validateObj.validate(obj, index);
};
