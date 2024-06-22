import { HistoryCard } from "@/components/ui/HistoryCard";
import { TierGraph } from "@/components/ui/history/TierGraph";
import { WinRateGraph } from "@/components/ui/history/WinRateGraph";

export function HistoryGraphWrapper(): JSX.Element {
  return (
    <HistoryCard>
      <div className="flex justify-evenly h-30">
        <WinRateGraph />
        <TierGraph />
      </div>
    </HistoryCard>
  );
}
