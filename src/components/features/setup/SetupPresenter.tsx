import { Button } from "@/components/ui/button/Button";

type Props = {
  players: string[];
  handleAddPlayer: () => void;
  handleRemovePlayer: (index: number) => void;
  handlePlayerChange: (index: number, name: string) => void;
  handleBackHome: () => void;
  handleStart: () => void;
  showingAddBtn: (index: number) => boolean;
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
      text: "ホームに戻る",
      onClick: handleBackHome,
      variant: "secondary",
    },
    {
      text: "スタート",
      onClick: handleStart,
      variant: enableToStart() ? "primary" : "black",
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
          プレイヤーを入力
        </h1>
        <div className="mt-12 gap-2 md:mt-24 lg:mt-32 md:gap-2 flex flex-col items-center">
          {players.map((player, index) => (
            <div
              key={player}
              className="flex flex-col items-center lg:gap-4 md:gap-2"
            >
              <div className="lg:flex gap-4 md:flex md:flex-col">
                <span className="md:text-l lg:text-xl">{`プレイヤー${index + 1}`}</span>
                <div className="flex gap-2 items-center">
                  <input
                    className="border p-2 h-8 md:h-12"
                    placeholder="プレイヤー名を入力"
                    value={player}
                    onChange={(e) => handlePlayerChange(index, e.target.value)}
                  />
                  {showingRemoveBtn() && (
                    <Button
                      className="w-16 h-8 md:w-24 md:h-12 md:text-l lg:text-xl"
                      onClick={() => handleRemovePlayer(index)}
                      variant="delete"
                    >
                      削除
                    </Button>
                  )}
                </div>
              </div>
              <div className="flex justify-end w-full">
                {showingAddBtn(index) && (
                  <Button
                    className="w-20 h-10 md:w-24 md:h-12 md:text-l lg:text-xl mt-4"
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
