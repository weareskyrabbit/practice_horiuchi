
export enum Player {
    White = '⚪',
    Black = '⚫'
}

export interface GameState {
    boardWidth: number;
    boardData: (Player | null)[][];
    currentPlayer: Player;
    winner: Player | null;
    draw: boolean;
    flippingCells: boolean[][]; // ひっくり返す駒の状態を管理
}

export const reversiGameTitle = () => {
    return 'リバーシ';
}

// セルが空かどうかの関数定義
export function isCellEmpty(gameState: GameState, row: number, col: number) {
    return gameState.boardData[row][col] === null;
}

// ボードデータを列ごとの配列に変換する関数の定義
export function convertReversiGameCols(boardWidth: number, boardData: string[]) {
    // 各行の列ごとの値を格納した配列にする
    // 列ごとの値を格納するための二次元配列 cols を初期化
    const cols: Array<Array<string | null>> = [];
    // 列のインデックスをループ
    for (var colIdx = 0; colIdx < boardWidth; colIdx++) {
        const col: Array<string | null> = [];
        // 行のインデックスをループ
        for (var rowIdx = 0; rowIdx < boardWidth; rowIdx++) {
            col.push(boardData[rowIdx][colIdx]);
        }
        cols.push(col);
    }
    return cols;
}
