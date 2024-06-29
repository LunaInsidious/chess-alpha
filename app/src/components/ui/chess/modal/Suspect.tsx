import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button/Button";

type SuspectModalProps = {
  handleSuspect?: () => Promise<void>;
  handleCloseSuspectModal: () => void;
};

export function SuspectModal({
  handleCloseSuspectModal,
  handleSuspect,
}: SuspectModalProps) {
  return (
    <Modal header="怪しい" handleCloseModal={handleCloseSuspectModal}>
      <div className="text-xs text-center md:text-lg font-bold mb-4">
        怪しいプレイヤーを選んでください。
      </div>
      <div className="flex flex-col md:flex-row justify-end items-center gap-4">
        <Button
          className="w-32 h-8 md:h-12"
          onClick={handleCloseSuspectModal}
          variant="secondary"
        >
          キャンセル
        </Button>
      </div>
    </Modal>
  );
}
