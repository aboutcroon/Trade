<template>
    <div>
        <!--返回顶部-->
        <div class="toTop" @click="backToTop">
            <i class="iconfont icontop_mw"></i>
        </div>
        <!--客服电话-->
        <div class="toService">
            <i class="iconfont iconkefu"></i>
        </div>
        <!--点赞-->
        <div class="toAgree1" v-show="activePage === 12 && agree === false" @click="change">
            <i class="iconfont iconhand1"></i>
        </div>
        <div class="toAgree2" v-show="activePage === 12 && agree" @click="change">
            <i class="iconfont iconhand2"></i>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
    name: "RightPanel",
    data() {
        return {
            agree: false
        }
    },
    computed: {
        ...mapGetters([
            'activePage'    // 当前激活的页面
        ])
    },
    methods: {
        ...mapMutations({
            setActivePage: 'set_ActivePage'
        }),
        backToTop() {
            var timer = setInterval(function () {   // 加定时器缓冲效果
                let osTop = document.documentElement.scrollTop || document.body.scrollTop;
                let ispeed = Math.floor(-osTop / 5);
                document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
                this.isTop = true;
                if (osTop === 0) {
                    clearInterval(timer);
                }
            }, 15)
        },
        // 改变点赞颜色
        change() {
            this.agree = ! this.agree
        }
    },
}
</script>

<style lang="scss" scoped>
@import "../../../assets/mixin";

.toTop {
    @include wh(12.720286vw, 12.720286vw);
    position: fixed;
    border-radius: 7.950179vw;
    /*opacity: 0.8;*/
    background: #454545;
    box-shadow: 0 1.855042vw 3.975089vw 0 rgba(0, 0, 0, 0.34);
    right: 5.300119vw;
    top: 155.753279vw;
    z-index: 100;
    /*-webkit-transition: opacity .5s;*/
    /*transition: opacity .5s;*/
    i {
        @include center;
        font-size: 2.915066vw;
        color: #FFFFFF;
    }
}

.toService {
    @include wh(12.720286vw, 12.720286vw);
    position: fixed;
    border-radius: 7.950179vw;
    background: #B30000;
    box-shadow: 0 1.855042vw 3.975089vw 0 rgba(179, 0, 0, 0.34);
    right: 5.300119vw;
    top: 139.852922vw;
    z-index: 100;

    i {
        @include center;
        font-size: 4.770107vw;
        color: #FFFFFF;
    }
}

.toAgree1 {
    @include wh(12.720286vw, 12.720286vw);
    position: fixed;
    border-radius: 7.950179vw;
    background: #B30000;
    box-shadow: 0 1.855042vw 3.975089vw 0 rgba(179, 0, 0, 0.34);
    right: 5.300119vw;
    top: 123.952565vw;
    z-index: 100;

    i {
        @include center;
        font-size: 4.770107vw;
        color: #FFFFFF;
    }
}

.toAgree2 {
    @include wh(12.720286vw, 12.720286vw);
    position: fixed;
    border-radius: 7.950179vw;
    background: #E3E3E3;
    box-shadow: 0 1.855042vw 3.975089vw 0 rgba(174, 174, 174, 0.34);
    right: 5.300119vw;
    top: 123.952565vw;
    z-index: 100;

    i {
        @include center;
        font-size: 4.770107vw;
        color: #B9B9B9;
    }
}
</style>
