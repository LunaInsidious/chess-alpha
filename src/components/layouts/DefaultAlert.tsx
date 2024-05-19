import { Alert } from "@/components/ui/Alert";
import { useAlert } from "@/hooks/alert";

export function DefaultAlert() {
  const { state, closeAlert } = useAlert();

  const { isAlertOpen, message, severity, button } = state;

  return (
    <Alert
      isAlertOpen={isAlertOpen}
      message={message}
      button={button}
      severity={severity}
      handleClickClose={closeAlert}
      className="absolute bottom-8"
    />
  );
}
