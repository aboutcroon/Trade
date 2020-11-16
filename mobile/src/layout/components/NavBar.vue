<template>
    <div>
        <!--顶部栏-->
        <header class="head_top">
            <i class="iconfont iconlogo logo"></i>
            <i class="iconfont icontitle_logo text"></i>
            <div @click="menuChange">
                <div class="menu" v-show="!isClick"><i class="iconfont iconmenu"></i></div>
                <div class="menu" v-show="isClick"><i class="iconfont iconcaidan"></i></div>
            </div>
        </header>
        <!--占位标签，正好占据fixed的顶部栏的位置-->
        <div class="head_replacement"></div>
        <!--右侧菜单按钮，下拉框-->
        <div class="pull">
            <el-collapse-transition>
                <div v-show="menuShow"> <!--外层加上div，防抖-->
                    <div class="transition_box" @click="routerChange">
                        <div class="home" :class="{ active: activePage === 1 }" v-show="menuShow">首页</div>
                        <div class="competition" :class="{ active: activePage === 2 }" v-show="menuShow">第四届大赛</div>
                        <div class="sample" :class="{ active: activePage === 3 }" v-show="menuShow">作品展示厅</div>
                        <div class="newsCenter" :class="{ active: activePage === 4 }" v-show="menuShow">新闻中心</div>
                        <div class="partner" :class="{ active: activePage === 5 }" v-show="menuShow">合作伙伴</div>
                        <div class="collapse" v-show="menuShow" @click="collapseChange1">
                            <i class="iconfont icondouyin"></i>
                            <span>官方抖音号</span>
                            <i class="iconfont iconxiala" v-show="isCollapse1"></i>
                            <i class="iconfont iconshouqi" v-show="!isCollapse1"></i>
                        </div>
                        <div class="code" :class="{ codeActive: !isCollapse1 }" v-show="menuShow">
                            <img src="../../assets/img/douyin.jpg">
                        </div>
                        <div class="collapse" v-show="menuShow" @click="collapseChange2" style="margin-top: 2.65006vw;">
                            <i class="iconfont icongongzhonghao"></i>
                            <span>官方公众号</span>
                            <i class="iconfont iconxiala" v-show="isCollapse2"></i>
                            <i class="iconfont iconshouqi" v-show="!isCollapse2"></i>
                        </div>
                        <div class="code" :class="{ codeActive: !isCollapse2 }" v-show="menuShow">
                            <img src="../../assets/img/gongzhonghao.jpg">
                        </div>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <!--顶部栏下面的导航栏-->
        <tab-bar></tab-bar>
    </div>
</template>

<script>
import TabBar from '../../views/components/TabBar/index'
import {mapGetters, mapMutations} from 'vuex'

