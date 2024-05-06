interface Resources {
  ja: {
    common: {
      delete: "削除する";
      save: "保存する";
      submit: "送信";
    };
    entity: {
      loginReq: {
        loginId: "ログインID";
        password: "パスワード";
      };
      sample: {
        firstName: "名";
      };
      user: {
        userType: "ユーザー種別";
      };
    };
    error: {
      failed: "{{action}}に失敗しました。";
      maxSelect: "{{selectedName}}は{{maxSelect}}つまで選択できます。";
      minMaxWrongNumber: "{{targetName}}は{{minNumber}}以上{{maxNumber}}以下の数値を入力してください";
      minWrongFormat: "{{targetName}}は{{minLength}}文字以上で入力してください。";
      required: "{{requiredName}}を入力してください。";
      requiredSelect: "{{requiredName}}を選択してください。";
    };
  };
}

export default Resources;
