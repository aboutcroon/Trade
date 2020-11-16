<template>
  <div class="trade-detail">
    <el-form labelWidth="94px" class="work-detail-form">
      <el-form-item label="作品名称：">
        <span>{{worksName}}</span>
      </el-form-item>
      <el-form-item label="作者名称：">
        <span>{{worksDesigner}}</span>
      </el-form-item>
      <el-form-item label="作品属性：">
        <span>{{worksPropertyId}}</span>
      </el-form-item>
      <el-form-item label="作品类型：">
        <span>{{categoryId}}</span>
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
      <el-form-item label="上传作品：">
        <div class="img-container">
          <img :src="worksJpgUrl"/>
        </div>
      </el-form-item>
    </el-form>
    <router-link to="/user">
      <el-button class="user-btn-return">返回</el-button>
    </router-link>
  </div>
</template>
<script>
  import {getFun, postFun} from '@/api/transit.js'
  export default {
    name: 'TradeDetail',
    components: {},
    data() {
      return {
        backgroundUrl: require("@/assets/img/exhibition_background.jpg"),
        workUrl: require("@/assets/img/home_guest_1.jpg"),
        worksId: '',
        worksName: '',
        worksDesigner: '',
        worksPropertyId: '',
        categoryId: '',
        competitionId: '',
        competitionName: '',
        prizeName: '',
        worksDescription: '',
        worksJpgUrl: '',
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        let worksId = this.$route.query.worksId
        this.getWorkData(worksId)
      },
      // 加载数据
      getWorkData(worksId) {
        let param = {
          worksId: worksId
        }
        this.getWork(param).then(response => {
          if (response.code === '200' || response.code === 200) {
            let data = response.data
            this.worksName = data.worksName
            this.worksDesigner = data.worksDesigner
            this.worksPropertyId = data.worksPropertyId
            this.categoryId = data.categoryId
            this.competitionId = data.competitionId
            this.competitionName = data.competitionName
            this.prizeName = data.prizeName
            this.worksDescription = data.worksDescription
            this.worksJpgUrl = data.worksJpgUrl
          } else {
            this.$message.error(response.message)
          }
        })
      },
      getWork(param) {
        return postFun('/trade-web/api/works/selectByWorksId', param)
      },
    }
  };
</script>
<style lang="scss">
  @import "../../../assets/palette.scss";

  .trade-detail {
    .img-container {
      max-width: 100%;
    }

    .work-detail-form {
      margin-top: 18px;
      width: 832px;

      .el-form-item {
        margin-bottom: 52px;
      }

      .el-form-item__label, .el-form-item__content {
        line-height: 28px;
      }
    }
    .el-button {
      padding: 0;
    }
  }

  .user-btn-return {
    height: 46px;
    width: 132px;
    background-color: transparent;
    border: 1px solid #FF0000;
    color: #FF0000;
    margin-left: 94px;
  }

  .user-btn-return:hover {
    background-color: #FF0000;
    color: #FFFFFF;
  }

</style>