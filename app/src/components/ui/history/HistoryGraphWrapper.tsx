import { HistoryCard } from "@/components/ui/HistoryCard";
import { TierGraph } from "@/components/ui/history/TierGraph";
import { WinRateGraph } from "@/components/ui/history/WinRateGraph";

export function HistoryGraphWrapper(): JSX.Element {
  return (
    <HistoryCard className="h-full w-full">
      <div className="sm:flex sm:flex-col md:flex md:flex-row justify-evenly w-full h-full">
        <WinRateGraph />
        <TierGraph />
      </div>
    </HistoryCard>
  );
}
