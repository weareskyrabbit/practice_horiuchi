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
    boardData: string[];
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
    onGameBoardClick: (index: number) => void
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
        boardData: Array(64).fill(''),
        currentPlayer: Player.Black,
        winner : null,
        draw: false
    };

    // ゲームの状態を初期値に設定
    const initReversiGameState = (() => {
        // dispatchを使用してアクションを送信し、ゲーム状態をfirstGameStateに更新
        dispatch({type: ActionType.updateGameState, payload: {
            gameState: firstGameState
        }});
    });

    // ゲームのクリック処理
    const onGameBoardClick = (index: number) => {}

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