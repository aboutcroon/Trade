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
        worksPropertyId: '0',
        categoryId: '0',
        propertyName: '',
        categoryName: '',
        competitionId: '',
        competitionName: '',
        prizeName: '',
        worksDescription: '',
        worksJpgUrl: '',

        // 类型map
        typeMap: {
          property: {
            '0': '',
            '1': '',
            '2': '',
            '3': '',
            '4': '',
            '5': '',
            '6': '',
            '7': '',
            '8': '',
            '9': '',
            '10': '',
          },
          category: {
            '0': '',
            '1': '',
            '2': '',
            '3': '',
            '4': '',
            '5': '',
            '6': '',
            '7': '',
            '8': '',
            '9': '',
            '10': '',
          }
        }
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        let worksId = this.$route.query.worksId
        this.getWorkData(worksId)
        this.getDictData()
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
            this.propertyName = this.typeMap.property[this.worksPropertyId]
            this.categoryName = this.typeMap.category[this.categoryId]
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
      // 获取类型列表
      getDictData() {
        this.getDict().then(response => {
          if (response.code === '200' || response.code === 200) {
            let data = response.data
            let typeList = {}
            for (let i of data['作品属性']) {
              typeList[i.key] = i.value
            }
            this.typeMap.property = typeList
            typeList = {}
            for (let i of data['作品类型']) {
              typeList[i.key] = i.value
            }
            this.typeMap.category = typeList

            this.propertyName = this.typeMap.property[this.worksPropertyId]
            this.categoryName = this.typeMap.category[this.categoryId]

          } else {
            this.$message.error(message)
          }
        })
      },
      getWork(param) {
        return postFun('/trade-web/api/works/selectByWorksId', param)
      },
      // 获取筛选列表
      getDict(param) {
        return getFun('/trade-web/api/dict', param)
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
      width: 90%;

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
    .img-container {
      img {
        max-width: 100%;
      }
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