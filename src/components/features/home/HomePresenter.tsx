import {
  ModalForCpuBattle,
  ModalForPrevData,
} from "@/components/features/home/ui/modal";
import { Button } from "@/components/ui/button/Button";
import { RuleBook } from "@/components/ui/chess/Modal";

type Props = {
  handleClickCPUBattle: () => void;
  handleClickOnlineBattle: () => void;
  handleClickRule: () => void;
  handleClickHistory: () => void;
  handleCloseRuleBook: () => void;
  handleCloseModal: () => void;
  handleClickPlayerColor: (color: "black" | "white" | "random") => void;
  handleContinuePrevData: (isContinue: boolean) => void;
  isRuleBookOpen: boolean;
  modalMode: "cpu" | "prevData" | "online" | undefined;
};

export function HomePresenter({
  handleClickCPUBattle,
  handleClickOnlineBattle,
  handleClickRule,
  handleClickHistory,
  handleCloseRuleBook,
  handleCloseModal,
  handleClickPlayerColor,
  handleContinuePrevData,
  isRuleBookOpen,
  modalMode,
}: Props): JSX.Element {
  const homeButtons: {
    text: string;
    onClick: () => void | Promise<void>;
    variant: "primary" | "secondary";
  }[] = [
    {
      text: "CPUと対戦",
      onClick: handleClickCPUBattle,
      variant: "primary",
    },
    {
      text: "オンライン対戦(準備中)",
      onClick: handleClickOnlineBattle,
      variant: "primary",
    },
    {
      text: "ルールを確認する",
      onClick: handleClickRule,
      variant: "secondary",
    },
    {
      text: "対戦履歴を見る(準備中)",
      onClick: handleClickHistory,
      variant: "secondary",
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
          Chess Game Alpha
        </h1>
        <div className="mt-12 gap-6 md:mt-24 lg:mt-32 md:gap-10 flex flex-col items-center">
          {homeButtons.map((button) => (
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
      {isRuleBookOpen && <RuleBook handleCloseRuleBook={handleCloseRuleBook} />}
      {modalMode === "cpu" && (
        <ModalForCpuBattle
          handleClickPlayerColor={handleClickPlayerColor}
          handleCloseModal={handleCloseModal}
        />
      )}
      {modalMode === "prevData" && (
        <ModalForPrevData
          handleContinuePrevData={handleContinuePrevData}
          handleCloseModal={handleClickCPUBattle}
        />
      )}
    </div>
  );
}
