import { getMovablePositions, movePiece } from "@/domains/piece/common";
import { BoardStatus, Piece, Position } from "@/domains/piece/piece";

const getRookMovablePositions = (boardStatus: BoardStatus, piece: Rook, from: Position): Position[] => {
    // 縦方向
    const verticalMovablePositions = getMovablePositions(boardStatus, from, "vertical", piece.color);

    // 横方向
    const horizontalMovablePositions = getMovablePositions(boardStatus, from, "horizontal", piece.color);

    return [...verticalMovablePositions, ...horizontalMovablePositions];
}

export class Rook extends Piece {
    isNotMoved: boolean = true;

    getMovablePositions = (boardStatus: BoardStatus, from: Position) => getRookMovablePositions(boardStatus, this, from);

    move = (boardStatus: BoardStatus, from: Position, to: Position): BoardStatus => {
        if (this.isNotMoved) {
            this.isNotMoved = false;
        }
        return movePiece(boardStatus, this, from, to);
    }

    constructor(id: string, isNotMoved?: boolean) {
        super(id);
        if (this.type !== 'R') throw new Error('ルークのidが不正です。');
        if (isNotMoved != null) this.isNotMoved = isNotMoved
    }
}
