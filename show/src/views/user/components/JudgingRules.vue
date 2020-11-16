<template>
  <gray-block>
    <div class="judging-rules">
      <div class="title">{{ title }}</div>
      <div class="text">
        <p v-for="(item, index) in text" :key="index">{{ item }}</p>
      </div>
    </div>
  </gray-block>
</template>
<script>
import GrayBlock from '../components/GrayBlock.vue'
export default {
  name: 'JudgingRules',
  components: {
    GrayBlock,
  },
  data() {
    return {
      title: '评审规则',
      text: [
        '第一条 为规范商标评审程序，根据《中华人民共和国商标法》（以下简称商标法）和《中华人民共和国商标法实施条例》（以下简称实施条例），制定本规则。',
        '第二条 根据商标法及实施条例的规定，国家工商行政管理总局商标评审委员会（以下简称商标评审委员会）负责处理下列商标评审案件：',
        '（一）不服国家工商行政管理总局商标局（以下简称商标局）驳回商标注册申请决定，依照商标法第三十四条规定申请复审的案件；',
        '（二）不服商标局不予注册决定，依照商标法第三十五条第三款规定申请复审的案件；',
        '（三）对已经注册的商标，依照商标法第四十四条第一款、第四十五条第一款规定请求无效宣告的案件；',
        '（四）不服商标局宣告注册商标无效决定，依照商标法第四十四条第二款规定申请复审的案件；',
        '（五）不服商标局撤销或者不予撤销注册商标决定，依照商标法第五十四条规定申请复审的案件。',
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.judging-rules .title {
  color: #333333;
  padding-bottom: 10px;
}
.judging-rules .text {
  color: #666666;
  line-height: 30px;
}
</style>