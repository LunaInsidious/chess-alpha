import { HistoryCard } from "@/components/ui/HistoryCard";

export function RoleSummary(): JSX.Element {
  return (
    <div className="flex justify-between gap-4">
      <HistoryCard className="w-full">
        <div className="flex-col">人狼</div>
      </HistoryCard>
      <HistoryCard className="w-full">
        <div className="flex-col">市民</div>
      </HistoryCard>
    </div>
  );
}
