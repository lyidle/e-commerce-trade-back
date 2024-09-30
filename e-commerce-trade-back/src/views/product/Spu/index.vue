<template>
  <div>
    <el-card>
      <!-- 三级分类 -->
      <CategorySelect @submitCategoryId="getCategoryId" :show="scene != 0" />
    </el-card>
    <el-card>
      <div v-show="scene === 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSpu"
          >添加SPU</el-button
        >
        <!-- 底部按钮 -->
        <el-table style="width: 100%" border :data="records">
          <el-table-column
            type="index"
            prop="prop"
            label="序号"
            width="80"
            align="center"
          >
          </el-table-column
          ><el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column
          ><el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column
          ><el-table-column prop="prop" label="操作" width="width">
            <template v-slot="{ row, $index }">
              <!-- button 用来进行切换 HintButton -->
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSku(row)"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updateSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部sku列表"
                @click="showGallery(row)"
              ></hint-button>
              <el-popconfirm
                :title="`确定删除${row.spuName}吗？`"
                @onConfirm="deleteSpu(row)"
              >
                <hint-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference"
                ></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout="prev,pager,next,jumper,->,sizes,total"
          :total="total"
          @current-change="getSpuList"
          @size-change="handleSizeChange"
          style="text-align: center"
        >
        </el-pagination>
      </div>
      <SpuForm
        v-show="scene === 1"
        @changeScene="changeScene"
        ref="spu"
      ></SpuForm>
      <SkuForm
        v-show="scene === 2"
        ref="sku"
        @changeScene="changeScene"
      ></SkuForm>
    </el-card>
    <el-dialog
      :title="`${spu.spuName}的sku列表`"
      :visible.sync="dialogTableVisible"
      :before-close="close"
    >
      <el-table :data="skuList" style="width: 100%" border v-loading="loading">
        <el-table-column prop="skuName" label="名称" width="width">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="width">
        </el-table-column>
        <el-table-column prop="weight" label="重量" width="width">
        </el-table-column>
        <el-table-column label="默认图片" width="width">
          <template v-slot="{ row, $index }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SkuForm from "@/views/product/Spu/SkuForm";
import SpuForm from "@/views/product/Spu/SpuForm";
export default {
  name: "Spu",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 控制多级分类的 disabled值
      show: true,
      page: 1, //分页器当前第几页
      limit: 3, //每一页需要展示多少条数据
      records: [], //spu列表的数据
      total: 0, //分页器一共需要展示数据的条数
      scene: 0, //// 0代表展示SPU列表数据 1添加SPU修改SPU 2添加SKU
      // 查看当前spu全部sku列表 显示与隐藏
      dialogTableVisible: false,
      spu: {},
      skuList: [], //存储的是sKu列表的数据
      loading: true,
    };
  },
  components: {
    SkuForm,
    SpuForm,
  },
  methods: {
    // 获取到对应数据
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
          this.getSpuList();
          break;
      }
    },
    // 获取SPU列表数据的方法
    async getSpuList(pages = 1) {
      this.page = pages;
      const { page, limit, category3Id } = this;
      try {
        const result = await this.$API.spu.reqSpuList(page, limit, category3Id);
        this.total = result.data.total;
        this.records = result.data.records;
      } catch (error) {}
    },
    // 当分页器的某一个展示数据条数发生变化的回调
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    // 添加SPU按钮的回调
    addSpu() {
      this.scene = 1;
      // 通知子组件spuForm发请求---两个
      this.$refs.spu.addSpuData(this.category3Id);
    },
    // 修改某一个SPU
    updateSpu(row) {
      this.scene = 1;
      this.$refs.spu.initSpuData(row);
    },
    // 自定义事件回调（SpuForm）
    changeScene({ scene, flag }) {
      // 内容区域切换
      this.scene = scene;
      // 更新数据
      if (flag === "修改" || flag === "" || flag === "添加SKU")
        this.getSpuList(this.page);
      else this.getSpuList();
    },
    // 删除SPU的回调
    async deleteSpu(row) {
      try {
        await this.$API.spu.reqDeleteSpu(row.id);
        this.$message({ type: "success", message: "删除成功~" });
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      } catch (error) {}
    },
    // 添加SKU按钮的回调
    addSku(row) {
      this.scene = 2;
      // 父组件调用子组件的方法，让子组件发请求------三个请求
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
    // 查看SKU的按钮的回调
    async showGallery(spu) {
      this.dialogTableVisible = true;
      this.spu = spu;
      //获取sku列表的数据进行展示
      try {
        let result = await this.$API.spu.reqSkuList(spu.id);
        this.skuList = result.data;
        this.loading = false;
      } catch (error) {}
    },
    // 关闭对话框的回调
    close(done) {
      //loading属性再次变为真
      this.loading = true;
      //清除sku列表的数据
      this.skuList = [];
      done()
    },
  },
};
</script>

<style lang="scss" scoped></style>
