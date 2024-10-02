// Next.jsのHeadをインポートし、ページの<head>セクションにタイトルなどを追加するために使用する準備
import Head from 'next/head';
import { useEffect } from 'react';
import { GameBoard } from "@/components/ormanisms/GameBoard";
import { GameStatus } from '@/components/ormanisms/GameStatus';
import { useReversiGame } from '@/providers/ReversiGameProvider';
import { reversiGameTitle } from './features';
import style from './style.module.css';

