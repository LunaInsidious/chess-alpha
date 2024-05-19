// TODO: テストを書く

export type Position = {
    x: number;
    y: number;
}

export type PiecePosition = {
    piece: Piece;
    position: Position;
}

export type Mass = Piece | undefined;

export type Board = Mass[][];

export type BoardStatus = {
    board: Board;
    turn: number
    fiftyMoveRuleTurn: number;
}

export type PieceType = 'P' | 'R' | 'N' | 'B' | 'Q' | 'K';

const isPieceType = (type: string): type is PieceType => ['P', 'R', 'N', 'B', 'Q', 'K'].includes(type);

export abstract class Piece {
    readonly id: string; // (色)(駒の種類)(駒が複数ある場合はid)という形式でidを設定。例：wp8, bk, wq,wqwp1(ポーンのプロモーション)

    type: PieceType;

    readonly color: 'white' | 'black';

    abstract getMovablePositions: (boardStatus: BoardStatus, from: Position, isPlayer: boolean) => Position[] // 駒の移動可能なindexを返す関数

    abstract move: (boardStatus: BoardStatus, from: Position, to: Position, isPlayer: boolean) => BoardStatus; // 移動後の盤面を返す関数

    readonly imageUrl: string;

    constructor(id: string) {
        if (id.length < 2 || id.length > 5) throw new Error('駒のidが不正です。')
        const type = id[1]
        if (!isPieceType(type)) throw new Error('駒の種類が不正です。');
        this.id = id;
        this.type = type;
        this.color = id[0] === 'w' ? 'white' : 'black'; // idの先頭文字で色を判定。'w'ならwhite, 'b'ならblack
        this.imageUrl = `/piece/${this.color}_${this.type}.png`;
    }
}
