import EChartsReact from 'echarts-for-react';

const option = {
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      name: '勝率',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
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
    <div className='flex flex-col w-full h-full'>
      <span className='font-black text-xl'>勝率</span>
      <EChartsReact
        option={option}
        opts={{ renderer: 'svg', width: 'auto', height: 'auto' }}
        style={{ width: '100%', height: '400px' }}
      />
    </div>
  );
}
