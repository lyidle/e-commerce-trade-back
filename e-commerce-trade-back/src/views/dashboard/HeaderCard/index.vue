<template>
  <div>
    <!-- 头部 -->
    <el-row :gutter="10" class="card-header">
      <Card title="总销售额" amount="￥126560">
        <template slot="charts">
          <div class="amount">
            <div class="card-ellipse charts">
              <span
                >周同比&nbsp;&nbsp;{{ `56.67%` }}&nbsp;<i
                  class="el-icon-caret-top"
                  style="color: red"
                ></i
              ></span>
              <span
                >日同比&nbsp;&nbsp;{{ `19.96%` }}&nbsp;<i
                  class="el-icon-caret-bottom"
                  style="color: #11d625"
                ></i
              ></span>
            </div>
          </div>
        </template>
        <template slot="footer">
          <span>日销售额&nbsp;&nbsp;￥{{ 12423 }}</span>
        </template>
      </Card>
      <Card title="总访问量" amount="88460">
        <template slot="charts">
          <div class="charts">
            <lineChart />
          </div>
        </template>
        <template slot="footer">
          <span>日访问量&nbsp;&nbsp;{{ 1234 }}</span>
        </template>
      </Card>
      <Card title="总支付笔数" amount="88460">
        <template slot="charts">
          <div class="charts">
            <barChart />
          </div>
        </template>
        <template slot="footer">
          <span>转化率&nbsp;&nbsp;{{ `65%` }}</span>
        </template>
      </Card>
      <Card title="运营活动效果" amount="78%">
        <template slot="charts">
          <div class="charts">
            <progressChart />
          </div>
        </template>
        <template slot="footer">
          <div class="card-ellipse">
            <span
              >周同比&nbsp;&nbsp;{{ `12%` }}&nbsp;<i
                class="el-icon-caret-top"
                style="color: red"
              ></i
            ></span>
            <span
              >日同比&nbsp;&nbsp;{{ `11%` }}&nbsp;<i
                class="el-icon-caret-bottom"
                style="color: #11d625"
              ></i
            ></span>
          </div>
        </template>
      </Card>
    </el-row>
  </div>
</template>

<script>
import Card from "@/views/dashboard/HeaderCard/Card";
import lineChart from "@/views/dashboard/HeaderCard/Card/lineChart";
import barChart from "@/views/dashboard/HeaderCard/Card/barChart";
import progressChart from "@/views/dashboard/HeaderCard/Card/progressChart";
export default {
  name: "HeaderCard",
  components: {
    Card,
    lineChart,
    barChart,
    progressChart,
  },
};
</script>

<style lang="scss" scoped>
.card-header {
  .charts,
  .amount {
    margin-top: 20px;
    height: 50px;
  }
  .amount {
    display: flex;
    align-items: end;
    padding-bottom: 20px;
  }
}
</style>
