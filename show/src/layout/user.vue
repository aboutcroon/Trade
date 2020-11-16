<template>
  <div class="user-page">
    <NavBar/>
    <TopBackground />
    <main class="user-main">
      <router-view :key="key" />
    </main>
    <Footer />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import TopBackground from './components/TopBackground.vue'
export default {
  components: {
    NavBar,
    Footer,
    TopBackground
  },
  data() {
    return {
      // navBarList: [],
    }
  },
  computed: {
    key() {
      return this.$route.path;
    },
    // ...mapGetters(['userinfo', 'auth'])
  },
  mounted() {
  },
  methods: {
    
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
.user-main {
  padding-bottom: 50px;
  min-height: 200px;
}
</style>