<template>
  <div class="navbar">
    <!--收缩左导航-->
    <!-- <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    /> -->
    <!--页面定位-->
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <!--搜索-->
        <!--<search id="header-search" class="right-menu-item" />-->

        <error-log class="errLog-container right-menu-item hover-effect" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />
        <!--消息通知-->
        <Notice />
        <!--退出登录-->
        <div class="right-menu-item hover-effect" @click="logout">
          <span class="icon iconfont screenfull-svg iconexit"></span>
          <span class="iconHtml">退出</span>
        </div>
        <!-- <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>-->
      </template>
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
        @visible-change="transform"
      >
        <div class="avatar-wrapper">
          <span>
            <!-- <svg-icon class="userClass" icon-class="user" style="vertical-align: -0.2em;" /> -->
            <span class="icon iconfont iconprofile"></span>
            <span style="font-size:14px;margin-left:5px">{{ name }}</span>
          </span>
          <!-- <i style="font-size:14px" class="el-icon-arrow-down" /> -->
          <span class="icon iconfont iconxia el-icon-arrow-down"></span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="handle">
            <span style="margin-top: 3px;display: inherit;">个人中心</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <Dialog :show.sync="show" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
//import Hamburger from "@/components/Hamburger";
import ErrorLog from "@/components/ErrorLog";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import Search from "@/components/HeaderSearch";
import Dialog from "@/views/profile/index.vue";
import Notice from "./notice"
import { getUserInfo } from "@/utils/auth"; /** 获取用户信息 */
import $ from "jquery"; /* 引入jquery */
export default {
  components: {
    Breadcrumb,
    //Hamburger,
    ErrorLog,
    Dialog,
    Screenfull,
    SizeSelect,
    Search,
    Notice
  },
  data() {
    return {
      userName: getUserInfo()["username"],
      show: false,
      visible: false // 通知的开关
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device","name"])
  },
  watch: {
    dataNum: function(val) {
      this.badgeHidden = val === 0;
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push("/login");
    },
    // async logout() {
    //   await this.$store.dispatch('user/logout')
    //   this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    // },
    handle() {
      this.show = true;
    },
    // 用户右侧的小三角
    transform(v) {
      if (v) {
        $(".el-icon-arrow-down").css("transform", "rotate(180deg)"); // 菜单展出旋转180度
      } else {
        $(".el-icon-arrow-down").css("transform", "rotate(0)"); // 菜单收起旋转0度
      }
    }
  }
};
</script>

<style lang="scss" scoped>
//@import "@/styles/Navbar.scss" // 原scss
@import "@/styles/white/Navbar.scss"; //baas

</style>
