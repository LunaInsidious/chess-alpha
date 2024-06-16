import { HistoryCard } from "@/components/ui/HistoryCard";

type Props = {};

export function HistoryGraphWrapper({}: Props): JSX.Element {
  return (
    <HistoryCard>
      <div className="flex-col">graph</div>
    </HistoryCard>
  );
}
