import { HistoryCard } from "@/components/ui/HistoryCard";
import { WinRateGraph } from "@/components/ui/history/WinRateGraph";
import { TierGraph } from "@/components/ui/history/TierGraph";

type Props = {};

export function HistoryGraphWrapper({}: Props): JSX.Element {
  return (
    <HistoryCard>
      <div className="flex justify-evenly h-50">
        <WinRateGraph />
        <TierGraph />
      </div>
    </HistoryCard>
  );
}
