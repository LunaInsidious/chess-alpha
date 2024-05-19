import { createContext, useState } from "react";

export type Severity =
  | "success"
  | "error"
  | "information"
  | "informationBlue"
  | "warning";

export type AlertButtonProps = {
  text: string;
  label?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export type AlertParamType = {
  severity: Severity;
  message: string;
  button?: AlertButtonProps;
  isLarge?: boolean;
  timeout?: number;
};

type AlertShowProps = {
  message: string;
  timeout?: number;
  button?: AlertButtonProps;
};

type AlertStates = {
  state: {
    isAlertOpen: boolean;
    message: string;
    severity: Severity;
    button?: AlertButtonProps;
    isSizeLarge: boolean;
  };
  showError: (props: AlertShowProps) => void;
  showSuccess: (props: AlertShowProps) => void;
  closeAlert: () => void;
  showAlert: (param: AlertParamType) => void;
};

function useAlertContextValues(): AlertStates {
  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const [messageContext, setMessageContext] = useState<string>("");
  const [severityContext, setSeverityContext] = useState<Severity>("success");
  const [isSizeLarge, setIsSizeLarge] = useState<boolean>(false);
  const [buttonContext, setButtonContext] = useState<
    AlertButtonProps | undefined
  >(undefined);

  const showAlert = (param: AlertParamType): void => {
    const { message, isLarge, button } = param;

    const severityInput = param.severity;
    setMessageContext(message);
    setSeverityContext(severityInput);
    setIsSizeLarge(isLarge ?? false);
    setButtonContext(button);
    setAlertOpen(true);

    if (param.timeout != null)
      setTimeout(() => {
        setAlertOpen(false);
      }, param.timeout);
  };

  const showError = ({ message = "", timeout, button }: AlertShowProps) => {
    showAlert({
      severity: "error",
      message,
      timeout,
      button,
    });
  };

  const showSuccess = ({ message = "", timeout, button }: AlertShowProps) => {
    showAlert({
      severity: "success",
      message,
      timeout,
      button,
    });
  };

  const closeAlert = () => {
    setAlertOpen(false);
  };

  return {
    state: {
      isAlertOpen,
      message: messageContext,
      severity: severityContext,
      button: buttonContext,
      isSizeLarge,
    },
    showError,
    showSuccess,
    closeAlert,
    showAlert,
  };
}

export const AlertContext = createContext({} as AlertStates);

export function AlertProvider({ children }: { children: JSX.Element }) {
  const value = useAlertContextValues();
  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
}
