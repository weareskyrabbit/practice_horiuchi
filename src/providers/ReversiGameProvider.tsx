import React, { useReducer } from "react";
import { createContext, ReactNode } from "react";

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

// useReversiGameフックの定義
// ReversiGameContextから現在のコンテキストの値を取得
const ReversiGameContext = createContext({} as ReversiGameContext);
export const useReversiGame = () => React.useContext(ReversiGameContext);
