import React, { useReducer } from "react";
import { createContext, ReactNode } from "react";
import { isCellEmpty } from "@/components/templates/ReversiGame/features";
// [WIP] あとで書き換え
// import { getWinner, isCellEmpty } from "@/components/templates/ReversiGame/features";

export enum Player {
    White = '⚪',
    Black = '⚫'
}

//ReversiGameState(インターフェース)を定義
interface ReversiGameState {
    // ボードの幅（列数）を表す数値
    boardWidth: number;
    // ボードの状態を表す文字列の配列,ボードの各セルの状態を保持
    // ex) ['', '', '', 'W', 'B', '', '', '']
    // boardData: string[];
    // 二次元配列
    boardData: (Player | null)[][];
    // どちらのプレイヤーが次のターンを行うか
    currentPlayer: Player;
    // ゲームが終了したときに勝者がいる場合はそのプレイヤーの情報が入る、それ以外の場合はnullになる
    winner: Player | null;
    // ゲームが引き分けかどうかを示すブール値。引き分けの場合はtrue、そうでない場合はfalse
    draw: boolean;
}

// ReversiGameContext(インターフェース)定義
interface ReversiGameContext {
    // gameStateプロパティはReversiGameState型の値を持つ
    // ゲームの現在の状態を表す
    gameState: ReversiGameState,
    // 初期状態は引数を取らず、何も返さない
    initReversiGameState: () => void,
    // onGameBoardClickは、数値の引数indexを取る関数の型
    // ゲームボードの特定のセルがクリックされたときの処理
    // onGameBoardClick: (index: number) => void
    onGameBoardClick: (row: number, col: number) => void
}

// ActionType(列挙型)を定義
enum ActionType {
    updateGameState,
}

type Action =
{
    // アクションの種類を指定
    type: ActionType.updateGameState,
    payload: {
        gameState: ReversiGameState
    }
};

// useReversiGameフックの定義
// ReversiGameContextから現在のコンテキストの値を取得
const ReversiGameContext = createContext({} as ReversiGameContext);
export const useReversiGame = () => React.useContext(ReversiGameContext);

// ReversiGameProviderというReactコンポーネントを定義
// ゲームの状態と関数を子コンポーネントに提供
export const ReversiGameProvider: React.FC<{children: ReactNode}> = ({
    children
}) => {

    // 初期状態の定義
    var firstGameState: ReversiGameState = {
        boardWidth: 8,
        boardData: Array.from({ length: 8 }, () => Array(8).fill(null)),
        currentPlayer: Player.Black,
        winner : null,
        draw: false
    };

    // 最初の4つの駒を配置
    firstGameState.boardData[3][3] = Player.White;
    firstGameState.boardData[4][4] = Player.White;
    firstGameState.boardData[3][4] = Player.Black;
    firstGameState.boardData[4][3] = Player.Black;

    // ゲームの状態を初期値に設定
    const initReversiGameState = (() => {
        // dispatchを使用してアクションを送信し、ゲーム状態をfirstGameStateに更新
        dispatch({type: ActionType.updateGameState, payload: {
            gameState: firstGameState
        }});
    });

    // ゲームのクリック処理
    const onGameBoardClick = (row: number, col: number) => {
        console.debug (' row= ' + row + ' col= ' + col);
        // セルが空でない場合は何もしない
        if (gameState.boardData[col][row] !== null) {
            return;
        }

        // 有効な8つの方向を定義
        const directions = [
            { x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 },
            { x: 0, y: -1 },                     { x: 0, y: 1 },
            { x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }
        ];

        // クリックした位置にコマを置けるかどうか
        let canPlace = false;
        const newBoardData = gameState.boardData.map(row => row.slice());

        // 各方向に対して、相手のコマを挟めるかどうか
        for (const { x, y } of directions) {
            let currentRow = row + x;
            let currentCol = col + y;
            let foundOpponent = false;

            while (currentRow >= 0 && currentRow < gameState.boardWidth && currentCol >= 0 && currentCol < gameState.boardWidth) {
                // セルが空であれば抜ける
                if (newBoardData[currentCol][currentRow] === null) {
                    break;
                }
                // 相手のコマが見つかった場合
                if (newBoardData[currentCol][currentRow] !== gameState.currentPlayer) {
                    foundOpponent = true;
                }
                // 相手のコマが見つかった場合
                else {
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

            // ひっくり返す
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
                currentPlayer: nextPlayer
            };

            // 状態を更新
            dispatch({ type: ActionType.updateGameState, payload: { gameState: newGameState } });
        } else {
            // もし挟める場所がなかった場合、次のプレイヤーに切り替え
            const nextPlayer = gameState.currentPlayer === Player.Black ? Player.White : Player.Black;

            // 新しいゲーム状態を作成
            const newGameState: ReversiGameState = {
                ...gameState,
                currentPlayer: nextPlayer // プレイヤーをスキップ
            };

            // 状態を更新
            dispatch({ type: ActionType.updateGameState, payload: { gameState: newGameState } });
        }
    };


    // リデューサー関数
    const reducer = (_: ReversiGameState, action: Action): ReversiGameState => {
        switch (action.type) {
            case ActionType.updateGameState:
                return action.payload.gameState;
        }
    }

    // ゲームの状態を管理
    const [gameState, dispatch] = useReducer(reducer, firstGameState);

    return (
        <ReversiGameContext.Provider value={{
            gameState, initReversiGameState, onGameBoardClick
        }}>
            {children}
        </ReversiGameContext.Provider>
    );

}