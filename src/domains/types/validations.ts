import { isNullOrUndefined } from "@/utils/typeGuard";

export const enValidate = (value: string): boolean => {
  const regex = /^[a-zA-Z0-9 !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;
  return !regex.test(value as string);
};
export const requiredValidate = (value: string): boolean => value.length <= 0;
export const requiredNumberValidate = (value: number): boolean => value <= 0;
export const emailValidate = (value: string): boolean => {
  const regex =
    /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

  return !regex.test(value) && value !== "";
};

export const dateValidate = (value: Date): boolean =>
  isNullOrUndefined(value.getDate());

export const lengthValidate = (value: string[] | number[]): boolean =>
  value.length === 0;

export const zenkakuKanaValidate = (value: string): boolean => {
  const regex = /^[ァ-ヴー]+$/u;
  return !regex.test(value);
};

export const maxLengthValidate = (value: string, length: number): boolean =>
  value.length > length;

export const phoneNumberValidate = (value: string): boolean => {
  const regex = /^\d{10,}$/;
  return !regex.test(value);
};

export const duplicateValidate = (values: string[] | number[]): boolean => {
  // Setを使って、配列の要素を一意にする
  const setValues = new Set(values.map((value) => String(value)));
  return setValues.size !== values.length;
};
