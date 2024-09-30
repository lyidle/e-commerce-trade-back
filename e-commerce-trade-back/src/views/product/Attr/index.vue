<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect @submitCategoryId="getCategoryId" :show="!isShowTable" />
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom: 10px"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table :data="attrList" style="width: 100%" border>
          <el-table-column
            type="index"
            prop="prop"
            label="序号"
            align="center"
            width="80"
          >
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template v-slot="{ row }">
              <el-tag
                type="success"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                style="margin: 10px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template v-slot="{ row }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteAttrList(row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性|修改属性的结构 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addAttrValue"
            :disabled="!attrInfo.attrName.trim().length"
            >添加属性值</el-button
          >
          <el-button @click="isShowTable = true">取消</el-button>
          <el-table style="width: 100%" border :data="attrInfo.attrValueList">
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="80"
            >
            </el-table-column>
            <el-table-column prop="prop" label="属性值名称" width="width">
              <template v-slot="{ row, $index }">
                <el-input
                  placeholder=""
                  v-model="row.valueName"
                  size="mini"
                  v-if="row.flag"
                  @blur="toLook(row)"
                  @keyup.native.enter="toLook(row)"
                  :ref="$index"
                ></el-input>
                <span
                  v-else
                  @click="toEdit(row, $index)"
                  style="display: block"
                  >{{ row.valueName }}</span
                >
              </template>
            </el-table-column>
            <el-table-column prop="prop" label="操作" width="width">
              <template v-slot="{ row, $index }">
                <el-popconfirm
                  confirm-button-text="好的"
                  cancel-button-text="不用了"
                  icon="el-icon-info"
                  icon-color="red"
                  :title="`确定删除${row.valueName}吗？`"
                  @onConfirm="deleteAttrValue($index)"
                >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    slot="reference"
                  ></el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            type="primary"
            @click="addOrUpdateAttr"
            :disabled="attrInfo.attrValueList.length < 1"
            >保存</el-button
          >
          <el-button @click="isShowTable = true">取消</el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 接受平台属性的字段
      attrList: [],
      // 这个属性控制table表格显示与隐藏的
      isShowTable: true,
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [], //多个属性值
        categoryId: 0, //三级分类中值的id
        categoryLevel: 3, //添加到三级分类中
      },
    };
  },
  methods: {
    // submitCategoryId自定义事件的回调
    getCategoryId({ categoryId, level }) {
      switch (level) {
        case 1:
          this.category1Id = categoryId;
          this.category2Id = "";
          this.category3Id = "";
          break;
        case 2:
          this.category2Id = categoryId;
          this.category3Id = "";
          break;
        case 3:
          this.category3Id = categoryId;
          this.getAttrList();
          break;
      }
    },
    // 获取平台属性的数据
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      try {
        const result = await this.$API.attr.reqAttrList(
          category1Id,
          category2Id,
          category3Id
        );
        this.attrList = result.data;
      } catch (error) {}
    },
    // 添加属性值回调
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id, //每一行的数据都有一个单独的id
        valueName: "",
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    // 添加属性按钮的回调
    addAttr() {
      this.isShowTable = false;
      // 设置attrInfo的三级分类id，即选择的三级分类中的id
      this.attrInfo = {
        attrName: "", //属性名
        attrValueList: [], //多个属性值
        categoryId: this.category3Id, //三级分类中值的id
        categoryLevel: 3, //添加到三级分类中
      };
    },
    // 修改某个属性的回调
    updateAttr(row) {
      this.isShowTable = false;
      // 使用json转换一遍或者lodash之类的工具进行深拷贝 不在共享同一个地址
      // 深拷贝也可以递归解决 只不过很麻烦
      this.attrInfo = JSON.parse(JSON.stringify(row));
      this.attrInfo.attrValueList.forEach((item) => {
        this.$set(item, "flag", false);
      });
    },
    // 添加时 隐藏输入框事件
    toLook(row) {
      if (row.valueName.trim() == "") {
        this.$message("请输入一个正常的属性值!");
        return;
      }
      const findValue = this.attrInfo.attrValueList.find((item) => {
        if (row !== item) return row.valueName === item.valueName;
      });
      if (findValue) {
        this.$message("不能输入重复的值!");
        return;
      }
      row.flag = false;
    },
    // 添加时 编辑事件
    toEdit(row, index) {
      row.flag = true;
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    // 删除属性
    deleteAttrValue(index) {
      this.$nextTick(() => {
        this.attrInfo.attrValueList.splice(index, 1);
      });
    },
    // 更新数据
    async addOrUpdateAttr() {
      // 整理参数
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          if (item.valueName != "") {
            // 删除flag属性
            delete item.flag;
            return true;
          }
        }
      );
      try {
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo);
        // 展示平台属性管理
        this.isShowTable = true;
        this.$message({ type: "success", message: "保存成功" });
        this.getAttrList();
      } catch (error) {
        this.$message({ type: "warning", message: "保存失败" });
      }
    },
    // 删除属性某个列表  接口没有权限操作
    async deleteAttrList(row) {
      try {
        await this.$API.attr.reqDeleteAttrList(row.attrValueList.attrId);
        this.$message({ type: "success", message: "删除成功" });
      } catch (error) {
        this.$message({ type: "warning", message: "删除失败" });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
