import { HistoryCard } from "@/components/ui/HistoryCard";
import { createTimeAgoFormatter } from "@/utils/dateFormat";

export function HistoryDashboard(): JSX.Element {
  const { formatTimeAgo } = createTimeAgoFormatter();

  const dashboardRows: {
    result: "win" | "lose";
    role: "wolf" | "citizen";
    created_at: number;
    duration: number;
    rate: number;
  }[] = [
    {
      result: "win",
      role: "wolf",
      created_at: new Date().setDate(new Date().getDate() - 1),
      duration: 13_000,
      rate: 330,
    },
    {
      result: "lose",
      role: "citizen",
      created_at: new Date().setDate(new Date().getDate() - 2),
      duration: 19_000,
      rate: 310,
    },
    {
      result: "win",
      role: "citizen",
      created_at: new Date().setDate(new Date().getDate() - 7),
      duration: 12_000,
      rate: 320,
    },
  ];

  return (
    <HistoryCard>
      <div className="flex flex-col gap-4">
        <div>
          <span className="font-black text-xl">戦歴</span>
        </div>
        <div className="flex flex-col gap-2">
          {dashboardRows.map((row) => (
            <div
              className={
                row.result === "win"
                  ? "flex justify-between gap-8 rounded bg-blue-500/75 px-4 py-2"
                  : "flex justify-between gap-8 rounded bg-red-500/75 px-4 py-2"
              }
            >
              <div className="flex flex-col w-12 justify-between">
                <span className="text-base md:text-xl font-bold">{row.result}</span>
                <span className="text-sm md:text-l">{`${row.duration / 1000}分`}</span>
              </div>
              <div className="flex justify-between w-full items-center">
                <div className="flex rounded bg-white w-16 py-1 md:h-full justify-center items-center">
                  <span className="font-bold text-base md:text-xl">
                    {row.role === "wolf" ? "人狼" : "市民"}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-2 w-full">
                  <span>{formatTimeAgo(row.created_at)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </HistoryCard>
  );
}
