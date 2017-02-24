var myChart = echarts.init(document.getElementById("main"));
var teams = ["活塞","马刺","凯尔特人","湖人","小牛","热火","勇士","骑士"];
var champions = [1,4,1,5,1,3,1,1];
var option = {
  title: {
    text: '21世纪NBA各队冠军数量',
    textStyle: {
      fontSize: 12
    }
  },
  tooltip: {},
  legend: {
    data: ['柱状图','折线图']
  },
  xAxis: {
    data: teams
  },
  yAxis: {},
  series: [{
    name: '柱状图',
    type: 'bar',
    itemStyle: {
      normal: {
        color: '#3399FF'
      }
    },
    data: champions
  },{
    name: '折线图',
    type: 'line',
    itemStyle: {
      normal: {
        color: '#006633'
      }
    },
    data: champions
  }]
};
myChart.setOption(option);
