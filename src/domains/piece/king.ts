import { isChecked, movePiece } from "@/domains/piece/common";
import { BoardStatus, Piece, Position } from "@/domains/piece/piece";
import { Rook } from "@/domains/piece/rook";
import { isNullOrUndefined } from "@/utils/typeGuard";

const getKingMovablePositions = (
  boardStatus: BoardStatus,
  piece: King,
  from: Position,
  isPlayer: boolean,
): Position[] => {
  const directions = [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ];
  const movablePositions: Position[] = [];
  directions.forEach((direction) => {
    const newX = from.x + direction.x;
    const newY = from.y + direction.y;
    if (newX < 0 || newX >= 8 || newY < 0 || newY >= 8) return;
    const targetMass = boardStatus.board[newY][newX];
    // 進む先に駒がないか、敵の駒がある場合のみ進める
    if (isNullOrUndefined(targetMass) || targetMass.color !== piece.color) {
      movablePositions.push({ x: newX, y: newY });
    }
  });

  if (piece.isNotMoved) {
    // クイーンサイドキャスリング
    const rightRook = boardStatus.board[from.y][0];
    if (rightRook instanceof Rook && rightRook.isNotMoved) {
      // 途中のマスが相手にチェックされておらず、駒がない場合のみキャスリング可能
      const canCastling = [1, 2, 3].every((x) => {
        if (!isNullOrUndefined(boardStatus.board[from.y][x])) return false;
        return !isChecked(
          boardStatus.board,
          { x, y: from.y },
          piece.color,
          isPlayer,
        );
      });
      if (canCastling) {
        movablePositions.push({ x: 2, y: from.y });
      }
    }

    // キングサイドキャスリング
    const leftRook = boardStatus.board[from.y][7];
    if (leftRook instanceof Rook && leftRook.isNotMoved) {
      const canCastling = [5, 6].every((x) => {
        if (!isNullOrUndefined(boardStatus.board[from.y][x])) return false;
        return !isChecked(
          boardStatus.board,
          { x, y: from.y },
          piece.color,
          isPlayer,
        );
      });
      if (canCastling) {
        movablePositions.push({ x: 6, y: from.y });
      }
    }
  }
  return movablePositions;
};

export class King extends Piece {
  isNotMoved: boolean = true;

  getMovablePositions = (
    boardStatus: BoardStatus,
    from: Position,
    isPlayer: boolean,
  ) => getKingMovablePositions(boardStatus, this, from, isPlayer);

  move = (
    boardStatus: BoardStatus,
    from: Position,
    to: Position,
  ): BoardStatus => {
    if (this.isNotMoved) {
      this.isNotMoved = false;
    }
    // キャスリング
    if (Math.abs(from.x - to.x) === 2) {
      // クイーンサイドキャスリング
      if (to.x === 2) {
        const rook = boardStatus.board[from.y][0];
        if (rook instanceof Rook) {
          const newBoardStatus = rook.move(
            boardStatus,
            { x: 0, y: from.y },
            { x: 3, y: from.y },
          );
          // ターンはrookで更新された分を戻す
          return movePiece(
            { ...newBoardStatus, turn: newBoardStatus.turn - 1 },
            this,
            from,
            to,
          );
        }
      }
      // キングサイドキャスリング
      if (to.x === 6) {
        const rook = boardStatus.board[from.y][7];
        if (rook instanceof Rook) {
          const newBoardStatus = rook.move(
            boardStatus,
            { x: 7, y: from.y },
            { x: 5, y: from.y },
          );
          return movePiece(
            { ...newBoardStatus, turn: newBoardStatus.turn - 1 },
            this,
            from,
            to,
          );
        }
      }
    }
    return movePiece(boardStatus, this, from, to);
  };

  constructor(id: string, isNotMoved?: boolean) {
    super(id);
    if (this.type !== "K") throw new Error("キングのidが不正です。");
    if (!isNullOrUndefined(isNotMoved)) this.isNotMoved = isNotMoved;
  }
}
