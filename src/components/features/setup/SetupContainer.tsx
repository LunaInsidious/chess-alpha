import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGameDataAPI } from "@/adapters/api/game/api";
import { SetupPresenter } from "@/components/features/setup/SetupPresenter";
import { appURL } from "@/config/url";
import { useAlert } from "@/hooks/alert";

export function SetupContainer() {
  const [isRuleBookOpen, setIsRuleBookOpen] = useState(false);

  const [modalMode, setModalMode] = useState<
    "cpu" | "prevData" | "online" | undefined
  >(undefined);

  const [playerColor, setPlayerColor] = useState<"black" | "white" | undefined>(
    undefined,
  );

  const navigate = useNavigate();

  const { showError } = useAlert();

  const gameDataAPI = useGameDataAPI();

  const handleClickCPUBattle = async () => {
    try {
      const latest = await gameDataAPI.findLatest();
      if (latest == null) {
        setModalMode("cpu");
      } else {
        setModalMode("prevData");
        setPlayerColor(latest.playerColor);
      }
    } catch (e) {
      console.error(e);
      showError({
        message: "エラーが発生しました。もう一度お試しください。",
      });
    }
  };

  const handleClickOnlineBattle = () => {
    // TODO: Implement online battle
    console.log("clicked online battle");
  };

  const handleClickRule = () => {
    setIsRuleBookOpen(true);
  };

  const handleClickHistory = () => {
    // TODO: Implement history
    console.log("clicked history");
  };

  const handleCloseRuleBook = () => {
    setIsRuleBookOpen(false);
  };

  const handleCloseModal = () => {
    setModalMode(undefined);
  };

  const handleClickPlayerColor = (color: "black" | "white" | "random") => {
    if (color === "random") {
      // white, blackのどちらかをランダムに選択
      const randomColor = Math.random() < 0.5 ? "black" : "white";
      navigate(`${appURL.game}?player=${randomColor}`);
    } else {
      navigate(`${appURL.game}?player=${color}`);
    }
  };

  const handleContinuePrevData = async (isContinue: boolean) => {
    if (isContinue) {
      navigate(`${appURL.game}?player=${playerColor}`);
    } else {
      try {
        await gameDataAPI.delete();
      } catch (e) {
        console.error(e);
        showError({
          message: "エラーが発生しました。もう一度お試しください。",
        });
      }
      setModalMode("cpu");
    }
  };

  const handleBackHome = () => {
    navigate(`${appURL.home}`);
  };

  return (
    <SetupPresenter
      handleClickCPUBattle={handleClickCPUBattle}
      handleBackHome={handleBackHome}
    />
  );
}
