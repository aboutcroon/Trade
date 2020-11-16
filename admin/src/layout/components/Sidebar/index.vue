<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        mode="vertical"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :default-active="activeMenu"
        :unique-opened="false"
        :collapse-transition="false"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.name" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'/* vuex(状态管理) mapGetters为getters属性的辅助函数 getters属性类似于计算属性computed */
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import Hamburger from "@/components/Hamburger";
export default {
  components: { SidebarItem, Logo,Hamburger },
  computed: {
    ...mapGetters([/* mapGetters辅助函数用来将vuex中的getters属性映射到组件的计算属性中 */
      'permission_routes', /* getters文件里的值 */
      'sidebar' /* getters文件里的值 */
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
  }
}
</script>
