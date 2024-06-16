import EChartsReact from 'echarts-for-react';

const option = {
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      data: [
        { value: 1048, name: 'Win' },
        { value: 735, name: 'Lose' },
      ]
    }
  ]
};

export function WinRateGraph() {
  return (
    <EChartsReact
      option={option}
      opts={{ renderer: 'svg', width: 'auto', height: 'auto' }}
      style={{ width: '100%', height: '400px' }}
    />
  );
}
