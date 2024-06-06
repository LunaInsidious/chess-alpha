import { Button } from "@/components/ui/button/Button";

type Props = {
  player: string;
  role: string;
  handleNextPlayer: () => void;
};

export function PlayerRolePresenter({
  player,
  role,
  handleNextPlayer,
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
              <span className="md:text-l lg:text-xl">{`プレイヤー: ${player}`}</span>
              <span className="md:text-l lg:text-xl">{`役職: ${role}`}</span>
            </div>
            <div className="flex justify-end w-full mt-4">
              <Button
                className="w-20 h-10 md:w-24 md:h-12 md:text-l lg:text-xl"
                onClick={handleNextPlayer}
                variant="primary"
              >
                次へ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
