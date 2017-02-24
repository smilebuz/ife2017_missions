var myChart = echarts.init(document.getElementById("main"));
var data = [5, 20, 36, 10, 16, 20];
var option = {
  title: {
    text: '销量信息'
  },
  tooltip: {},
  legend: {
    data: ['销量-柱状图','销量-折线图']
  },
  xAxis: {
    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
  },
  yAxis: {},
  series: [{
    name: '销量-柱状图',
    type: 'bar',
    itemStyle: {
      normal: {
        color: '#3399FF'
      }
    },
    data: data
  },{
    name: '销量-折线图',
    type: 'line',
    itemStyle: {
      normal: {
        color: '#006633'
      }
    },
    data: data
  }]
};
myChart.setOption(option);
