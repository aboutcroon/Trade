<template>
  <div class="contentBox system-article">
    <div style="width: 100%">
      <el-row
        :gutter="40"
        class="widthHeight"
        style="margin: 0; padding-top: 20px"
      >
        <el-col :xs="24" :sm="24" :lg="24">
          <!-- <el-divider content-position="left">查询选项</el-divider> -->
          <el-form
            ref="form"
            class="option"
            :model="formData"
            label-width="75px"
            :inline="true"
          >
            <!-- <el-row :gutter="23">
              <el-col :xs="24" :sm="24" :lg="8"> -->
            <el-form-item>
              <span
                class="icon iconfont iconfilter filter-button"
                @click="showFilter = !showFilter"
                ><span>筛选</span></span
              >
            </el-form-item>

            <el-form-item>
              <el-select v-model="formData.paras.competitionName" value-key="" placeholder="请筛选"  clearable @change="sl($event)" >
                <el-option v-for="item in gamesList"
                  :key="item.competitionId"
                  :label="item.competitionName"
                  :value="item.competitionName">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="width:193px">
              <el-input
                v-model="formData.menuName"
                prefix-icon="iconfont icon-sousuo iconsearchsvg"
                clearable
                placeholder="作品属性"
                @keyup.enter.native="getList()"
              />
            </el-form-item>
            <el-form-item style="width:193px">
              <el-date-picker
              style="width:193px"
                v-model="formData.paras.time"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
              />
            </el-form-item>

            
            <!-- </el-col> -->
            <el-form-item class="queryBtn">
              <el-button class="cx" @click="getList()">查询</el-button>
              <el-button
                class="filter-item"
                icon="el-icon-plus"
                @click="reset()"
                >重置</el-button
              >
              <el-button
                class="filter-item"
                icon="el-icon-plus"
                   @click="$store.commit('export/showExportBox')"
                >导出</el-button
              >
              <el-button
                class="filter-item"
                icon="el-icon-plus"
                @click="addShow()"
                >复审确认</el-button
              >
              <!-- <el-button
                class="filter-item"
                icon="el-icon-plus"
                @click="addShow()"
                >人气奖项确认</el-button
              >
              <el-button
                class="filter-item"
                icon="el-icon-plus"
                @click="addShow()"
                >分配</el-button
              > -->
            </el-form-item>
            <!-- </el-row> -->
          </el-form>
            <collapse-transition :collapseData="collapseData" :showFilter="showFilter" :formData="formData" @collapseFun="collapseFun"/>
          <el-table
            :data="list"
            style="width: 100%"
            row-key="id"
            :header-cell-style="{ background: '#F2F6FD' }"
            stripe
            default-expand-all
            @selection-change="changeFun"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column label="赛事名称" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span v-html="scope.row.competitionName" />
              </template>
            </el-table-column>
            <el-table-column label="奖项类型">
              <template slot-scope="scope">
                  <span v-html="scope.row.prizeName " />
              </template>
            </el-table-column>
            <el-table-column label="作品属性" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{ scope.row.propertyName }}</template>
            </el-table-column>
            <el-table-column label="作品类型" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{ scope.row.categoryName }}</template>
            </el-table-column>
            <el-table-column label="作品名称" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{ scope.row.worksName }}</template>
            </el-table-column>
            <el-table-column label="普通用户名" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{ scope.row.userName }}</template>
            </el-table-column>
            <el-table-column label="评委用户名" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{ scope.row.judgeUserName }}</template>
            </el-table-column>
            <el-table-column label="作品状态" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{ scope.row.worksStatus | severity }}</template>
            </el-table-column>
            <el-table-column label="上传时间" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime | timeFilter13 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="作品评分" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{ scope.row.worksScore }}</template>
            </el-table-column>
            <el-table-column label="星光值" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{ scope.row.starValue }}</template>
            </el-table-column>
            <el-table-column label="作品缩略图" >
              <template slot-scope="scope">
                <img :src="scope.row.worksJpgUrl|imgs" alt="" width="80" height="40">
              </template>
            </el-table-column>
           <el-table-column
              align="center"
              prop="created_at"
              label="操作"
              min-width="120"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-link v-if="scope.row.worksStatus != '6'" class="icon iconfont icontask" size="mini" type="primary" plain @click="goOpus(scope.row.worksId,scope.row.worksStatus)">查看&nbsp;&nbsp;</el-link>
                <el-link v-if="scope.row.worksStatus == '6'" class="icon iconfont iconxinhao1" size="mini" style="color:#005AB3" plain @click="goOpus(scope.row.worksId,scope.row.worksStatus)">评分</el-link>
                <!-- <el-link class="icon iconfont iconactivated" size="mini" type="success" plain @click="deleteFun(scope.row.menuId)">通过</el-link>
                <el-link class="icon iconfont iconchehuisekuai" size="mini" type="danger" plain @click="deleteFun(scope.row.menuId)">驳回</el-link> -->
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
    
      <!-- <el-dialog
        width="40%"
        :visible.sync="dialogVisible"
        :title="role.menuFlag== '1'? (dialogType==='edit' ? '编辑菜单':'新增菜单') : (dialogType==='edit' ? '编辑按钮' : '新增按钮')"
        :before-close="handleClose"
        :modal-append-to-body="false"
      >
        <el-form ref="formRole" :model="role" label-width="135px" label-position="left" :rules="rules">
          <el-form-item label="类型" prop="menuFlag">
            <el-radio v-model="role.menuFlag" label="1">菜单</el-radio>
            <el-radio v-model="role.menuFlag" label="2">按钮</el-radio>
          </el-form-item>
          <el-form-item :label="role.menuFlag== '1' ? '菜单名称':'按钮名称'" prop="menuName">
            <el-input
              v-model="role.menuName"
              :placeholder="role.menuFlag== '1' ? '请输入菜单名称' : '请输入按钮名称'"
            />
          </el-form-item>
          <el-form-item :label="role.menuFlag == '1' ? '菜单URL':'控制器方法'" prop="menuUrl">
            <el-input v-model="role.menuUrl" placeholder="请输入菜单URL" />
          </el-form-item>
          <el-form-item :label="role.menuFlag == '1' ? '菜单状态':'按钮状态'" prop="status">
            <el-select v-model="role.status" placeholder="请选择菜单状态">
              <el-option
                v-for="item in stateList"
                :key="item.key"
                  :label="item.value"
                  :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="role.menuFlag== '1'? true : false" label="图标">
            <el-input v-model="role.menuIcon" placeholder="请输入图标类名" />
          </el-form-item>
          <el-form-item v-if="role.menuFlag== '1'? true : false" label="是否在侧边栏显示">
            <el-select v-model="role.hiddened" placeholder="请选择是否在侧边栏显示">
              <el-option
                v-for="item in hiddenList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="排序" prop="orderNumber">
            <el-input
              v-model.number="role.orderNumber"
              @input="role.orderNumber = role.orderNumber.replace(/[^\d]/g,'')"
              maxlength="3"
              placeholder="请输入排序"
            />
          </el-form-item>
        </el-form>
        <div slot="footer" style="text-align:center;" class="dialog-footer">
          <el-button :loading="loading" class="cx" @click="dialogType == 'edit' ? modifyFun() : addFun()">保存</el-button>
          <el-button @click="handleClose()">关闭</el-button>
        </div>
      </el-dialog> -->
      
    </div>
  </div>
</template>
<script>
import review from "./review.js";
export default {
  ...review,
};
</script>
<style lang="scss">
.system-article {
  .el-table.el-table--small {
    padding-bottom: 3px;
  }
}
.selectForm{
  margin:0 10px;
  width: 90%;
  height: 200px;
  // background: #ccc;
  text-align: center;
  img {
    width: 40%;
  }
  .el-form-item{
    margin: 0 auto;
    width: 60%;
    .el-input{
      width: 70%;
    }
  }
}
</style>
