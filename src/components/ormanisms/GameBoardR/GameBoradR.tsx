import { GameState, convertReversiGameCols } from '@/components/templates/ReversiGame/features';
import style from './style.module.css';

type SquareProps = {
    // 表示する内容受け取り
    children: string,
    // クリック時に呼び出し
    onSquareClick: Function
}

// クリック時にonsquareClickが実行
const Square: React.FC<SquareProps> = ({children, onSquareClick}) => {
    return (
        <td className={style.square} onClick={() => {onSquareClick();}}>
            {children}
        </td>
    )
}

// GameBoardコンポーネントが受け取るプロパティの型を定義
export type GameBoardProps = {
    gameState: GameState,
    onGameBoardClick: (index: number) => void;
}
// convertMarkGameCols を使って、ボードデータを列ごとの配列 cols に変換
export const GameBoardR: React.FC<GameBoardProps> = ({gameState, onGameBoardClick}) => {
    const boardWidth = gameState.boardWidth;
    var boardData = gameState.boardData;
    var cols = convertReversiGameCols(boardWidth, boardData);

    return <div>
        <p className='desc'>GameBoardR.tsx</p>
        <table>
        {
        // 各行を出力する
        cols.map((col, colIdx) =>
            <tbody key={'board-tbody-' + colIdx}>
            <tr key={'board-tr-' + colIdx}>
            {
            // 各行ごとの値を出力する
            col.map((cell, rowIdx) =>
                <Square key={'board-tr-' + colIdx * boardWidth + rowIdx} onSquareClick={
                    () => {onGameBoardClick(colIdx * boardWidth + rowIdx);}}>{cell}</Square>
            )}
            </tr>
            </tbody>
        )}
        </table>
    </div>;
}
