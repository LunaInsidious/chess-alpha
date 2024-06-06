import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SetupPresenter } from "@/components/features/setup/SetupPresenter";
import { appURL } from "@/config/url";
import { useAlert } from "@/hooks/alert";

export function SetupContainer() {
  const [searchParams] = useSearchParams();
  const color = searchParams.get("color");

  const [players, setPlayers] = useState<string[]>(["", "", ""]);

  const MIN_USER = 3;
  const MAX_USER = 6;

  const navigate = useNavigate();
  const { showError } = useAlert();

  const handleBackHome = () => {
    navigate(appURL.home);
  };

  const hasDuplicates = (array: string[]) => {
    const uniqueElements = new Set(array);
    return uniqueElements.size !== array.length;
  }

  const playersQuery = (): string => {
    const query = players.reduce((acc: string, player: string) => {
      return acc + `${player}, `
    }, '')
    return query;
  } 

  const handleStart = () => {
    if (hasDuplicates) {
      showError({
        message: "プレイター名が重複しています。",
      });
      return;
    }
    if (enableToStart) {
      showError({
        message: "プレイヤーの数を3人から6人にしてください。",
      });
      return;
    }
    navigate(`${appURL.playerRole}?color=${color}&players=${playersQuery}`);
  };

  const handleAddPlayer = () => {
    if (players.length < MAX_USER) {
      setPlayers([...players, ""]);
    }
  };

  const enableToStart = (): boolean => {
    return players.length < MIN_USER || players.length > MAX_USER;
  }

  const showingAddBtn = (index: number): boolean => {
    const isLastIndex = index === players.length - 1;
    return isLastIndex && players.length < MAX_USER;
  }

  const showingRemoveBtn = (): boolean => {
    if (players.length <= MIN_USER) return false;
    return true;
  }

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
      showingAddBtn={showingAddBtn}
      showingRemoveBtn={showingRemoveBtn}
      enableToStart={enableToStart}
    />
  );
}
