import { BoardStatus } from "@/domains/piece/piece";
import { User, newUser } from "@/domains/user/entity";

export type GameStatus =
  | "checked"
  | "checkmated"
  | "stalemate"
  | "underResource"
  | "threefold"
  | "fiftyRule"
  | "playing";

export type Game = {
  id: string;
  white: User;
  black: User;
  board: BoardStatus;
  winner?: "white" | "black" | "draw"; // 勝者が決まった場合、その色を代入。引き分けの場合は'draw'を代入。
};

export const newGame = (): Game => ({
  id: "",
  white: newUser(),
  black: newUser(),
  board: {
    board: Array(8).fill(Array(8).fill(undefined)),
    turn: 0,
    fiftyMoveRuleTurn: 0,
  },
  winner: undefined,
});
