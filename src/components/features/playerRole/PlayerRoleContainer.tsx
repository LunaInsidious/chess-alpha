import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { PlayerRolePresenter } from "@/components/features/playerRole/PlayerRolePresenter";
import { appURL } from "@/config/url";
import { useAlert } from "@/hooks/alert";
import { generateRandomInteger } from "@/utils/typeGuard";

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

  const players =
    playersQuery !== null
      ? playersQuery
          .split(",")
          .filter((player) => player !== "")
          .map((player) => decodeURIComponent(player))
      : [];

  const [roles, setRoles] = useState<string[]>(() => {
    const savedRoles = localStorage.getItem("roles");
    return JSON.parse(savedRoles ?? "null") ?? [];
  });

  const [currentRoleIndex, setCurrentPlayerIndex] = useState<number>(0);

  useEffect(() => {
    if (players.length === 0) {
      showError({
        message: "プレイヤーが指定されていません。",
      });
      navigate(appURL.playerSetup);
    } else if (roles.length === 0) {
      const assignedRoles = assignRoles(players);
      setRoles(assignedRoles);
      localStorage.setItem("roles", JSON.stringify(assignedRoles)); // localStorageに保存
    }
  }, [players]);

  const handleNextPlayer = () => {
    if (currentRoleIndex < players.length - 1) {
      setCurrentPlayerIndex(currentRoleIndex + 1);
    } else {
      // 全員の役職を見せ終わったら、次の画面へ遷移
      navigate(`${appURL.game}?color=${color}&players=${playersQuery}`);
    }
  };

  const [showRole, setShowRole] = useState(false);

  const handleShowRole = () => {
    if (!showRole) {
      setShowRole(true);
    } else {
      setShowRole(false);
    }
  };

  const handleShowRoleAndNextPlayer = () => {
    handleShowRole();
    handleNextPlayer();
  };

  return (
    <PlayerRolePresenter
      player={players[currentRoleIndex]}
      role={roles[currentRoleIndex]}
      showRole={showRole}
      handleShowRole={handleShowRole}
      handleShowRoleAndNextPlayer={handleShowRoleAndNextPlayer}
    />
  );
}
