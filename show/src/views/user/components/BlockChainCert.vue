<!-- 区块链证书 -->
<template>
  <div class="block-chain-cert">
    <div class="cert-img-container">
      <img :src="worksJpgUrl" class="cert-img"/>
    </div>
    <div class="cert-div-top">
      <div>
        <span class="cert-title">作品名称:</span>
        <span class="cert-data">{{worksName}}</span>
      </div>
      <div>
        <span class="cert-title">作品作者:</span>
        <span class="cert-data">{{worksDesigner}}</span>
        <span class="cert-title">参与奖项:</span>
        <span class="cert-data">{{prizeName}}</span>
        <span class="cert-title">作品类型:</span>
        <span class="cert-data">{{categoryName}}</span>
      </div>
    </div>
    <el-form class="cert-form-bottom" labelWidth="72px">
      <el-form-item label="存证内容:">
        <span>{{czContent}}</span>
      </el-form-item>
      <el-form-item label="所在区块:">
        <span>{{blockNumber}}</span>
      </el-form-item>
      <el-form-item label="存证哈希:">
        <span>{{czHash}}</span>
      </el-form-item>
      <el-form-item label="存证时间:">
        <span>{{chainTime}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import {getFun, postFun} from '@/api/transit.js'
  import time from '@/api/time.js'
  export default {
    name: 'tradeCert',
    data() {
      return {
        backgroundUrl: require("@/assets/img/exhibition_background.jpg"),
        worksJpgUrl: '',
        //证书数据
        worksName: '',
        worksDesigner: '',
        prizeName: '',
        categoryId: '0',
        categoryName: '',

        czContent: '',
        blockNumber: '',
        czHash: '',
        chainTime: '',

        // 类型map
        typeMap: {
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
        this.getCertData(worksId)
        this.getDictData()
      },
      // 加载数据
      getCertData(worksId) {
        let param = {
          worksId: worksId
        }
        this.getCert(param).then(response => {
          if (response.code === '200' || response.code === 200) {
            let data = response.data
            this.worksName = data.worksName
            this.worksDesigner = data.worksDesigner
            this.categoryId = data.categoryId
            this.categoryName = this.typeMap.category[this.categoryId]
            this.czContent = data.czContent
            this.blockNumber = data.blockNumber
            this.czHash = data.czHash
            this.prizeName = data.prizeName
            this.worksJpgUrl = data.worksJpgUrl
            let chainTimes = data.chainTime * 1000
            this.chainTime = time.timestampToTime(chainTimes, 'DT1')
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
            for (let i of data['作品类型']) {
              typeList[i.key] = i.value
            }
            this.typeMap.category = typeList
            this.categoryName = this.typeMap.category[this.categoryId]

          } else {
            this.$message.error(message)
          }
        })
      },
      getCert(param) {
        return postFun('/trade-web/api/works/selectCzByWorksId', param)
      },
      // 获取筛选列表
      getDict(param) {
        return getFun('/trade-web/api/dict', param)
      },
    }
  };
</script>
<style lang="scss">
  .block-chain-cert {
    width: 882px;
    height: 623px;
    position: relative;
    background: url("../../../assets/img/blockchain_cert.jpg");
    background-size: cover;
    padding: 233px 140px 150px 140px;

    .cert-img-container {
      position: absolute;
      top: 233px;
      left: 140px;
      width: 161px;
      height: 100px;
      display: flex;
      justify-content: center;
      border-radius: 8px;

      .cert-img {
        max-width: 161px;
        max-height: 100px;
      }
    }
    .cert-div-top {
      position: absolute;
      left: 317px;
      top: 270px;

      .cert-title {
        width: 72px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #535269;
      }
      .cert-data {
        width: auto;
        min-width: 50px;
        padding-right: 14px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #151431;
        line-height: 20px;
      }
      .cert-title, .cert-data {
        display: inline-block;
        height: 20px;
        line-height: 20px;
        margin-bottom: 14px;
      }
    }
    .cert-form-bottom {
      position: absolute;
      left: 140px;
      top: 350px;

      .el-form-item {
        height: 20px;
        margin-bottom: 14px;
      }

      .el-form-item__label, .el-form-item__content {
        height: 20px;
        line-height: 20px;
      }
      .el-form-item__label {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #535269;
      }
      .el-form-item__content {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #151431;
      }
    }
  }

</style>