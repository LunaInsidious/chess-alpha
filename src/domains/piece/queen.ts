import { getMovablePositions, movePiece } from "@/domains/piece/common";
import { BoardStatus, Piece, Position } from "@/domains/piece/piece";

const getQueenMovablePositions = (
  boardStatus: BoardStatus,
  piece: Queen,
  from: Position,
): Position[] => {
  const verticalMovablePositions = getMovablePositions(
    boardStatus,
    from,
    "vertical",
    piece.color,
  );

  const horizontalMovablePositions = getMovablePositions(
    boardStatus,
    from,
    "horizontal",
    piece.color,
  );

  const diagonalMovablePositions = getMovablePositions(
    boardStatus,
    from,
    "diagonal",
    piece.color,
  );

  return [
    ...verticalMovablePositions,
    ...horizontalMovablePositions,
    ...diagonalMovablePositions,
  ];
};

export class Queen extends Piece {
  getMovablePositions = (boardStatus: BoardStatus, from: Position) =>
    getQueenMovablePositions(boardStatus, this, from);

  move = (
    boardStatus: BoardStatus,
    from: Position,
    to: Position,
  ): BoardStatus => movePiece(boardStatus, this, from, to);

  constructor(id: string) {
    super(id);
    if (this.type !== "Q") throw new Error("クイーンのidが不正です。");
  }
}
