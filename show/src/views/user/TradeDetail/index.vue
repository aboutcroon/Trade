<template>
  <div class="user-control container">
    <UserTitle
      :stat-list="statList"
      :title="title"
      :description="description"></UserTitle>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="user_tabs">
      <el-tab-pane label="基础信息" name="first">
        <gray-block>
          <trade-detail></trade-detail>
        </gray-block>
      </el-tab-pane>
      <el-tab-pane label="区块链证书" name="second">
        <gray-block>
          <trade-cert></trade-cert>
        </gray-block>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import GrayBlock from '../components/GrayBlock.vue'
  import UserTitle from '../components/UserTitle.vue'
  import TradeCert from '../components/TradeBlockChainCert.vue'
  import TradeDetail from '../components/TradeDetail.vue'
  export default {
    components: {
      GrayBlock,
      UserTitle,
      TradeCert,
      TradeDetail
    },
    data() {
      return {
        title: '查看作品',
        description: '作品未上链/作品已上链',
        statList: [],
        activeName: 'first'
      }
    },
    methods: {
      handleClick() {

      }
    }
  }
</script>
<style lang="scss">
  .user_tabs {
    .el-tabs__header {
      padding-left: 38px;
      margin-bottom: 0;
    }
    .el-tabs__nav-wrap::after {
      background-color: transparent;
    }

  }
</style>