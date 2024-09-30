<template>
  <el-form ref="form" label-width="80px">
    <el-form-item label="SPU名称">
      <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
    </el-form-item>
    <el-form-item label="品牌">
      <el-select placeholder="请选择品牌" v-model="spu.tmId">
        <el-option
          :label="tm.tmName"
          :value="tm.id"
          v-for="tm in tradeMarklist"
          :key="tm.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        rows="4"
        placeholder="描述"
        v-model="spu.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload
        action="/dev-api/manager/product/upload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="spuImageList"
        :on-success="handlerSuccess"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-select
        :placeholder="`还有${unSelectSaleAttr.length}未选择`"
        v-model="attrIdAndAttrName"
      >
        <el-option
          :label="unSelect.name"
          :value="`${unSelect.id}:${unSelect.name}`"
          v-for="unSelect in unSelectSaleAttr"
          :key="unSelect.id"
        >
        </el-option>
      </el-select>
      <el-button
        type="primary"
        icon="el-icon-plus"
        :disabled="!attrIdAndAttrName"
        @click="addSaleAttr"
        >添加销售属性</el-button
      >
      <el-table
        style="width: 100%; margin-top: 15px"
        border
        :data="spu.spuSaleAttrList"
      >
        <el-table-column
          type="index"
          prop="prop"
          align="center"
          label="序号"
          width="80"
        >
        </el-table-column>
        <el-table-column prop="saleAttrName" label="属性名" width="width">
        </el-table-column>
        <el-table-column prop="prop" label="属性名称列表" width="width">
          <template v-slot="{ row, $index }">
            <!-- click 删除对应的tag -->
            <el-tag
              :key="tag.id"
              v-for="(tag, index) in row.spuSaleAttrValueList"
              closable
              :disable-transitions="false"
              @close="row.spuSaleAttrValueList.splice(index, 1)"
              style="margin: 10px"
            >
              {{ tag.saleAttrValueName }}
            </el-tag>
            <!-- 
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm" -->
            <el-input
              class="input-new-tag"
              v-if="row.inputVisible"
              v-model="row.inputValue"
              ref="saveTagInput"
              size="small"
              @blur="handlerInputConfirm(row)"
              style="margin: 10px"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="addSaleAttrValue(row)"
              style="margin: 10px"
              >添加</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="width">
          <template v-slot="{ row, $index }">
            <!-- 删除对应属性所在的哪一行 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="spu.spuSaleAttrList.splice($index, 1)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      // 展示图片的地址
      dialogImageUrl: "",
      // 图片预览的显示与隐藏
      dialogVisible: false,
      //存储SPU信息属性
      spu: {
        //三级分类的id
        category3Id: 0,
        //描述
        description: "",
        // spu名称
        spuName: "",
        // 平台的id
        tmId: "",
        // 收集SPU图片的信息
        spuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   spuId: 0,
          // },
        ],
        // 平台属性与属性值收集
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "string",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "string",
          //       saleAttrName: "string",
          //       saleAttrValueName: "string",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
      },
      tradeMarklist: [], //存储品牌信息
      spuImageList: [], ///存储SPU图片的数据
      saleAttrList: [], //销售属性的数据
      attrIdAndAttrName: "", ///收集未选择的销售属性的id
    };
  },
  methods: {
    // 照片墙删除某一个图片的时候会触发
    handleRemove(file, fileList) {
      //file参数：代表的是删除的那个张图片
      //fileList：照片墙删除某一张图片以后，剩余的其他的图片
      // 收集图片的信息
      // 上传时需要处理name 和 url
      this.spuImageList = fileList;
    },
    // 照片墙图片预览的回调
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 初始化SpuForm数据
    async initSpuData(spu) {
      // 获取SPU信息的数据
      const spuResult = await this.$API.spu.reqSpu(spu.id);
      this.spu = spuResult.data;
      // 获取品牌的信息
      const tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      this.tradeMarklist = tradeMarkResult.data;
      //获取spu图片的数据
      const spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
      this.spuImageList = spuImageResult.data;
      // 处理elementUi 图片展示需要name和url的问题
      this.spuImageList.forEach((item) => {
        item.url = item.imgUrl;
        item.name = item.imgName;
      });
      // 获取平台全部的销售属性
      const saleResult = await this.$API.spu.reqBaseSaleAttrList();
      this.saleAttrList = saleResult.data;
    },
    // 照片墙图片上传成功的回调
    handlerSuccess(response, file, fileList) {
      // 收集图片的信息
      // 上传时需要处理name 和 url
      this.spuImageList = fileList;
    },
    // 添加新的销售属性
    addSaleAttr() {
      // 把收集到的数据进行结构赋值
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");
      //向sPU对象的spuSaleAttrList属性里面添加新的销售属性
      const newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      // 添加新的销售属性
      this.spu.spuSaleAttrList.push(newSaleAttr);
      this.attrIdAndAttrName = "";
    },
    // 添加按钮的回调
    addSaleAttrValue(row) {
      // 追加响应属性 row.inputVisible实现 tag的 输入和显示切换
      this.$set(row, "inputVisible", true);
      // 追加响应属性row.inputValue字段收集新增的销售属性值
      this.$set(row, "inputValue", "");
    },
    // el-input失却焦点的事件
    handlerInputConfirm(row) {
      // 解构出销售属性当中收集数据
      const { baseSaleAttrId, inputValue } = row;
      // 属性值不能为空
      if (inputValue.trim() == "") {
        this.$message({ type: "warning", message: "属性值不能为空!" });
        return;
      }
      // 属性值不能重复
      const result = row.spuSaleAttrValueList.every(
        (item) => item.saleAttrValueName != inputValue
      );
      // 重复的情况
      if (!result) {
        this.$message({ type: "warning", message: "属性值不能重复!" });
        return;
      }
      // 新增的销售属性值
      const newSaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: inputValue,
      };
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      // 修改inputVisible为false，不就显示button
      row.inputVisible = false;
    },
    // 保存按钮的回调
    async addOrUpdateSpu() {
      this.spu.spuImageList = this.spuImageList.map((item) => {
        return {
          imgName: item.name,
          // imgUrl 新添加的图片需要根据 response的data来添加
          imgUrl: (item.response && item.response.data) || item.url,
        };
      });
      try {
        // 发起请求
        await this.$API.spu.reqAddOrUpdateSpu(this.spu);
        this.$message({ type: "success", message: "保存成功" });
        this.$emit("changeScene", {
          scene: 0,
          flag: this.spu.id ? "修改" : "添加",
        });
        // 清理数据
        Object.assign(this._data, this.$options.data());
      } catch (error) {
        this.$message({ type: "warning", message: "保存失败" });
      }
    },
    // 取消按钮
    cancel() {
      // 取消按钮的回调，通知父亲切换场景为0
      this.$emit("changeScene", { scene: 0, flag: "" });
      // 清理数据
      Object.assign(this._data, this.$options.data());
    },
    // 点击添加SPU按钮的时候，发请求的函数
    async addSpuData(category3Id) {
      //添加SPU的时候收集三级分类的id
      this.spu.category3Id = category3Id;
      // 获取品牌的信息
      const tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      this.tradeMarklist = tradeMarkResult.data;
      // 获取平台全部的销售属性
      const saleResult = await this.$API.spu.reqBaseSaleAttrList();
      this.saleAttrList = saleResult.data;
    },
  },
  computed: {
    // 计算出还未选择的销售属性
    unSelectSaleAttr() {
      //整个平台的销售属性一共三个：颜色、尺寸、版本----saleAttrList
      //当前sPu拥有的属于自己的销售属性 SPU.spuSaleAttrList ----颜色
      return this.saleAttrList.filter((item) => {
        return this.spu.spuSaleAttrList.every(
          (item1) => item.name != item1.saleAttrName
        );
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
