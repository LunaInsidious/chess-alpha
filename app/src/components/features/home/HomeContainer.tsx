import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGameDataAPI } from "@/adapters/api/game/api";
import { HomePresenter } from "@/components/features/home/HomePresenter";
import { appURL } from "@/config/url";
import { useAlert } from "@/hooks/alert";
import { isNullOrUndefined } from "@/utils/typeGuard";

export function HomeContainer() {
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
      if (isNullOrUndefined(latest)) {
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
      const randomColor = Math.random() < 0.5 ? "black" : "white";
      navigate(`${appURL.playerSetup}?color=${randomColor}`);
    } else {
      navigate(`${appURL.playerSetup}?color=${color}`);
    }
  };

  const handleContinuePrevData = async (isContinue: boolean) => {
    if (isContinue) {
      navigate(`${appURL.game}?color=${playerColor}`);
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

  return (
    <HomePresenter
      handleClickCPUBattle={handleClickCPUBattle}
      handleClickOnlineBattle={handleClickOnlineBattle}
      handleClickRule={handleClickRule}
      handleClickHistory={handleClickHistory}
      handleCloseRuleBook={handleCloseRuleBook}
      handleCloseModal={handleCloseModal}
      handleClickPlayerColor={handleClickPlayerColor}
      handleContinuePrevData={handleContinuePrevData}
      isRuleBookOpen={isRuleBookOpen}
      modalMode={modalMode}
    />
  );
}
