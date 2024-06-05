import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGameDataAPI } from "@/adapters/api/game/api";
import { SetupPresenter } from "@/components/features/setup/SetupPresenter";
import { appURL } from "@/config/url";
import { useAlert } from "@/hooks/alert";

export function SetupContainer() {
  const [playerColor, setPlayerColor] = useState<"black" | "white" | undefined>(
    undefined,
  );

  const navigate = useNavigate();

  const { showError } = useAlert();

  const handleClickPlayerColor = (color: "black" | "white" | "random") => {
    if (color === "random") {
      // white, blackのどちらかをランダムに選択
      const randomColor = Math.random() < 0.5 ? "black" : "white";
      navigate(`${appURL.game}?player=${randomColor}`);
    } else {
      navigate(`${appURL.game}?player=${color}`);
    }
  };

  const handleBackHome = () => {
    navigate(`${appURL.home}`);
  };

  const handleStart = () => {
    navigate(`${appURL.playerRole}`);
  }

  return (
    <SetupPresenter
      handleBackHome={handleBackHome}
      handleStart={handleStart}
    />
  );
}
