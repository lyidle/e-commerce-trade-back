<template>
  <div>
    <!-- 表格 -->
    <el-table style="width: 100%" border :data="records">
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="默认图片" width="110">
        <template v-slot="{ row, $index }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 80px; height: 80px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80"> </el-table-column>
      <el-table-column prop="price" label="价格" width="80"> </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template v-slot="{ row, $index }">
          <el-button
            type="success"
            icon="el-icon-top"
            size="mini"
            style="margin: 10px"
            v-if="row.isSale === 0"
            @click="sale(row)"
          ></el-button>
          <el-button
            v-else
            type="info"
            icon="el-icon-bottom"
            size="mini"
            style="margin: 10px"
            @click="cancel(row)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            style="margin: 10px"
            @click="edit()"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            style="margin: 10px"
            @click="getSkuInfo(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            style="margin: 10px"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页  -->
    <el-pagination
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout=" prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @current-change="getSkuList"
      @size-change="handleSizeChange"
      style="text-align: center"
    >
    </el-pagination>
    <!-- skuInfo 信息 -->
    <el-drawer :visible.sync="drawer" :show-close="false" size="50%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag
            type="success"
            v-for="attr in skuInfo.skuAttrValueList"
            :key="attr.id"
            style="margin-right: 10px"
          >
            {{ attr.attrId }}--{{ attr.valueId }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="150px">
            <el-carousel-item
              v-for="item in skuInfo.skuImageList"
              :key="item.id"
            >
              <img :src="item.imgUrl" alt="" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      page: 1, //代表当前第几页
      limit: 3, //代表当前页面有几条数据
      records: [], //存储SKU列表的数据
      total: 0, //存储分页器一共展示的数据
      skuInfo: {}, //存储SKU信息
      drawer: false,
    };
  },
  beforeMount() {
    // 得到数据
    this.getSkuList();
  },
  methods: {
    // 得到数据
    async getSkuList(pages = 1) {
      this.page = pages;
      const { page, limit } = this;
      try {
        const result = await this.$API.sku.reqSkuList(page, limit);
        this.total = result.data.total;
        this.records = result.data.records;
      } catch (error) {}
    },
    // 分页器限制
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSkuList();
    },
    // 上架
    async sale(row) {
      try {
        await this.$API.sku.reqSale(row.id);
        row.isSale = 1;
        this.$message({ type: "success", message: "上架成功" });
      } catch (error) {
        this.$message({ type: "warning", message: "上架失败" });
      }
    },
    // 下架
    async cancel(row) {
      try {
        await this.$API.sku.reqCancel(row.id);
        row.isSale = 0;
        this.$message({ type: "success", message: "下架成功" });
      } catch (error) {
        this.$message({ type: "warning", message: "下架失败" });
      }
    },
    // 开发中
    edit() {
      this.$message("正在开发中……");
    },
    // 获取SKU详情的方法
    async getSkuInfo(sku) {
      this.drawer = true;
      try {
        const result = await this.$API.sku.reqSkuById(sku.id);
        this.skuInfo = result.data;
      } catch (error) {}
    },
  },
};
</script>

<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
>>> .el-carousel__button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgb(170, 217, 236);
}
</style>
