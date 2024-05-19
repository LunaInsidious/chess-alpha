import { GameDatabase, BoardStatusInDB, convertEntityToBoardInDB, convertBoardInDBToEntity } from '@/adapters/api/game/schema';
import { Board, BoardStatus } from "@/domains/piece/piece"
import { GameAPI } from "@/usecases/ports/game";

// indexedDBにゲームデータを保存する
const db = new GameDatabase();
db.version(1).stores({
    game: 'turn'
});

export const useGameDataAPI = (): GameAPI => ({
    setup: async (): Promise<void> => {
        await db.open();
    },
    create: async (gameData: BoardStatus, playerColor: "white" | "black"): Promise<void> => {
        const boardFormatted = convertEntityToBoardInDB(gameData.board)
        await db.game.put({ board: boardFormatted, turn: gameData.turn, fiftyMoveRuleTurn: gameData.fiftyMoveRuleTurn, playerColor });
    },
    countByBoard: async (board: Board): Promise<number> => {
        const boardFormatted = convertEntityToBoardInDB(board)
        return db.table('game').filter((boardStatus: BoardStatusInDB) => boardStatus.board === boardFormatted).count()
    },
    findLatest: async (): Promise<{ gameData: BoardStatus, playerColor: "white" | "black" } | undefined> => {
        const latestGame = await db.game.orderBy('turn').last()
        if (latestGame == null) return undefined
        const boardFormatted = convertBoardInDBToEntity(latestGame.board)
        return {
            gameData: {
                board: boardFormatted,
                turn: latestGame.turn,
                fiftyMoveRuleTurn: latestGame.fiftyMoveRuleTurn
            },
            playerColor: latestGame.playerColor
        }
    },
    delete: async (): Promise<void> => {
        await db.game.clear();
    }
})
