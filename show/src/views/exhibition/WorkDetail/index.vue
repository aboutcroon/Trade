<template>
  <div class="exhibition-detail">
    <BreadCrumbs
      title="作品展示厅"
      title-right=""
      description="美感与设计的结合，尽在此时"
      :url="backgroundUrl"
      :crumb="[{title: '作品展示厅', link: 'exhibition'},{title: '作品详情', link: 'exhibitionWorkDetail'}]"
    />
    <work-detail></work-detail>
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
  import WorkDetail from "../components/WorkDetail.vue";
  import {getFun, postFun} from '@/api/transit.js'
  export default {
    components: {
      SubTitle,
      BreadCrumbs,
      WorkCard,
      WorkTitle,
      WorkDetail
    },
    data() {
      return {
        backgroundUrl: require("@/assets/img/exhibition_background.jpg"),
        bannerList: [],
      }
    },
    mounted() {
      this.getInitData()
    },
    methods: {
      getInitData() {
        this.getWorkListData()
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