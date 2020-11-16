<template>
  <div class="exhibition-detail">
    <BreadCrumbs
      title="作品展示厅"
      title-right=""
      description="描述"
      :url="backgroundUrl"
      :crumb="[{title: '作品展示厅', link: 'exhibition'},{title: '作品详情', link: 'exhibitionWorkDetail'}]"
    />
    <section class="background-one">
      <div class="part container exhibition-container">
        <div class="img-container">
          <img :src="workUrl"/>
        </div>
        <el-form labelWidth="94px" class="work-detail-form">
          <el-form-item label="作品哈希：">
            <span>{{czHash}}</span>
          </el-form-item>
          <el-form-item label="作品名称：">
            <span>{{worksName}}</span>
          </el-form-item>
          <el-form-item label="作者名称：">
            <span>{{worksDesigner}}</span>
          </el-form-item>
          <el-form-item label="作品属性：">
            <span>{{propertyName}}</span>
          </el-form-item>
          <el-form-item label="作品类型：">
            <span>{{categoryName}}</span>
          </el-form-item>
          <el-form-item label="赛事选择：">
            <span>{{competitionName}}</span>
          </el-form-item>
          <el-form-item label="奖项类型：">
            <span>{{prizeName}}</span>
          </el-form-item>
          <el-form-item label="作品说明：">
            <span>{{worksDescription}}</span>
          </el-form-item>
        </el-form>
        <div class="more-works">更多作品</div>
      </div>
    </section>
    <div class="more-works-container">
      <el-carousel arrow="always" indicator-position="none">
        <el-carousel-item v-for="(i, index) in bannerList" :key="index">
          <section class="background-one container">
            <work-card v-for="(item,index) in i.dataObj" :key="index" :dataObj='item'></work-card>
          </section>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
  import SubTitle from "@/components/SubTitle.vue"; // 小标题
  import BreadCrumbs from "@/components/BreadCrumbs.vue"; // 背景
  import WorkCard from "../components/WorkCard.vue";
  import WorkTitle from "../components/WorkTitle.vue";
  import {getFun, postFun} from '@/api/transit.js'
  export default {
    components: {
      SubTitle,
      BreadCrumbs,
      WorkCard,
      WorkTitle
    },
    data() {
      return {
        backgroundUrl: require("@/assets/img/exhibition_background.jpg"),
        workUrl: '',
        bannerList: [],

        worksId: '',
        czHash: '',
        worksName: '',
        worksDesigner: '',
        propertyName: '',
        categoryName: '',
        competitionName: '',
        prizeName: '',
        worksDescription: '',
      }
    },
    mounted() {
      this.getInitData()
    },
    methods: {
      getInitData() {
        this.worksId = this.$route.query.worksId
        this.getWorkData(this.worksId)
        this.getWorkListData()
      },
      getWorkData(worksId) {
        const param = {
          worksId: worksId
        }
        this.getWork(param).then(response => {
          if (response.code === '200' || response.code === 200) {
            const data = response.data
            this.czHash = data.czHash
            this.worksName = data.worksName
            this.worksDesigner = data.worksDesigner
            this.propertyName = data.propertyName
            this.categoryName = data.categoryName
            this.competitionName = data.competitionName
            this.prizeName = data.prizeName
            this.worksDescription = data.worksDescription
            this.workUrl = data.worksJpgUrl
          } else {
            this.$message.error(response.message)
          }
        })
      },
      // 更多作品列表
      getWorkListData() {
        const param = {
          pageSize: 12,
          pageNumber: 1,
        }
        this.getWorkList(param).then(response => {
          if (response.code === '200' || response.code === 200) {
            const dataList = response.data.list
            let tmpList = []
            const tmpList1 = []
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
              if (tmpList.length === 4) {
                tmpList1.push({
                  dataObj: tmpList
                })
                tmpList = []
              }
            }
            this.bannerList = tmpList1
          } else {
            this.$message.error(response.message)
          }
        })
      },

      getWork(param) {
        return postFun('/trade-web/api/works/selectByWorksId', param)
      },
      getWorkList(param) {
        return postFun('/trade-web/api/works/pageList', param)
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
  @import "../../../assets/palette.scss";

  .exhibition-detail {
    .background-one {
      min-width: $min-container;
      margin-top: 20px;
    }
    .background-grey {
      background-color: #F9F9F9;
    }
    .guest-content {
      overflow: hidden;
      width: 100%;
    }

    .img-container {
      max-width: 100%;
    }

    .exhibition-container {
      padding: 20px;
    }

    .work-detail-form {
      margin-top: 50px;
      width: 832px;

      .el-form-item {
        margin-bottom: 52px;
      }

      .el-form-item__label, .el-form-item__content {
        line-height: 28px;
      }
    }

    .more-works {
      font-size: 34px;
      font-family: Noto Sans S Chinese;
      font-weight: 500;
      color: #333333;
      text-align: center;
    }
    .more-works-container {
      .el-carousel__container {
        height: 410px;
        min-width: 1660px;
        width: 1640px;
        margin: 0 auto;
      }
      .el-carousel__arrow {
        width: 80px;
        height: 80px;
        border-radius: 0;
        background-color: rgba(0, 0, 0, 0.3);
        &:hover {
          background-color: rgba(0, 0, 0, 0.2);
        }
      }
      .el-icon-arrow-left,
      .el-icon-arrow-right {
        font-size: 36px;
      }
      .el-carousel__arrow--right {
        right: 40px;
      }
      .el-carousel__arrow--left {
        left: 0;
      }
    }
  }

</style>