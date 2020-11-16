<template>
  <div class="contentBox system-article">
    <div style="width: 100%">
      <el-row
        :gutter="40"
        class="widthHeight"
        style="margin: 0; padding-top: 20px"
      >
        <el-col :xs="24" :sm="24" :lg="24">
          <el-form
            ref="form"
            class="option"
            :model="formData"
            label-width="75px"
            :inline="true"
          >
            <el-form-item>
              <el-input
                v-model="formData.paras.articleTitle"
                prefix-icon="iconfont icon-sousuo iconsearchsvg"
                clearable
                placeholder="搜索文章标题"
                @keyup.enter.native="getList()"
              />
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="formData.paras.articleTag"
                prefix-icon="iconfont icon-sousuo iconsearchsvg"
                clearable
                placeholder="搜索文章标签"
                @keyup.enter.native="getList()"
              />
            </el-form-item>
            <!-- <el-form-item>
              <el-input
                v-model="formData.paras.articleColumn"
                prefix-icon="iconfont icon-sousuo iconsearchsvg"
                clearable
                placeholder="搜索文章栏目"
                @keyup.enter.native="getList()"
              />
            </el-form-item> -->
            <el-form-item class="queryBtn">
              <el-button class="cx" @click="getList()">查询</el-button>
              <el-button
                class="filter-item"
                @click="reset()"
                >重置</el-button
              >
            </el-form-item>
              <addEditor class="add-fixed" ref="addEditor"></addEditor>
          </el-form>
          <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading"
            :header-cell-style="{ background: '#F2F6FD' }"
            highlight-current-row
            stripe
          >
            <el-table-column type="index"></el-table-column>
            <el-table-column label="文章标题" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span v-html="scope.row.articleTitle" />
              </template>
            </el-table-column>
            <el-table-column label="所属栏目" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{ scope.row.articleContent }}</template>
            </el-table-column>
            <el-table-column label="标签" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{ scope.row.articleTag }}</template>
            </el-table-column>
            <el-table-column label="访问统计" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{ scope.row.visitNumber  }}</template>
            </el-table-column>
            <el-table-column label="上传时间" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime | timeFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="状态" width="120">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status | severity">
                  <span
                    v-html="scope.row.status == '1' ? '已展示' : '已删除'"
                  />
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="created_at"
              label="操作"
              width="150"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-link
                v-if="scope.row.status == '1'"
                  size="mini"
                  type="primary"
                  plain
                  :underline="false"
                  @click="editFun(scope.row)"
                >
                  <span class="icon iconfont iconedit" />编辑</el-link>
                <el-link
                v-if="scope.row.status == '1'"

                  size="mini"
                  type="danger"
                  plain
                  @click="deleteFun(scope.row.articleId)"
                  ><span class="icon iconfont icondelete"/>删除 </el-link>
                   <el-link
                  v-if="scope.row.status != '1'"
                  size="mini"
                  type="danger"
                  plain
                  @click="editFun(scope.row)"
                  ><span class="icon iconfont icondelete"/>查看 </el-link>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="formData.totalRow > 0"
            :total="formData.totalRow"
            :page.sync="formData.pageNumber"
            :limit.sync="formData.pageSize"
            @pagination="getList"
          />
        </el-col>
      </el-row>
      
    </div>
  </div>
</template>
<script>
import article from "./article.js";
export default {
  ...article,
};
</script>
<style lang="scss">
.system-article {
  .el-table.el-table--small {
    padding-bottom: 3px;
  }
}
.add-fixed {
  position: fixed;
  bottom: 5%;
  right: 3%;
  z-index: 1002;
  
}
</style>
