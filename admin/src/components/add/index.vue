<template>
  <div class="add">
    <el-row>
      <el-form-item>
        <el-button type="success" icon="el-icon-plus" @click="addShow()" circle>
        </el-button>
      </el-form-item>
    </el-row>
    <el-dialog title="新增文章" :visible.sync="dialogVisible" width="60vw" style="height:800px !important;" @close="handleClose" :append-to-body="true" :modal-append-to-body="false">
      <el-form ref="form" :model="form" label-width="80px" labelPosition="left">
        <el-row>
          <el-form-item label="标题">
            <el-input style="width:20vw" v-model="form.articleTitle" :disabled="!form.status"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="简介">
            <el-input :disabled="!form.status" style="width:20vw" v-model="form.articleSummary"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="标签">
            <el-input :disabled="!form.status" style="width:20vw" v-model="form.articleTag"></el-input>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="排序数字">
            <el-input :disabled="!form.status" style="width:20vw" v-model="form.orderNumber"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="文章栏目(非必填)">
            <el-select style="width:20vw" v-model="form.articleColumn" placeholder="请选择" :disabled="!form.status">
              <el-option label="首页推荐" value="首页推荐"></el-option>
              <el-option label="新闻页推荐" value="新闻页推荐"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="封面图片">
            <el-upload class="upload-demo" v-if="dialogVisible" :disabled="!form.status" style="width:20vw;margin-left: 81px;margin-top: 10px;" drag :on-success="handleImageSuccess" name="image" :on-change="handleImageSelect" action="/trade-admin/api/article/imageUpload" :multiple="false" :with-credentials="true" :headers="headers">
              <img v-show="imageUrl" :src="imageUrl" class="upload-profile" width="360" height="180">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">点击新增/修改图片，推荐大小为200*200;上传图片不超过3M，格式为jpg，png。</div>
            </el-upload>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="文章内容" style="position: relative;">
            <Tinymce style="width:50vw;margin-top: 40px;" v-model="form.articleContent" v-if="dialogVisible" ref="tiny"></Tinymce>
            <div :class="{hide:!form.status}" >
            </div>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="操作" v-if="form.status">
            <el-button type="primary" @click="submit"> 确认</el-button>
            <el-button @click="handleClose">取消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <!-- <div>
          
        </div> -->
    </el-dialog>
  </div>
</template>

<script>
import { getToken, setToken, removeToken } from "@/utils/auth";

import Tinymce from "@/components/Tinymce";
import { postFun, getFun, formDataFun, postHeaderFun } from "@/api/common";
export default {
  name: "addEditor",
  components: { Tinymce },
  data() {
    return {
      headers: {
        Authorization: getToken(),
      },
     
      form: {
        cover: null,
        articleTitle:'',
        articleSummary:'',
        articleTag:'',
        orderNumber:'',
        articleColumn:'',
        articleContent:'',
        status: true,
      },
      content: "",
      /** 菜单隐藏显示 */
      dialogVisible: false,
      file1: null,
      imageUrl: null,
    };
  },
  methods: {
    created () {
      this.form.articleContent = ''
    },
    mounted () {
      this.form.articleContent = ''
      this.$refs.tiny.setContent('')
    },
    addShow() {
      this.dialogVisible = true;
    },
    // 上传文件处理
    handleVectorSuccess(res, file) {},
    handleImageSuccess(res, file) {
      this.imageUrl = res.data.imageUrl;
    },
    handleImageSelect(file, fileList) {
      if (file) {
        const fileExt = ["jpeg", "jpg", "png",
        ].includes(file.name.split(".").pop().toLocaleLowerCase());
        if (fileExt) {
          this.imageUrl = URL.createObjectURL(file.raw);
          this.file1 = file;
          this.form.cover = file;
        } else {
          this.$message.error("上传的图片格式不正确");
        }
      }
    },
    async submit() {
      let res = new FormData();
      res.append("cover", this.file1);
      const { data } = await postHeaderFun( "/trade-admin/api/article/add", this.form, { "Content-Type": "multipart/form-data" });
    },
    /** 关闭弹框 */
    handleClose() {
      this.dialogVisible = false;
      Object.assign(this.$data,this.$options.data())
      this.form.status = true
    },
  },
};
</script>

<style lang="scss" scoped>
// .el-dialog {
//   height: 600px;
// }

/deep/ .el-dialog {
  height: 700px;
  overflow: auto;
  padding: 0px 40px;
}
/deep/ .el-form-item__content {
  margin-left: 0 !important;
}
.hide {
      background-color: #E4E7ED;
    opacity: 0.8;
    top: 40px;
    position: absolute;
    width: 50.2vw;
    height: 466px;
    cursor: not-allowed;
    z-index: 9999;
}
</style>
