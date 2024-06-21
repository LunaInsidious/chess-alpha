import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { GamePresenter } from "@/components/features/game/GamePresenter";
import { appURL } from "@/config/url";
import { useAlert } from "@/hooks/alert";

export function GameContainer() {
  const [searchParams] = useSearchParams();
  const { showAlert, closeAlert } = useAlert();
  const navigate = useNavigate();

  const [playerColor, setPlayerColor] = useState<"white" | "black" | undefined>(
    undefined,
  );

  useEffect(() => {
    // クエリパラメータからプレイヤーの色を取得
    const playerColorParam = searchParams.get("player");
    if (playerColorParam === "white" || playerColorParam === "black") {
      setPlayerColor(playerColorParam);
    } else {
      showAlert({
        severity: "error",
        message:
          "プレイヤー情報の取得に失敗しました。スタート画面からやり直してください。",
        button: {
          text: "戻る",
          onClick: () => {
            navigate(appURL.home);
            closeAlert();
          },
        },
        isLarge: true,
      });
    }
  }, []);

  return <GamePresenter playerColor={playerColor} />;
}
