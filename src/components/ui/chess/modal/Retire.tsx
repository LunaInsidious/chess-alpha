import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button/Button";

type RetireModalProps = {
  handleRetire: () => Promise<void>;
  handleCloseRetireModal: () => void;
};

export function RetireModal({
  handleCloseRetireModal,
  handleRetire,
}: RetireModalProps) {
  return (
    <Modal header="リタイア" handleCloseModal={handleCloseRetireModal}>
      <div className="text-xs text-center md:text-lg font-bold mb-4">
        本当にリタイアしますか？
      </div>
      <div className="flex flex-col md:flex-row justify-end items-center gap-4">
        <Button
          className="w-32 h-8 md:h-12"
          onClick={handleCloseRetireModal}
          variant="secondary"
        >
          キャンセル
        </Button>
        <Button
          className="w-32 h-8 md:h-12"
          onClick={handleRetire}
          variant="delete"
        >
          リタイア
        </Button>
      </div>
    </Modal>
  );
}
