import { HistoryCard } from "@/components/ui/HistoryCard";

type Props = {};

export function HistoryHeader({}: Props): JSX.Element {
  return (
    <HistoryCard className="p-2">
      <div className="flex justify-between h-12">
        <div className="flex items-center">
          <span className="font-black text-xl">Username</span>
        </div>
        <div className="flex flex-col justify-end">
          <span className="text-sm">ランキング：100位</span>
        </div>
      </div>
    </HistoryCard>
  );
}
