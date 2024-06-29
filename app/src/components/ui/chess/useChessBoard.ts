import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useGameDataAPI } from "@/adapters/api/game/api";
import { setUpInitialBoard } from "@/components/ui/chess/initialBoard";
import { useCpu } from "@/components/ui/chess/useCpu";
import { appURL } from "@/config/url";
import { GameStatus } from "@/domains/game/entity";
import {
  reverseColor,
  getMyPiecePositionsByType,
  findEscapeMoves,
  isChecked,
  getSafeMovablePositions,
  checkDraw,
} from "@/domains/piece/common";
import { isPromotion, promotion } from "@/domains/piece/pawn";
import { Board, BoardStatus, Piece, Position } from "@/domains/piece/piece";
import { useAlert } from "@/hooks/alert";
import { isNullOrUndefined } from "@/utils/typeGuard";

type ChessBoardHookProps = {
  playerColor?: "white" | "black";
};

export const useChessBoard = ({ playerColor }: ChessBoardHookProps) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const playersQuery = queryParams.get("players") ?? "";

  const players = playersQuery.split(",");

  const { showError, showAlert } = useAlert();

  const navigate = useNavigate();

  const [selectedPiecePosition, setSelectedPiecePosition] = useState<
    Position | undefined
  >(undefined);

  const [movablePositions, setMovablePositions] = useState<Position[]>([]);

  // ポーンのプロモーションの場合、プロモーションの処理を行い、その後にCPUのターンに移るための情報
  const [promotionInfo, setPromotionInfo] = useState<
    | {
        mass: Position;
        callback: (board: Board) => Promise<void>;
      }
    | undefined
  >(undefined);

  const [suspectingPlayer, setSuspectingPlayer] = useState<
    string | undefined
  >();

  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(false);

  const [isRuleBookOpen, setIsRuleBookOpen] = useState<boolean>(false);

  const [isRetireModalOpen, setIsRetireModalOpen] = useState<boolean>(false);

  const [isSuspectModalOpen, setIsSuspectModalOpen] = useState<boolean>(false);

  const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(false);

  const [gameStatus, setGameStatus] = useState<{
    player: GameStatus;
    enemy: GameStatus;
  }>({
    player: "playing",
    enemy: "playing",
  });

  const [boardStatus, setBoardStatus] = useState<BoardStatus>({
    board: Array(8).fill(Array(8).fill(undefined)),
    turn: 0,
    fiftyMoveRuleTurn: 0,
    playing: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const gameDataAPI = useGameDataAPI();

  // 行動後の状態を確認し、チェックメイト、チェック、ステイルメイトなどの場合はgameStatusを更新する
  const moveCallback = async (
    board: BoardStatus,
    kingPosition: Position,
    myColor: "white" | "black",
    isPlayer: boolean,
  ): Promise<{
    isChecked: boolean;
    isGameEnd: boolean;
    escapeMoves: { piece: Piece; from: Position; to: Position }[];
  }> => {
    // ゲームデータを保存
    try {
      if (isNullOrUndefined(playerColor)) {
        throw new Error("プレイヤーの色が設定されていません。");
      }
      await gameDataAPI.create(board, playerColor);
    } catch (e) {
      console.error(e);
      showError({
        message: "ゲームデータの保存に失敗しました。",
      });
    }

    const identity = isPlayer ? "player" : "enemy";
    if (isChecked(board.board, kingPosition, myColor, isPlayer)) {
      const escapeMoves = findEscapeMoves(
        board,
        kingPosition,
        myColor,
        isPlayer,
      );
      if (escapeMoves.length <= 0) {
        setGameStatus((prev) => ({
          ...prev,
          [identity]: "checkmated",
        }));
        return {
          isChecked: true,
          isGameEnd: true,
          escapeMoves: [],
        };
      }
      // チェックの場合は続行
      setGameStatus((prev) => ({
        ...prev,
        [identity]: "checked",
      }));
      return {
        isChecked: true,
        isGameEnd: false,
        escapeMoves,
      };
    }
    const drawStatus = await checkDraw(
      board,
      kingPosition,
      myColor,
      isPlayer,
      gameDataAPI.countByBoard,
    );
    if (!isNullOrUndefined(drawStatus)) {
      setGameStatus({
        player: drawStatus,
        enemy: drawStatus,
      });
      return {
        isChecked: false,
        isGameEnd: true,
        escapeMoves: [],
      };
    }
    return {
      isChecked: false,
      isGameEnd: false,
      escapeMoves: [],
    };
  };

  const cpuHook = useCpu({
    setBoardStatus,
    players,
    playerColor,
    moveCallback,
  });

  const handleSelectPiece = (position: Position) => {
    const piece = boardStatus.board[position.y][position.x];

    // 駒のない場所や相手の駒を選択した場合は何もしない
    if (isNullOrUndefined(piece) || piece.color !== playerColor) return;

    // 駒をすでに選択していた場合
    if (!isNullOrUndefined(selectedPiecePosition)) {
      // 選択した駒と同じ駒を選択した場合は何もしない
      if (
        selectedPiecePosition.x === position.x &&
        selectedPiecePosition.y === position.y
      )
        return;
      // 自分の駒を選択した場合は、アラートを表示して何もしない
      showAlert({
        severity: "warning",
        message:
          "touch moveルールにより、選択した駒を選び直すことはできません。",
        timeout: 3000,
      });
      return;
    }

    // 選択した駒が動かせる位置を取得
    if (gameStatus.player === "checked") {
      const escapeMoves = findEscapeMoves(
        boardStatus,
        position,
        playerColor,
        true,
      );
      if (escapeMoves.length <= 0) {
        showAlert({
          severity: "warning",
          message: "チェックされています。王手を回避する手を選択してください。",
          timeout: 3000,
        });
      } else {
        setMovablePositions(escapeMoves.map((move) => move.to));
        setSelectedPiecePosition(position);
      }
    } else {
      const validMoves = getSafeMovablePositions(
        boardStatus,
        piece,
        position,
        true,
      );
      if (validMoves.length <= 0) {
        showAlert({
          severity: "warning",
          message: "その駒は動かせません。他の駒を選択してください。",
          timeout: 3000,
        });
        return;
      }
      setMovablePositions(validMoves);
      setSelectedPiecePosition(position);
    }
  };

  const handleMovePiece = async (to: Position) => {
    if (
      isNullOrUndefined(playerColor) ||
      isNullOrUndefined(selectedPiecePosition)
    )
      return;
    const piece =
      boardStatus.board[selectedPiecePosition.y][selectedPiecePosition.x];
    if (isNullOrUndefined(piece)) {
      throw new Error("選択した駒が存在しません。");
    }
    const newBoardStatus = piece.move(
      boardStatus,
      selectedPiecePosition,
      to,
      true,
    );
    setBoardStatus(newBoardStatus);
    setSelectedPiecePosition(undefined);
    setMovablePositions([]);

    // 敵がチェックなどの状態になっているか確認
    const enemyColor = reverseColor(playerColor);
    const enemyKingPositions = getMyPiecePositionsByType(
      newBoardStatus,
      enemyColor,
      "K",
    );
    if (enemyKingPositions.length <= 0) {
      throw new Error("敵のキングが存在しません。");
    }
    const enemyKingPosition = enemyKingPositions[0];

    const isPromotionMoved = isPromotion(piece, to, true);
    if (isPromotionMoved) {
      setPromotionInfo({
        mass: to,
        callback: async (boardOnCallback: Board) => {
          const {
            isChecked: isEnemyChecked,
            isGameEnd,
            escapeMoves: enemyEscapeMoves,
          } = await moveCallback(
            { ...newBoardStatus, board: boardOnCallback },
            enemyKingPosition,
            enemyColor,
            false,
          );
          setPromotionInfo(undefined);
          if (isGameEnd) return;

          setIsPlayerTurn(false);
          setTimeout(() => {
            cpuHook.cpuMove(
              { ...newBoardStatus, board: boardOnCallback },
              isEnemyChecked,
              enemyEscapeMoves,
            );
            setIsPlayerTurn(true);
          }, 1000);
        },
      });
      return;
    }

    const {
      isChecked: isEnemyChecked,
      isGameEnd,
      escapeMoves: enemyEscapeMoves,
    } = await moveCallback(
      newBoardStatus,
      enemyKingPosition,
      enemyColor,
      false,
    );
    if (isGameEnd) return;

    // cpuのターン。レスポンス早くてもびっくりするので、少し待たせる
    setIsPlayerTurn(false);
    setBoardStatus({ ...newBoardStatus, playing: "CPU" });
    setTimeout(() => {
      cpuHook.cpuMove(newBoardStatus, isEnemyChecked, enemyEscapeMoves);
      setIsPlayerTurn(true);
    }, 1000);
  };

  const handleClickMass = (position: Position) => {
    if (
      movablePositions.some(
        (pos) => pos.x === position.x && pos.y === position.y,
      )
    ) {
      handleMovePiece(position);
      return;
    }
    handleSelectPiece(position);
  };

  const handleClickPromotion = (type: "Q" | "R" | "B" | "N") => {
    if (isNullOrUndefined(promotionInfo)) return;
    const { mass, callback } = promotionInfo;
    const piece = boardStatus.board[mass.y][mass.x];
    if (isNullOrUndefined(piece)) {
      throw new Error("選択した駒が存在しません。");
    }
    if (isNullOrUndefined(playerColor)) {
      throw new Error("プレイヤーの色が設定されていません。");
    }
    const newBoard = promotion(
      boardStatus.board,
      type,
      piece,
      mass,
      playerColor,
    );
    setBoardStatus({ ...boardStatus, board: newBoard });
    callback(newBoard);
  };

  const handleClickSuspectingPlayer = (name: string) => {
    setSuspectingPlayer(name);
  };

  const handleClickRule = () => {
    setIsRuleBookOpen(true);
  };

  const handleCloseRuleBook = () => {
    setIsRuleBookOpen(false);
  };

  const handleClickRetireButton = () => {
    setIsRetireModalOpen(true);
  };

  const handleCloseRetireModal = () => {
    setIsRetireModalOpen(false);
  };

  const handleClickSuspectModal = () => {
    setIsSuspectModalOpen(true);
  };

  const handleCloseSuspectModal = () => {
    setIsSuspectModalOpen(false);
  };

  const handleOpenResultModal = () => {
    setIsResultModalOpen(true);
  };

  const handleReturnHome = () => {
    try {
      gameDataAPI.delete();
      navigate(appURL.home);
    } catch (e) {
      console.error(e);
      showError({
        message: "エラーが発生しました。もう一度お試しください。",
      });
    }
  };

  const handleRetire = async () => {
    if (isNullOrUndefined(playerColor)) return;
    try {
      await gameDataAPI.delete();
    } catch (e) {
      console.error(e);
      showError({
        message: "リタイアに失敗しました。もう一度お試しください。",
      });
    }
    // TODO: API実装時に結果を保存するAPIを呼び出す
    navigate(appURL.home);
  };

  useEffect(() => {
    if (isNullOrUndefined(playerColor)) return;

    setIsLoading(true);
    const playerPieceIdPrefix = playerColor === "white" ? "w" : "b";
    const playing = playerColor === "white" ? players[0] : "CPU";
    const initialBoard = setUpInitialBoard(playerPieceIdPrefix);

    (async () => {
      try {
        const latestBoardStatus = await gameDataAPI.findLatest();
        if (isNullOrUndefined(latestBoardStatus)) {
          // プレイヤーが黒の場合は、CPUが先手で動く
          setIsPlayerTurn(playerColor === "white");
          if (playerColor === "black") {
            setTimeout(() => {
              cpuHook.cpuMove(initialBoard, false, []);
              setIsPlayerTurn(true);
            }, 1000);
          }
          setBoardStatus({ ...initialBoard, playing });
        } else {
          setBoardStatus(latestBoardStatus.gameData);
          // プレイヤーが白で、ターンが偶数、プレイヤーが黒で、ターンが奇数の場合はプレイヤーのターン
          const isPlayerTurnInLatest =
            (playerColor === "white" &&
              latestBoardStatus.gameData.turn % 2 === 0) ||
            (playerColor === "black" &&
              latestBoardStatus.gameData.turn % 2 === 1);
          setIsPlayerTurn(isPlayerTurnInLatest);

          // プレイヤーのターンでない場合はCPUの処理を行う
          if (!isPlayerTurnInLatest) {
            const enemyColor = reverseColor(playerColor);
            const enemyKingPositions = getMyPiecePositionsByType(
              latestBoardStatus.gameData,
              enemyColor,
              "K",
            );
            if (enemyKingPositions.length <= 0) {
              throw new Error("敵のキングが存在しません。");
            }
            const enemyKingPosition = enemyKingPositions[0];
            const {
              isChecked: isEnemyChecked,
              isGameEnd,
              escapeMoves: enemyEscapeMoves,
            } = await moveCallback(
              latestBoardStatus.gameData,
              enemyKingPosition,
              enemyColor,
              false,
            );
            if (isGameEnd) return;

            setTimeout(() => {
              cpuHook.cpuMove(
                latestBoardStatus.gameData,
                isEnemyChecked,
                enemyEscapeMoves,
              );
              setIsPlayerTurn(true);
            }, 1000);
          }
        }
      } catch (e) {
        console.error(e);
        showError({
          message: "ゲームデータの取得に失敗しました。",
        });
      }
      setIsLoading(false);
    })();
  }, [playerColor]);

  return {
    players,
    boardStatus,
    selectedPiecePosition,
    movablePositions,
    gameStatus,
    isLoading,
    isPlayerTurn,
    isSuspectModalOpen,
    promotionInfo,
    isRuleBookOpen,
    isRetireModalOpen,
    suspectingPlayer,
    isResultModalOpen,
    handleOpenResultModal,
    handleClickSuspectingPlayer,
    handleClickMass,
    handleClickPromotion,
    handleCloseRuleBook,
    handleClickRule,
    handleClickRetireButton,
    handleCloseRetireModal,
    handleRetire,
    handleReturnHome,
    handleClickSuspectModal,
    handleCloseSuspectModal,
  };
};
