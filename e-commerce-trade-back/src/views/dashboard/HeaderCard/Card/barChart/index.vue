<template>
  <div ref="charts" id="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "barChart",
  mounted() {
    // 初始化echarts
    const lineChart = echarts.init(this.$refs.charts);
    // 配置数据
    // 配置数据
    lineChart.setOption({
      xAxis: { show: false, type: "category" },
      yAxis: { show: false },
      series: [
        {
          type: "bar",
          data: [10,7,33,12,48,9,29,10,44,10,44,23,50],
          color:'#B09AD5'
        },
      ],
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      tooltip:{}
    });
  },
};
</script>

<style lang="scss" scoped>
#charts {
  width: 100%;
  height: 100%;
}
</style>
