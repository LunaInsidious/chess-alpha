import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/button/Button";
import { Mass } from "@/components/ui/chess/Mass";
import { PromotionModal } from "@/components/ui/chess/modal/Promotion";
import { ResultModal } from "@/components/ui/chess/modal/Result";
import { RetireModal } from "@/components/ui/chess/modal/Retire";
import { RuleBook } from "@/components/ui/chess/modal/RuleBook";
import { useChessBoard } from "@/components/ui/chess/useChessBoard";
import { isNullOrUndefined } from "@/utils/typeGuard";

type ChessBoardProps = {
  className?: string;
  playerColor?: "white" | "black";
};

export function ChessBoard({ playerColor, className = "" }: ChessBoardProps) {
  const {
    boardStatus,
    selectedPiecePosition,
    movablePositions,
    gameStatus,
    isLoading,
    isPlayerTurn,
    promotionInfo,
    isRuleBookOpen,
    isRetireModalOpen,
    handleClickMass,
    handleClickPromotion,
    handleCloseRuleBook,
    handleClickRule,
    handleClickRetireButton,
    handleCloseRetireModal,
    handleRetire,
    handleReturnHome,
  } = useChessBoard({
    playerColor,
  });

  const isResultModalOpen =
    (gameStatus.player !== "playing" && gameStatus.player !== "checked") ||
    (gameStatus.enemy !== "playing" && gameStatus.enemy !== "checked");

  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex flex-col-reverse">
          {["1", "2", "3", "4", "5", "6", "7", "8"].map((col) => (
            <div
              key={col}
              className="w-8 md:w-16 aspect-square flex justify-end items-end mr-1 text-xs md:text-base"
            >
              {col}
            </div>
          ))}
        </div>
        <div
          className={`flex flex-col-reverse mx-auto border border-black ${className}`}
        >
          {boardStatus.board.map((row, rowIndex) => (
            <div key={`${rowIndex.toString()}`} className="flex">
              {row.map((piece, colIndex) => (
                <Mass
                  key={`${rowIndex.toString()}-${colIndex.toString()}`}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  piece={piece}
                  movablePositions={movablePositions}
                  selectedPosition={selectedPiecePosition}
                  playerColor={playerColor}
                  isPlayerTurn={isPlayerTurn}
                  handleClickMass={handleClickMass}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex">
        {["", "a", "b", "c", "d", "e", "f", "g", "h"].map((col) => (
          <div
            key={col}
            className="w-8 md:w-16 aspect-square flex justify-start items-start pl-2 text-xs md:text-base"
          >
            {col}
          </div>
        ))}
      </div>
      <div className="flex justify-end mb-4">
        <div className="w-14 h-14 rounded-full bg-primary hover:bg-primary-dark flex justify-center items-center text-sm text-white">怪しい</div>
      </div>
      {/* playerが黒のときリロード時に「相手のターンです」がちらつくため */}
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50" />
      ) : (
        <Card>
          <div className="flex flex-col gap-y-4">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span>{boardStatus.turn + 1}手目</span>
                <span>ターン：{boardStatus.playing}</span>
              </div>
              <div
                className={`mr-4 md:text-xl ${isPlayerTurn ? "text-blue-400" : "text-red-400"}`}
              >
                {isPlayerTurn ? (
                  <div>
                    あなた ({playerColor === "white" ? "白" : "黒"})
                    のターンです
                  </div>
                ) : (
                  <div>
                    相手 ({playerColor === "white" ? "黒" : "白"}) のターンです
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-x-8">
              <Button
                onClick={handleClickRule}
                variant="secondary"
                className="w-28 text-xs md:text-base md:w-40"
              >
                ルールブック
              </Button>
              <Button
                onClick={handleClickRetireButton}
                variant="delete"
                className="w-28 text-xs md:text-base md:w-40"
              >
                リタイア
              </Button>
            </div>
          </div>
        </Card>
      )}
      {!isNullOrUndefined(promotionInfo) && (
        <PromotionModal
          handleClickPromotion={handleClickPromotion}
          playerColor={playerColor}
        />
      )}
      {isRetireModalOpen && (
        <RetireModal
          handleCloseRetireModal={handleCloseRetireModal}
          handleRetire={handleRetire}
        />
      )}
      {isResultModalOpen && (
        <ResultModal
          gameStatus={gameStatus}
          handleReturnHome={handleReturnHome}
        />
      )}
      {isRuleBookOpen && <RuleBook handleCloseRuleBook={handleCloseRuleBook} />}
    </div>
  );
}
