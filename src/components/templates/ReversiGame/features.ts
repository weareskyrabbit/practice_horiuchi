
export enum Player {
    White = '○',
    Black = '●'
    // [WIP] あとで変更？？
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