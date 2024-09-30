<template>
  <div>
    <el-row :gutter="30">
      <el-col :span="12">
        <Search />
      </el-col>
      <el-col :span="12">
        <Category />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Search from "@/views/dashboard/Footer/Search";
import Category from "@/views/dashboard/Footer/Category";
export default {
  name: "Footer",
  components: {
    Search,
    Category,
  },
};
</script>

<style lang="scss" scoped></style>
