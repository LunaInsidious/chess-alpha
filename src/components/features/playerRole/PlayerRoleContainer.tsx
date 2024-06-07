import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { generateRandomNumber } from "@/adapters/util/mockutil";
import { PlayerRolePresenter } from "@/components/features/playerRole/PlayerRolePresenter";
import { appURL } from "@/config/url";
import { useAlert } from "@/hooks/alert";

export function PlayerRoleContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showError } = useAlert();

  const assignRoles = (players: string[]) => {
    if (players.length >= 2 && players.length <= 6) {
      const roles = Array(players.length).fill("市民");
      const randomIndex = generateRandomNumber(players.length - 1);
      if (roles.length > randomIndex) {
        roles[randomIndex] = "人狼";
        return roles;
      }
    }

    throw new Error("予期しないエラー");
  };

  const queryParams = new URLSearchParams(location.search);

  const playersQuery = queryParams.get("players");

  const players =
    playersQuery !== null
      ? playersQuery
          .split(",")
          .filter((player) => player !== "")
          .map((player) => decodeURIComponent(player))
      : [];

  const [roles, setRoles] = useState<string[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);

  useEffect(() => {
    if (players.length === 0) {
      showError({
        message: "プレイヤーが指定されていません。",
      });
      navigate(appURL.playerSetup);
    } else {
      setRoles(assignRoles(players));
    }
  }, [players]);

  const handleNextPlayer = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      // 全員の役職を見せ終わったら、次の画面へ遷移
      navigate(appURL.game);
    }
  };

  return (
    <PlayerRolePresenter
      player={players[currentPlayerIndex]}
      role={roles[currentPlayerIndex]}
      handleNextPlayer={handleNextPlayer}
    />
  );
}
