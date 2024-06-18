import { ReactNode, useState } from "react";

import { SixDotsScaleMiddle } from "@/components/ui/SixdotsScaleMiddle";
import { isNullOrUndefined } from "@/utils/typeGuard";

type Variant = "primary" | "secondary" | "black" | "delete";

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
};

export function Button({
  block = false,
  children,
  className = "",
  disabled = false,
  onClick,
  variant,
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
    black: {
      basic: "text-white bg-black",
      hover: "hover:bg-gray-900",
    },
    delete: {
      basic: "text-white bg-red-600",
      hover: "hover:bg-red-700",
    },
  };

  const [isLoading, setIsLoading] = useState(false);

  const onClickWrappedForLoading = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setIsLoading(true);
    if (!isNullOrUndefined(onClick)) {
      await onClick(e);
    }
    setIsLoading(false);
  };

  return (
    <button
      className={`
      flex items-center justify-center rounded shadow outline-none px-3 py-2
      ${block ? "block w-full" : ""}
      ${Variants[variant].basic}
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
