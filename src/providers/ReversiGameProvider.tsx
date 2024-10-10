import React, { useReducer, createContext, ReactNode } from "react";
import { isCellEmpty, Player } from "@/components/templates/ReversiGame/features";

// ReversiGameStateインターフェースを定義
interface ReversiGameState {
    boardWidth: number;
    boardData: (Player | null)[][];
    currentPlayer: Player;
    winner: Player | null;
    draw: boolean;
    flippingCells: boolean[][]; // ひっくり返す駒の状態を管理する新しいプロパティ
}

// ReversiGameContextインターフェースを定義
interface ReversiGameContext {
    gameState: ReversiGameState;
    initReversiGameState: () => void;
    onGameBoardClick: (row: number, col: number) => void;
}

// ActionTypeを列挙型として定義
enum ActionType {
    updateGameState,
}

// アクションの型を定義
type Action = {
    type: ActionType.updateGameState;
    payload: {
        gameState: ReversiGameState;
    };
};

// ReversiGameContextの作成
const ReversiGameContext = createContext({} as ReversiGameContext);
export const useReversiGame = () => React.useContext(ReversiGameContext);

// ReversiGameProviderコンポーネントを定義
export const ReversiGameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // 初期状態の定義
    const firstGameState: ReversiGameState = {
        boardWidth: 8,
        boardData: Array.from({ length: 8 }, () => Array(8).fill(null)),
        currentPlayer: Player.Black,
        winner: null,
        draw: false,
        flippingCells: Array.from({ length: 8 }, () => Array(8).fill(false)), // アニメーションのための初期化
    };

    // 最初の4つの駒を配置
    firstGameState.boardData[3][3] = Player.White;
    firstGameState.boardData[4][4] = Player.White;
    firstGameState.boardData[3][4] = Player.Black;
    firstGameState.boardData[4][3] = Player.Black;

    // リデューサー関数
const reducer: (state: ReversiGameState, action: Action) => ReversiGameState = (_, action) => {
    switch (action.type) {
        case ActionType.updateGameState:
            return action.payload.gameState;
        default:
            return _; // デフォルトで状態をそのまま返す
    }
}


    // ゲームの状態を管理
    const [gameState, dispatch] = useReducer(reducer, firstGameState);

    // 初期状態の設定
    const initReversiGameState = () => {
        dispatch({
            type: ActionType.updateGameState,
            payload: { gameState: firstGameState },
        });
    };

    // ゲームボードのクリック処理
    const onGameBoardClick = (row: number, col: number) => {
        // セルが空でない場合は何もしない
        if (!isCellEmpty(gameState, row, col)) {
            return;
        }

        // 有効な8つの方向を定義
        const directions = [
            { x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 },
            { x: 0, y: -1 },                   { x: 0, y: 1 },
            { x: 1, y: -1 },  { x: 1, y: 0 },  { x: 1, y: 1 }
        ];

        let canPlace = false;
        const newBoardData = gameState.boardData.map(row => row.slice());
        const newFlippingCells = gameState.flippingCells.map(row => [...row]); // アニメーションのための新しい状態を作成

        // 各方向に対して、相手のコマを挟めるかどうか
        for (const { x, y } of directions) {
            let currentRow = row + x;
            let currentCol = col + y;
            let foundOpponent = false;

            while (currentRow >= 0 && currentRow < gameState.boardWidth && currentCol >= 0 && currentCol < gameState.boardWidth) {
                if (newBoardData[currentCol][currentRow] === null) {
                    break;
                }
                if (newBoardData[currentCol][currentRow] !== gameState.currentPlayer) {
                    foundOpponent = true;
                } else {
                    if (foundOpponent) {
                        canPlace = true;
                        break;
                    }
                    break;
                }
                currentRow += x;
                currentCol += y;
            }
        }

        // ボードを更新する
        if (canPlace) {
            newBoardData[col][row] = gameState.currentPlayer;

            // ひっくり返す処理
            for (const { x, y } of directions) {
                let currentRow = row + x;
                let currentCol = col + y;
                let positionsToFlip: { row: number, col: number }[] = [];
                let foundOpponent = false;

                while (currentRow >= 0 && currentRow < gameState.boardWidth && currentCol >= 0 && currentCol < gameState.boardWidth) {
                    if (newBoardData[currentCol][currentRow] === null) {
                        break;
                    }
                    if (newBoardData[currentCol][currentRow] !== gameState.currentPlayer) {
                        positionsToFlip.push({ row: currentRow, col: currentCol });
                        foundOpponent = true;
                    } else {
                        if (foundOpponent) {
                            for (const pos of positionsToFlip) {
                                newBoardData[pos.col][pos.row] = gameState.currentPlayer;
                                newFlippingCells[pos.col][pos.row] = true; // フリッピングの状態を設定
                            }
                        }
                        break;
                    }
                    currentRow += x;
                    currentCol += y;
                }
            }

            // 次のプレイヤーに切り替え
            const nextPlayer = gameState.currentPlayer === Player.Black ? Player.White : Player.Black;

            // 新しいゲーム状態を作成
            const newGameState: ReversiGameState = {
                ...gameState,
                boardData: newBoardData,
                currentPlayer: nextPlayer,
                flippingCells: newFlippingCells, // アニメーションの状態を更新
            };

            // 状態を更新
            dispatch({ type: ActionType.updateGameState, payload: { gameState: newGameState } });

            // アニメーションの後に元に戻す
            setTimeout(() => {
                const resetFlippingCells = newFlippingCells.map(row => row.map(() => false));
                dispatch({ type: ActionType.updateGameState, payload: { gameState: { ...newGameState, flippingCells: resetFlippingCells } } });
            }, 500); // アニメーションの時間
        }
    };

    return (
        <ReversiGameContext.Provider value={{
            gameState,
            initReversiGameState,
            onGameBoardClick
        }}>
            {children}
        </ReversiGameContext.Provider>
    );
};
export { Player };

