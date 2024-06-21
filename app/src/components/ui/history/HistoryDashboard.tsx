import { HistoryCard } from "@/components/ui/HistoryCard";

export function HistoryDashboard(): JSX.Element {
  const dashboardRows: {
    result: "win" | "lose";
    role: "wolf" | "citizen";
    created_at: number;
    duration: number;
    rate: number;
    tag: string[];
  }[] = [
    {
      result: "win",
      role: "wolf",
      created_at: -1,
      duration: 13_000,
      rate: 330,
      tag: ["Warewolf", "Perfect Win"],
    },
    {
      result: "lose",
      role: "citizen",
      created_at: -2,
      duration: 19_000,
      rate: 310,
      tag: ["Bad Boy"],
    },
    {
      result: "win",
      role: "citizen",
      created_at: -7,
      duration: 12_000,
      rate: 320,
      tag: ["King Slayer"],
    },
  ];

  const rtf = new Intl.RelativeTimeFormat("en", {
    localeMatcher: "best fit", // other values: "lookup"
    numeric: "always", // other values: "auto"
    style: "long", // other values: "short" or "narrow"
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
              <div className="flex flex-col w-12">
                <span className="text-xl font-bold">{row.result}</span>
                <span>{`${row.duration / 1000}分`}</span>
              </div>
              <div className="flex justify-between w-full">
                <div className="flex rounded-full bg-white w-12 h-12 justify-center items-center">
                  <span className="font-bold text-xl">
                    {row.role === "wolf" ? "狼" : "市"}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span>{rtf.format(row.created_at, "day")}</span>
                  <span></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </HistoryCard>
  );
}
