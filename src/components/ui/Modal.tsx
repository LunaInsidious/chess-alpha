import { ReactNode, useEffect, useRef } from "react";

import { IconWrapper } from "@/components/ui/IconWrapper";

export type ModalProps = {
  /**
   * タブの一番外側に適用されるclassです。
   * 呼び出し側からのスタイリングやレイアウト調整に用います。
   */
  className?: string;
  /**
   * モーダルのヘッダーです。
   */
  header?: ReactNode;
  /**
   * モーダルの中身をReactNodeで指定します。
   */
  children: ReactNode;
  /**
   * モーダルを閉じるときの処理です。
   */
  handleCloseModal: () => void;
};

export function Modal({
  className = "",
  children,
  header,
  handleCloseModal,
}: ModalProps) {
  // モーダルを開く前のoverflowを保持する
  const prevStyleOverflow = useRef<string>(document.body.style.overflow);

  useEffect(() => {
    // モーダルを開くとスクロールできないようにする
    document.body.style.overflow = "hidden";
    return () => {
      // モーダルを閉じると元のoverflowに戻す
      document.body.style.overflow = prevStyleOverflow.current;
    };
  }, []);

  const modalRef = useRef<HTMLDivElement>(null);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // エスケープキー押下でモーダルを閉じる
    if (e.key === "Escape") {
      handleCloseModal();
    }
  };
  useEffect(() => {
    if (modalRef.current != null) {
      // モーダルを開いたときにフォーカスをモーダルに移す(エスケープキーで閉じるため)
      modalRef.current.focus();
    }
  }, []);

  return (
    <div
      role="button"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onClick={handleCloseModal} // 背景をクリックすると閉じる
      className={`${className} fixed top-0 left-0 z-50 flex h-screen w-full cursor-default items-center justify-center bg-black bg-opacity-40`}
    >
      <div
        ref={modalRef}
        role="button"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        onClick={(e) => e.stopPropagation()}
        className="max-w-lg cursor-default rounded-md bg-white p-10 shadow-md"
      >
        <div className="flex items-center justify-between">
          <h2>{header}</h2>
          <button
            className="hover:bg-black hover:bg-opacity-10 p-0.5 rounded"
            aria-label="モーダルを閉じる"
            type="button"
            onClick={handleCloseModal}
          >
            <IconWrapper iconSize={6} iconName="IoClose" />
          </button>
        </div>
        <div className="py-5">{children}</div>
      </div>
    </div>
  );
}
