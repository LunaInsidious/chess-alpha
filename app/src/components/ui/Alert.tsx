import {
  AlertButtonProps,
  Severity,
} from "@/components/providers/AlertProvider";
import { IconWrapper } from "@/components/ui/IconWrapper";
import { Button } from "@/components/ui/button/Button";
import { Paragraph } from "@/components/ui/text/Paragraph";
import { isNullOrUndefined } from "@/utils/typeGuard";

type PropType = {
  isAlertOpen: boolean;
  message: string;
  button?: AlertButtonProps;
  severity: Severity;
  handleClickClose: () => void;
  className?: string;
};

export function Alert({
  isAlertOpen,
  message,
  button,
  severity,
  handleClickClose,
  className,
}: PropType) {
  const boxColors = {
    error: "border-red-400 bg-red-50 text-red-700",
    success: "border-green-400 bg-green-50 text-green-700",
    information: "border-gray-400 bg-gray-50",
    informationBlue: "border-blue-400 bg-blue-50 text-blue-700",
    warning: "border-yellow-400 bg-yellow-50 text-yellow-700",
  };

  const textColors = {
    error: "text-red-700",
    success: "text-green-700",
    information: "text-gray-700",
    informationBlue: "text-blue-600",
    warning: "text-orange-500",
  };
  const buttonBorderColors = {
    error: "border-red-600 text-red-700",
    success: "border-green-500 text-green-700",
    information: "border-gray-400 text-gray-700",
    informationBlue: "border-blue-500 text-blue-600",
    warning: "border-orange-400 text-orange-500",
  };

  const icons = {
    error: <IconWrapper iconName="MdOutlineCancel" iconSize={24} />,
    success: <IconWrapper iconName="AiOutlineCheckCircle" iconSize={24} />,
    information: (
      <IconWrapper iconName="IoIosInformationCircleOutline" iconSize={24} />
    ),
    informationBlue: (
      <IconWrapper iconName="IoIosInformationCircleOutline" iconSize={24} />
    ),
    warning: <IconWrapper iconName="AiOutlineWarning" iconSize={24} />,
  };

  const boxColor: string = boxColors[severity];
  const textColor: string = textColors[severity];
  const buttonBorderColor: string = buttonBorderColors[severity];
  const icon = icons[severity];
  return (
    <div>
      {isAlertOpen && (
        <div
          className={`z-50 left-12 animate-fade-in transition-all duration-75 ease-in w-[50vw] ${className}`}
        >
          <div
            // 文字幅とicon幅がずれるのでptだけ4にしている
            className={`flex justify-between rounded border px-5 pb-5 pt-4 ${boxColor}`}
            role="alert"
          >
            <div className="flex justify-between">
              {/* アイコン */}
              <div className="mt-1">{icon}</div>
              <div className="ml-4 align-top flex flex-col justify-start">
                {/* 内部のメッセージ */}
                <Paragraph className={`${textColor} my-auto`}>
                  {message}
                </Paragraph>

                {!isNullOrUndefined(button) && (
                  <div className="flex gap-4 mt-4 items-center">
                    <Button
                      variant="secondary"
                      className={`${buttonBorderColor}`}
                      onClick={button.onClick}
                    >
                      {button.text}
                    </Button>
                    <span className="text-sm">{button.label}</span>
                  </div>
                )}
              </div>
            </div>
            <IconWrapper
              onClick={handleClickClose}
              className="pl-4 mt-1 cursor-pointer"
              iconName="IoClose"
              iconSize={5}
            />
          </div>
        </div>
      )}
    </div>
  );
}
