<template>
  <div class="menu-tree">
    <label v-for="menu in menuList" :key="menu.menuId">
      <el-submenu
        :index="menu.parentMenuId + '-' +menu.orderNumber"
        v-if="menu.menuList.length != 0"
      >
        <template slot="title">
          <span @click="menuFun(menu.menuList)">{{menu.menuName}}</span>
        </template>
        <span v-for="item in [menu.menuList]" :key="item.menuId" @click="menuFun(menu)">
          <child-menu :menuList="item"></child-menu>
        </span>
      </el-submenu>
      <el-menu-item v-else :index="menu.parentMenuId + '-' +menu.orderNumber">
        <span slot="title" @click="menuFun(menu)">{{menu.menuName}}</span>
      </el-menu-item>
    </label>
  </div>
</template>

<script>
export default {
  name: "childMenu",
  props: ["menuList"],
  methods: {
    menuFun(menu) {
      this.$emit("menuListF", menu);
    },
  }
};
</script>
<style scoped>
.menu-tree .el-menu-item span, .menu-tree .el-submenu__title span{
  display: block;
  width: 100%;
}
</style>