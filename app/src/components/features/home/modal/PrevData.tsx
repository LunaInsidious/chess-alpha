import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button/Button";

type PrevDataModalProps = {
  handleCloseModal: () => void;
  handleContinuePrevData: (isContinue: boolean) => void;
};

export function ModalForPrevData({
  handleCloseModal,
  handleContinuePrevData,
}: PrevDataModalProps) {
  return (
    <Modal handleCloseModal={handleCloseModal} header="Info">
      <div className="text-xs md:text-xl text-center">
        前回の対戦データがあります。
        <br />
        続きから始めますか？
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-10 mt-10 justify-center items-center">
        <Button
          className="w-32 h-8 md:w-40 md:h-16 md:text-xl"
          onClick={() => handleContinuePrevData(true)}
          variant="secondary"
        >
          はい
        </Button>
        <Button
          className="w-32 h-8 md:w-40 md:h-16 md:text-xl"
          onClick={() => handleContinuePrevData(false)}
          variant="black"
        >
          いいえ
        </Button>
      </div>
    </Modal>
  );
}
