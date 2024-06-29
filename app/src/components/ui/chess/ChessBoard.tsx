import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/button/Button";
import { Mass } from "@/components/ui/chess/Mass";
import { PromotionModal } from "@/components/ui/chess/modal/Promotion";
import { ResultModal } from "@/components/ui/chess/modal/Result";
import { RetireModal } from "@/components/ui/chess/modal/Retire";
import { RuleBook } from "@/components/ui/chess/modal/RuleBook";
import { SuspectModal } from "@/components/ui/chess/modal/Suspect";
import { useChessBoard } from "@/components/ui/chess/useChessBoard";
import { isNullOrUndefined } from "@/utils/typeGuard";

type ChessBoardProps = {
  className?: string;
  playerColor?: "white" | "black";
};

export function ChessBoard({ playerColor, className = "" }: ChessBoardProps) {
  const {
    players,
    boardStatus,
    selectedPiecePosition,
    movablePositions,
    gameStatus,
    isLoading,
    isPlayerTurn,
    isSuspectModalOpen,
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
    handleClickSuspectModal,
    handleCloseSuspectModal,
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
        <Button
          onClick={handleClickSuspectModal}
          variant="primary"
          className="w-20 h-20 rounded-full text-sm text-white"
        >
          怪しい
        </Button>
      </div>
      {/* playerが黒のときリロード時に「相手のターンです」がちらつくため */}
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50" />
      ) : (
        <Card>
          <div className="flex flex-col gap-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span>{boardStatus.turn + 1}手目</span>
              </div>
              <div
                className={`mr-4 md:text-xl ${isPlayerTurn ? "text-blue-400" : "text-red-400"}`}
              >
                <div>
                  {boardStatus.playing}
                  のターンです
                </div>
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
      {isSuspectModalOpen && (
        <SuspectModal
          handleCloseSuspectModal={handleCloseSuspectModal}
          players={players}
        />
      )}
    </div>
  );
}
