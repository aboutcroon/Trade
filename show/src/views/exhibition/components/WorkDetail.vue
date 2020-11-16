<template>
  <section class="background-one">
    <div class="part container exhibition-container">
      <div class="img-container">
        <img :src="backgroundUrl"/>
        <div class=""></div>
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
</template>
<script>
  import {getFun, postFun} from '@/api/transit.js'
  export default {
    components: {
    },
    data() {
      return {
        backgroundUrl: require("@/assets/img/exhibition_background.jpg"),
        workUrl: '',
        worksId: '',
        czHash: '',
        worksName: '',
        worksDesigner: '',
        propertyId: 0,
        propertyName: '',
        categoryId: 0,
        categoryName: '',
        competitionName: '',
        prizeName: '',
        worksDescription: '',
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
      this.getInitData()
    },
    methods: {
      getInitData() {
        this.worksId = this.$route.query.worksId
        this.getWorkData(this.worksId)
        this.getDictData()
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
            this.propertyId = data.worksPropertyId
            this.categoryId = data.categoryId
            this.propertyName = this.typeMap.property[this.propertyId]
            this.categoryName = this.typeMap.category[this.categoryId]
            this.competitionName = data.competitionName
            this.prizeName = data.prizeName
            this.worksDescription = data.worksDescription
            this.workUrl = data.worksJpgUrl
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

            this.propertyName = this.typeMap.property[this.propertyId]
            this.categoryName = this.typeMap.category[this.categoryId]

          } else {
            this.$message.error(message)
          }
        })
      },
      getWork(param) {
        return postFun('/trade-web/api/works/selectByWorksId', param)
      },
      getWorkList(param) {
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
  @import "../../../assets/palette.scss";

  .exhibition-detail {
    .background-one {
      min-width: $min-container;
      margin-top: 20px;
    }
    .background-grey {
      background-color: #F9F9F9;
    }

    .img-container {
      max-width: 100%;

      img {
        max-width: 100%;
        min-height: 100px;
      }
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
  }

</style>