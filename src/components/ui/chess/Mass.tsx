import { Piece, Position } from "@/domains/piece/piece";

type MassProps = {
  colIndex: number;
  rowIndex: number;
  piece?: Piece;
  movablePositions: Position[];
  selectedPosition?: Position;
  playerColor?: "white" | "black";
  isPlayerTurn: boolean;
  handleClickMass: (position: Position) => void;
};

export function Mass({
  colIndex,
  rowIndex,
  piece,
  movablePositions,
  selectedPosition,
  playerColor,
  isPlayerTurn,
  handleClickMass,
}: MassProps) {
  const isSelectedMass =
    selectedPosition != null &&
    selectedPosition.x === colIndex &&
    selectedPosition.y === rowIndex;
  const isMovableMass = movablePositions.some(
    (pos) => pos.x === colIndex && pos.y === rowIndex,
  );
  const isClickable =
    (selectedPosition != null && isMovableMass) ||
    (selectedPosition == null && piece?.color === playerColor);
  return (
    <button
      type="button"
      onClick={() => handleClickMass({ x: colIndex, y: rowIndex })}
      disabled={!isPlayerTurn}
      className={`w-8 md:w-16 aspect-square ${
        (rowIndex + colIndex) % 2 === 0 ? "bg-gray-500" : ""
      } ${
        isSelectedMass
          ? "border-2 lg:border-4 border-dashed border-blue-400"
          : ""
      }
      ${isMovableMass ? "border-2 lg:border-4 border-dashed border-red-400" : ""}
      ${isClickable ? "cursor-pointer" : "cursor-default"}`}
    >
      {piece != null && (
        <img src={piece.imageUrl} alt={piece.id} className="object-fill" />
      )}
    </button>
  );
}
