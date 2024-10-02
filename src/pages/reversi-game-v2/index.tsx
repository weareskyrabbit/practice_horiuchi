// @以下のパスからReversiGameというコンポーネントをインポート
// 他のファイルでReversiGameを使用できる
import { ReversiGame } from "@/components/templates/ReversiGame/ReversiGameVersion2";

// ReversiGameV2を定義
const ReversiGameV2 = () => {
    return <>
    {/* ReversiGameを表示 */}
    <ReversiGame />
    <br />
    <a href="../">ホームへ</a>
    </>
};