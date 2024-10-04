
export enum Player {
    White = '⚪',
    Black = '⚫'
}

export interface GameState {
    boardWidth: number;
    boardData: string[];
    currentPlayer: Player;
    winner: Player | null;
    draw: boolean;
}

export const reversiGameTitle = () => {
    return 'リバーシ';
}

// セルが空かどうかの関数定義
export function isCellEmpty(gameState: GameState, index: number) {
    return gameState.boardData[index] == '';
}

// ボードデータを列ごとの配列に変換する関数の定義
export function convertReversiGameCols(boardWidth: number, boardData: string[]) {
    // 各行の列ごとの値を格納した配列にする
    // 列ごとの値を格納するための二次元配列 cols を初期化
    var cols: Array<Array<string>> = [];
    // 列のインデックスをループ
    for (var colIdx = 0; colIdx < boardWidth; colIdx++) {
        var col: Array<string> = [];
        // 行のインデックスをループ
        for (var rowIdx = 0; rowIdx < boardWidth; rowIdx++) {
            col.push(boardData[colIdx * boardWidth + rowIdx]);
        }
        cols.push(col);
    }
    return cols;
}
