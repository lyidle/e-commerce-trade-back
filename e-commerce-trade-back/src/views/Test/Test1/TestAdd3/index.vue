<template>
  <div>
    <el-button
      type="primary"
      v-if="this.$store.state.user.buttons.includes('btn.TestAdd3')"
      >Add按钮3</el-button
    >
    <el-button type="primary">5455</el-button>
  </div>
</template>

<script>
export default {
  name: "TestAdd3",
};
</script>

<style lang="scss" scoped></style>
