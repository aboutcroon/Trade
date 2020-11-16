<template>
  <header class="header min-width" :class="{ fixed: isFixed }">
    <div class="navbar container">
      <div class="navbar-logo">
        <router-link to="/">
          <img
            :src="require('@/assets/img/logo_white.png')"
            class="logo_white"
          />
          <img
            :src="require('@/assets/img/logo_block.png')"
            class="logo_block"
          />
        </router-link>
      </div>
      <div class="nav-list">
        <router-link
          v-for="(item, index) in linkList"
          :key="index"
          class="nav-list-item"
          active-class="active"
          :to="item.link"
          exact
          @click="clickLink()"
        >
          <span>{{ item.name }}</span>
        </router-link>
      </div>
      <div v-if="auth" class="login">
        <el-dropdown trigger="click" placement="bottom-end">
          <div class="account-info" @click="clickUser">
            <div class="avatar">
              <img :src="require('@/assets/img/user_avatar.png')" alt="" />
              <!-- <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon_profile"></use>
              </svg> -->
            </div>
            <div class="username">{{ userinfo.username }}</div>
          </div>
          <el-dropdown-menu
            slot="dropdown"
            class="nav-dropdown"
            :class="{ active: !isFixed }"
          >
            <el-dropdown-item @click.native="clickDropdown('account', 0)"
              >我的账号</el-dropdown-item
            >
            <el-dropdown-item
              v-if="userinfo.roleType === 5"
              @click.native="clickDropdown('account', 2)"
              >参赛证管理</el-dropdown-item
            >
            <el-dropdown-item @click.native="clickSignOut()"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <div class="nav-dropdown-link" :class="{active: mask}">
          <svg class="icon dropdown-triangle" aria-hidden="true">
            <use xlink:href="#icon_triangle_up"></use>
          </svg>
          <ul class="nav-dropdown-ul">
            <li class="nav-dropdown-li">
              <span>我的账号</span>
            </li>
            <li class="nav-dropdown-li">
              <span>参赛证管理</span>
            </li>
            <li class="nav-dropdown-li" @click="clickSignOut">
              <span>退出登录</span>
            </li>
          </ul>
        </div> -->
      </div>
      <div v-else class="login">
        <router-link to="/login"><span>登录</span></router-link>
        <div class="line"></div>
        <router-link to="/register"><span>注册</span></router-link>
      </div>
    </div>
  </header>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'NavBar',
  /* props: {
    link: {
      default() {
        return []
      }
    }
  }, */
  data() {
    return {
      mask: false,
      /* 默认导航 */
      linkList: [
        { name: '首页', link: '/' },
        { name: '第四届大赛', link: '/game' },
        { name: '作品展示厅', link: '/exhibition' },
        { name: '新闻中心', link: '/news' },
        { name: '合作伙伴', link: '/partner' },
      ],
      dropList: [],
      isFixed: false,
      height: '',
      current: ''
    }
  },
  inject: ['reload'],
  computed: {
    ...mapGetters(['userinfo', 'auth'])
  },
  mounted() {

  },
  created() {
    this.initNav()
    this.getNavList()
  },
  methods: {
    ...mapMutations(['signOut']),
    /* 点击导航链接 */
    clickLink() { },
    /* 点击账户下拉 */
    clickDropdown(name, type) {
      this.$router.push({ name: name, query: { tabIndex: type } })
    },
    /* 点击用户头像 */
    clickUser() {
      this.mask = !this.mask
    },
    /* 退出登录 */
    clickSignOut() {
      this.signOut()
      this.$router.go(0)
    },
    authNavLink() {
      if (this.auth) {
        const type = this.userinfo.roleType
        if (type === 5) {
          /* 普通用户 */
        } else if (type === 4) {
          /* 机构用户 */
        } else if (type === 3) {
          /* 副评委 */
        } else if (type === 2) {
          /* 主评委 */
        }
      }
    },
    getNavList() {
      let type = this.userinfo.roleType
      const navList = [
        { name: '首页', link: '/' },
        { name: '第四届大赛', link: '/game' },
        { name: '作品展示厅', link: '/exhibition' },
        { name: '新闻中心', link: '/news' },
        { name: '合作伙伴', link: '/partner' },
      ]
      if (type === 5 || type === 4) {
        /* 普通/机构用户 */
        this.linkList = [
          ...navList,
          { name: '个人中心', link: '/user' },
        ]
        this.dropList = [
          { name: '个人中心', link: '' }
        ]
      } else if (type === 3 || type === 2) {
        /* 主评委/副评委 */
        this.linkList = [
          ...navList,
          { name: '评委控制台', link: '/user' },
          this.dropList = [
            { name: '评委控制台', link: '' }
          ]
        ]
      }
    },
    /* 初始化滚动监听事件 */
    initNav() {
      this.height = document.documentElement.clientHeight
      window.addEventListener('scroll', this.windowScroll)
    },
    /* 设置顶部显示/隐藏 */
    windowScroll() {
      this.current = document.documentElement.scrollTop || document.body.srcollTop;
      if (this.current > this.height) {
        // 大于xxx
        this.isFixed = true
      } else {
        // 小于xxx
        this.isFixed = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  padding: 10px 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  color: #ffffff;
}
.navbar {
  display: flex;
  align-items: center;
}
.logo {
  width: 171px;
  height: 74px;
  margin-right: 15px;
}
.nav-list {
  margin-left: auto;
}
.nav-list-item {
  margin-right: 62px;
  position: relative;
  &::after {
    content: "";
    display: none;
    margin-left: -4.5px;
    position: absolute;
    left: 50%;
    bottom: -14px;
    width: 0;
    height: 0;
    border: 4.5px solid transparent;
    border-bottom: 7px solid #ff0000;
  }
}
.active {
  color: #ff0000;
  &::after {
    display: block;
  }
}

.logo_white,
.logo_block {
  display: flex;
}
.logo_block {
  display: none;
}
.login {
  display: flex;
  position: relative;
}
.line {
  border-left: 1px solid #ffffff;
  margin: 2px 10px;
}
.account-info {
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #ffffff;
}
.avatar {
  display: flex;
  svg {
    width: 26px;
    height: 26px;
  }
  margin-right: 10px;
}
// .nav-dropdown-link {
//   display: none;
//   background-color: #fff;
//   box-shadow: 0px 3px 12px 0px rgba(35, 35, 35, 0.27);
//   position: absolute;
//   top: 40px;
//   right: 0;
//   min-width: 108px;
//   font-size: 14px;
//   &.active {
//     display: block;
//   }
//   .dropdown-triangle {
//     width: 30px;
//     height: 30px;
//     position: absolute;
//     top: -19px;
//     right: 8px;
//     /* fill: rgba(255, 255, 255, 0.27); */
//     fill: #fff;
//   }
// }
// .nav-dropdown-ul {
//   padding: 5px 0;
// }
// .nav-dropdown-li {
//   cursor: pointer;
//   border-bottom: 1px solid rgba(255, 255, 255, 0.4);
//   text-align: center;
//   display: block;
//   color: #ffffff;
//   padding: 12px 24px;
//   /* white-space: nowrap; */
//   &:last-child {
//     border-bottom: 0;
//   }
//   &:hover {
//     background-color: rgba(255, 255, 255, 0.4);
//   }
//   span {
//     white-space: nowrap;
//   }
// }
</style>
<style lang="scss">
.nav-dropdown.el-dropdown-menu {
  border-radius: 0;
  padding: 5px 0;
  text-align: center;

  border: none;
  .el-dropdown-menu__item {
    min-width: 108px;
    line-height: 40px;
    border-bottom: 1px solid #e5e5e5;
    &:last-of-type {
      border-bottom: 0;
    }
  }
}
.nav-dropdown.active.el-popper[x-placement^="bottom"] {
  background-color: rgba($color: #ffffff, $alpha: 0.3);
  .el-dropdown-menu__item {
    color: #ffffff;
    &:hover {
      background-color: rgba($color: #ffffff, $alpha: 0.3);
    }
  }
  .popper__arrow {
    filter: none;
    border-bottom-color: rgba($color: #ffffff, $alpha: 0.3);
  }
  .popper__arrow::after {
    border-bottom-color: rgba($color: #ffffff, $alpha: 0);
  }
}
.header.fixed {
  .account-info {
    color: #333333;
  }
}
</style>
