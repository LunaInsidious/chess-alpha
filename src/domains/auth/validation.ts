import { t as translation } from "i18next";

import { ErrorObject, error, noError } from "@/domains/types/errorObject";
import { Validations } from "@/domains/types/validationObject";
import { LoginReq } from "@/usecases/dto/auth";
import { isNullOrUndefined } from "@/utils/typeGuard";

const validateLoginId = (t: typeof translation, l: LoginReq): ErrorObject => {
  if (l.loginId === "") {
    return error(
      t("error.required", { requiredName: t("entity.loginReq.loginId") }),
    );
  }
  return noError();
};

const validatePassword = (t: typeof translation, l: LoginReq): ErrorObject => {
  if (l.password === "") {
    return error(
      t("error.required", { requiredName: t("entity.loginReq.password") }),
    );
  }
  return noError();
};

export const generateValidationsLoginReq = (
  t: typeof translation,
): Validations<LoginReq> => [
    {
      key: "loginId",
      validate: (obj) => validateLoginId(t, obj),
    },
    {
      key: "password",
      validate: (obj) => validatePassword(t, obj),
    },
  ];

export const validateAuthInfo = (obj: unknown): boolean => {
  if (typeof obj !== "object" || isNullOrUndefined(obj)) {
    return false;
  }
  if (!("accessToken" in obj && typeof obj.accessToken === "string")) {
    return false;
  }
  return "tokenType" in obj && typeof obj.tokenType === "string";
};
