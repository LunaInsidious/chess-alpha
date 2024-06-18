// 翻訳が完了しているかチェックするスクリプト
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// ネストされたオブジェクトから値を取り出す
const extractValues = (messages) => {
  const result = [];

  const recurse = (value) => {
    if (value != null && typeof value === "object") {
      // valueがオブジェクトであれば再帰的に処理
      Object.values(value).forEach((val) => recurse(val));
    } else if (typeof value === "string") {
      // valueが文字列であれば戻り値に追加
      result.push(value);
    }
  };

  recurse(messages);
  return result;
};

// 翻訳が完了しているか(翻訳値が空文字のものが存在しないか)チェック
// 事前にnpm run translate-parseによって、keyをjsonに設定していないが使用しているものは空文字になっているため、
// 空文字チェックで十分である。
const checkTranslationCompleted = async (jsonPath) => {
  try {
    // pathで渡したjsonファイルを読み込み、パース
    const raw = await fs.readFile(
      path.resolve(path.dirname(fileURLToPath(import.meta.url)), jsonPath),
    );
    const messages = JSON.parse(raw.toString());

    // 値をすべて取り出し、空文字のものがあるかチェック
    const values = extractValues(messages);
    const emptyValues = values.filter((value) => value === "");

    if (emptyValues.length === 0) {
      // 空文字のものがなければ完了
      console.log("Translation has completed for", jsonPath);
      return true;
    }
    // 空文字のものがあれば失敗
    console.error("Translation has not been completed for", jsonPath);
    return false;
  } catch (err) {
    // ファイルが読み込めなかった場合はエラー
    console.error("Error reading file:", jsonPath, err);
    return false;
  }
};

// 対象言語
const languages = ["ja"];

// 非同期で全ての言語の翻訳が完了しているかチェック
Promise.all(
  languages.map(async (lang) =>
    checkTranslationCompleted(`./src/translation/locales/${lang}.json`),
  ),
).then((results) => {
  if (results.every((result) => result)) {
    console.log("All translations are completed.");
    process.exit(0); // 全て成功
  } else {
    console.error("Some translations are incomplete.");
    process.exit(1); // エラー
  }
});
