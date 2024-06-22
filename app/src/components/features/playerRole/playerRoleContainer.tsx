import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { PlayerRolePresenter } from "@/components/features/playerRole/playerRolePresenter";
import { appURL } from "@/config/url";
import { useAlert } from "@/hooks/alert";
import { generateRandomInteger } from "@/utils/random";
import { isArray, isString } from "@/utils/typeGuard";

export function PlayerRoleContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showError } = useAlert();

  const assignRoles = (players: string[]) => {
    if (players.length >= 3 && players.length <= 6) {
      const roles = Array(players.length).fill("市民");
      const randomIndex = generateRandomInteger(players.length - 1);
      if (roles.length > randomIndex) {
        roles[randomIndex] = "人狼";
        return roles;
      }
    }

    throw new Error("予期しないエラー");
  };

  const queryParams = new URLSearchParams(location.search);

  const playersQuery = queryParams.get("players");

  if (playersQuery === null) {
    showError({
      message: "プレイヤーが指定されていません。",
    });
    navigate(appURL.playerSetup);
    return null;
  }

  const color = queryParams.get("color");

  const playerList =
    playersQuery !== null
      ? playersQuery
          .split(",")
          .filter((player) => player !== "")
          .map((player) => decodeURIComponent(player))
      : [];

  if (playerList.length < 3 || playerList.length > 6) {
    showError({
      message: "プレイヤーの数は3人から6人でなければなりません。",
    });
    navigate(appURL.playerSetup);
    return null;
  }

  const loadRolesFromLocalStorage = (): string[] => {
    const savedRoles = localStorage.getItem("roles");
    const parsedItems = JSON.parse(savedRoles ?? "null");

    if (isArray(parsedItems, isString)) {
      return parsedItems;
    }

    return [];
  };

  const [roles, setRoles] = useState<string[]>(loadRolesFromLocalStorage());

  if (roles.length === 0) {
    const assignedRoles = assignRoles(playerList);
    setRoles(assignedRoles);
    localStorage.setItem("roles", JSON.stringify(assignedRoles));
  }

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [isShowingRole, setIsShowingRole] = useState(false);

  const handleShowRole = () => {
    setIsShowingRole(true);
  };

  const [isFirstPlayer, setIsFirstPlayer] = useState(true);

  const handleChangeIsFirstPlayer = (playerIndex: number) => {
    if (playerIndex === 0) {
      setIsFirstPlayer(true);
    } else {
      setIsFirstPlayer(false);
    }
  };

  const handleNextPlayer = () => {
    if (currentIndex < playerList.length - 1) {
      setIsShowingRole(false);
      setCurrentIndex(currentIndex + 1);
      handleChangeIsFirstPlayer(currentIndex + 1);
    }
  };

  const handleStartGame = () => {
    navigate(`${appURL.game}?color=${color}&players=${playersQuery}`);
  };

  const handlePreviousPlayer = () => {
    if (currentIndex > 0) {
      setIsShowingRole(false);
      setCurrentIndex(currentIndex - 1);
      handleChangeIsFirstPlayer(currentIndex - 1);
    }
  };

  const handleBackToSetup = () => {
    navigate(appURL.playerSetup);
  };

  return (
    <PlayerRolePresenter
      currentPlayer={playerList[currentIndex]}
      currentRole={roles[currentIndex]}
      showRole={isShowingRole}
      handleShowRole={handleShowRole}
      handleNextPlayer={handleNextPlayer}
      handlePreviousPlayer={handlePreviousPlayer}
      handleStartGame={handleStartGame}
      isLastPlayer={currentIndex === playerList.length - 1}
      handleBackToSetup={handleBackToSetup}
      isFirstPlayer={isFirstPlayer}
    />
  );
}
