import { ReactNode, useState } from "react";

import { SixDotsScaleMiddle } from "@/components/ui/SixdotsScaleMiddle";

type Variant = "primary" | "secondary" | "delete";

type Size = "sm" | "md";

export type ButtonProps = {
  /**
   * trueのときdisplayがblockになり、widthが100%になります。
   * 要素幅いっぱいにボタンを表示したいときに使います。
   */
  block?: boolean;
  /**
   * ボタンに表示するテキストを指定します。
   */
  children: ReactNode;
  /**
   * ボタンコンポーネントの一番外側に適用されるclassです。
   * 呼び出し側からのスタイリングやレイアウト調整に用います。
   */
  className?: string;
  /**
   * trueのときボタンが非活性になり、クリックができなくなります。
   */
  disabled?: boolean;
  /**
   * ボタンが押されたときに実行される関数を設定します。
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  /**
   * ボタンの色を設定します。
   * primaryはページやフォーム内での主要なアクションに用いられます。
   * secondaryは副次的なアクションに用いられます。
   * deleteは破壊的なアクションを示すために用いられます。
   */
  variant: Variant;
  /**
   * 2種類のボタンサイズから選択します。枠と文字サイズが変化します。
   */
  size?: Size;
};

export function Button({
  block = false,
  children,
  className = "",
  disabled = false,
  onClick,
  variant,
  size = "md",
}: ButtonProps): JSX.Element {
  const Variants: { [key in Variant]: { basic: string; hover: string } } = {
    primary: {
      basic: "text-white bg-primary",
      hover: "hover:bg-primary-dark",
    },
    secondary: {
      basic: "text-gray-600 bg-white border-gray-300 border",
      hover: "hover:bg-gray-100",
    },
    delete: {
      basic: "text-white bg-red-600",
      hover: "hover:bg-red-700",
    },
  };

  const Sizes: { [key in Size]: string } = {
    md: "text-sm px-3 py-2 h-9",
    sm: "text-xs px-2 py-0.5 h-5",
  };

  const [isLoading, setIsLoading] = useState(false);

  const onClickWrappedForLoading = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setIsLoading(true);
    if (onClick != null) {
      await onClick(e);
    }
    setIsLoading(false);
  };

  return (
    <button
      className={`
      flex items-center justify-center rounded shadow outline-none
      ${block ? "block w-full" : ""}
      ${Variants[variant].basic}
      ${Sizes[size]}
      ${className}
      ${
        disabled || isLoading
          ? "cursor-not-allowed opacity-60"
          : Variants[variant].hover
      }`}
      disabled={disabled || isLoading}
      onClick={onClickWrappedForLoading}
      type="button"
    >
      {isLoading ? <SixDotsScaleMiddle className="h-5" /> : children}
    </button>
  );
}
