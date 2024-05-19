import { Board, BoardStatus } from "@/domains/piece/piece";

export interface GameAPI {
  setup(): Promise<void>;
  create(gameData: BoardStatus, playerColor: "white" | "black"): Promise<void>;
  countByBoard(board: Board): Promise<number>;
  findLatest(): Promise<
    { gameData: BoardStatus; playerColor: "white" | "black" } | undefined
  >;
  delete(): Promise<void>;
}
