import {
  Board,
  BoardStatus,
  Piece,
  PiecePosition,
  PieceType,
  Position,
} from "@/domains/piece/piece";

// whiteまたはblackを受け取り、逆の色を返す
export const reverseColor = (color: "white" | "black"): "white" | "black" =>
  color === "white" ? "black" : "white";

export const getMyPieces = (
  board: Board,
  myColor: "white" | "black",
): PiecePosition[] => {
  const myPieces: {
    piece: Piece;
    position: Position;
  }[] = [];

  board.forEach((row, y) => {
    row.forEach((mass, x) => {
      if (mass == null) return;
      if (mass.color === myColor) {
        myPieces.push({ piece: mass, position: { x, y } });
      }
    });
  });

  return myPieces;
};

export const getMyPiecePositionsByType = (
  boardStatus: BoardStatus,
  myColor: "white" | "black",
  type: PieceType,
): Position[] => {
  const myPiecePositions: Position[] = [];

  boardStatus.board.forEach((row, y) => {
    row.forEach((mass, x) => {
      if (mass == null) return;
      if (mass.color === myColor && mass.type === type) {
        myPiecePositions.push({ x, y });
      }
    });
  });

  return myPiecePositions;
};

// 自身がチェックされているかどうかを確認。
export const isChecked = (
  board: Board,
  kingPosition: Position,
  myColor: "white" | "black",
  isPlayer: boolean,
): boolean => {
  // 前一マスにキングがいるか、前方向に駒を挟まずクイーン、ルークがいるかを確認
  for (let y = kingPosition.y + 1; y < 8; y += 1) {
    const targetMass = board[y][kingPosition.x];
    if (targetMass != null) {
      if (targetMass.color === myColor) break;
      if (y === kingPosition.y + 1 && targetMass.type === "K") return true;
      if (targetMass.type === "Q" || targetMass.type === "R") return true;
      break;
    }
  }

  // 右上斜め１マスにポーン(プレイヤーの場合)、キングがいるか、右上斜めに駒を挟まずビショップ、クイーンがいるかを確認
  for (let i = 1; kingPosition.x + i < 8 && kingPosition.y + i < 8; i += 1) {
    const targetMass = board[kingPosition.y + i][kingPosition.x + i];
    if (targetMass != null) {
      if (targetMass.color === myColor) break;
      const firstMassCheck = isPlayer
        ? i === 1 && (targetMass.type === "P" || targetMass.type === "K")
        : i === 1 && targetMass.type === "K";
      if (firstMassCheck) return true;
      if (targetMass.type === "B" || targetMass.type === "Q") return true;
      break;
    }
  }

  // 左上斜め１マスにポーン(プレイヤーの場合)、キングがいるか、左上斜めに駒を挟まずビショップ、クイーンがいるかを確認
  for (let i = 1; kingPosition.x - i >= 0 && kingPosition.y + i < 8; i += 1) {
    const targetMass = board[kingPosition.y + i][kingPosition.x - i];
    if (targetMass != null) {
      if (targetMass.color === myColor) break;
      const firstMassCheck = isPlayer
        ? i === 1 && (targetMass.type === "P" || targetMass.type === "K")
        : i === 1 && targetMass.type === "K";
      if (firstMassCheck) return true;
      if (targetMass.type === "B" || targetMass.type === "Q") return true;
      break;
    }
  }

  // 右１マスにキングがいるか、右に駒を挟まずルーク、クイーンがいるかを確認
  for (let x = kingPosition.x + 1; x < 8; x += 1) {
    const targetMass = board[kingPosition.y][x];
    if (targetMass != null) {
      if (targetMass.color === myColor) break;
      if (x === kingPosition.x + 1 && targetMass.type === "K") return true;
      if (targetMass.type === "R" || targetMass.type === "Q") return true;
      break;
    }
  }

  // 左１マスにキングがいるか、左に駒を挟まずルーク、クイーンがいるかを確認
  for (let x = kingPosition.x - 1; x >= 0; x -= 1) {
    const targetMass = board[kingPosition.y][x];
    if (targetMass != null) {
      if (targetMass.color === myColor) break;
      if (x === kingPosition.x - 1 && targetMass.type === "K") return true;
      if (targetMass.type === "R" || targetMass.type === "Q") return true;
      break;
    }
  }

  // 右下斜め一マスにポーン(プレイヤーでない場合)、キングがいるか、右下斜めに駒を挟まずビショップ、クイーンがいるかを確認
  for (let i = 1; kingPosition.x + i < 8 && kingPosition.y - i >= 0; i += 1) {
    const targetMass = board[kingPosition.y - i][kingPosition.x + i];
    if (targetMass != null) {
      if (targetMass.color === myColor) break;
      const firstMassCheck = isPlayer
        ? i === 1 && targetMass.type === "K"
        : i === 1 && (targetMass.type === "K" || targetMass.type === "P");
      if (firstMassCheck) return true;
      if (targetMass.type === "B" || targetMass.type === "Q") return true;
      break;
    }
  }

  // 左下斜め一マスにポーン(プレイヤーでない場合)、キングがいるか、左下斜めに駒を挟まずビショップ、クイーンがいるかを確認
  for (let i = 1; kingPosition.x - i >= 0 && kingPosition.y - i >= 0; i += 1) {
    const targetMass = board[kingPosition.y - i][kingPosition.x - i];
    if (targetMass != null) {
      if (targetMass.color === myColor) break;
      const firstMassCheck = isPlayer
        ? i === 1 && targetMass.type === "K"
        : i === 1 && (targetMass.type === "K" || targetMass.type === "P");
      if (firstMassCheck) return true;
      if (targetMass.type === "B" || targetMass.type === "Q") return true;
      break;
    }
  }

  // 下一マスにキングがいるか、下に駒を挟まずクイーン、ルークがいるかを確認
  for (let y = kingPosition.y - 1; y >= 0; y -= 1) {
    const targetMass = board[y][kingPosition.x];
    if (targetMass != null) {
      if (targetMass.color === myColor) break;
      if (y === kingPosition.y + 1 && targetMass.type === "K") return true;
      if (targetMass.type === "Q" || targetMass.type === "R") return true;
      break;
    }
  }

  // ナイト用の確認
  const knightMoves = [
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 2, y: -1 },
    { x: 1, y: -2 },
    { x: -1, y: -2 },
    { x: -2, y: -1 },
    { x: -2, y: 1 },
    { x: -1, y: 2 },
  ];
  for (let i = 0; i < knightMoves.length; i += 1) {
    const move = knightMoves[i];
    if (
      kingPosition.x + move.x >= 0 &&
      kingPosition.x + move.x < 8 &&
      kingPosition.y + move.y >= 0 &&
      kingPosition.y + move.y < 8
    ) {
      const targetMass =
        board[kingPosition.y + move.y][kingPosition.x + move.x];
      if (
        targetMass != null &&
        targetMass.color !== myColor &&
        targetMass.type === "N"
      )
        return true;
    }
  }

  return false;
};

