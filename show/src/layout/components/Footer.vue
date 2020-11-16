<template>
  <div class="footer min-width">
    <div class="bottom">
      <div class="other">
        <div class="container">
          <div class="logo">
            <img :src="require('@/assets/img/logo.png')" alt="" />
          </div>
          <dl class="custom-list">
            <dt>合作伙伴</dt>
            <dd>中国商标协会</dd>
            <dd>中国商标协会</dd>
            <dd>中国商标协会</dd>
            <dd>中国商标协会</dd>
            <dd>中国商标协会</dd>
            <dd>中国商标协会</dd>
          </dl>
          <dl class="custom-list customer">
            <dt>联系客服</dt>
            <dd>客服热线：800-820-8820（09:30-18:00）</dd>
            <dd>在线客服：89457541458（09:30-18:00）</dd>
          </dl>
          <ul class="code">
            <li class="code-item">
              <div><img :src="require('@/assets/img/qr_code_1.jpg')" alt="" /></div>
              <div class="text">中国商标协会公众号</div>
            </li>
            <li class="code-item">
              <div><img :src="require('@/assets/img/qr_code_2.jpg')" alt="" /></div>
              <div class="text">中国商标协会抖音号</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="line"></div>
      <div class="record">
        <span
          >copyright&copy;2020.shangbiaotong&nbsp;&nbsp;All rights reserved.
          京ICP备2020040320号</span
        >
      </div>
    </div>
  </div>
</template>
<script>
import SubTitle from '@/components/SubTitle.vue'  // 小标题
export default {
  components: {
    SubTitle
  },
  data() {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
.footer {
  .bottom {
    background-color: #4b4d51;
    .other {
      height: 310px;
      padding-top: 80px;
      .container {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      .logo {
        min-width: 155px;
        max-width: 250px;
        height: 109px;
      }
      dt {
        width: 100%;
        color: #ff0000;
        font-size: 18px;
        margin-bottom: 32px;
      }
      .code {
        width: 360px;
        display: flex;
        justify-content: space-between;
      }
      .code-item {
        img {
          width: 140px;
          height: 140px;
          margin-bottom: 10px;
        }
        &:first-child {
          margin-right: 20px;
        }
        .text {
          text-align: center;
          color: #9e9fa1;
          font-size: 14px;
        }
      }
    }
    .custom-list {
      max-width: 290px;
      display: flex;
      flex-wrap: wrap;
      dd {
        width: 50%;
        padding-right: 10px;
        font-size: 14px;
        color: #9e9fa1;
        margin-bottom: 20px;
      }
      &.customer {
        dd {
          width: 100%;
        }
      }
    }
    .line {
      height: 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .record {
      height: 70px;
      text-align: center;
      color: #9e9fa1;
      font-size: 14px;
      padding-top: 24px;
    }
  }
}
</style>