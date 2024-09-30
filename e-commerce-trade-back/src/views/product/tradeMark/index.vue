<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0"
      @click="showDialog"
      >添加</el-button
    >
    <!-- 表格 -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column label="品牌LOGO" width="width">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" alt="" style="height: 100px; width: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :pager-count="9"
      :page-sizes="[3, 5, 10]"
      @current-change="handlePage"
      @size-change="handlePageList"
      layout="prev, pager, next, jumper,->,sizes,total"
    >
    </el-pagination>
    <!-- 对话框 -->
    <el-dialog
      :title="tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <el-form style="width: 80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <!-- 需要自己定义需要收集的数据属性 -->
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/manager/product/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    return {
      // 代表的分页器第几页
      page: 1,
      //当前页数展示数据条数
      limit: 3,
      // 总共数据条数
      total: 0,
      // 列表展示的数据
      list: [],
      // 对话框显示马隐藏控制的属性
      dialogFormVisible: false,
      // 收集品牌信息
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
      // 表单验证
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change",
          },
        ],
        logoUrl: [{ required: true, message: "请选择品牌的图片" }],
      },
    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    // 发起请求得到数据
    async getPageList(pager = 1) {
      this.page = pager;
      const { page, limit } = this;
      try {
        const result = await this.$API.tradeMark.reqTradeMarkList(page, limit);
        this.total = result.data.total;
        this.list = result.data.records;
      } catch (error) {
        console.log(error);
      }
    },
    // 当页面修改时
    handlePage(pager) {
      this.page = pager;
      this.getPageList(this.page);
    },
    // 当条数发生变化时
    handlePageList(limit) {
      this.limit = limit;
      this.getPageList(this.limit);
    },
    // 点击添加品牌的按钮
    showDialog() {
      this.dialogFormVisible = true;
      // 每次打开初始化数据
      this.tmForm = {
        tmName: "",
        logoUrl: "",
      };
    },
    // 添加成功的回调
    handleAvatarSuccess(res) {
      //res：上传成功之后返回前端数据
      //file：上传成功之后服务器返回前端数据
      //收集品牌图片数据，因为将来需要带给服务器
      this.tmForm.logoUrl = res.data;
    },
    // 上传成功的回调
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 确定按钮添加和修改品牌发起请求和更新数据
    addOrUpdateTradeMark() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          try {
            await this.$API.tradeMark.reqAddOrUpdateTradeMark(this.tmForm);
            // 弹出信息
            this.$message({
              type: "success",
              message: this.tmForm.id ? "修改品牌成功" : "添加品牌成功",
            });
            // 更新数据
            this.getPageList(this.tmForm.id ? this.page : 1);
          } catch (error) {
            // 弹出信息
            this.$message({
              type: "warning",
              message: this.tmForm.id ? "修改品牌失败" : "添加品牌失败",
            });
          }
        } else {
          return false;
        }
      });
    },
    // 修改某个品牌
    updateTradeMark(row) {
      this.dialogFormVisible = true;
      // 使用浅拷贝 避免影响到表格的数据
      this.tmForm = { ...row };
    },
    // 删除品牌的操作
    deleteTradeMark(row) {
      this.$confirm(`您确认真的要删除${row.tmName}吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$API.tradeMark.reqDeleteTradeMark(row.id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getPageList(this.list > 1 ? this.page : this.page - 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<!-- <style lang="scss" scoped> -->
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
