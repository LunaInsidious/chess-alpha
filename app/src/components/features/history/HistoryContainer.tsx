import { useNavigate } from "react-router-dom";

import { HistoryPresenter } from "@/components/features/history/HistoryPresenter";
import { appURL } from "@/config/url";

export function HistoryContainer() {
  const navigate = useNavigate();
  const handleBackHome = () => {
    navigate(appURL.home);
  };

  return <HistoryPresenter handleClick={handleBackHome} />;
}
