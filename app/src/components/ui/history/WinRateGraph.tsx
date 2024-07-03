import EChartsReact from "echarts-for-react";

const option = {
  series: [
    {
      name: "勝率",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "Win", itemStyle: { color: "#3b82f6" } },
        { value: 735, name: "Lose", itemStyle: { color: "#EF4444" } },
      ],
    },
  ],
};

export function WinRateGraph() {
  return (
    <div className="flex flex-col w-full h-full">
      <span className="font-black text-xl w-full">勝率</span>
      <EChartsReact
        option={option}
        opts={{ renderer: "svg", width: "auto", height: "auto" }}
        style={{ width: "100%", height: "220px" }}
        className="relative"
      />
    </div>
  );
}