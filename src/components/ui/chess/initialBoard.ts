import { Bishop } from "@/domains/piece/bishop";
import { King } from "@/domains/piece/king";
import { Knight } from "@/domains/piece/knight";
import { Pawn } from "@/domains/piece/pawn";
import { BoardStatus } from "@/domains/piece/piece";
import { Queen } from "@/domains/piece/queen";
import { Rook } from "@/domains/piece/rook";

export const setUpInitialBoard = (
  playerPieceIdPrefix: "w" | "b",
): BoardStatus => {
  const enemyPieceIdPrefix = playerPieceIdPrefix === "w" ? "b" : "w";
  return {
    board: [
      [
        new Rook(`${playerPieceIdPrefix}R1`),
        new Knight(`${playerPieceIdPrefix}N1`),
        new Bishop(`${playerPieceIdPrefix}B1`),
        new Queen(`${playerPieceIdPrefix}Q`),
        new King(`${playerPieceIdPrefix}K`),
        new Bishop(`${playerPieceIdPrefix}B2`),
        new Knight(`${playerPieceIdPrefix}N2`),
        new Rook(`${playerPieceIdPrefix}R2`),
      ],
      [
        new Pawn(`${playerPieceIdPrefix}P1`),
        new Pawn(`${playerPieceIdPrefix}P2`),
        new Pawn(`${playerPieceIdPrefix}P3`),
        new Pawn(`${playerPieceIdPrefix}P4`),
        new Pawn(`${playerPieceIdPrefix}P5`),
        new Pawn(`${playerPieceIdPrefix}P6`),
        new Pawn(`${playerPieceIdPrefix}P7`),
        new Pawn(`${playerPieceIdPrefix}P8`),
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [
        new Pawn(`${enemyPieceIdPrefix}P1`),
        new Pawn(`${enemyPieceIdPrefix}P2`),
        new Pawn(`${enemyPieceIdPrefix}P3`),
        new Pawn(`${enemyPieceIdPrefix}P4`),
        new Pawn(`${enemyPieceIdPrefix}P5`),
        new Pawn(`${enemyPieceIdPrefix}P6`),
        new Pawn(`${enemyPieceIdPrefix}P7`),
        new Pawn(`${enemyPieceIdPrefix}P8`),
      ],
      [
        new Rook(`${enemyPieceIdPrefix}R1`),
        new Knight(`${enemyPieceIdPrefix}N1`),
        new Bishop(`${enemyPieceIdPrefix}B1`),
        new Queen(`${enemyPieceIdPrefix}Q`),
        new King(`${enemyPieceIdPrefix}K`),
        new Bishop(`${enemyPieceIdPrefix}B2`),
        new Knight(`${enemyPieceIdPrefix}N2`),
        new Rook(`${enemyPieceIdPrefix}R2`),
      ],
    ],
    turn: 0,
    fiftyMoveRuleTurn: 0,
  };
};
