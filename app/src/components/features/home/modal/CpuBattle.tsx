import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button/Button";

type CpuBattleModalProps = {
  handleClickPlayerColor: (color: "black" | "white" | "random") => void;
  handleCloseModal: () => void;
};

export function ModalForCpuBattle({
  handleClickPlayerColor,
  handleCloseModal,
}: CpuBattleModalProps) {
  return (
    <Modal handleCloseModal={handleCloseModal} header="CPUと対戦">
      <div className="md:text-xl text-center break-keep">
        先攻、後攻を
        <wbr />
        選択してください
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-10 mt-10 justify-between items-center">
        <Button
          className="w-32 h-8 md:w-40 md:h-16 md:text-xl"
          onClick={() => handleClickPlayerColor("white")}
          variant="secondary"
        >
          先攻
        </Button>
        <Button
          className="w-32 h-8 md:w-40 md:h-16 md:text-xl"
          onClick={() => handleClickPlayerColor("black")}
          variant="black"
        >
          後攻
        </Button>
        <Button
          className="w-32 h-8 md:w-40 md:h-16 md:text-xl"
          onClick={() => handleClickPlayerColor("random")}
          variant="secondary"
        >
          ランダム
        </Button>
      </div>
    </Modal>
  );
}
