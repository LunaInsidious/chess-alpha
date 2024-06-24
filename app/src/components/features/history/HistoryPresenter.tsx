import { HistoryDashboard } from "@/components/ui/history/HistoryDashboard";
import { HistoryGraphWrapper } from "@/components/ui/history/HistoryGraphWrapper";
import { HistoryHeader } from "@/components/ui/history/HistoryHeader";
import { RoleSummary } from "@/components/ui/history/RoleSummary";

export function HistoryPresenter(): JSX.Element {
  return (
    <div className="flex flex-col p-8 gap-6 w-full">
      <HistoryHeader />
      <HistoryGraphWrapper />
      <RoleSummary />
      <HistoryDashboard />
    </div>
  );
}
