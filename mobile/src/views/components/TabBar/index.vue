<template>
    <!--导航栏-->
    <!--showNews和showHonor分别控制切换到不同页面时导航栏的变化-->
    <div class="tab"
         :class="{ showNews1: activePage === 6, showNews2: activePage === 7, showNews3: activePage === 8, showNews4: activePage === 9, showHonor: activePage === 10, showGuests1: activePage === 11, showSample: activePage === 12, showGuests2: activePage === 13 }">
        <!--showTab控制导航栏的显示与否，tabColor控制切换到不同页面时导航栏的颜色-->
        <nav class="nav"
             :class="{ showTab: !tabShow, tabColor: activePage === 1 || activePage === 2 || activePage === 3 }">
            <!--每个nav_box是一个导航-->
            <div class="nav_box" :class="{ active: activePage === 1 }" style="width: 18.550417vw; height: 19.345435vw">
                <div @click="tabChange">
                    <div class="nav_num" style="padding: 0 5.300119vw">01</div>
                    <div class="nav_text">首页</div>
                </div>
                <div class="nav_gap">/</div>
            </div>
            <div class="nav_box" :class="{ active: activePage === 2 }" style="width: 28.88565vw; height: 19.345435vw">
                <div @click="tabChange">
                    <div class="nav_num" style="padding: 0 4.240095vw">02</div>
                    <div class="nav_text">第四届大赛</div>
                </div>
                <div class="nav_gap">/</div>
            </div>
            <div class="nav_box" :class="{ active: activePage === 3 }" style="width: 28.88565vw; height: 19.345435vw">
                <div @click="tabChange">
                    <div class="nav_num" style="padding: 0 4.240095vw">03</div>
                    <div class="nav_text">作品展示厅</div>
                </div>
                <div class="nav_gap">/</div>
            </div>
            <div class="nav_box" :class="{ active: activePage === 4 }" style="width: 22.525507vw; height: 19.345435vw">
                <div @click="tabChange">
                    <div class="nav_num">04</div>
                    <div class="nav_text">新闻中心</div>
                </div>
                <div class="nav_gap">/</div>
            </div>
            <div class="nav_box" :class="{ active: activePage === 5 }" style="width: 22.525507vw; height: 19.345435vw">
                <div @click="tabChange">
                    <div class="nav_num">05</div>
                    <div class="nav_text">合作伙伴</div>
                </div>
            </div>
        </nav>

        <!--动态class，切换不同页面时显示-->
        <nav class="nav_news1" :class="{ showTab: !tabShow}">
            <div @click="back">
                <span class="back"><</span>
                <span class="newsOne">首页</span>
            </div>
            <span class="newsTwo">/</span>
            <span class="newsThr">新闻内容</span>
        </nav>

        <nav class="nav_news2" :class="{ showTab: !tabShow}">
            <div @click="back">
                <span class="back"><</span>
                <span class="newsOne">新闻中心</span>
            </div>
            <span class="newsTwo">/</span>
            <span class="newsThr">新闻内容</span>
        </nav>

        <nav class="nav_news3" :class="{ showTab: !tabShow}">
            <div @click="back">
                <span class="back"><</span>
                <span class="newsOne">首页</span>
            </div>
            <span class="newsTwo">/</span>
            <span class="newsThr">热点新闻</span>
        </nav>

        <nav class="nav_news4" :class="{ showTab: !tabShow}">
            <div @click="back">
                <span class="back"><</span>
                <span class="newsOne">新闻中心</span>
            </div>
            <span class="newsTwo">/</span>
            <span class="newsThr">热点新闻</span>
        </nav>

        <nav class="nav_honor" :class="{ showTab: !tabShow}">
            <div @click="back">
                <span class="back"><</span>
                <span class="newsOne">首页</span>
            </div>
            <span class="newsTwo">/</span>
            <span class="newsThr">获奖者荣誉</span>
        </nav>

        <nav class="nav_guests1" :class="{ showTab: !tabShow, tabColor: true}">
            <div @click="back">
                <span class="back"><</span>
                <span class="newsOne">首页</span>
            </div>
            <span class="newsTwo">/</span>
            <span class="newsThr">重磅嘉宾</span>
        </nav>

        <nav class="nav_sample" :class="{ showTab: !tabShow}">
            <div @click="back">
                <span class="back"><</span>
                <span class="newsOne">作品展示厅</span>
            </div>
            <span class="newsTwo">/</span>
            <span class="newsThr">作品详情</span>
        </nav>

        <nav class="nav_guests2" :class="{ showTab: !tabShow, tabColor: true}">
            <div @click="back">
                <span class="back"><</span>
                <span class="newsOne">第四届大赛</span>
            </div>
            <span class="newsTwo">/</span>
            <span class="newsThr">重磅嘉宾</span>
        </nav>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
    name: "TabBar",
    computed: {
        ...mapGetters([
            'activePage'
        ])
    },
    data() {
        return {
            tabShow: true,  // 上拉下滑时是否收起导航栏
            i: 0,            // 上拉下滑时暂存变量
        }
    },
    mounted() {
        // 当activePage变化时，:class直接改变，就无需再走mounted这一步
        this.init()
        // 监听（绑定）滚轮 滚动事件
        window.addEventListener('scroll', this.handleScroll, true)
    },
    methods: {
        ...mapMutations({
            setActivePage: 'set_ActivePage'
        }),
        // 返回按钮
        back() {
            this.$router.go(-1)
        },
        // 页面上滑时显示导航栏，下拉时隐藏导航栏
        handleScroll() {
            // 页面滚动距顶部距离
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
                document.body.scrollTop
            let scroll = scrollTop - this.i;
            this.i = scrollTop;
            if (scroll < 0) {
                //上拉时
                this.tabShow = true
            } else if (scroll > 0 && scrollTop > 50) {
                //下滑时
                this.tabShow = false
            }
        },
        // 初始化
        init() {
            if (this.$route.path === '/home') {
                this.setActivePage(1)
            } else if (this.$route.path === '/competition') {
                this.setActivePage(2)
            } else if (this.$route.path === '/sample') {
                this.setActivePage(3)
            } else if (this.$route.path === '/newsCenter') {
                this.setActivePage(4)
            } else if (this.$route.path === '/partner') {
                this.setActivePage(5)
            } else if (this.$route.path === '/home/allNews') {
                this.setActivePage(6)
            } else if (this.$route.path === '/newsCenter/allNews') {
                this.setActivePage(7)
            }
        },
        // 点击导航栏，切换页面
        tabChange(event) {
            if (event.target.innerText === '01' || event.target.innerText === '首页') {
                this.setActivePage(1)
                this.$router.push('/home')
            } else if (event.target.innerText === '02' || event.target.innerText === '第四届大赛') {
                this.setActivePage(2)
                this.$router.push('/competition')
            } else if (event.target.innerText === '03' || event.target.innerText === '作品展示厅') {
                this.setActivePage(3)
                this.$router.push('/sample')
            } else if (event.target.innerText === '04' || event.target.innerText === '新闻中心') {
                this.setActivePage(4)
                this.$router.push('/newsCenter')
            } else if (event.target.innerText === '05' || event.target.innerText === '合作伙伴') {
                this.setActivePage(5)
                this.$router.push('/partner')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/mixin";

.showNews1 {
    .nav {
        display: none !important;
    }

    .nav_news1 {
        display: block !important;
    }
}

.showNews2 {
    .nav {
        display: none !important;
    }

    .nav_news2 {
        display: block !important;
    }
}

.showNews3 {
    .nav {
        display: none !important;
    }

    .nav_news3 {
        display: block !important;
    }
}

.showNews4 {
    .nav {
        display: none !important;
    }

    .nav_news4 {
        display: block !important;
    }
}

.showHonor {
    .nav {
        display: none !important;
    }

    .nav_honor {
        display: block !important;
    }
}

.showGuests1 {
    .nav {
        display: none !important;
    }

    .nav_guests1 {
        display: block !important;
    }
}

.showSample {
    .nav {
        display: none !important;
    }

    .nav_sample {
        display: block !important;
    }
}

.showGuests2 {
    .nav {
        display: none !important;
    }

    .nav_guests2 {
        display: block !important;
    }
}

.tabColor { // 更换导航栏颜色
    background-color: #FFFFFF !important;
}

.tab {
    .showTab { // 当下滑时，导航栏高度变为0
        height: 0 !important;
        transition: height .3s;
    }

    // 每次加入新的导航栏时，要添加上相应的.nav_xxx的样式
    .nav_news1 {
        display: none;
        @include wh(100%, 14.310322vw);
        white-space: nowrap; /*不换行*/
        overflow-x: scroll;
        overflow-y: hidden;
        position: fixed;
        z-index: 100;
        background-color: #F5F5F5;
        transition: height .3s;

        .back {
            @include ct;
            left: 3.710083vw;
            font-size: 2.65006vw;
        }

        .newsOne {
            @include font(4.240095vw, 6.360143vw);
            @include ct;
            left: 7.420167vw;
            color: #BBBBBB;
            letter-spacing: 0.212005vw;
        }

        .newsTwo {
            @include font(4.240095vw, 6.360143vw);
            @include ct;
            left: 18.550417vw;
            color: #C7C7C7;
        }

        .newsThr {
            @include font(4.240095vw, 6.360143vw, 500);
            @include ct;
            left: 21.995495vw;
            color: #B30000;
        }
    }

    .nav_news2 {
        display: none;
        @include wh(100%, 14.310322vw);
        white-space: nowrap; /*不换行*/
        overflow-x: scroll;
        overflow-y: hidden;
        position: fixed;
        z-index: 100;
        background-color: #F5F5F5;
        transition: height .3s;

        .back {
            @include ct;
            left: 3.710083vw;
            font-size: 2.65006vw;
        }

        .newsOne {
            @include font(4.240095vw, 6.360143vw);
            @include ct;
            left: 7.420167vw;
            color: #BBBBBB;
            letter-spacing: 0.212005vw;
        }

        .newsTwo {
            @include font(4.240095vw, 6.360143vw);
            @include ct;
            left: 26.765602vw;
            color: #C7C7C7;
        }

        .newsThr {
            @include font(4.240095vw, 6.360143vw, 500);
            @include ct;
            left: 30.21068vw;
            color: #B30000;
        }
    }

    .nav_news3 {
        display: none;
        @include wh(100%, 14.310322vw);
        white-space: nowrap; /*不换行*/
        overflow-x: scroll;
        overflow-y: hidden;
        position: fixed;
        z-index: 100;
        background-color: #F5F5F5;
        transition: height .3s;

        .back {
            @include ct;
            left: 3.710083vw;
            font-size: 2.65006vw;
        }

        .newsOne {
            @include font(4.240095vw, 6.360143vw);
            @include ct;
            left: 7.420167vw;
            color: #BBBBBB;
            letter-spacing: 0.212005vw;
        }

        .newsTwo {
            @include font(4.240095vw, 6.360143vw);
            @include ct;
            left: 18.550417vw;
            color: #C7C7C7;
        }

        .newsThr {
            @include font(4.240095vw, 6.360143vw, 500);
            @include ct;
            left: 21.995495vw;
            color: #B30000;
        }
    }

    .nav_news4 {
        display: none;
        @include wh(100%, 14.310322vw);
        white-space: nowrap; /*不换行*/
        overflow-x: scroll;
        overflow-y: hidden;
        position: fixed;
        z-index: 100;
        background-color: #F5F5F5;
        transition: height .3s;

        .back {
            @include ct;
            left: 3.710083vw;
            font-size: 2.65006vw;
        }

        .newsOne {
            @include font(4.240095vw, 6.360143vw);
            @include ct;
            left: 7.420167vw;
            color: #BBBBBB;
            letter-spacing: 0.212005vw;
        }

        .newsTwo {
            @include font(4.240095vw, 6.360143vw);
            @include ct;
            left: 26.765602vw;
            color: #C7C7C7;
        }

        .newsThr {
            @include font(4.240095vw, 6.360143vw, 500);
            @include ct;
            left: 30.21068vw;
            color: #B30000;
        }
    }

    .nav_honor {
        display: none;
        @include wh(100%, 14.310322vw);
        white-space: nowrap; /*不换行*/
        overflow-x: scroll;
        overflow-y: hidden;
        position: fixed;
        z-index: 100;
        background-color: #F5F5F5;
        transition: height .3s;

        .back {
            @include ct;
            left: 3.710083vw;
            font-size: 2.65006vw;
        }

        .newsOne {
            @include font(4.240095vw, 6.360143vw);
            @include ct;
            left: 7.420167vw;
            color: #BBBBBB;
            letter-spacing: 0.212005vw;
        }

        .newsTwo {
            @include font(4.240095vw, 6.360143vw);
            @include ct;
            left: 18.550417vw;
            color: #C7C7C7;
        }

        .newsThr {
            @include font(4.240095vw, 6.360143vw, 500);
            @include ct;
            left: 21.995495vw;
            color: #B30000;
        }
    }

    .nav_guests1 {
        display: none;
        @include wh(100%, 14.310322vw);
        white-space: nowrap; /*不换行*/
        overflow-x: scroll;
        overflow-y: hidden;
        position: fixed;
        z-index: 100;
        background-color: #F5F5F5;
        transition: height .3s;

        .back {
            @include ct;
            left: 3.710083vw;
            font-size: 2.65006vw;
        }

        .newsOne {
            @include font(4.240095vw, 6.360143vw);
            @include ct;
            left: 7.420167vw;
            color: #BBBBBB;
            letter-spacing: 0.212005vw;
        }

        .newsTwo {
            @include font(4.240095vw, 6.360143vw);
            @include ct;
            left: 18.550417vw;
            color: #C7C7C7;
        }

        .newsThr {
            @include font(4.240095vw, 6.360143vw, 500);
            @include ct;
            left: 21.995495vw;
            color: #B30000;
        }
    }

    .nav_sample {
        display: none;
        @include wh(100%, 14.310322vw);
        white-space: nowrap; /*不换行*/
        overflow-x: scroll;
        overflow-y: hidden;
        position: fixed;
        z-index: 100;
        background-color: #F5F5F5;
        transition: height .3s;

        .back {
            @include ct;
            left: 3.710083vw;
            font-size: 2.65006vw;
        }

        .newsOne {
            @include font(4.240095vw, 6.360143vw);
            @include ct;
            left: 7.420167vw;
            color: #BBBBBB;
            letter-spacing: 0.212005vw;
        }

        .newsTwo {
            @include font(4.240095vw, 6.360143vw);
            @include ct;
            left: 30.475686vw;
            color: #C7C7C7;
        }

        .newsThr {
            @include font(4.240095vw, 6.360143vw, 500);
            @include ct;
            left: 33.920763vw;
            color: #B30000;
        }
    }

    .nav_guests2 {
        display: none;
        @include wh(100%, 14.310322vw);
        white-space: nowrap; /*不换行*/
        overflow-x: scroll;
        overflow-y: hidden;
        position: fixed;
        z-index: 100;
        background-color: #F5F5F5;
        transition: height .3s;

        .back {
            @include ct;
            left: 3.710083vw;
            font-size: 2.65006vw;
        }

        .newsOne {
            @include font(4.240095vw, 6.360143vw);
            @include ct;
            left: 7.420167vw;
            color: #BBBBBB;
            letter-spacing: 0.212005vw;
        }

        .newsTwo {
            @include font(4.240095vw, 6.360143vw);
            @include ct;
            left: 30.475686vw;
            color: #C7C7C7;
        }

        .newsThr {
            @include font(4.240095vw, 6.360143vw, 500);
            @include ct;
            left: 33.920763vw;
            color: #B30000;
        }
    }

    .nav {
        @include wh(100%, 19.345435vw);
        white-space: nowrap; /*不换行*/
        overflow-x: scroll;
        overflow-y: hidden;
        position: fixed;
        z-index: 100;
        background-color: #F5F5F5;
        transition: height .3s;

        .nav_box {
            position: relative;
            display: inline-block;
        }

        .active {
            .nav_num {
                @include wh(100%, 4.240095vw);
                @include font(4.240095vw, 6.360143vw, 500);
                top: 3.445078vw;
            }

            .nav_text {
                color: #B30000;
                font-weight: 500;
            }
        }

        .nav_num {
            @include wh(100%, 5.300119vw);
            @include font(3.710083vw, 4.505101vw);
            color: #454545;
            letter-spacing: 0.265006vw;
            position: absolute;
            top: 4.505101vw;
            padding: 0 3.445078vw;
        }

        .nav_text {
            @include wh(100%, 5.300119vw);
            @include font(3.710083vw, 4.505101vw);
            color: #BBBBBB;
            letter-spacing: 0.265006vw;
            position: absolute;
            text-align: center;
            top: 9.805221vw;
        }

        .nav_gap {
            @include wh(1.590036vw, 4.505101vw);
            @include font(3.180072vw, 4.505101vw, Bold);
            @include ct;
            right: 0;
            color: #CFCFCF;
        }
    }
}
</style>
