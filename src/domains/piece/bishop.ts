import { getMovablePositions, movePiece } from "@/domains/piece/common";
import { BoardStatus, Piece, Position } from "@/domains/piece/piece";

const getBishopMovablePositions = (
  boardStatus: BoardStatus,
  piece: Bishop,
  from: Position,
): Position[] => {
  const diagonalMovablePositions = getMovablePositions(
    boardStatus,
    from,
    "diagonal",
    piece.color,
  );
  return diagonalMovablePositions;
};

export class Bishop extends Piece {
  getMovablePositions = (boardStatus: BoardStatus, from: Position) =>
    getBishopMovablePositions(boardStatus, this, from);

  move = (
    boardStatus: BoardStatus,
    from: Position,
    to: Position,
  ): BoardStatus => movePiece(boardStatus, this, from, to);

  constructor(id: string) {
    super(id);
    if (this.type !== "B") throw new Error("ビショップのidが不正です。");
  }
}
