<template>
  <div>
    <!-- 顶部卡片 -->
    <HeaderCard style="margin-top: 20px" />
    <!-- 中间内容 -->
    <Content style="margin-top: 20px" />
    <Footer style="margin-top: 20px" />
  </div>
</template>

<script>
import HeaderCard from "@/views/dashboard/HeaderCard";
import Content from "@/views/dashboard/Content";
import Footer from "@/views/dashboard/Footer";
export default {
  name: "Dashboard",
  components: {
    HeaderCard,
    Content,
    Footer,
  },
  mounted(){
    this.$store.dispatch('home/getData')
  }
};
</script>

<style scoped>
>>> .card-ellipse {
  width: 80%;
  height: auto !important;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
