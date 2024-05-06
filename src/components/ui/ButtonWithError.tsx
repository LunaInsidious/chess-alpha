import { useRef } from "react";

import { ButtonProps, Button } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

type Props = ButtonProps & {
  buttonClassName?: string;
  errorCases?: ErrorMassage[];
};

export type ErrorMassage = {
  shouldShowError: boolean;
  message: string;
};

export function ButtonWithError({
  variant,
  className,
  buttonClassName,
  disabled,
  children,
  onClick,
  errorCases = [],
}: Props) {
  const prevErrorCasesRef = useRef<ErrorMassage[]>(errorCases);

  const errorMassage = (): string => {
    const errors = errorCases.filter((error) => error.shouldShowError);

    const caseWithHasErrorChanged = errorCases.find(
      (error) =>
        error.shouldShowError !==
        prevErrorCasesRef.current.find((prev) => prev.message === error.message)
          ?.shouldShowError,
    );

    // 1つの変更されたerrorCaseを取得後、prevErrorCasesRefに現在のerrorCasesを代入することで、prevErrorCasesとして保持する
    prevErrorCasesRef.current = errorCases;

    // hasErrorに変更がなく、エラーが存在する場合
    if (caseWithHasErrorChanged == null && errors.length !== 0) {
      return errors[0].message;
    }
    // hasErrorに変更がなく、エラーが存在しない場合
    if (caseWithHasErrorChanged == null) {
      return "";
    }
    // hasErrorに変更があり、その変更されたcaseのhasErrorがtrueだった場合、そのエラーを表示する
    if (caseWithHasErrorChanged.shouldShowError) {
      return caseWithHasErrorChanged.message;
    }
    // hasErrorに変更があり、その変更されたcaseのhasErrorがfalseだった場合、一つ目のエラーを表示する
    if (errors.length !== 0) {
      return errors[0].message;
    }
    return "";
  };

  return (
    <div className={className}>
      <Button
        variant={variant}
        className={buttonClassName}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </Button>
      <ErrorMessage
        className="mt-1 text-xs"
        message={errorMassage()}
        hidden={!errorCases.some((error) => error.shouldShowError)}
      />
    </div>
  );
}
