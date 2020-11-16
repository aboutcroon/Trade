<template>
  <div class="trade-block-chain-cert">
    <div v-if="hasCert">
      <block-chain-cert></block-chain-cert>
      <div class="cert-info">此证书已经过多方确认备案，具有真实性。</div>
      <router-link to="/user">
        <el-button class="user-btn-return">返回</el-button>
      </router-link>
    </div>
    <div class="cert-empty" v-else>
      <div class="cert-info">{{reason}}</div>
      <router-link to="/user">
        <el-button class="user-btn-return">返回</el-button>
      </router-link>
    </div>
  </div>
</template>
<script>
  import BlockChainCert from './BlockChainCert.vue'
  export default {
    name: 'tradeCert',
    components: {BlockChainCert},
    data() {
      return {
        hasCert: true,
        reason: '作品还未经过初筛，暂未获得证书。'
      }
    },
  };
</script>
<style lang="scss">
  @import "../../../assets/palette.scss";

  .trade-block-chain-cert {
    min-height: 636px;

    .cert-info {
      font-size: 16px;
      font-family: SourceHanSansCN;
      font-weight: 400;
      color: #666666;
      line-height: 24px;
      margin: 30px 0 50px 0;
    }

    .el-button {
      padding: 0;
    }

    .cert-empty {
      width: 100%;
      height: 650px;
      display: flex;
      justify-content: center;
      flex-direction: column;

      .cert-info {
        text-align: center;
      }

      .user-btn-return {
        margin-left: calc(50% - 66px);
      }
    }

    .user-btn-return {
      height: 46px;
      width: 132px;
      background-color: transparent;
      border: 1px solid #FF0000;
      margin-left: 0;
      color: #FF0000;
    }

  }

  .user-btn-return:hover {
    background-color: #FF0000;
    color: #FFFFFF;
  }

</style>