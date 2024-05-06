import { ReactNode } from "react";

export type HeadingProps = {
  /**
   * 見出しとして表示するテキストを指定します。
   */
  children: ReactNode;
  /**
   * 見出しコンポーネントの一番外側に適用されるclassです。
   * 呼び出し側からのスタイリングやレイアウト調整に用います。
   */
  className?: string;
};

export function Heading1({
  children,
  className = "text-black",
}: HeadingProps): JSX.Element {
  return <h1 className={`${className} text-h1`}>{children}</h1>;
}
