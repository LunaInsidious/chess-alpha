import { HistoryCard } from "@/components/ui/HistoryCard";

export function HistoryDashboard(): JSX.Element {
  const dashboardRows: {
    result: "win" | "lose";
    role: "wolf" | "citizen";
    created_at: number;
    duration: number;
    rate: number;
    tags: string[];
  }[] = [
    {
      result: "win",
      role: "wolf",
      created_at: -1,
      duration: 13_000,
      rate: 330,
      tags: ["Warewolf", "Perfect Win"],
    },
    {
      result: "lose",
      role: "citizen",
      created_at: -2,
      duration: 19_000,
      rate: 310,
      tags: ["Bad Boy"],
    },
    {
      result: "win",
      role: "citizen",
      created_at: -7,
      duration: 12_000,
      rate: 320,
      tags: ["King Slayer"],
    },
  ];

  const rtf = new Intl.RelativeTimeFormat("en", {
    localeMatcher: "best fit",
    numeric: "always",
    style: "long",
  });

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
                <span className="text-xl font-bold">{row.result}</span>
                <span>{`${row.duration / 1000}分`}</span>
              </div>
              <div className="flex justify-between w-full items-center">
                <div className="flex rounded bg-white w-16 h-full justify-center items-center">
                  <span className="font-bold text-xl">
                    {row.role === "wolf" ? "人狼" : "市民"}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span>{rtf.format(row.created_at, "day")}</span>
                  <div className="flex gap-2">
                    {row.tags.map((tag) => (
                      <div
                        className={
                          row.result === "win"
                            ? "flex px-2 py-1 rounded border-2 border-blue-500/90 border-solid"
                            : "flex px-2 py-1 rounded border-2 border-red-500/90 border-solid"
                        }
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </HistoryCard>
  );
}
