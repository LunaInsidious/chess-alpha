import { HistoryCard } from "@/components/ui/HistoryCard";

type Props = {};

export function HistoryDashboard({}: Props): JSX.Element {
  return (
    <HistoryCard>
      <div className="flex-col">戦歴</div>
    </HistoryCard>
  );
}
