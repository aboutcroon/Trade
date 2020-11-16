<template>
  <div class="exhibition">
    <BreadCrumbs
      title="作品展示厅"
      title-right=""
      description="美感与设计的结合，尽在此时"
      :url="backgroundUrl"
      :crumb="[{title: '作品展示厅', link: 'exhibition'}]"
    />
    <div class="exhibition-container1">
      <section class="background-one container">
        <div class="check-label">赛事名称（必选）</div>
        <el-radio-group v-model="formData.paras.competitionId" size="medium" class="exhibition-radio-group" @change="handleCompetitionChange">
          <el-radio-button v-for="item in competitionList" :label="item.value" :key="item.value">{{item.label}}</el-radio-button>
        </el-radio-group>
        <div class="exhibition-filter" @click="filter = !filter">
          {{filter?'收起筛选':'展开筛选'}}
          <svg class="icon collapse-filter-icon" :class="filter?'':'filter-show'" aria-hidden="true">
            <use xlink:href="#icon_drop_down"></use>
          </svg>
        </div>
      </section>
    </div>
    <div v-show="filter">
      <section class="background-one container exhibition-filter-container">
        <div class="check-label">阶段状态</div>
        <el-radio-group v-model="formData.paras.competitionId" size="medium" class="exhibition-radio-group2" @change="handleCompetitionChange">
          <el-radio v-for="item in competitionList" :label="item.value" :key="item.value">{{item.label}}</el-radio>
        </el-radio-group>
        <el-button class="exhibition-btn" size="small">确定</el-button>
      </section>
      <section class="background-one container exhibition-filter-container">
        <div class="check-label">奖项类型（多选）</div>
        <el-checkbox label="全部" name="全部"></el-checkbox>
        <el-checkbox label="金奖" name="金奖"></el-checkbox>
        <el-checkbox label="银奖" name="银奖"></el-checkbox>
        <el-checkbox label="铜奖" name="铜奖"></el-checkbox>
        <el-checkbox label="人气奖" name="人气奖"></el-checkbox>
        <el-checkbox label="正在评比中" name="正在评比中"></el-checkbox>
      </section>
      <section class="background-one container exhibition-filter-container">
        <div class="check-label">奖项属性（多选）</div>
        <el-checkbox label="全部" name="全部"></el-checkbox>
        <el-checkbox label="金奖" name="金奖"></el-checkbox>
        <el-checkbox label="银奖" name="银奖"></el-checkbox>
        <el-checkbox label="铜奖" name="铜奖"></el-checkbox>
        <el-checkbox label="人气奖" name="人气奖"></el-checkbox>
        <el-checkbox label="正在评比中" name="正在评比中"></el-checkbox>
      </section>
      <section class="background-one container exhibition-filter-container">
        <div class="check-label">奖项等级（多选）</div>
        <el-checkbox label="全部" name="全部"></el-checkbox>
        <el-checkbox label="金奖" name="金奖"></el-checkbox>
        <el-checkbox label="银奖" name="银奖"></el-checkbox>
        <el-checkbox label="铜奖" name="铜奖"></el-checkbox>
        <el-checkbox label="人气奖" name="人气奖"></el-checkbox>
        <el-checkbox label="正在评比中" name="正在评比中"></el-checkbox>
        <el-button class="exhibition-btn" size="small">确定</el-button>
      </section>
    </div>
    <div class="background-grey">
      <section class="background-one">
        <div class="part container exhibition-container">
          <div v-if="dataObj" class="guest-content">
            <work-card v-for="(item,index) in dataObj" :key="index" :dataObj='item'></work-card>
          </div>
          <pagination :page="formData.pageNumber" :total="total" @pagination="handlePageNumber"></pagination>
        </div>
      </section>
    </div>

  </div>
