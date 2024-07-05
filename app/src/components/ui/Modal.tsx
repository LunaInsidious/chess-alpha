import { ReactNode, useEffect, useRef } from "react";

import { Divider } from "@/components/ui/Divider";
import { IconWrapper } from "@/components/ui/IconWrapper";
import { Heading2 } from "@/components/ui/text/Heading2";
import { Heading4 } from "@/components/ui/text/Heading4";
import { isNullOrUndefined } from "@/utils/typeGuard";

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
  handleCloseModal?: () => void;
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
    if (e.key === "Escape" && !isNullOrUndefined(handleCloseModal)) {
      handleCloseModal();
    }
  };
  useEffect(() => {
    if (!isNullOrUndefined(modalRef.current)) {
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
      className={`${className} fixed top-0 left-0 z-50 flex h-screen px-10 w-full cursor-default items-center justify-center bg-black bg-opacity-40`}
    >
      <div
        ref={modalRef}
        role="button"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        onClick={(e) => e.stopPropagation()}
        className="max-w-2xl w-full cursor-default rounded-md bg-white px-10 py-6 shadow-md"
      >
        <div className="flex items-center justify-between">
          <Heading2 className="hidden md:block">{header}</Heading2>
          <Heading4 className="md:hidden">{header}</Heading4>
          {isNullOrUndefined(handleCloseModal) || (
            <button
              className="hover:bg-black hover:bg-opacity-10 p-0.5 rounded"
              aria-label="モーダルを閉じる"
              type="button"
              onClick={handleCloseModal}
            >
              <IconWrapper iconSize={6} iconName="IoClose" />
            </button>
          )}
        </div>
        <Divider className="mt-2" dir="horizontal" />
        <div className="my-5 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
