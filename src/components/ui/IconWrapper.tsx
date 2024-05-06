import { IconType } from "react-icons";
import { AiOutlineCheckCircle, AiOutlineWarning } from "react-icons/ai";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";

export type IconName =
  | "IoClose"
  | "MdOutlineCancel"
  | "AiOutlineCheckCircle"
  | "IoIosInformationCircleOutline"
  | "AiOutlineWarning";

type Props = {
  /**
   * IconWrapperコンポーネントの一番外側に適用されるclassです。
   * 呼び出し側からのスタイリングやレイアウト調整に用います。
   */
  className?: string;
  /**
   * アイコンの名前です。
   * React-iconsのIconNameを指定します。
   */
  iconName: IconName;
  /**
   * アイコンのサイズです。
   */
  iconSize?: number;
  /**
   * 選択された際に発火するイベントです。
   */
  onClick?: () => void;
};

const DEFAULT_SIZE = 4;

const ICON_MAP: Record<IconName, IconType> = {
  IoClose,
  MdOutlineCancel,
  AiOutlineCheckCircle,
  IoIosInformationCircleOutline,
  AiOutlineWarning,
};

export function IconWrapper({ className, iconName, iconSize, onClick }: Props) {
  const IconComponent = ICON_MAP[iconName];

  return (
    <div
      className={`justify-center rounded-full ${onClick != null && "cursor-pointer"} ${className}`}
    >
      <IconComponent
        className={`w-${iconSize ?? DEFAULT_SIZE} h-${iconSize ?? DEFAULT_SIZE}`}
        onClick={onClick}
      />
    </div>
  );
}
