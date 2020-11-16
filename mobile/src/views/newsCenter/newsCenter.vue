<template>
    <div class="newsCenter">
        <right-panel></right-panel>

        <!--占位标签-->
        <div class="head_replace"></div>

        <div class="content">
            <div class="tab" @click="tabClick">
                <div class="tab_item" :class="{ activeTab: newsType === 1 }">
                    <span>#全部新闻</span>
                    <div></div>
                </div>
                <div class="tab_item" :class="{ activeTab: newsType === 2 }">
                    <span style="left: 11.395256vw">#热点新闻</span>
                    <div style="left: 7.420167vw"></div>
                </div>
            </div>

            <!--全部新闻-->
<!--            <div class="allNews" v-show="newsType === 1">-->
<!--                <div class="allNews_whole" @click="readAllNews" v-for="item in newsList" :key="item.articleId">-->
<!--                    <img :src="item.coverUrl">-->
<!--                    <div class="allNews_text">-->
<!--                        <div>{{ item.articleTitle }}</div>-->
<!--                        <div>-->
<!--                            {{item.articleContent}}-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="allNews_time">{{item.createTime}}</div>-->
<!--                    <div class="allNews_read">阅读全文</div>-->
<!--                </div>-->

<!--                <div class="allNews_more">加载更多…</div>-->
<!--            </div>-->
            <div class="allNews" v-show="newsType === 1">
                <div class="allNews_whole" @click="readAllNews" v-for="item in newsList" :key="item.articleId">
                    <div class="allNews_title">{{ item.articleTitle }}</div>
                    <div class="allNews_text">{{item.articleContent}}</div>
                    <img :src="item.coverUrl">
                    <div class="allNews_type">{{item.articleTag}}</div>
                    <div class="allNews_read">阅读原文</div>
                </div>
            </div>

            <!--热点新闻-->
            <div class="allNews" v-show="newsType === 2">
                <div class="allNews_whole" @click="readAllNews">
                    <div class="allNews_title">
                        环球网快讯]刚刚，共和党总统候选人特朗普连
                        发五条推文，抱怨宾夕法尼亚州计票“不公”
                    </div>
                    <div class="allNews_text">
                        特朗普先是写道：“‘这是我们所知道的。我们必须回到州一级来看看这个泥沼最初是如何形成的
                        特朗普先是写道：“‘这是我们所知道的。我们必须回到州一级来看看这个泥沼最初是如何形成的
                    </div>
                    <img src="../../assets/img/news2.png">
                    <div class="allNews_type">中华商标协会官方</div>
                    <div class="allNews_read">阅读原文</div>
                </div>
                <div class="allNews_whole" @click="readAllNews">
                    <div class="allNews_title">
                        环球网快讯]刚刚，共和党总统候选人特朗普连
                        发五条推文，抱怨宾夕法尼亚州计票“不公”
                    </div>
                    <div class="allNews_text">
                        特朗普先是写道：“‘这是我们所知道的。我们必须回到州一级来看看这个泥沼最初是如何形成的
                        特朗普先是写道：“‘这是我们所知道的。我们必须回到州一级来看看这个泥沼最初是如何形成的
                    </div>
                    <img src="../../assets/img/news2.png">
                    <div class="allNews_type">中华商标协会官方</div>
                    <div class="allNews_read">阅读原文</div>
                </div>
                <div class="allNews_whole" @click="readAllNews">
                    <div class="allNews_title">
                        环球网快讯]刚刚，共和党总统候选人特朗普连
                        发五条推文，抱怨宾夕法尼亚州计票“不公”
                    </div>
                    <div class="allNews_text">
                        特朗普先是写道：“‘这是我们所知道的。我们必须回到州一级来看看这个泥沼最初是如何形成的
                        特朗普先是写道：“‘这是我们所知道的。我们必须回到州一级来看看这个泥沼最初是如何形成的
                    </div>
                    <img src="../../assets/img/news2.png">
                    <div class="allNews_type">中华商标协会官方</div>
                    <div class="allNews_read">阅读原文</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RightPanel from '../components/RightPanel/index'
import {mapGetters, mapMutations} from 'vuex'
import {getFun, postFun} from '@/api/transit.js'

