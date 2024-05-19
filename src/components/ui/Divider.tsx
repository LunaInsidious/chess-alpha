type Props = {
  /**
   * Dividerコンポーネントの一番外側に適用されるclassです。
   * 呼び出し側からのスタイリングやレイアウト調整に用います。
   */
  className?: string;
  /**
   * Dividerの方向です。
   */
  dir: "horizontal" | "vertical";
};

export function Divider({ className = "", dir }: Props) {
  return (
    <div
      className={`${className} border-gray-200
      ${dir === "horizontal" ? `border-t` : `border-l`}`}
    />
  );
}
