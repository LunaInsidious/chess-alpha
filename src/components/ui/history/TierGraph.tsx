import EChartsReact from 'echarts-for-react';

const option = {
  xAxis: {
    type: 'category',
    data: ['05/08', '05/15', '05/22', '05/29']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 124, 260],
      type: 'line'
    }
  ]
};

export function TierGraph() {
  return (
    <EChartsReact
      option={option}
      opts={{ renderer: 'svg', width: 'auto', height: 'auto' }}
      style={{ width: '100%', height: '400px' }}
    />
  );
}
