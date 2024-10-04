import React from 'react';
import { useReversiGame, Player } from '@/providers/ReversiGameProvider';

const GameStatus: React.FC = () => {
    const { gameState } = useReversiGame();
    const { currentPlayer, winner, draw } = gameState;

    return (
        <div className="game-status">
            <h2>ゲームの状態</h2>
            {winner ? (
                <h3>勝者: {winner === Player.Black ? '⚫' : '⚪'}</h3>
            ) : draw ? (
                <h3>引き分け</h3>
            ) : (
                <h3>現在のプレイヤー: {currentPlayer === Player.Black ? '⚫' : '⚪'}</h3>
            )}
        </div>
    );
};

export default GameStatus;
