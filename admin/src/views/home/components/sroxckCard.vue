
<template>
  <div class="company-info">
    <!-- <div class="item" v-for="(item,index) in data" :key="index"> 循环生成-->
    <div class="item" :style="colorL" style="display:flex;justify-content:space-between;algin-items:center;">
      <div :style="colorS" class="dot" />
      <div>
        <div class="des">
          <span>{{ title }}</span>
        </div>

      </div>
      <div class="centerline">--------</div>

      <div class="info" :style="{background:oblongColor}">
        <span v-if="info">
          <count-to :start-val="0" :end-val="Number(info)" :duration="5000" class="font" />
        </span>
        <span v-else>
          <span class="font">{{ text }}</span>
        </span>
        <span class="unit">{{ unit }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import CountTo from "vue-count-to";

export default {
  components: {
    CountTo,
  },
  props: {
    oblongColor: {
      default: "pink",
    },
    title: {
      // 标题
      default: "默认标题",
    },
    info: {
      // 数字 count-to 滚动显示
      default: null,
    },
    text: {
      // 非数字显示
      default: "",
    },
    unit: {
      // 单位
      default: "条",
    },
    color: {
      // 背景颜色
      default: "#ccc",
    },
    colorDot: {
      // 小点颜色
      default: "#ccc",
    },
  },
  data() {
    return {
      colorS: `background:${this.colorDot}`,
      colorL: `background:${this.color}`,
    };
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss">
.centerline {
  min-width: 70px;
  font-size: 12px;
  color: #ccc;
  padding: 0 5px;
  // transform: translateY(4px);
}
.company-info {
  display: flex;
  // margin: 14px 0;
  width: 22rem;
  min-width: 180px;
  padding: 0 15px 0 0;
  position: relative;
  .dot {
    width: 5px;
    height: 3rem;
    display: inline-block;
    border-radius: 10px;
    position: absolute;
    left: 8px;
  }
  .item {
    width: 100%;
    // border-radius: 20px;
    display: flex;
    align-items: center;
    min-height: 80px;
    // height: 70px;
    background: rgba(242, 242, 247, 1);
    border-radius: 6px 8px 8px 6px;
    // margin-right: 20px;
    padding: 10px 15px 10px 30px;
    .des {
      margin: 0;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #141c49;
      height: 20px;
      line-height: 20px;
    }
    .info {
      border-radius: 5px;
      padding: 15px ;
      font-size: 16px;
      margin: 0;
      font-weight: 500;
      color: rgba(129, 128, 147, 1);
      line-height: 22px;
      .font {
        font-weight: bold;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 1px;
        color: #002a62;
      }
      .unit {
        // font-size: 12px;
        // font-weight: 400;
        color: rgba(0, 42, 98, 1);
        // line-height: 17px;
      }
    }
    .sucess {
      color: rgba(33, 191, 116, 1);
    }
  }
}
</style>
