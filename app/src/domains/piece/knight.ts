import { movePiece } from "@/domains/piece/common";
import { BoardStatus, Piece, Position } from "@/domains/piece/piece";
import { isNullOrUndefined } from "@/utils/typeGuard";

const getKnightMovablePositions = (
  boardStatus: BoardStatus,
  piece: Knight,
  from: Position,
): Position[] => {
  const directions = [
    { x: 2, y: 1 },
    { x: 2, y: -1 },
    { x: -2, y: 1 },
    { x: -2, y: -1 },
    { x: 1, y: 2 },
    { x: 1, y: -2 },
    { x: -1, y: 2 },
    { x: -1, y: -2 },
  ];
  const movablePositions: Position[] = [];
  directions.forEach((direction) => {
    const newX = from.x + direction.x;
    const newY = from.y + direction.y;
    if (newX < 0 || newX > 7 || newY < 0 || newY > 7) return;
    const targetMass = boardStatus.board[newY][newX];
    // 進む先に駒がないか、敵の駒がある場合のみ進める
    if (isNullOrUndefined(targetMass) || targetMass.color !== piece.color) {
      movablePositions.push({ x: newX, y: newY });
    }
  });
  return movablePositions;
};

export class Knight extends Piece {
  getMovablePositions = (boardStatus: BoardStatus, from: Position) =>
    getKnightMovablePositions(boardStatus, this, from);

  move = (
    boardStatus: BoardStatus,
    from: Position,
    to: Position,
  ): BoardStatus => movePiece(boardStatus, this, from, to);

  constructor(id: string) {
    super(id);
    if (this.type !== "N") throw new Error("ナイトのidが不正です。");
  }
}
