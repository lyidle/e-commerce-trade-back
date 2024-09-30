<template>
  <div ref="charts" id="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "progressChart",
  mounted() {
    // 初始化echarts
    const lineChart = echarts.init(this.$refs.charts);
    // 配置数据
    // 配置数据
    lineChart.setOption({
      xAxis: {
        show: false,
        // 最小值与最大值的设置
        min: 0,
        max: 100,
      },
      yAxis: {
        show: false,
        // 横向分布
        type: "category",
      },
      series: [
        {
          type: "bar",
          data: [60],
          color: "#B09AD5",
          // 柱状图的宽度
          barWidth: 10,
          color: "yellowgreen",
          showBackground: true,
          backgroundStyle: {
            color: "#eee",
          },
          label: {
            show: true,
            formatter: "|",
            position:'right'
          },
        },
      ],
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      tooltip: {},
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
