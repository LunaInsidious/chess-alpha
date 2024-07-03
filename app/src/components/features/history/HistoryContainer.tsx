import { useNavigate } from "react-router-dom";

import { appURL } from "@/config/url";
import { HistoryPresenter } from "@/components/features/history/HistoryPresenter";

export function HistoryContainer() {
  const navigate = useNavigate();
  const handleBackHome = () => {
    navigate(appURL.home);
  };

  return <HistoryPresenter 
    handleClick={handleBackHome}
  />;
}
