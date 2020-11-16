<template>
  <div class="trade-list">
    <div class="title">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="作品名称：" size="medium">
          <el-input v-model="formInline.paras.worksName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="赛事名称：" size="medium">
          <el-select v-model="formInline.paras.competitionId" placeholder="请筛选">
            <el-option v-for="item in matchList" :value="item.value" :key="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" class="trade-list-btn btn-confirm" @click="getList">查询</el-button>
        <el-button type="primary" class="trade-list-btn btn-reset" @click="reset">重置</el-button>
        <router-link to="/user/uploadTrade">
          <el-button type="primary" class="trade-list-btn btn-new">新增</el-button>
        </router-link>
      </el-form>
    </div>
    <div v-if="dataObj.length!==0" class="guest-content">
      <trade-item-list v-for="(item,index) in dataObj" :key="index" :dataObj='item' @handleWorkDelete="handleWorkDelete"></trade-item-list>
    </div>
    <div class="trade-list-empty" v-else>
      <img :src="emptyUrl" class="trade-empty-icon"/>
      <div class="trade-empty-msg">亲，你还没有上传作品哦</div>
    </div>
  </div>
</template>
<script>
  import TradeItemList from "./TradeListItem.vue";
  import GrayBlock from './GrayBlock.vue'
  import {getFun, postFun} from '@/api/transit.js'
  import time from '@/api/time.js'
  export default {
    name: "contentWork",
    components: {
      TradeItemList
    },
    data() {
      return {
        emptyUrl: require("@/assets/img/trade_list_empty.png"),
        // 查询数据
        formInline: {
          paras: {
            worksName: '',
            competitionId: '',
          },
          pageSize: 20,
          pageNumber: 1,
        },
        matchList: [],
        // 作品数据
        dataObj: []
      };
    },
    mounted() {
      
    },
    created() {
      this.getList()
      this.getCompetitionListData()
    },
    methods: {
      // 重置
      reset() {
        this.formInline.paras.worksName = ''
        this.formInline.paras.competitionId = ''
        this.getList()
      },
      // 加载数据
      getList () {
        this.formInline.paras = time.nullValueFun(this.formInline.paras)
        const param = time.nullValueFun(this.formInline)
        this.getWorksList(param).then(response => {
          if (response.code === '200' || response.code === 200) {
            let dataList = response.data.list
            let tmpList = []
            for (let item of dataList) {
              const obj = {
                worksId: item.worksId,
                eventName: item.competitionName,
                picture: item.worksJpgUrl,
                name: item.worksName,
                describe: item.worksDescription,
                great: item.agreeNumber,
                visit: item.starValue,
              }
              tmpList.push(obj)
            }
            this.dataObj = tmpList
          } else {
            this.$message.error(response.message)
          }
        })
      },
      // 获取赛事名称
      getCompetitionListData() {
        this.getCompetitionList().then(response => {
          if (response.code === '200' || response.code === 200) {
            let list = response.data
            for (let i of list) {
              this.matchList.push({
                value: i.competitionId,
                label: i.competitionName
              })
            }
          } else {
            this.$message.error(message)
          }
        })
      },
      // 处理删除作品:刷新列表
      handleWorkDelete() {
        this.getList()
      },
      // 获取作品列表
      getWorksList(param) {
        return postFun('/trade-web/api/works/pageListByUser', param)
      },
      // 获取赛事名称
      getCompetitionList(param) {
        return getFun('/trade-web/api/competition/list', param)
      },
      getValue(val) {
        if (val) {
          return val
        } else {
          return 0
        }
      }
    }
  };
</script>
<style lang="scss">
  .trade-list {
    .el-form-item__label {
      height: 44px;
      line-height: 44px;
    }
    .el-input, .el-select {
      width: 334px;
      height: 44px;
      margin-right: 20px;

      .el-icon-arrow-up:before {
        content: "\e78f" !important;
      }

      .el-input__inner {
        height: 44px;
        line-height: 44px;
      }

    }

    .trade-list-btn {
      width: 86px;
      height: 44px;
      padding: 0;
      margin: 0 16px 0 0;
    }
    .btn-confirm {
      background-color: #FF0000;
      font-size: 16px;
      font-family: SourceHanSansCN;
      font-weight: 400;
      color: #FFFFFF;
    }
    .btn-reset {
      border: 1px solid #FF0000;
      background-color: transparent;
      font-size: 16px;
      font-family: SourceHanSansCN;
      font-weight: 400;
      color: #FF0000;
    }
    .btn-new {
      border: 1px solid #FF9C00;
      background-color: #FF9C00;
      font-size: 16px;
      font-family: SourceHanSansCN;
      font-weight: 400;
      color: #FFFFFF;
    }

    .guest-content {
      /* display: flex;
      justify-content: space-between; */
      overflow: hidden;
      width: 100%;
    }

    .trade-list-empty {
      width: 100%;
      height: 500px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .trade-empty-icon {
        width: 114px;
        height: 114px;
        margin: 0 auto;
      }

      .trade-empty-msg {
        text-align: center;
        margin-top: 25px;
        height: 18px;
        font-size: 16px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: #999999;
      }
    }
  }
</style>