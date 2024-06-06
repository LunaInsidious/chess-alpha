import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { PlayerRolePresenter } from "@/components/features/playerRole/PlayerRolePresenter";
import { appURL } from "@/config/url";
import { useAlert } from "@/hooks/alert";

const shuffleArray = (array: string[]): string[] => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const assignRoles = (players: string[]) => {
  const roles = Array(players.length).fill("市民");
  if (players.length > 0) {
    roles[0] = "人狼";
  }
  return shuffleArray(roles);
};

export function PlayerRoleContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showError } = useAlert();

  const queryParams = new URLSearchParams(location.search);
  // const color = queryParams.get("color");
  const playersQuery = queryParams.get("players");

  const players =
    playersQuery !== null
      ? playersQuery
          .split(",")
          .map((player) => player.trim())
          .filter((player) => player !== "")
      : [];

  const [roles, setRoles] = useState<string[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);

  useEffect(() => {
    if (players.length === 0) {
      showError({
        message: "プレイヤーが指定されていません。",
      });
      navigate(appURL.home);
    } else {
      setRoles(assignRoles(players));
    }
  }, [players, navigate, showError]);

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