// 自殺手(自分のキングをチェックメイトにする手)を打てないようにする。
export const getSafeMovablePositions = (
  boardStatus: BoardStatus,
  piece: Piece,
  from: Position,
  isPlayer: boolean,
): Position[] => {
  const validMoves = piece.getMovablePositions(boardStatus, from, isPlayer);
  if (piece.type === "K") {
    const validMovesWithoutSuicide = validMoves.filter((move) => {
      const newBoardStatus = piece.move(boardStatus, from, move, isPlayer);
      const isCheck = !isChecked(
        newBoardStatus.board,
        move,
        piece.color,
        isPlayer,
      );
      return isCheck;
    });
    return validMovesWithoutSuicide;
  }
  const kingPosition = getMyPiecePositionsByType(boardStatus, piece.color, "K");
  if (kingPosition.length !== 1) {
    throw new Error("キングの数が不正です。");
  }
  const validMovesWithoutSuicide = validMoves.filter((move) => {
    const newBoardStatus = piece.move(boardStatus, from, move, isPlayer);
    return !isChecked(
      newBoardStatus.board,
      kingPosition[0],
      piece.color,
      isPlayer,
    );
  });
  if (validMovesWithoutSuicide.length <= 0) {
    return [];
  }
  return validMovesWithoutSuicide;
};

const checkIsStalemate = (
  boardStatus: BoardStatus,
  kingPosition: Position,
  myColor: "white" | "black",
  isPlayer: boolean,
): boolean => {
  const enemyColor = reverseColor(myColor);
  const myPieces = getMyPieces(boardStatus.board, myColor);
  // チェックされていなくて、自身の駒が動かせない場合はステイルメイト
  // 計算量的に、先に駒がすべて動かせないかどうかを確認した方が良さそう
  return (
    myPieces.every((myPiece) => {
      const movablePositions = getSafeMovablePositions(
        boardStatus,
        myPiece.piece,
        myPiece.position,
        isPlayer,
      );
      return movablePositions.length === 0;
    }) && !isChecked(boardStatus.board, kingPosition, enemyColor, isPlayer)
  );
};

