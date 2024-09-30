<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <div class="title">
        <span>线上热门搜索</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-more" style="cursor: pointer"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-row :gutter="10">
      <el-col :span="12">
        <lineCharts />
      </el-col>
      <el-col :span="12">
        <lineCharts />
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column align="center" type="index" label="排名" width="50">
      </el-table-column>
      <el-table-column align="center" label="搜索关键字" width:width>
      </el-table-column>
      <el-table-column align="center" label="用户数" sortable width:width>
      </el-table-column>
      <el-table-column align="center" label="周涨幅" sortable width:width>
      </el-table-column>
    </el-table>
    <el-pagination layout="->,prev, pager, next" :total="1000"> </el-pagination>
  </el-card>
</template>

<script>
import lineCharts from "@/views/dashboard/Footer/Search/lineCharts";
export default {
  name: "Search",
  data() {
    return {
      tableData: [{}],
    };
  },
  components: {
    lineCharts,
  },
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
}
</style>
