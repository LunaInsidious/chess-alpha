import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SetupPresenter } from "@/components/features/setup/SetupPresenter";
import { appURL } from "@/config/url";
import { useAlert } from "@/hooks/alert";

export function SetupContainer() {
  const [players, setPlayers] = useState<string[]>(["", "", ""]);

  const navigate = useNavigate();
  const { showError } = useAlert();

  const handleClickPlayerColor = (color: "black" | "white" | "random") => {
    if (color === "random") {
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
    if (players.length < 3 || players.length > 6) {
      showError({
        message: "プレイヤーの数は3人から6人の間でなければなりません。"
      });
      return;
    }
    navigate(`${appURL.playerRole}`, { state: { players } });
  };

  const handleAddPlayer = () => {
    if (players.length < 6) {
      setPlayers([...players, ""]);
    }
  };

  const handleRemovePlayer = (index: number) => {
    if (players.length > 1) {
      const newPlayers = players.filter((_, i) => i !== index);
      setPlayers(newPlayers);
    }
  };

  const handlePlayerChange = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index] = name;
    setPlayers(newPlayers);
  };

  return (
    <SetupPresenter
      players={players}
      handleAddPlayer={handleAddPlayer}
      handleRemovePlayer={handleRemovePlayer}
      handlePlayerChange={handlePlayerChange}
      handleBackHome={handleBackHome}
      handleStart={handleStart}
    />
  );
}