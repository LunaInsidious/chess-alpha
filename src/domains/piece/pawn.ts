import { Bishop } from "@/domains/piece/bishop";
import { movePiece, reverseColor } from "@/domains/piece/common";
import { Knight } from "@/domains/piece/knight";
import { Piece, BoardStatus, Position, Board } from "@/domains/piece/piece";
import { Queen } from "@/domains/piece/queen";
import { Rook } from "@/domains/piece/rook";

// playerの場合、y座標が増える方向に進む
// enemyの場合、y座標が減る方向に進む
const calcMove = (current: number, moveDistance: number, isPlayer: boolean) => (isPlayer ? current + moveDistance : current - moveDistance);

const isEnemyExist = (boardStatus: BoardStatus, position: Position, enemyColor: 'white' | 'black'): boolean => {
    if (position.x < 0 || position.x > 7 || position.y < 0 || position.y > 7) return false;
    const piece = boardStatus.board[position.y][position.x];
    return piece != null && piece.color === enemyColor;
}

const isPieceExist = (boardStatus: BoardStatus, position: Position): boolean => {
    if (position.x < 0 || position.x > 7 || position.y < 0 || position.y > 7) return false;
    return boardStatus.board[position.y][position.x] != null
}

export const isPromotion = (piece: Piece, position: Position, isPlayer: boolean): boolean => {
    if (piece.type !== 'P') return false;
    return isPlayer ? position.y === 7 : position.y === 0;
}

export const promotion = (board: Board, type: "Q" | "R" | "B" | "N", piece: Piece, position: Position, myColor: 'white' | 'black'): Board => {
    const newBoard = [...board.map((row) => [...row])]

    switch (type) {
        case "Q":
            newBoard[position.y][position.x] = new Queen(`${myColor[0]}Q${piece.id}`);
            break;
        case "R":
            newBoard[position.y][position.x] = new Rook(`${myColor[0]}R${piece.id}`);
            break;
        case "B":
            newBoard[position.y][position.x] = new Bishop(`${myColor[0]}B${piece.id}`);
            break;
        case "N":
            newBoard[position.y][position.x] = new Knight(`${myColor[0]}N${piece.id}`);
            break;
        default:
            break;
    }
    return newBoard;
}

const getPawnMovablePositions = (boardStatus: BoardStatus, piece: Pawn, from: Position, isPlayer: boolean): Position[] => {
    const movablePositions: Position[] = [];

    const enemyColor = reverseColor(piece.color);

    const oneVerticalMove = calcMove(from.y, 1, isPlayer);

    // 斜め前に敵がいる場合、その位置に進める
    if (isEnemyExist(boardStatus, { x: from.x + 1, y: oneVerticalMove }, enemyColor)) {
        movablePositions.push({
            x: from.x + 1,
            y: oneVerticalMove,
        });
    }
    if (isEnemyExist(boardStatus, { x: from.x - 1, y: oneVerticalMove }, enemyColor)) {
        movablePositions.push({
            x: from.x - 1,
            y: oneVerticalMove,
        });
    }

    // 一回も動いていない場合、前方2マスに駒がなければ2マス進めることができる
    if (piece.isNotMoved) {
        // 1マス進める分も確認しておく
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i <= 2; i++) {
            const nextVerticalMove = calcMove(from.y, i, isPlayer);
            if (!isPieceExist(boardStatus, { x: from.x, y: nextVerticalMove })) {
                movablePositions.push({
                    x: from.x,
                    y: nextVerticalMove,
                });
            } else {
                break;
            }
        }
        return movablePositions;
    }
    // 前に駒がいない場合、前に進める
    if (!isPieceExist(boardStatus, { x: from.x, y: oneVerticalMove })) {
        movablePositions.push({
            x: from.x,
            y: oneVerticalMove,
        });
    }
    return movablePositions;
}

export class Pawn extends Piece {
    turnMovedTwo?: number = undefined // アンパッサンの判定に用いる。2マス進んだターンを記録する

    isNotMoved: boolean = true;

    getMovablePositions = (boardStatus: BoardStatus, from: Position, isPlayer: boolean): Position[] => {
        const movablePositions = getPawnMovablePositions(boardStatus, this, from, isPlayer)
        // アンパッサンの判定。Pawnインスタンスを参照するためにクラス内で処理を記述している
        if (from.x < 7) {
            const rightMass = boardStatus.board[from.y][from.x + 1];
            if (rightMass instanceof Pawn && rightMass.turnMovedTwo === boardStatus.turn - 1) {
                // 一旦横に進むことで一旦相手のポーンを取り、横に進んだことをアンパッサンのフラグとしてmove関数内でさらに前に進む。
                movablePositions.push({
                    x: from.x + 1,
                    y: from.y,
                });
            }
        }
        if (from.x > 0) {
            const leftMass = boardStatus.board[from.y][from.x - 1];
            if (leftMass instanceof Pawn && leftMass.turnMovedTwo === boardStatus.turn - 1) {
                movablePositions.push({
                    x: from.x - 1,
                    y: from.y,
                });
            }
        }
        return movablePositions;
    }

    move = (boardStatus: BoardStatus, from: Position, to: Position, isPlayer: boolean): BoardStatus => {
        // 2マス進んだ場合、アンパッサンのフラグを立てる
        if (this.isNotMoved && from.x === to.x && Math.abs(from.y - to.y) === 2) {
            this.turnMovedTwo = boardStatus.turn;
        }

        const newBoard = movePiece(boardStatus, this, from, to);
        // 横に１マス進んでいれば、アンパッサンのフラグとして認識し、その後、縦に１マス進む
        if (Math.abs(from.x - to.x) === 1 && from.y === to.y) {
            // movePieceで移動した箇所をundefinedにして、新しい位置にPawnを代入
            newBoard.board[to.y][to.x] = undefined;
            const oneVerticalMove = calcMove(to.y, 1, isPlayer);
            newBoard.board[oneVerticalMove][to.x] = this;
        }
        this.isNotMoved = false;
        return newBoard;
    }

    constructor(id: string, isNotMoved?: boolean, turnMovedTwo?: number) {
        super(id)
        if (this.type !== 'P') throw new Error('ポーンのidが不正です。');
        if (isNotMoved != null) this.isNotMoved = isNotMoved
        if (turnMovedTwo != null) this.turnMovedTwo = turnMovedTwo
    }
}
