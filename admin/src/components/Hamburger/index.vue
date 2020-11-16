<template>
  <div class="hamburgerBox" style="padding: 0 15px;" @click="toggleClick">
    <svg
      :class="{'is-active':isActive}"
      class="hamburger"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
    >
      <path
        d="M409.6 64l471.466667 416c19.2 17.066667 19.2 46.933333 0 64L409.6 962.133333c-27.733333 23.466667-72.533333 4.266667-72.533333-32V96c0-36.266667 44.8-55.466667 72.533333-32z"
        fill="#B30000"
        p-id="2071"
      />
      <path
        d="M243.2 957.866667V70.4c0-8.533333-6.4-17.066667-14.933333-17.066667h-85.333334c-8.533333 0-14.933333 6.4-14.933333 14.933334v889.6c0 8.533333 6.4 14.933333 14.933333 14.933333h85.333334c8.533333 0 14.933333-6.4 14.933333-14.933333z"
        fill="#DBDEF2"
        p-id="2072"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "Hamburger",
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit("toggleClick");
    }
  }
};
</script>

<style scoped>
.hamburgerBox {
  width: 44px;
  height: 44px;
  background:#F7E5E5;
  border-radius: 8px;
  line-height: 44px;
  margin-left: 23px;
}
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  margin-left: -3px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
