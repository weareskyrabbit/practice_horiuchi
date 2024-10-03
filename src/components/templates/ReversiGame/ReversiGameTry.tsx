// コンポーネントReversiGameの実装

// ページの<head>セクションを操作するために使用。タイトルやメタ情報を設定。
import Head from 'next/head';
// Reactのフックで副作用を管理。
import { useEffect } from 'react';
// ゲームボードを表示するコンポーネント。
import { GameBoardR } from "@/components/ormanisms/GameBoardR";
// ゲームの状態（スコアやターン）を表示するコンポーネント。
import { GameStatusR } from '@/components/ormanisms/GameStatusR';
// ゲームの状態管理に関するカスタムフック。ゲームの状態やアクションを管理。
import { useReversiGame } from '@/providers/ReversiGameProviderProvider';
// ゲームのタイトルを取得する関数。
import { reversiGameTitle } from './features';
import style from './style.module.css';


// 初回のみ実行されるように制御
var initEffect = false;

export const ReversiGame: React.FC = () => {
    const { gameState, initReversiGameState, onGameBoardClick } = useReversiGame();

    useEffect(() => {
        if (initEffect) {
            return;
        }
        initEffect = true;
        initReversiState();
        console.debug('useEffect!');
    }, []);

    return <>
        <Head>
            <title>{reversiGameTitle()}</title>
        </Head>
        <p className='desc'>ReversiGameTry.tsx</p>
        リバーシ(演習課題)
        <div className={style.field}>
            <GameBoardR gameState={gameState} onGameBoardClick={
                (index) => onGameBoardClick(index)
            } />
            <GameStatusR gameState={gameState} onGameResetClick={() => {
                initReversiGameState();
            }} />
        </div>
    </>
}
