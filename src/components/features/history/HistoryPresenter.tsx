import { HistoryHeader } from "@/components/ui/history/HistoryHeader";
import { HistoryGraphWrapper } from "@/components/ui/history/HistoryGraphWrapper";
import { RoleSummary } from "@/components/ui/history/RoleSummary";
import { HistoryDashboard } from "@/components/ui/history/HistoryDashboard";

type Props = {};

export function HistoryPresenter({}: Props): JSX.Element {
  return (
    <div className="flex flex-col p-8 gap-6">
      <HistoryHeader />
      <HistoryGraphWrapper />
      <RoleSummary />
      <HistoryDashboard />
    </div>
  );
}