// キング対キング、キング対キング＆ビショップ、キング対キング＆ナイト、キング＆ビショップ対キング＆ビショップ(同色マス)の場合は引き分け
const checkIsUnderResourced = (board: Board): boolean => {
  const whitePieces = getMyPieces(board, "white");
  const blackPieces = getMyPieces(board, "black");
  // キング対キング
  if (whitePieces.length === 1 && blackPieces.length === 1) return true;

  // キング対キング＆ビショップ
  const whiteBishops = whitePieces.filter(
    (whitePiece) => whitePiece.piece.type === "B",
  );
  const blackBishops = blackPieces.filter(
    (blackPiece) => blackPiece.piece.type === "B",
  );
  if (whiteBishops.length === 0 && blackBishops.length === 0) return false;

  if (
    (whitePieces.length === 2 && blackPieces.length === 1) ||
    (whitePieces.length === 1 && blackPieces.length === 2)
  )
    return true;

  // キング対キング＆ナイト
  const whiteKnights = whitePieces.filter(
    (whitePiece) => whitePiece.piece.type === "N",
  );
  const blackKnights = blackPieces.filter(
    (blackPiece) => blackPiece.piece.type === "N",
  );
  // 可読性を考慮して、if文を分割
  if (whiteKnights.length === 0 && blackKnights.length === 0) return false;

  if (
    (whitePieces.length === 2 && blackPieces.length === 1) ||
    (whitePieces.length === 1 && blackPieces.length === 2)
  )
    return true;

  // キング＆ビショップ対キング＆ビショップ
  if (whiteBishops.length === 0 || blackBishops.length === 0) return false;
  const whiteBishopMassColors = whiteBishops.map((whiteBishop) =>
    whiteBishop.position.x % 2 === whiteBishop.position.y % 2
      ? "black"
      : "white",
  );
  const blackBishopMassColors = blackBishops.map((blackBishop) =>
    blackBishop.position.x % 2 === blackBishop.position.y % 2
      ? "black"
      : "white",
  );

  const isBishopInSameColorMass = whiteBishopMassColors.every((color) =>
    blackBishopMassColors.includes(color),
  );

  if (
    whitePieces.length === whiteBishops.length + 1 &&
    blackPieces.length === blackBishops.length + 1 &&
    isBishopInSameColorMass
  )
    return true;
  return false;
};

