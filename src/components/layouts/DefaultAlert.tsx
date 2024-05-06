import { Alert } from "@/components/ui/Alert";
import { useAlert } from "@/hooks/alert";

export function DefaultAlert() {
  const { state, closeAlert } = useAlert();

  const { isAlertOpen, message, severity, title, button, isSizeLarge } = state;

  return (
    <Alert
      isAlertOpen={isAlertOpen}
      message={message}
      title={title}
      button={button}
      isSizeLarge={isSizeLarge}
      severity={severity}
      handleClickClose={closeAlert}
      className="absolute bottom-8"
    />
  );
}
