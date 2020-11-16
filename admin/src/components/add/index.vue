<template>
  <div>
    <el-row>
      <el-form-item>
        <el-button type="success" icon="el-icon-plus" @click="addShow()" circle>
        </el-button>
      </el-form-item>
    </el-row>

    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
      width="1200px"
      @close="handleClose"
      :modal-append-to-body="false"
    >
     
      <div class="components-container">
        <div>
          <tinymce v-model="content" :height="600" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
export default {
  name: "addEditor",
      components: { Tinymce },
  data() {
    return {
        content:
        `
        <h3 style="">请输入文章标题（5~30字）</h3>
        <label style="margin-top:30px;">文章简介
          <input />
        </label><br>
        <label style="margin-top:30px;">文章标签
          <input />
        </label><br>
        <label style="margin-top:30px;">所属栏目
          <input />
        </label><br>
        <label style="margin-top:30px;">排序
          <input />
        </label><br>
        
        <label style="margin-top:30px;">封面图片
          <input />
        </label><br>
        `,
      /** 菜单隐藏显示 */
      dialogVisible: false,
    };
  },
  methods: {
    addShow() {
      this.dialogVisible = true;
    },
    /** 关闭弹框 */
    handleClose() {
      this.dialogVisible = false;
      /** 恢复初始化数据 */
      //   this.role = this.$options.data().role
    },
    
  },
};
</script>

<style lang="scss" scoped>
// .el-dialog {
//   height: 600px;
// }
</style>
