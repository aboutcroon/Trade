<template>
  <h2 class="drawer-title">
    <span class="vertical-line" :class="color"></span>
    <span class="text"></span>
  </h2>
</template>

<script>
export default {
  name: 'DrawerTitle',
  props: {
    color: {
      type: String,
      default: 'gray'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
