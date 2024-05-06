import { useTranslation as useTran } from "react-i18next";

import { isString } from "@/utils/typeGuard";


export const useTranslation = () => {
  const { t, i18n } = useTran();

  const lang = i18n.language;

  // 〇〇Jaや〇〇Enを現在の言語に応じて取得する
  // それぞれの言語に対応するキーが存在しない場合は空文字を返す
  const getValueForCurrentLanguage = <ObjType>(
    obj: ObjType,
    keyOfJapaneseValue: keyof ObjType,
  ): string => {
    const targetKey = (() => {
      switch (i18n.language) {
        case "ja":
          return keyOfJapaneseValue;
        default:
          return "";
      }
    })();
    if (targetKey === "") {
      return "";
    }
    const targetValue = obj[targetKey];
    if (isString(targetValue)) {
      return targetValue;
    }
    return "";
  };

  return {
    t,
    setJa: async () => {
      await i18n.changeLanguage("ja");
    },
    getValueForCurrentLanguage,
    lang,
    isJa: lang === "ja",
  };
};