export default {
    name: "newsCenter",
    components: {
        RightPanel
    },
    data() {
        return {
            // 初始化接口数据
            initData: {
                pageNumber: 1,
                pageSize: 5
            },
            // 新闻列表
            newsList: []
        }
    },
    mounted() {
        this.setActivePage(4)
        this.initNews()
    },
    methods: {
        ...mapMutations({
            setNewsType: 'set_NewsType',
            setActivePage: 'set_ActivePage'
        }),
        // 切换tab
        tabClick(event) {
            if (event.target.innerText === '#全部新闻') {
                this.setNewsType(1)
            } else if (event.target.innerText === '#热点新闻') {
                this.setNewsType(2)
            }
        },
        // 前往 新闻中心->全部新闻
        readAllNews() {
            this.$router.push({
                name: 'centerAllNews',
                query: {
                    'allNewsId': 1
                }
            })
            this.setActivePage(7)
        },
        // 前往 新闻中心->热点新闻
        readHotNews() {
            this.$router.push({
                name: 'centerHotNews',
                query: {
                    'hotNewsId': 1
                }
            })
            this.setActivePage(9)
        },
        // 时间转换
        timeSwitch(time) {
            let y = result.getFullYear()
            let m = result.getMonth() + 1
            let d = result.getDate()
            let h = result.getHours()
            let mm = result.getMinutes()
            let s = result.getSeconds()
            return y + '-' + this.timeAdd(m) + '-' + this.timeAdd(d) + ' ' + this.timeAdd(h) + ':' + this.timeAdd(mm) + ':' + this.timeAdd(s)
        },
        timeAdd(m) {
            return m < 10 ? '0' + m : m
        },
        // 获取新闻列表
        async initNews() {
            const {data: res} = await postFun('/trade-web/api/article/pageList', this.initData)
            this.newsList = res.list
            console.log(this.newsList)
        },
    },
    computed: {
        ...mapGetters([
            'newsType'
        ])
    },
}
</script>

<style lang="scss" scoped>
@import "../../assets/mixin";

.newsCenter {
    .head_replace {
        @include wh(100%, 19.345435vw);
    }

    .content {
        .tab {
            @include wh(100%, 12.985292vw);
            margin-top: 3.710083vw;

            .activeTab {
                span {
                    color: #B30000 !important;
                }

                div {
                    background: #B30000 !important;
                }
            }

            .tab_item {
                @include wh(50%, 100%);
                position: relative;
                display: inline-block;

                span {
                    @include font(3.710083vw, 5.565125vw, 500);
                    letter-spacing: 0.212005vw;
                    color: #BBBBBB;
                    position: absolute;
                    right: 11.395256vw;
                    top: 2.915066vw;
                }

                div {
                    @include wh(26.500596vw, 0.795018vw);
                    background: #BBBBBB;
                    position: absolute;
                    bottom: 2.915066vw;
                    right: 7.420167vw;
                }
            }
        }

        .allNews {
            //margin-top: 54.591228vw;

            .allNews_whole {
                @include wh(100%, 40.545912vw);
                position: relative;
                margin-bottom: 2.65006vw;

                .allNews_title {
                    @include wh(91.427057vw, 10.865244vw);
                    @include font(4.240095vw, 5.300119vw, 500);
                    @include cl;
                    color: #454545;
                    letter-spacing: 0.212005vw;
                }

                .allNews_text {
                    @include font(3.710083vw, 4.770107vw);
                    color: #6E6E6E;
                    letter-spacing: 0.212005vw;
                    position: absolute;
                    left: 3.710083vw;
                    top: 16.43037vw;
                    width: 63.336425vw;
                    overflow: hidden;
                    display: -webkit-box; /* autoprefixer: off */
                    -webkit-box-orient: vertical; /* autoprefixer: on */
                    -webkit-line-clamp: 3;
                }

                .allNews_type {
                    @include font(3.180072vw, 4.770107vw);
                    color: #999999;
                    position: absolute;
                    left: 3.710083vw;
                    top: 34.715781vw;
                }

                .allNews_read {
                    @include font(3.180072vw, 4.770107vw);
                    color: #BB0000;
                    position: absolute;
                    right: 3.710083vw;
                    top: 34.715781vw;
                }

                img {
                    @include wh(26.500596vw, 16.165364vw);
                    position: absolute;
                    left: 69.166556vw;
                    top: 15.900358vw;
                }
            }

            .btn {
                @include wh(25.970584vw, 10.070227vw);
                position: relative;
                margin: 0 auto;
                background-color: #B30000;
                border-color: #B30000;

                span {
                    @include font(3.445078vw, 4.240095vw);
                    @include ct;
                    left: 4.505101vw;
                    color: #FFFFFF;
                }

                .iconfont {
                    @include ct;
                    left: 19.080429vw;
                    font-size: 2.120048vw;
                    color: #fff;
                }
            }
        }
    }
}

</style>
