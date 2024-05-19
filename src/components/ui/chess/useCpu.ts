import { Dispatch, SetStateAction } from "react";

import { Bishop } from "@/domains/piece/bishop";
import { getMyPieces, getSafeMovablePositions } from "@/domains/piece/common";
import { Knight } from "@/domains/piece/knight";
import { isPromotion } from "@/domains/piece/pawn";
import {
  BoardStatus,
  Piece,
  PiecePosition,
  Position,
} from "@/domains/piece/piece";
import { Queen } from "@/domains/piece/queen";
import { Rook } from "@/domains/piece/rook";

type CpuHookProps = {
  setBoardStatus: Dispatch<SetStateAction<BoardStatus>>;
  playerColor: "white" | "black" | undefined;
  moveCallback: (
    board: BoardStatus,
    kingPosition: Position,
    myColor: "white" | "black",
    isPlayer: boolean,
  ) => Promise<{
    isChecked: boolean;
    escapeMoves: {
      piece: Piece;
      from: Position;
      to: Position;
    }[];
  }>;
};

export const useCpu = ({
  setBoardStatus,
  playerColor,
  moveCallback,
}: CpuHookProps) => {
  const getRandomMovablePosition = (
    boardStatus: BoardStatus,
    piecePositions: PiecePosition[],
  ): { piece: Piece; from: Position; to: Position } | undefined => {
    // piecesの順番をシャッフル
    const shuffledPieces = piecePositions.sort(() => Math.random() - 0.5);

    // シャッフルした順番で駒を選択
    // eslint-disable-next-line no-restricted-syntax
    for (const piece of shuffledPieces) {
      const validMoves = getSafeMovablePositions(
        boardStatus,
        piece.piece,
        piece.position,
        false,
      );
      if (validMoves.length > 0) {
        return {
          piece: piece.piece,
          from: piece.position,
          to: validMoves[Math.floor(Math.random() * validMoves.length)],
        };
      }
    }
    return undefined;
  };

  const cpuMove = async (
    boardStatus: BoardStatus,
    isCpuChecked: boolean,
    cpuEscapeMoves: { piece: Piece; from: Position; to: Position }[],
  ) => {
    if (isCpuChecked && cpuEscapeMoves.length > 0) {
      // チェックの場合は、王手を回避する手を選ぶ
      const escapeMove =
        cpuEscapeMoves[Math.floor(Math.random() * cpuEscapeMoves.length)];
      const newBoardStatusInCpuTurn = escapeMove.piece.move(
        boardStatus,
        escapeMove.from,
        escapeMove.to,
        false,
      );
      setBoardStatus(newBoardStatusInCpuTurn);
      return;
    }
    // 適当に駒を選び、適当に動かす
    const cpuColor = playerColor === "white" ? "black" : "white";
    const cpuPieces = getMyPieces(boardStatus.board, cpuColor);
    const randomPosition = getRandomMovablePosition(boardStatus, cpuPieces);
    if (randomPosition == null) {
      throw new Error("動かせる駒が存在しません。");
    }
    const newBoardStatusInCpuTurn = randomPosition.piece.move(
      boardStatus,
      randomPosition.from,
      randomPosition.to,
      false,
    );
    setBoardStatus(newBoardStatusInCpuTurn);

    const kingPosition = getMyPieces(
      newBoardStatusInCpuTurn.board,
      cpuColor,
    ).find((piece) => piece.piece.type === "K");
    if (kingPosition == null) {
      throw new Error("CPUのキングが存在しません。");
    }

    // プロモーション確認
    const isPromotionMoved = isPromotion(
      randomPosition.piece,
      randomPosition.to,
      false,
    );
    if (isPromotionMoved) {
      const promotionCandidates = ["Q", "R", "B", "N"];
      const promotionPieceType =
        promotionCandidates[
          Math.floor(Math.random() * promotionCandidates.length)
        ];
      const newBoardStatusInPromotion = [
        ...newBoardStatusInCpuTurn.board.map((row) => [...row]),
      ];
      switch (promotionPieceType) {
        case "Q":
          newBoardStatusInPromotion[randomPosition.to.y][randomPosition.to.x] =
            new Queen(`${cpuColor[0]}Q${randomPosition.piece.id}`);
          break;
        case "R":
          newBoardStatusInPromotion[randomPosition.to.y][randomPosition.to.x] =
            new Rook(`${cpuColor[0]}R${randomPosition.piece.id}`);
          break;
        case "B":
          newBoardStatusInPromotion[randomPosition.to.y][randomPosition.to.x] =
            new Bishop(`${cpuColor[0]}B${randomPosition.piece.id}`);
          break;
        case "N":
          newBoardStatusInPromotion[randomPosition.to.y][randomPosition.to.x] =
            new Knight(`${cpuColor[0]}N${randomPosition.piece.id}`);
          break;
        default:
          throw new Error("プロモーションの駒が不正です。");
      }
      setBoardStatus({
        ...newBoardStatusInCpuTurn,
        board: newBoardStatusInPromotion,
      });
      await moveCallback(
        { ...newBoardStatusInCpuTurn, board: newBoardStatusInPromotion },
        kingPosition.position,
        cpuColor,
        false,
      );
      return;
    }

    await moveCallback(
      newBoardStatusInCpuTurn,
      kingPosition.position,
      cpuColor,
      false,
    );
  };

  return { cpuMove };
};
