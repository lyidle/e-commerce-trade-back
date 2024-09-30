<template>
  <el-card class="box-card">
    <!-- 头部内容 -->
    <div class="clearfix nav">
      <!-- 头部左侧内容 -->
      <el-tabs class="nav-left" v-model="activeName">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visit"></el-tab-pane>
      </el-tabs>
      <!-- 头部右侧内容 -->
      <div class="nav-right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <!-- 
            v-model="value1"
           -->
        <el-date-picker
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          class="date"
          v-model="date"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <!-- 底部区域 -->
    <div>
      <Container :active="activeName" />
    </div>
  </el-card>
</template>

<script>
import Container from "@/views/dashboard/Content/Detail";
import dayjs from "dayjs";
export default {
  name: "Content",
  components: {
    Container,
  },
  data() {
    return {
      activeName: "sale",
      // 收集日历数据
      date: [],
    };
  },
  methods: {
    // 本日
    setDay() {
      const day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },
    setWeek() {
      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setMonth() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setYear() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  .nav {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-bottom: 10px;
  }
  .nav-left {
    width: 100%;
  }
  .nav-right {
    position: absolute;
    right: 0;
    & > span {
      margin: 0 10px;
    }
  }
  .date {
    width: 250px;
    margin: 0 20px;
  }
}
</style>
