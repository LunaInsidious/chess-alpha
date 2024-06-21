import { HistoryCard } from "@/components/ui/HistoryCard";

export function RoleSummary(): JSX.Element {
  return (
    <div className="flex justify-between gap-4 h-20">
      <HistoryCard className="w-full flex items-center">
        <div className="flex justify-between w-full">
          <span className="font-black text-xl">人狼</span>
          <div className="flex gap-2 items-end">
            <span className="font-black text-2xl">6</span>
            <span className="text-sm">ゲーム</span>
          </div>
        </div>
      </HistoryCard>
      <HistoryCard className="w-full flex items-center">
        <div className="flex flex-row-reverse justify-between w-full">
          <span className="font-black text-xl">市民</span>
          <div className="flex gap-2 items-end">
            <span className="font-black text-2xl">14</span>
            <span className="text-sm">ゲーム</span>
          </div>
        </div>
      </HistoryCard>
    </div>
  );
}