const checkIsThreefoldRepetition = async (
  board: Board,
  countFunc: (board: Board) => Promise<number>,
): Promise<boolean> => {
  try {
    const count = await countFunc(board);
    return count >= 3;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const checkDraw = async (
  boardStatus: BoardStatus,
  kingPosition: Position,
  myColor: "white" | "black",
  isPlayer: boolean,
  countDuplicate: (board: Board) => Promise<number>,
): Promise<
  "stalemate" | "underResource" | "threefold" | "fiftyRule" | undefined
> => {
  if (checkIsStalemate(boardStatus, kingPosition, myColor, isPlayer))
    return "stalemate";
  if (checkIsUnderResourced(boardStatus.board)) return "underResource";
  if (await checkIsThreefoldRepetition(boardStatus.board, countDuplicate))
    return "threefold";
  if (boardStatus.fiftyMoveRuleTurn >= 50) return "fiftyRule";
  return undefined;
};

// 自身がチェックされている際、チェックメイトから逃れることができる手を返す。なければチェックメイト
export const findEscapeMoves = (
  boardStatus: BoardStatus,
  kingPosition: Position,
  myColor: "white" | "black",
  isPlayer: boolean,
): {
  piece: Piece;
  from: Position;
  to: Position;
}[] => {
  const myPieces = getMyPieces(boardStatus.board, myColor);
  const escapeMoves: {
    piece: Piece;
    from: Position;
    to: Position;
  }[] = [];
  // 自身の駒を動かしてチェックを回避できるかどうかを確認
  myPieces.forEach((myPiece) => {
    const movablePositions = myPiece.piece.getMovablePositions(
      boardStatus,
      myPiece.position,
      isPlayer,
    );
    movablePositions.forEach((movablePosition) => {
      const newBoard = [...boardStatus.board.map((row) => [...row])];
      newBoard[myPiece.position.y][myPiece.position.x] = undefined;
      newBoard[movablePosition.y][movablePosition.x] = myPiece.piece;
      if (myPiece.piece.type === "K") {
        const isCheck = isChecked(newBoard, movablePosition, myColor, isPlayer);
        if (!isCheck) {
          escapeMoves.push({
            piece: myPiece.piece,
            from: myPiece.position,
            to: movablePosition,
          });
        }
        return;
      }
      const isCheck = isChecked(newBoard, kingPosition, myColor, isPlayer);
      if (!isCheck) {
        escapeMoves.push({
          piece: myPiece.piece,
          from: myPiece.position,
          to: movablePosition,
        });
      }
    });
  });
  return escapeMoves;
};

// fromのマスをundefinedにし、toのマスにpieceを代入する。すべての駒の移動の共通処理
export const movePiece = (
  boardStatus: BoardStatus,
  piece: Piece,
  from: Position,
  to: Position,
): BoardStatus => {
  const targetMass = boardStatus.board[to.y][to.x];
  const isFiftyMoveRuleTurnUpdate =
    piece.type === "P" ||
    (targetMass != null && targetMass.color !== piece.color);
  const newBoard = [...boardStatus.board.map((row) => [...row])];
  newBoard[from.y][from.x] = undefined;
  newBoard[to.y][to.x] = piece;
  return {
    board: newBoard,
    turn: boardStatus.turn + 1,
    fiftyMoveRuleTurn: isFiftyMoveRuleTurnUpdate
      ? 0
      : boardStatus.fiftyMoveRuleTurn + 1,
  };
};

// fromからdirection(縦、横、斜め)の方向に駒が存在するかどうかを確認。あればそこまでのPositionの配列を返す。
export const getMovablePositions = (
  boardStatus: BoardStatus,
  from: Position,
  direction: "vertical" | "horizontal" | "diagonal",
  playerColor: "white" | "black",
): Position[] => {
  const movablePositions: Position[] = [];

  // 縦方向
  if (direction === "vertical") {
    // (プレイヤーから見て)上方向
    for (let y = from.y + 1; y < 8; y += 1) {
      // 何もない場合、その位置に進める
      const targetMass = boardStatus.board[y][from.x];
      if (targetMass == null) {
        movablePositions.push({ x: from.x, y });
      } else if (targetMass.color !== playerColor) {
        // 敵の駒がある場合、その位置に進めるが、それ以上進めない
        movablePositions.push({ x: from.x, y });
        break;
      } else {
        // 味方の駒がある場合、進めない
        break;
      }
    }
    // 下方向
    for (let y = from.y - 1; y >= 0; y -= 1) {
      // 何もない場合、その位置に進める
      const targetMass = boardStatus.board[y][from.x];
      if (targetMass == null) {
        movablePositions.push({ x: from.x, y });
      } else if (targetMass.color !== playerColor) {
        // 敵の駒がある場合、その位置に進めるが、それ以上進めない
        movablePositions.push({ x: from.x, y });
        break;
      } else {
        // 味方の駒がある場合、進めない
        break;
      }
    }
    return movablePositions;
  }

  // 横方向
  if (direction === "horizontal") {
    // (プレイヤーから見て)右方向
    for (let x = from.x + 1; x < 8; x += 1) {
      const targetMass = boardStatus.board[from.y][x];
      if (targetMass == null) {
        movablePositions.push({ x, y: from.y });
      } else if (targetMass.color !== playerColor) {
        movablePositions.push({ x, y: from.y });
        break;
      } else {
        break;
      }
    }
    // (プレイヤーから見て)左方向
    for (let x = from.x - 1; x >= 0; x -= 1) {
      const targetMass = boardStatus.board[from.y][x];
      if (targetMass == null) {
        movablePositions.push({ x, y: from.y });
      } else if (targetMass.color !== playerColor) {
        movablePositions.push({ x, y: from.y });
        break;
      } else {
        break;
      }
    }
    return movablePositions;
  }

  // 斜め方向
  if (direction === "diagonal") {
    // 右上方向
    for (let i = 1; from.x + i < 8 && from.y + i < 8; i += 1) {
      const targetMass = boardStatus.board[from.y + i][from.x + i];
      if (targetMass == null) {
        movablePositions.push({ x: from.x + i, y: from.y + i });
      } else if (targetMass.color !== playerColor) {
        movablePositions.push({ x: from.x + i, y: from.y + i });
        break;
      } else {
        break;
      }
    }
    // 左上方向
    for (let i = 1; from.x - i >= 0 && from.y + i < 8; i += 1) {
      const targetMass = boardStatus.board[from.y + i][from.x - i];
      if (targetMass == null) {
        movablePositions.push({ x: from.x - i, y: from.y + i });
      } else if (targetMass.color !== playerColor) {
        movablePositions.push({ x: from.x - i, y: from.y + i });
        break;
      } else {
        break;
      }
    }
    // 右下方向
    for (let i = 1; from.x + i < 8 && from.y - i >= 0; i += 1) {
      const targetMass = boardStatus.board[from.y - i][from.x + i];
      if (targetMass == null) {
        movablePositions.push({ x: from.x + i, y: from.y - i });
      } else if (targetMass.color !== playerColor) {
        movablePositions.push({ x: from.x + i, y: from.y - i });
        break;
      } else {
        break;
      }
    }
    // 左下方向
    for (let i = 1; from.x - i >= 0 && from.y - i >= 0; i += 1) {
      const targetMass = boardStatus.board[from.y - i][from.x - i];
      if (targetMass == null) {
        movablePositions.push({ x: from.x - i, y: from.y - i });
      } else if (targetMass.color !== playerColor) {
        movablePositions.push({ x: from.x - i, y: from.y - i });
        break;
      } else {
        break;
      }
    }
    return movablePositions;
  }
  return [];
};
