<template>
  <div>
    <el-button
      type="primary"
      v-if="this.$store.state.user.buttons.includes('btn.TestAdd2')"
      >Add按钮2</el-button
    >
    <el-button type="primary">1534</el-button>
  </div>
</template>

<script>
export default {
  name: "TestAdd2",
};
</script>

<style lang="scss" scoped></style>
