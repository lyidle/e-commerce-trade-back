<template>
  <el-form ref="form" label-width="80px">
    <el-form-item label="SPU名称">{{ spu.spuName }}</el-form-item>
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input
        placeholder="价格(元)"
        type="number"
        v-model="skuInfo.price"
      ></el-input>
    </el-form-item>
    <el-form-item label="重量(千克)">
      <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
    </el-form-item>
    <el-form-item label="规格描述">
      <el-input type="textarea" rows="4" v-model="skuInfo.skuDesc"></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form :inline="true" ref="form" label-width="80px">
        <el-form-item
          :label="attr.attrName"
          v-for="attr in attrInfoList"
          :key="attr.id"
        >
          <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
            <el-option
              :label="attrValue.valueName"
              :value="`${attr.id}:${attrValue.id}`"
              v-for="attrValue in attr.attrValueList"
              :key="attrValue.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true" ref="form" label-width="80px">
        <el-form-item
          :label="saleAttr.saleAttrName"
          v-for="saleAttr in spuSaleAttrList"
          :key="saleAttr.id"
        >
          <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
            <el-option
              :label="saleAttrValue.saleAttrValueName"
              :value="`${saleAttr.id}:${saleAttrValue.id}`"
              v-for="saleAttrValue in saleAttr.spuSaleAttrValueList"
              :key="saleAttrValue.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片列表">
      <el-table
        style="width: 100%"
        border
        :data="spuImageLIst"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="prop" label="图片" width="width">
          <template v-slot="{ row, $index }">
            <img :src="row.imgUrl" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column prop="imgName" label="名称" width="width">
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="width">
          <template v-slot="{ row, $index }">
            <el-button
              type="primary"
              style="margin: 10px"
              v-if="row.isDefult == 0"
              @click="changeDefault(row)"
              >设置默认</el-button
            >
            <el-button style="margin: 10px" v-else>默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      // 存储图片的信息
      spuImageLIst: [],
      // 存储销售属性
      spuSaleAttrList: [],
      //存储平台属性的数据
      attrInfoList: [],
      //收集sku数据的字段
      skuInfo: {
        // 第一类收集的数据：父组件给的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,

        // 第二类：需要通过数据双向绑定v-model收集
        price: 0,
        skuName: "",
        weight: "",
        skuDesc: "",

        // 第三类：需要自己书写代码
        // 默认图片
        skuDefaultImg: "",
        // 收集图片的字段
        skuImageList: [
          // {
          // imgName: "string",
          // imgUrl: "string",
          // isDefault: "string",
          // spuImgId: 0,
          // },
        ],
        // 平台属性
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0,
          // },
        ],
        //销售属性
        skuSaleAttrValueList: [
          // {
          //   saleAttrId: 0,
          //   saleAttrValueId: 0,
          // },
        ],
      },
      spu: {},
      ///收集图片的数据字段：便是需要注意，收集的数据目前缺少isDefault字段设，将来提交给服务器数据的时候，需要整理参数
      imageList: [],
    };
  },
  methods: {
    //获取skuForm数据
    async getData(category1Id, category2Id, spu) {
      //收集父组件给予的数据
      this.skuInfo.category3Id = spu.category3Id;
      this.skuInfo.spuId = spu.id;
      this.skuInfo.tmId = spu.tmId;
      // 需要双向绑定收集数据
      this.spu = spu;
      //获取图片的数据临
      const result = await this.$API.spu.reqSpuImageList(spu.id);
      const list = result.data;
      list.forEach((Item) => {
        Item.isDefult = 0;
      });
      this.spuImageLIst = list;
      //获取销售属性的数据
      const result1 = await this.$API.spu.reqSpuSaleAttrList(spu.id);
      this.spuSaleAttrList = result1.data;
      //获取平台属性的数据
      let result2 = await this.$API.spu.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      this.attrInfoList = result2.data;
    },
    // table表格复选框按钮的事件
    handleSelectionChange(params) {
      // 获取到用户选中图片的信息数据，但是需要注意，当前收集的数据当中，缺少isDefault字段
      this.imageList = params;
    },
    // 设置默认事件
    changeDefault(row) {
      // 排他
      this.spuImageLIst.forEach((item) => (item.isDefult = 0));
      // 选择的默认
      row.isDefult = 1;
      //收集默认图片的地址
      this.skuInfo.skuDefaultImg = row.imgURl;
    },
    // 取消事件
    cancel() {
      this.$emit("changeScene", { scene: 0, flag: "添加SKU" });
      //清除数据
      Object.assign(this._data, this.$options.data());
    },
    // 保存按钮的事件
    async save() {
      //整理参数
      const { attrInfoList, skuInfo, spuSaleAttrList, imageList } = this;
      // 把收集到的数据线整理一下
      // 整理平台属性 attrIdAndValueId 放入skuAttrValueList
      skuInfo.skuAttrValueList = attrInfoList.reduce((pre, item) => {
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(":");
          pre.push({ attrId, valueId }); //如果有就push到数组中进行下次运算
        }
        return pre;
      }, []);
      // 整理销售属性
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((pre, item) => {
        if (item.attrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] =
            item.attrIdAndValueId.split(":");
          pre.push({ saleAttrId, saleAttrValueId });
        }
        return pre;
      }, []);
      // 整理图片的数据
      skuInfo.skuImageList = imageList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,
        };
      });
      try {
        const result = await this.$API.spu.reqAddSku(skuInfo);
        this.$message({ type: "success", message: "添加SKU成功" });
        this.$emit("changeScene", { scene: 0, flag: "添加SKU" });
        //清除数据
        Object.assign(this._data, this.$options.data());
      } catch (error) {}
    },
  },
};
</script>

<style lang="scss" scoped></style>
