import { LinkText } from "@/components/ui/LinkText";
import { Modal } from "@/components/ui/Modal";
import { Heading3 } from "@/components/ui/text/Heading3";
import { Heading4 } from "@/components/ui/text/Heading4";
import { Paragraph } from "@/components/ui/text/Paragraph";

type RuleBookProps = {
  handleCloseRuleBook: () => void;
};

export function RuleBook({ handleCloseRuleBook }: RuleBookProps) {
  return (
    <Modal header="ルールブック" handleCloseModal={handleCloseRuleBook}>
      <Heading3>ルール①：ゲームの仕様</Heading3>
      <Paragraph className="mt-2">
        ・自身の手番では、動かす駒を選択することができる。
        <br />
        ・駒を選択すると、その駒の移動可能なマスが表示され、マスをクリックすることにより選択した駒が移動する。
        <br />
        ・もし合法手がなければ、選択時にその旨のアラートが出る。
        <br />・
        <LinkText url="https://www.chessnoakatsuki.com/archives/1630">
          touch move
        </LinkText>
        に則って、一度選択した駒は動かさなければならない。
        <br />・
        <LinkText url="https://chess-primer.jp/how-to-read-score.html">
          棋譜の読み方
        </LinkText>
      </Paragraph>
      <Heading3 className="mt-4">ルール②：チェス駒の動き</Heading3>
      <Heading4 className="mt-2">キングの動き方</Heading4>
      <Paragraph>キングは、前後左右斜めの1マスに動ける。</Paragraph>
      <Heading4 className="mt-2">クイーンの動き方</Heading4>
      <Paragraph>クイーンは、前後左右斜めの8方向にどこまでも進める。</Paragraph>
      <Heading4 className="mt-2">ルークの動き方</Heading4>
      <Paragraph>ルークは、前後左右のマスにどこまでも進める。</Paragraph>
      <Heading4 className="mt-2">ナイトの動き方</Heading4>
      <Paragraph>
        ナイトは、L字型に動ける。縦に2マスから横に1マス、または横に2マスから縦に1マス。
      </Paragraph>
      <Heading4 className="mt-2">ビショップの動き方</Heading4>
      <Paragraph>ビショップは、斜めの4方向にどこまでも進める。</Paragraph>
      <Heading4 className="mt-2">ポーンの動き方</Heading4>
      <Paragraph>
        ポーンは、基本的に前方の1マスにしか進めない。ただし、初期位置からの1手目だけ2マス進める。
      </Paragraph>
      <Heading3 className="mt-4">
        ルール③：チェック・チェックメイト・ステイルメイト
      </Heading3>
      <Heading4 className="mt-2">チェック</Heading4>
      <Paragraph>
        回避しなければ、次の手番でキングが取られる状態を「チェック」と呼ぶ。
      </Paragraph>
      <Heading4 className="mt-2">チェックメイト</Heading4>
      <Paragraph>
        チェックを回避する手がない状態が「チェックメイト」であり、ゲームの終了を意味する。
        <br />
        チェックメイトした側が勝ち、チェックメイトされた側が負けとなる。
      </Paragraph>
      <Heading4 className="mt-2">ステイルメイト</Heading4>
      <Paragraph>
        チェックされていないキングが動ける場所がなく、かつ、可能な動きがひとつもない状態を「ステイルメイト」と呼ぶ。
        <br />
        この場合、引き分けとなる。
      </Paragraph>
      <Heading3 className="mt-4">ルール④：チェスの特殊ルール</Heading3>
      <Heading4 className="mt-2">キャスリング</Heading4>
      <Paragraph>
        キングとルークを同時に動かせる効率的な1手。キングサイドとクイーンサイドの2種類がある。
        <br />
        キングを左右どちらかに2マス動かし、その側のルークをキングの動いた方向と反対側の隣に動かすことができる。
        <br />
        キャスリングの条件：
        <br />
        ・キングとルークを初期位置から一度も動かしていないこと。
        <br />
        ・キングがチェックされていないこと。
        <br />
        ・キングとルークの間に、他の駒が存在していないこと。
        <br />
        ・キングがキャスリングする道筋の2マスが、敵の駒の攻撃範囲に含まれていないこと。
      </Paragraph>
      <Heading4 className="mt-2">プロモーション（昇格）</Heading4>
      <Paragraph>
        ポーンを敵陣地の最奥まで進めると、クイーン、ルーク、ナイト、ビショップのいずれかに昇格できる。
      </Paragraph>
      <Heading4 className="mt-2">アンパッサン</Heading4>
      <Paragraph>
        相手のポーンが初期位置から2マス進んできたときに、自分のポーンの横マスに移動した場合、相手のポーンを取って、斜め前に進むことができる。
      </Paragraph>
      <Paragraph className="mt-4">
        参考：
        <LinkText url="https://cufune.jp/chess-rules/">
          チェスの指し方 - ルールと 7 つのステップ
        </LinkText>
      </Paragraph>
      <Heading3 className="mt-4">ルール⑤：引き分け</Heading3>
      <Paragraph className="mt-2">
        <LinkText url="https://www.chessnoakatsuki.com/archives/872">
          チェスで引き分けになる条件！ステイルメイトと千日手
        </LinkText>
        に則る。
        <br />
        以下の４つの条件のうちいずれかが成立した場合、引き分けとなる。
        <Heading4 className="mt-2">ステイルメイト</Heading4>
        <Paragraph>先述したステイルメイト。</Paragraph>
        <Heading4 className="mt-2">スリーフォールド・リピティション</Heading4>
        <Paragraph>同じ駒の配置が3回現れた場合。</Paragraph>
        <Heading4 className="mt-2">戦力不足</Heading4>
        <Paragraph>
          以下の状況になった場合。
          <ul className="list-disc list-inside">
            <li>キング対キング。</li>
            <li>キング対キング＋ビショップ１個。</li>
            <li>キング対キング＋ナイト１個。</li>
            <li>
              キング＋ビショップ対キング＋ビショップ(ビショップは同色のマス)。
            </li>
          </ul>
        </Paragraph>
        <Heading4 className="mt-2">50手ルール</Heading4>
        <Paragraph>50手以内にポーンの移動や駒の取り合いがない場合。</Paragraph>
      </Paragraph>
    </Modal>
  );
}
