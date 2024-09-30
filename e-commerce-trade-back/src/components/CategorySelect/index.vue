<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category1Id"
          @change="handler1"
          :disabled="show"
        >
          <el-option
            :label="l1.name"
            :value="l1.id"
            v-for="l1 in list1"
            :key="l1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category2Id"
          @change="handler2"
          :disabled="show"
        >
          <el-option
            :label="l2.name"
            :value="l2.id"
            v-for="l2 in list2"
            :key="l2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category3Id"
          @change="handler3"
          :disabled="show"
        >
          <el-option
            :label="l3.name"
            :value="l3.id"
            v-for="l3 in list3"
            :key="l3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props: ["show"],
  data() {
    return {
      // 一级分类的数据
      list1: [],
      list2: [],
      list3: [],
      // 收集相应的一级二级三级分类的id
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  mounted() {
    this.getCategory1List();
  },
  methods: {
    // 获取一级分类的数据的方法
    async getCategory1List() {
      try {
        // 获取一级分类的请求：不需要携带参数
        const result = await this.$API.attr.reqCategory1List();
        this.list1 = result.data;
      } catch (error) {}
    },
    // 一级分类的select事件回调的时候获取相应二级分类的数据
    //通过一级分类的id，获取二级分类的数据
    async handler1() {
      const { category1Id } = this.cForm;
      // 选择一级分类时重置后面的选择
      this.list2 = [];
      this.list3 = [];
      this.cForm.category2Id = "";
      this.cForm.category3Id = "";
      try {
        const result = await this.$API.attr.reqCategory2List(category1Id);
        this.list2 = result.data;
        this.$emit("submitCategoryId", { categoryId: category1Id, level: 1 });
      } catch (error) {}
    },
    // 二级分类的select事件回调的时候获取相应二级分类的数据
    //通过二级分类的id，获取三级分类的数据
    async handler2() {
      const { category2Id } = this.cForm;
      // 选择二级分类时重置后面的选择
      this.list3 = [];
      this.cForm.category3Id = "";
      try {
        const result = await this.$API.attr.reqCategory3List(category2Id);
        this.list3 = result.data;
        this.$emit("submitCategoryId", { categoryId: category2Id, level: 2 });
      } catch (error) {}
    },
    // 三级分类的回调 选择完毕
    handler3() {
      const { category3Id } = this.cForm;
      this.$emit("submitCategoryId", { categoryId: category3Id, level: 3 });
    },
  },
};
</script>

<style lang="less" scoped></style>
