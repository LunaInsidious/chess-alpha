import { HistoryCard } from "@/components/ui/HistoryCard";

export function RoleSummary(): JSX.Element {
  return (
    <div className="flex justify-between gap-2 md:gap-4 h-12 md:h-20">
      <HistoryCard className="w-full flex items-center">
        <div className="flex justify-between w-full">
          <span className="font-black text-base md:text-xl">人狼</span>
          <div className="flex gap-1 md:gap-2 items-end">
            <span className="font-black text-xs md:text-lg">6</span>
            <span className="text-xs md:text-sm">ゲーム</span>
          </div>
        </div>
      </HistoryCard>
      <HistoryCard className="w-full flex items-center">
        <div className="flex flex-row-reverse justify-between w-full">
          <span className="font-black text-base md:text-xl">市民</span>
          <div className="flex gap-1 md:gap-2 items-end">
            <span className="font-black text-xs md:text-lg">14</span>
            <span className="text-xs md:text-sm">ゲーム</span>
          </div>
        </div>
      </HistoryCard>
    </div>
  );
}
