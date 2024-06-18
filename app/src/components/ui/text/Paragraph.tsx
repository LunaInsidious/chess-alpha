import { ReactNode } from "react";

export type ParagraphProps = {
  /**
   * パラグラフとして表示するテキストを指定します。
   */
  children: ReactNode;
  /**
   * パラグラフコンポーネントの一番外側に適用されるclassです。
   * 呼び出し側からのスタイリングやレイアウト調整に用います。
   */
  className?: string;
};

export function Paragraph({
  children,
  className = "text-black",
}: ParagraphProps): JSX.Element {
  return <p className={`${className} text-p`}>{children}</p>;
}
