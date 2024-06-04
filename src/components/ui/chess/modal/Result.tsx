import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button/Button";
import { GameStatus } from "@/domains/game/entity";

type ResultModalProps = {
  gameStatus: {
    player: GameStatus;
    enemy: GameStatus;
  };
  handleReturnHome: () => void;
};

// 引き分けならば、「ステイルメイト」、「50手ルール」、「スリーフォールド・リピティション」、「戦力不足」のいずれかを表示する
// 自分の勝ちならば、「Win！」、相手の勝ちならば「Lose…」を表示する
export function ResultModal({
  gameStatus,
  handleReturnHome,
}: ResultModalProps) {
  const isDraw =
    gameStatus.player === "fiftyRule" ||
    gameStatus.player === "threefold" ||
    gameStatus.player === "underResource" ||
    gameStatus.player === "stalemate";
  const getResultMessage = () => {
    if (isDraw) {
      switch (gameStatus.player) {
        case "stalemate":
          return (
            <p>
              ステイルメイト
              <br />
              引き分け
            </p>
          );
        case "fiftyRule":
          return (
            <p>
              50手ルール
              <br />
              引き分け
            </p>
          );
        case "threefold":
          return (
            <p>
              スリーフォールド・リピティション
              <br />
              引き分け
            </p>
          );
        case "underResource":
          return (
            <p>
              戦力不足
              <br />
              引き分け
            </p>
          );
        default:
          return "引き分け";
      }
    } else if (gameStatus.enemy === "checkmated") {
      return "Win!";
    } else if (gameStatus.player === "checkmated") {
      return "Lose...";
    } else {
      throw new Error("Unexpected result");
    }
  };

  return (
    <Modal header="ゲーム結果">
      <div className="text-lg font-bold">{getResultMessage()}</div>
      <div className="flex mt-4 justify-center items-end">
        <Button onClick={handleReturnHome} variant="primary">
          ホームに戻る
        </Button>
      </div>
    </Modal>
  );
}
