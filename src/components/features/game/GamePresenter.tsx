import { ChessBoard } from "@/components/ui/chess/ChessBoard";

export function GamePresenter({
  playerColor,
}: {
  playerColor?: "white" | "black";
}) {
  return (
    <div className="flex justify-center items-center">
      <ChessBoard className="mt-10 gap-0" playerColor={playerColor} />
    </div>
  );
}
