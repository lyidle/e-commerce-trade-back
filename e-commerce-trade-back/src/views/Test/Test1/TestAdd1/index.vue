<template>
  <div>
    <!-- 相当于可以根据返回的数据来在多个界面中是否显示按钮，实现按钮等元素的展示和隐藏 -->
    <el-button
      type="primary"
      v-if="this.$store.state.user.buttons.includes('btn.TestAdd1')"
      >Add按钮1</el-button
    >
    <el-button type="primary">1534</el-button>
  </div>
</template>

<script>
export default {
  name: "TestAdd1",
};
</script>

<style lang="scss" scoped></style>
