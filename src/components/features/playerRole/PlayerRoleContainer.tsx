import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { PlayerRolePresenter } from "@/components/features/playerRole/PlayerRolePresenter";
import { appURL } from "@/config/url";
import { useAlert } from "@/hooks/alert";
import { generateRandomInteger, isArray, isString } from "@/utils/typeGuard";

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

  const color = queryParams.get("color");

  const playerList =
    playersQuery !== null
      ? playersQuery
          .split(",")
          .filter((player) => player !== "")
          .map((player) => decodeURIComponent(player))
      : [];

  const [roles, setRoles] = useState<string[]>(() =>
    (() => {
      const savedRoles = localStorage.getItem("roles");
      const parsedItems = JSON.parse(savedRoles ?? "null");

      if (isArray(parsedItems, isString)) {
        return parsedItems;
      }

      return [];
    })(),
  );

  const [currentIndex, setCurrentPlayerIndex] = useState<number>(0);

  const handleRoleAssignment = (players: string[]) => {
    const assignedRoles = assignRoles(players);
    setRoles(assignedRoles);
    localStorage.setItem("roles", JSON.stringify(assignedRoles)); // localStorageに保存
  };

  useEffect(() => {
    if (playerList.length === 0) {
      showError({
        message: "プレイヤーが指定されていません。",
      });
      navigate(appURL.playerSetup);
    } else if (roles.length === 0) {
      handleRoleAssignment(playerList);
    }
  }, [playerList]);

  const [isShowingRole, setShowRole] = useState(false);

  const handleShowRole = () => {
    setShowRole(true);
  };

  const handleNextPlayer = () => {
    if (currentIndex < playerList.length - 1) {
      setShowRole(false);
      setCurrentPlayerIndex(currentIndex + 1);
    }
  };

  const handleStartGame = () => {
    navigate(`${appURL.game}?color=${color}&players=${playersQuery}`);
  };

  const handlePreviousPlayer = () => {
    if (currentIndex > 0) {
      setShowRole(false);
      setCurrentPlayerIndex(currentIndex - 1);
    } else if (currentIndex === 0) {
      navigate(appURL.playerSetup);
    }
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
    />
  );
}
