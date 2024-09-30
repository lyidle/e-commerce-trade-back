<template>
  <div>
    <el-button
      type="primary"
      v-if="this.$store.state.user.buttons.includes('btn.TestRemove2')"
      >Remove按钮2</el-button
    >
    <el-button type="primary">132</el-button>
  </div>
</template>

<script>
export default {
  name: "TestRemove1",
};
</script>

<style lang="scss" scoped></style>
