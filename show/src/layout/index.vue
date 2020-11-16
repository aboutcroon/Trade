<template>
  <div class="trademark-page">
    <NavBar />
    <Main />
    <Footer />
    <right-side-bar/>
  </div>
</template>
<script>
import NavBar from './components/NavBar.vue'
import Main from './components/AppMain.vue'
import Footer from './components/Footer.vue'
import RightSideBar from './components/RightSideBar.vue'
export default {
  components: {
    RightSideBar,
    NavBar,
    Main,
    Footer
  },
  data() {
    return {
      // navBarList: [
      //   { name: '首页', link: '/' },
      //   { name: '第四届大赛', link: '/game' },
      //   { name: '作品展示厅', link: '/exhibition' },
      //   { name: '新闻中心', link: '/news' },
      //   { name: '合作伙伴', link: '/partner' },
      // ],
    }
  }
}
</script>
<style lang="scss">
.header.fixed {
  background-color: #fff;
  color: #333333;
  box-shadow: 0 1px 3px rgba(18, 18, 18, 0.1);
  position: fixed;
  .logo_white {
    display: none;
  }
  .logo_block {
    display: flex;
  }
  .line {
    border-color: #333333;
  }
}
</style>