<template>
  <div class="gray-block" :class="{'max-padding': maxPadding}">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'GrayBlock',
  props: {
    maxPadding: {
      default: false,
    }
  }
}
</script>
<style lang="scss" scoped>
.gray-block {
  background-color: #F9F9F9;
  padding: 30px;
}
.max-padding {
  padding: 40px;
}
</style>