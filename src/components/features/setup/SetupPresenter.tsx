import { Button } from "@/components/ui/button/Button";

type Props = {
  players: string[];
  handleAddPlayer: () => void;
  handleRemovePlayer: (index: number) => void;
  handlePlayerChange: (index: number, name: string) => void;
  handleBackHome: () => void;
  handleStart: () => void;
};

export function SetupPresenter({
  players,
  handleAddPlayer,
  handleRemovePlayer,
  handlePlayerChange,
  handleBackHome,
  handleStart,
}: Props): JSX.Element {
  const pageButtons: {
    text: string;
    onClick: () => void | Promise<void>;
    variant: "primary" | "secondary";
  }[] = [
    {
      text: "ホームに戻る",
      onClick: handleBackHome,
      variant: "secondary",
    },
    {
      text: "スタート",
      onClick: handleStart,
      variant: "primary",
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
          プレイヤーを入力
        </h1>
        <div className="mt-12 gap-2 md:mt-24 lg:mt-32 md:gap-2 flex flex-col items-center">
          {players.map((player, index) => (
            <div key={player} className="flex flex-col items-center gap-4">
              <div className="flex gap-4 items-center">
                <span className="md:text-l lg:text-xl">{`プレイヤー${index + 1}`}</span>
                <input
                  className="border p-2"
                  placeholder="プレイヤー名を入力"
                  value={player}
                  onChange={(e) => handlePlayerChange(index, e.target.value)}
                />
                <Button
                  className="w-16 h-8 md:w-24 md:h-12 md:text-l lg:text-xl"
                  onClick={() => handleRemovePlayer(index)}
                  variant="delete"
                >
                  削除
                </Button>
              </div>
              <div className="flex justify-end w-full">
                {index === players.length - 1 && players.length < 6 && (
                  <Button
                    className="w-20 h-10 md:w-24 md:h-12 md:text-l lg:text-xl"
                    onClick={handleAddPlayer}
                    variant="primary"
                  >
                    + 追加
                  </Button>
                )}
              </div>
            </div>
          ))}
          <div className="mt-12 gap-6 md:mt-24 lg:mt-32 md:gap-10 flex flex-col items-center">
            {pageButtons.map((button) => (
              <Button
                className="w-48 h-10 md:w-96 md:h-16 md:text-2xl lg:text-3xl"
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
