<template>
  <el-row :gutter="10">
    <el-col :span="16">
      <!-- charts容器 -->
      <div class="charts" ref="charts"></div>
    </el-col>
    <el-col :span="8">
      <h3 class="right-title">门店{{ title }}排名</h3>
      <ul class="right-content">
        <li>
          <div><span class="index">0</span> <span>肯德基</span></div>
          <span class="right">132465</span>
        </li>
        <li>
          <div><span class="index">1</span> <span>麦当劳</span></div>
          <span class="right">132465</span>
        </li>
        <li>
          <div><span class="index">3</span> <span>肯德基</span></div>
          <span class="right">132465</span>
        </li>
        <li>
          <div><span class="index">4</span> <span>海底捞</span></div>
          <span class="right">132465</span>
        </li>
        <li>
          <div><span class="index">5</span> <span>西贝莜面村</span></div>
          <span class="right">132465</span>
        </li>
        <li>
          <div><span class="index">6</span> <span>汉堡王</span></div>
          <span class="right">132465</span>
        </li>
        <li>
          <div><span class="index">7</span> <span>真功夫</span></div>
          <span class="right">132465</span>
        </li>
      </ul>
    </el-col>
  </el-row>
</template>

<script>
import * as charts from "echarts";
import { mapState } from "vuex";
export default {
  name: "Detail",
  props: ["active"],
  data() {
    return {
      myCharts: null,
    };
  },
  mounted() {
    this.myCharts = charts.init(this.$refs.charts);
    this.myCharts.setOption({
      title: {
        text: "销售额趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [],
          color: "#64D9D6",
        },
      ],
    });
  },
  computed: {
    // 计算标题
    title() {
      return this.active === "sale" ? "销售额" : "访问量";
    },
    ...mapState("home", ["list"]),
  },
  watch: {
    title() {
      this.myCharts.setOption({
        title: {
          text: this.title,
        },
        xAxis: {
          data:
            this.active === "sale"
              ? this.list.orderFullYearAxis
              : this.list.userFullYearAxis,
        },
        series: {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data:
            this.active === "sale"
              ? this.list.orderFullYear
              : this.list.userFullYear,
          color: "#64D9D6",
        },
      });
    },
    list() {
      this.myCharts.setOption({
        title: {
          text: this.title,
        },
        xAxis: {
          data:
            this.active === "sale"
              ? this.list.orderFullYearAxis
              : this.list.userFullYearAxis,
        },
        series: {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data:
            this.active === "sale"
              ? this.list.orderFullYear
              : this.list.userFullYear,
          color: "#64D9D6",
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.charts {
  width: 100%;
  height: 300px;
}
.right-title {
  margin: 0;
}
.right-content {
  list-style: none;
  padding: 0;
  width: 100%;
  height: 300px;
  li {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    height: 8%;
    .index {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #000;
      color: #fff;
      text-align: center;
      line-height: 20px;
      margin-right: 10px;
    }

    &:nth-child(n + 4) .index {
      background-color: transparent;
      color: #000;
    }
  }
}
</style>
