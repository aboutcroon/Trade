<template>
  <section class="contentBox" style="padding-left:40px; padding-right:40px;">
    <header>
      <div style="margin-left:29.6rem;" class="logo">
        <h2 style="color:#fff">{{opus.worksName}}</h2>
        <div class="opus">
          <h2 class="opustitle">{{ opus.competitionName }}</h2>
          <div style="margin-right:40px;">
            <p>作品类型<span>{{ opus.categoryName}}</span></p>
            <p>奖项类型<span>{{opus.prizeName}}</span></p>
          </div>
          <div>
            <p>作品属性<span>{{ opus.propertyName }}</span></p>
          </div>
        </div>
      </div>
    </header>
    <div class="box">
      <div class="transform">
        <img :src="opus.imgurl" alt="" width="430" height="252" style="vertical-align:top;" draggable="false">
        <div class="filterBox">{{opus.worksStatus }} </div>
      </div>
      <div class="articles">
        <div v-if="opus.worksStatus == '已获奖'">
          <span class="authorname">作者名称</span>
          <p class="author">{{opus.userName}} <span>({{ opus.designersPropertyDescription }})</span></p>
        </div>
        <div v-else-if="opus.worksStatus == '未获奖'">
          <span class="authorname ">作者名称</span>
          <p class="author nonecolor"><span>( {{ opus.designersPropertyDescription }})</span></p>
        </div>
        <p>{{opus.worksDescription}}</p>
        <div style="float:right" v-if="(opus.worksStatus !== '未复审' && opus.worksStatus !== '已评分' && opus.worksStatus !== '已获奖')">
          <el-button class="btn-opus icon iconfont iconchehuisekuai">&nbsp;驳回</el-button>
          <el-button class=" icon iconfont iconactivated btn-opus sucessbtn">&nbsp;通过</el-button>
        </div>
      </div>
    </div>
    <div class="ratebox"  v-if="opus.worksStatus == '未复审'">
      <div class="point">
        <p>作品打分</p>
        <span>初审完成后可评价</span>
      </div>
      <div class="rate">
        <div style="display:flex;padding-bottom:5px;">
          主旨<el-rate v-model="rate.a" style="margin-left:10px;" show-score text-color="#ff9900" score-template="{value}"  :allow-half="true" ></el-rate>
        </div>
        <div style="display:flex;padding-bottom:5px;">
          创意<el-rate v-model="rate.b" style="margin-left:10px;" show-score text-color="#ff9900" score-template="{value}" :allow-half="true" ></el-rate>
        </div>
         <div style="display:flex;padding-bottom:5px;">
          设计<el-rate v-model="rate.c" style="margin-left:10px;" show-score text-color="#ff9900" score-template="{value}"  :allow-half="true" ></el-rate>
        </div>
         <div style="display:flex;padding-bottom:5px;">
          易用<el-rate v-model="rate.d" style="margin-left:10px;" show-score text-color="#ff9900" score-template="{value}" :allow-half="true" ></el-rate>
        </div>
         <div style="display:flex;padding-bottom:5px;">
          口碑<el-rate v-model="rate.e" style="margin-left:10px;" show-score text-color="#ff9900" score-template="{value}" :allow-half="true" ></el-rate>
        </div>
        <div style="display:flex;padding-bottom:5px;">
          延展<el-rate v-model="rate.f" style="margin-left:10px;" show-score text-color="#ff9900" score-template="{value}" :allow-half="true" ></el-rate>
        </div>
      </div>
      <div style="margin-top:10px"> 
        <el-button size="small" @click="rateHandle">确认评分</el-button>
      </div>
    </div>
  </section>
</template>

<script>

import { postFun } from '@/api/common'
export default {
  name:'opus',
  data() {
    return {
      opus:{},// 作品信息对象
      rate: {}, // 临时测试评分用的对象
      id:'',
    };
  },
  activated() {
    this.id = this.$store.state.export.worksId
    this.getDetails()
  },
  filters: {
    statusFilter(val) {
      switch (val) {
        case 0:val = '学生'
        break;
        case 1:val = '设计师'
        break;
        case 2:val = '机构用户'
        break;
      }
      return val
    }
  },
  methods: {
    async rateHandle() {
      const rateData = parseInt(this.rate.a) + parseInt(this.rate.b) + parseInt(this.rate.c) + parseInt(this.rate.d) + parseInt(this.rate.e) + parseInt(this.rate.f)  
      const { data } = await postFun('/trade-admin/api/judge/score',{worksId:this.id,starCount:rateData})
      this.$message.success('评分成功')
      this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.go(-1)
    },
    async getDetails(){
      const { data } = await postFun('/trade-admin/api/judge/selectWorksById',{worksId:this.id})
      this.opus = data // 作品信息
      this.opus.imgurl =  process.env.VUE_APP_IMGURL + data.worksJpgUrl // 作品图片
      this.opus.worksStatus = this.filterWorksStatus(data.worksStatus) // 过滤
    },
    filterWorksStatus (status) {
    //状态 0-未初筛 1-初筛通过 2-初筛驳回 3-未初审 4-初审通过 5-初审驳回 6-未复审 7-已评分 8-已获奖
      switch (status) {
        case 0: status = '未初筛'
        break;
        case 1: status = '初筛通过'
        break;
        case 2: status = '初筛驳回'
        break;
        case 3: status = '未初审'
        break;
        case 4: status = '初审通过'
        break;
        case 5: status = '初审驳回'
        break;
        case 6: status = '未复审'
        break;
        case 7: status = '已评分'
        break;
        case 8: status = '已获奖'
        break;
        default: status = '暂无数据'
        break;
      }
      return status
    }
  },
}
</script>

<style lang="scss" scoped src="./opus.scss"></style>