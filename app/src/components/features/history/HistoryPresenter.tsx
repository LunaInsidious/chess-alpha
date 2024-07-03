import { Button } from "@/components/ui/button/Button";
import { HistoryDashboard } from "@/components/ui/history/HistoryDashboard";
import { HistoryGraphWrapper } from "@/components/ui/history/HistoryGraphWrapper";
import { HistoryHeader } from "@/components/ui/history/HistoryHeader";
import { RoleSummary } from "@/components/ui/history/RoleSummary";

type Props = {
  handleClick: () => void;
};

export function HistoryPresenter({handleClick}: Props): JSX.Element {
  
  return (
    <div className="flex flex-col p-8 gap-6 w-full">
      <HistoryHeader />
      <HistoryGraphWrapper />
      <RoleSummary />
      <HistoryDashboard />
      <div className="w-full flex justify-end">
        <Button 
          onClick={handleClick}
          variant="primary"
          className="w-20 h-10 md:w-20 md:h-12 md:text-l lg:text-xl"
        >
          戻る
        </Button>
      </div>
    </div>
  );
}
