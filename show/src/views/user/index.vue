<template>
  <div class="user">
    <!-- 普通用户页 -->
    <div
      v-if="userinfo.roleType === 5 || userinfo.roleType === 4"
      class="user-control container"
    >
      <UserTitle
        title="作品列表"
        description="美感与设计的结合，尽在此时"
        :stat-list="statList"
        show-avatar
      />
      <gray-block>
        <userContent />
      </gray-block>
    </div>
    <!-- 评审用户页 -->
    <!-- <div
      v-else
      class="user-control container"
    > -->
      <!-- <UserTitle
        title="评审作品管理"
        description="美感与设计的结合，尽在此时"
        :stat-list="statList"
        :show-avatar="false"
      /> -->
      <!-- <phase :activeNum="activeNum"></phase> -->
      <!-- <JudgingRules class="margin-bottom-30" /> -->
      <ReviewContent v-else/>
    <!-- </div> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import GrayBlock from "./components/GrayBlock.vue";
import UserTitle from "./components/UserTitle.vue";
// import phase from "./components/phase.vue";
import JudgingRules from './components/JudgingRules.vue';
import userContent from './components/TradeList.vue'
import ReviewContent from "./components/ReviewList.vue";
export default {
  components: {
    GrayBlock,
    UserTitle,
    JudgingRules,
    userContent,
    ReviewContent,
    // phase
  },
  data() {
    return {
      statList: [],
      activeNum:1
    }
  },
  computed: {
    ...mapGetters(['userinfo', 'auth'])
  }
}
</script>