import { ReactNode } from "react";

type CardProps = {
  /**
   * Cardコンポーネントの一番外側に適用されるclassです。
   * 呼び出し側からのスタイリングやレイアウト調整に用います。
   */
  className?: string;
  /**
   * Cardコンポーネントの中に表示される要素をReactNode型で指定します。
   */
  children: ReactNode;
};

export function HistoryCard({ className, children }: CardProps) {
  return (
    <div
      className={`px-4 py-2 bg-white rounded-lg shadow border border-gray-200  ${className}`}
    >
      {children}
    </div>
  );
}