</template>
<script>
  import SubTitle from "@/components/SubTitle.vue"; // 小标题
  import BreadCrumbs from "@/components/BreadCrumbs.vue"; // 背景
  import WorkCard from "./components/WorkCard.vue";
  import Pagination from "./components/ElPagination.vue";
  import {getFun, postFun} from '@/api/transit.js'
  import time from '@/api/time.js'
  export default {
    components: {
      SubTitle,
      BreadCrumbs,
      WorkCard,
      Pagination
    },
    data() {
      return {
        backgroundUrl: require("@/assets/img/exhibition_background.jpg"),
        filter: false,
        // 分页
        formData: {
          pageSize: 12,
          pageNumber: 1,
          paras: {
            competitionId: '',
          }
        },
        total: 10,

        // 筛选
        competitionList: [],
        competition: '',
        checkList: [],
        dataObj: [],

        prizeRateNameList: [{

        }],

      }
    },
    mounted() {
      this.init()
    },
    methods: {
      // 数据初始化
      init() {
        // 获取赛事列表
        this.getCompetitionListData()
        // 获取筛选列表
        this.getDictData()
        // 获取作品列表
        this.getList()
      },
      // 翻页
      handlePageNumber(pageNumber) {
        this.formData.pageNumber = pageNumber.page
        this.getList()
      },
      // 加载数据
      getList () {
        let param = this.formData
        param.paras = time.nullValueFun(this.formData.paras)
        this.getWorksList(param).then(response => {
          if (response.code === '200' || response.code === 200) {
            const dataList = response.data.list
            const tmpList = []
            this.total = response.data.totalRow
            for (let item of dataList) {
              const obj = {
                eventName: "中华商标大赛",
                picture: item.worksJpgUrl,
                name: item.worksName,
                author: item.worksDesigner,
                type: 1,
                worksId: item.worksId,
                great: this.getValue(item.agreeNumber),
                visit: this.getValue(item.starValue)
              }
              tmpList.push(obj)
            }
            this.dataObj = tmpList
          } else {
            this.$message.error(response.message)
          }
        })
      },
      getCompetitionListData() {
        this.getCompetitionList().then(response => {
          if (response.code === '200' || response.code === 200) {
            let list = response.data
            for (let i of list) {
              this.competitionList.push({
                value: i.competitionId,
                label: i.competitionName
              })
            }
            if (this.competitionList) {
              this.formData.paras.competitionId = this.competitionList[0].value
              // 获取其它数据
            }
          } else {
            this.$message.error(message)
          }
        })
      },
      // 获取筛选列表
      getDictData() {
        this.getDict().then(response => {
          if (response.code === '200' || response.code === 200) {
            let data = response.data
//            this.tradeAttrList = []
//            for (let i of data['作品属性']) {
//              this.tradeAttrList.push({
//                value: i.key,
//                label: i.value
//              })
//            }
//            if (this.tradeAttrList && !this.worksId) {
//              this.formTrade.worksPropertyId = this.tradeAttrList[0].value
//            }
//            this.tradeTypeList = []
//            for (let i of data['作品类型']) {
//              this.tradeTypeList.push({
//                value: i.key,
//                label: i.value
//              })
//            }
//            if (this.tradeTypeList && !this.worksId) {
//              this.formTrade.categoryId = this.tradeTypeList[0].value
//            }
          } else {
            this.$message.error(message)
          }
        })
      },
      // 处理赛事变更
      handleCompetitionChange(val) {
        this.getList()
      },
      getCompetitionList(param) {
        return getFun('/trade-web/api/competition/list', param)
      },
      getWorksList(param) {
        return postFun('/trade-web/api/works/pageList', param)
      },
      // 获取筛选列表
      getDict(param) {
        return getFun('/trade-web/api/dict', param)
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
  @import "../../assets/palette.scss";

  .exhibition {
    .background-one {
      min-width: $min-container;
    }
    .background-grey {
      background-color: #F9F9F9;
    }
    .guest-content {
      overflow: hidden;
      width: 100%;
    }

    .exhibition-container {
      padding: 20px 20px 46px 20px;
    }
    .exhibition-container1 {
      height: 85px;
      padding: 26px 0;
      border-bottom: 1px #F0F0F0 solid;

      .el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
        box-shadow: none;
      }

      .el-radio-button__inner {
        border: none;
        border-radius: 0;
      }
    }
    .exhibition-btn {
      float: right;
      height: 34px;
      width: 76px;
      padding: 0;
      background-color: #ff0000;
      border-color: #ff0000;
      color: #ffffff;
    }

    .exhibition-radio-group {
      display: inline-block;
      vertical-align: top;
    }
    .exhibition-filter {
      display: inline-block;
      float: right;
      vertical-align: top;
      line-height: 34px;
      font-size: 16px;
      font-family: SourceHanSansCN;
      font-weight: 400;
      color: #333333;
      cursor: pointer;
    }
    .collapse-filter-icon {
      transition: .6s;
    }
    .filter-show {
      transform: rotate(-180deg);
    }
    .check-label {
      display: inline-block;
      vertical-align: middle;
      line-height: 34px;
      text-align: left;
      width: 150px;
      height: 34px;
      font-size: 16px;
      font-family: SourceHanSansCN;
      font-weight: 400;
      color: #111111;

    }
    .exhibition-filter-container {
      height: 69px;
      padding-top: 16px;

      .exhibition-radio-group2 {
        height: 53px;
        line-height: 53px;
        vertical-align: top;
      }
    }
  }

</style>