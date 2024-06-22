import { HistoryCard } from "@/components/ui/HistoryCard";

export function HistoryHeader(): JSX.Element {
  return (
    <HistoryCard className="p-2">
      <div className="flex justify-between h-12">
        <div className="flex items-center">
          <span className="font-black text-xl">Username</span>
        </div>
        <div className="flex flex-col justify-end">
          <div className="flex items-center">
            <span className="font-bold mr-1">ランキング</span>
            <span className="text-sm">：100位</span>
          </div>
        </div>
      </div>
    </HistoryCard>
  );
}
