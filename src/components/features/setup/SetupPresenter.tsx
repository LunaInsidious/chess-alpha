import { Button } from "@/components/ui/button/Button";

type Props = {
  handleClickCPUBattle: () => void;
};

export function SetupPresenter({
  handleClickCPUBattle,
}: Props): JSX.Element {
  const playerButtons: {
    text: string;
    onClick: () => void | Promise<void>;
    variant: "primary" | "secondary";
  }[] = [
    {
      text: "追加",
      onClick: () => {},
      variant: "primary",
    },
    {
      text: "削除",
      onClick: () => {},
      variant: "primary",
    },
  ];
  const pageButtons: {
    text: string;
    onClick: () => void | Promise<void>;
    variant: "primary" | "secondary";
  }[] = [
    {
      text: "ホームに戻る",
      onClick: () => {},
      variant: "primary",
    },
    {
      text: "スタート",
      onClick: () => {},
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
        <div className="mt-12 gap-6 md:mt-24 lg:mt-32 md:gap-10 flex flex-col items-center">
          <input />
          <div className="flex gap-6">
            {playerButtons.map((button) => (
              <Button
                className="w-36 h-10 md:w-36 md:h-16 md:text-xl lg:text-2xl"
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
