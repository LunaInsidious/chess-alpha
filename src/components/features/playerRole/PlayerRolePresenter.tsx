import { Button } from "@/components/ui/button/Button";

type Props = {
  currentPlayer: string;
  currentRole: string;
  showRole: boolean;
  handleShowRole: () => void;
  handleNextPlayer: () => void;
  handlePreviousPlayer: () => void;
  handleStartGame: () => void;
  isLastPlayer: boolean;
};

export function PlayerRolePresenter({
  currentPlayer,
  currentRole,
  showRole,
  handleShowRole,
  handleNextPlayer,
  handlePreviousPlayer,
  handleStartGame,
  isLastPlayer,
}: Props): JSX.Element {
  return (
    <div className="flex relative justify-center">
      <img
        className="absolute -z-10 h-screen aspect-auto"
        src="/home.png"
        alt="chess"
      />
      <div className="mt-10">
        <h1 className="font-serif text-center text-h3 md:text-h1">
          プレイヤーの役職
        </h1>
        <div className="mt-12 gap-2 md:mt-24 lg:mt-32 md:gap-2 flex flex-col items-center">
          <div className="flex flex-col items-center lg:gap-4 md:gap-2">
            <div className="lg:flex gap-4 md:flex md:flex-col">
              <span className="md:text-l lg:text-xl">{`${currentPlayer}さんの役職を確認します。`}</span>
              {showRole && (
                <span className="md:text-l lg:text-xl text-center">{`役職: ${currentRole}`}</span>
              )}
            </div>
            <div className="flex justify-end w-full mt-4">
              {!showRole && (
                <Button
                  className="flex items-center gap-3 w-full"
                  onClick={handleShowRole}
                  variant="secondary"
                >
                  役職を見る
                </Button>
              )}
            </div>
            <div className="flex justify-end w-full mt-4">
              <Button
                className="flex items-center gap-3 w-full"
                onClick={isLastPlayer ? handleStartGame : handleNextPlayer}
                variant="primary"
              >
                {isLastPlayer ? "ゲームを開始する" : "次の人の役職を見る"}
              </Button>
            </div>
            <div className="flex justify-end w-full mt-4">
              <Button
                className="flex items-center gap-3 w-full"
                onClick={handlePreviousPlayer}
                variant="secondary"
              >
                戻る
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