export default {
    name: 'NavBar',
    components: {
        TabBar
    },
    computed: {
        ...mapGetters([
            'activePage',
        ])
    },
    data() {
        return {
            isClick: false,     // 是否点击menu按钮
            menuShow: false,    // 是否显示menu页面
            isCollapse1: true,    // 是否折叠二维码
            isCollapse2: true,
        }
    },
    watch: {
        isClick: function (val) {      // 点击时显示菜单栏，隐藏主体内容
            this.setHideAll(val)
        }
    },
    methods: {
        ...mapMutations({
            setActivePage: 'set_ActivePage',    // 解决tab-bar问题
            setHideAll: 'set_HideAll'           // 解决menu问题
        }),
        // 是否点击导航栏菜单按钮
        menuChange() {
            this.isClick = !this.isClick
            this.menuShow = !this.menuShow
        },
        // 折叠二维码
        collapseChange1() {
            this.isCollapse1 = !this.isCollapse1
        },
        collapseChange2() {
            this.isCollapse2 = !this.isCollapse2
        },
        // 切换导航中的页面
        routerChange(event) {
            if (event.target.innerText === '首页') {
                this.setActivePage(1)
                this.menuShow = false
                this.isClick = false
                this.$router.push('/home')
            } else if (event.target.innerText === '第四届大赛') {
                this.setActivePage(2)
                this.menuShow = false
                this.isClick = false
                this.$router.push('/competition')
            } else if (event.target.innerText === '作品展示厅') {
                this.setActivePage(3)
                this.menuShow = false
                this.isClick = false
                this.$router.push('/sample')
            } else if (event.target.innerText === '新闻中心') {
                this.setActivePage(4)
                this.menuShow = false
                this.isClick = false
                this.$router.push('/newsCenter')
            } else if (event.target.innerText === '合作伙伴') {
                this.setActivePage(5)
                this.menuShow = false
                this.isClick = false
                this.$router.push('/partner')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/mixin";

.pull {
    position: absolute; // 不设定高度，由transition_box指定高度
    z-index: 150;

    .active {
        width: 34.185769vw !important;
        height: 9.540215vw !important;
        font-size: 6.360143vw !important;
        line-height: 7.685173vw !important;
        font-weight: Bold !important;
        text-align: center;
        position: relative;

        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translate(-50%);
            height: 0.795018vw;
            width: 6.890155vw;
            background: #B30000;
        }
    }

    .transition_box {
        @include wh(100vw, 150vh);
        background-color: #fff;
        color: #fff;
        @include fc;

        .home {
            @include wh(9.275209vw, 6.360143vw);
            @include font(4.240095vw, 5.035113vw);
            margin-top: 13.250298vw;
            color: #454545;
            letter-spacing: 0.265006vw;
        }

        .competition {
            @include wh(22.790513vw, 6.360143vw);
            @include font(4.240095vw, 5.035113vw);
            margin-top: 6.360143vw;
            color: #454545;
            letter-spacing: 0.265006vw;
        }

        .sample {
            @include wh(22.790513vw, 6.360143vw);
            @include font(4.240095vw, 5.035113vw);
            margin-top: 6.360143vw;
            color: #454545;
            letter-spacing: 0.265006vw;
        }

        .newsCenter {
            @include wh(18.285411vw, 6.360143vw);
            @include font(4.240095vw, 5.035113vw);
            margin-top: 6.360143vw;
            color: #454545;
            letter-spacing: 0.265006vw;
        }

        .partner {
            @include wh(18.285411vw, 6.360143vw);
            @include font(4.240095vw, 5.035113vw);
            margin-top: 6.360143vw;
            color: #454545;
            letter-spacing: 0.265006vw;
        }

        .collapse {
            @include wh(65.986485vw, 8.745197vw);
            margin-top: 6.625149vw;
            position: relative;

            span {
                @include font(4.240095vw, 6.360143vw, 500);
                @include ct;
                left: 24.115543vw;
                color: #595959;
                letter-spacing: 0.265006vw;
            }

            i:nth-of-type(1) {
                @include ct;
                font-size: 7.950179vw;
                left: 14.310322vw;
            }

            i:nth-of-type(2) {
                @include ct;
                font-size: 2.915066vw;
                left: 48.496091vw;
            }

            i:nth-of-type(3) {
                @include ct;
                font-size: 2.915066vw;
                left: 48.496091vw;
            }
        }

        .codeActive { // 拉开后，有了高度，过渡
            img {
                height: 37.365841vw !important;
                transition: height .3s;
            }
        }

        .code { // 折叠时，高度为0
            img {
                @include wh(37.365841vw, 0);
                margin-top: 2.65006vw;
                transition: height .3s;
            }
        }

        .public {
            @include wh(65.986485vw, 8.745197vw);
            @include cl;
            top: 98.052206vw;
        }
    }
}

.head_top {
    position: fixed;
    z-index: 200;
    left: 0;
    top: 0;
    background-color: #ffffff;
    box-shadow: 0 2.65006vw 2.65006vw 0 rgba(0, 0, 0, 0.05);
    @include wh(100%, 13.78031vw);
    @include fj;

    .logo {
        @include ct;
        font-size: 6.625149vw;
        color: #E60012;
        left: 3.710083vw;
    }

    .text {
        @include ct;
        font-size: 7.950179vw;
        color: #454545;
        left: 18.815423vw;
    }

    .menu {
        @include wh(11.660262vw, 11.660262vw);
        @include ct;
        background: #FFFFFF;
        box-shadow: 0 0.530012vw 1.060024vw 0 rgba(0, 0, 0, 0.05);
        border-radius: 7.950179vw;
        left: 82.416854vw;

        i {
            font-size: 3.445078vw;
            @include center;
        }
    }
}

.head_replacement {
    @include wh(100%, 13.78031vw);
}

</style>
