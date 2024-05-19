import Dexie, { Table } from "dexie";

import { Bishop } from "@/domains/piece/bishop";
import { King } from "@/domains/piece/king";
import { Knight } from "@/domains/piece/knight";
import { Pawn } from "@/domains/piece/pawn";
import { Board } from "@/domains/piece/piece";
import { Queen } from "@/domains/piece/queen";
import { Rook } from "@/domains/piece/rook";

export type BoardInDB = (
  | { id: string; isNotMoved?: boolean; turnMovedTwo?: number }
  | undefined
)[][];

export type BoardStatusInDB = {
  board: BoardInDB;
  playerColor: "white" | "black";
  turn: number;
  fiftyMoveRuleTurn: number;
};

export class GameDatabase extends Dexie {
  game!: Table<BoardStatusInDB>;

  constructor() {
    super("chess");
    this.version(1).stores({
      game: "turn",
    });
  }
}

export const convertEntityToBoardInDB = (board: Board): BoardInDB =>
  board.map((row) =>
    row.map((mass) => {
      if (mass == null) return undefined;
      if (mass instanceof Pawn) {
        return {
          id: mass.id,
          isNotMoved: mass.isNotMoved,
          turnMovedTwo: mass.turnMovedTwo,
        };
      }
      if (mass instanceof King || mass instanceof Rook) {
        return {
          id: mass.id,
          isNotMoved: mass.isNotMoved,
          turnMovedTwo: undefined,
        };
      }
      return { id: mass.id, isNotMoved: undefined, turnMovedTwo: undefined };
    }),
  );

export const convertBoardInDBToEntity = (board: BoardInDB): Board =>
  board.map((row) =>
    row.map((mass) => {
      if (mass == null) return undefined;
      const type = mass.id[1];
      switch (type) {
        case "P":
          return new Pawn(mass.id, mass.isNotMoved, mass.turnMovedTwo);
        case "K":
          return new King(mass.id, mass.isNotMoved);
        case "R":
          return new Rook(mass.id, mass.isNotMoved);
        case "B":
          return new Bishop(mass.id);
        case "N":
          return new Knight(mass.id);
        case "Q":
          return new Queen(mass.id);
        default:
          throw new Error("駒の種類が不正です。");
      }
    }),
  );
