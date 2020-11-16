<template>
  <div class="user-control container">
    <UserTitle
      :stat-list="statList"
      :title="title"
      :description="description">

    </UserTitle>
    <gray-block>
      <upload-form @getModifyNum="getModifyNum"></upload-form>
    </gray-block>
  </div>
</template>
<script>
  import GrayBlock from '../components/GrayBlock.vue'
  import UserTitle from '../components/UserTitle.vue'
  import UploadForm from '../components/TradeUploadForm.vue'
  export default {
    components: {
      GrayBlock,
      UserTitle,
      UploadForm
    },
    data() {
      return {
        title: ' ',
        description: '作品在报名截止日前五日停止修改，每个作品只能修改三次，初筛通过作品自动上链。',
        statList: []
      }
    },
    mounted() {
      let workId = this.$route.query.worksId
      if(workId) {
        this.title = '修改作品'
      } else {
        this.title = '上传作品'
      }
    },
    methods: {
      // 需要从下一级获取修改次数
      getModifyNum(num) {
        if(num > 0) {
          this.title = '修改作品（目前已修改' + num + '次）'
        }
      }
    }
  }
</script>