<template>
  <div class="node-user-list">
    <dl>
      <dt>Coffee</dt>
      <dd>Black hot drink</dd>
      <dd>Black hot drink</dd>
      <dd>Black hot drink</dd>
    </dl>
    <dl>
      <dt>Coffee</dt>
      <dd>Black hot drink</dd>
      <dd>Black hot drink</dd>
      <dd>Black hot drink</dd>
    </dl>
    <dl>
      <dt>Coffee</dt>
      <dd>Black hot drink</dd>
      <dd>Black hot drink</dd>
      <dd>Black hot drink</dd>
    </dl>
  </div>
</template>
<script>
export default {
  name: 'nodeUserList',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
<style lang="scss">
.node-user-list {
  display: flex;
  dl, dt, dd {
    margin: 0;
    padding: 0;
  }
  dl {
    flex-grow: 1;
    border-right: 1px solid #ECEEF8;
  }
  dt, dd {
    margin-bottom: 5px;
    padding-left: 30px;
  }
  dl:first-child dt,
  dl:first-child dd {
    padding-left: 16px;
  }
  dt {
    color: #8794AE;
    font-size: 14px;
    line-height: 20px;
  }
  dd {
    color: #1D2346;
    font-size: 18px;
    line-height: 25px;
  }
  dd:last-child {
    margin-bottom: 0;
  }
}
</style>
