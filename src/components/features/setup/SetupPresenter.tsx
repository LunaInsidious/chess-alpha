import { Button } from "@/components/ui/button/Button";

type Props = {
  players: string[];
  handleAddPlayer: () => void;
  handleRemovePlayer: (index: number) => void;
  handlePlayerChange: (index: number, name: string) => void;
  handleBackHome: () => void;
  handleStart: () => void;
  showingAddBtn: () => boolean;
  showingRemoveBtn: () => boolean;
  enableToStart: () => boolean;
};

export function SetupPresenter({
  players,
  handleAddPlayer,
  handleRemovePlayer,
  handlePlayerChange,
  handleBackHome,
  handleStart,
  showingAddBtn,
  showingRemoveBtn,
  enableToStart,
}: Props): JSX.Element {
  const pageButtons: {
    text: string;
    onClick: () => void | Promise<void>;
    variant: "primary" | "secondary" | "black";
    disabled?: boolean;
  }[] = [
    {
      text: "戻る",
      onClick: handleBackHome,
      variant: "secondary",
    },
    {
      text: "スタート",
      onClick: handleStart,
      variant: "primary",
      disabled: !enableToStart(),
    },
  ];

  return (
    <div className="flex relative justify-center">
      <img
        className="absolute -z-10 h-screen aspect-auto"
        src="/home.png"
        alt="chess"
      />
      <div className="mt-10">
        <h1 className="font-serif text-center text-h3 md:text-h1">
          プレイヤー名を入力
        </h1>
        <div className="mt-12 gap-2 md:mt-24 lg:mt-12 md:gap-2 flex flex-col items-center">
          <div className="mt:flex mt:flex-col gap-2 lg:grid lg:grid-cols-2">
            {players.map((player, index) => (
              <div
                key={player.id}
                className="flex flex-col items-center lg:gap-2 md:gap-2"
              >
                <div className="lg:flex gap-2 md:flex md:flex-col">
                  <span className="md:text-l lg:text-xl">{`プレイヤー${index + 1}`}</span>
                  <div className="flex gap-2 items-center">
                    <input
                      className="border p-2 h-8 md:h-10"
                      placeholder="プレイヤー名を入力"
                      value={player.name}
                      onChange={(e) => handlePlayerChange(index, e.target.value)}
                    />
                    <Button
                      className="w-20 h-8 md:w-20 md:h-12 md:text-l lg:text-xl bg-red-500 text-white"
                      onClick={() => handleRemovePlayer(index)}
                      disabled={!showingRemoveBtn()}
                      variant="delete"
                    >
                      削除
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center w-full">
            <Button
              className="w-48 h-10 md:w-48 md:h-12 md:text-l lg:text-l mt-4"
              onClick={handleAddPlayer}
              variant="primary"
              disabled={!showingAddBtn()}
            >
              + 追加
            </Button>
          </div>
          <div className="mt-4 gap-2 md:mt-4 lg:mt-4 md:gap-2 flex items-center">
            {pageButtons.map((button) => (
              <Button
                className="w-24 h-10 md:w-24 lg:w-24 md:h-12 md:text-l lg:text-l"
                key={button.text}
                onClick={button.onClick}
                variant={button.variant}
              >
                {button.text}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
