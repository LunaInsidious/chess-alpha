import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button/Button";

type SuspectModalProps = {
  players: string[];
  suspectingPlayer: string | undefined;
  handleSuspect: (name: string) => void;
  handleCloseSuspectModal: () => void;
};

export function SuspectModal({
  players,
  suspectingPlayer,
  handleCloseSuspectModal,
  handleSuspect,
}: SuspectModalProps) {
  return (
    <Modal header="怪しいプレイヤー選択" handleCloseModal={handleCloseSuspectModal}>
      <div className="w-full flex justify-center">
        <div className="flex gap-2 mb-4 flex-wrap">
          {players.map((player) => (
            <Button
              onClick={() => handleSuspect(player)}
              variant="secondary"
              key={player}
              disabled={player === suspectingPlayer}
              className="h-8 md:h-16 px-3 md:px-6 border border-primary border-solid rounded flex justify-center items-center"
            >
              {player}
            </Button>
          ))}
        </div>
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