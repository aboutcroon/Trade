<template>
    <div class="allNews">
        <right-panel></right-panel>
        <!--占位标签-->
        <div class="head_replace"></div>

        <div class="content">
            <div class="item">
                <img :src="news.coverUrl">
                <div class="text_title">{{news.articleTitle}}</div>
                <div class="text_type">{{news.articleTag}}</div>
                <div class="text_time">
                    <span style="font-weight: 500">发布时间：</span>
                    <span>{{news.createTime}}</span>
                </div>
                <div class="text_detail">{{news.articleContent}}</div>
                <div class="text_people">
                    <i class="iconfont iconeye"></i>
                    {{news.visitNumber}}人
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RightPanel from '../components/RightPanel/index'
import {postFun} from "@/api/transit";

export default {
    name: "allNews",
    data() {
        return {
            // 初始化接口数据
            initData: {
                pageNumber: 1,
                pageSize: 5
            },
            news: {}        // 当前新闻
        }
    },
    mounted() {
        this.initNews()
    },
    components: {
        RightPanel
    },
    methods: {
        async initNews() {
            const {data: res} = await postFun('/trade-web/api/article/pageList', this.initData)
            res.list.forEach((item, index) => {
                // 传过来的allNewsId值与当前新闻列表的articleId进行匹配，展示当前新闻
                if (item.articleId === this.$route.query.allNewsId) {
                    this.news = item
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/mixin";

.allNews {
    .head_replace {
        @include wh(100%, 14.310322vw);
    }

    .content {
        @include fc;

        .item {
            @include wh(100%, 103.087319vw);
            background: #ffffff;
            position: relative;
            margin-bottom: 5.300119vw;

            img {
                @include wh(91.957069vw, 49.556115vw);
                @include cl;
                top: 3.975089vw;
            }

            .text_title {
                @include font(4.240095vw, 6.360143vw, Bold);
                color: #454545;
                margin-left: 3.710083vw;
                margin-top: 57.506294vw;
                width: 59.361336vw;
            }

            .text_type {
                @include font(3.180072vw, 4.770107vw, 500);
                color: #BBBBBB;
                margin-left: 3.710083vw;
                margin-top: 0.530012vw;
            }

            .text_time {
                margin-left: 3.710083vw;
                margin-top: 0.795018vw;

                span {
                    @include font(3.710083vw, 5.565125vw);
                    color: #454545;
                    letter-spacing: 0.265006vw;
                }
            }

            .text_detail {
                @include font(3.710083vw, 5.300119vw);
                width: 91.957069vw;
                margin-left: 3.710083vw;
                margin-top: 1.060024vw;
                color: #636363;
                letter-spacing: 0.530012vw;
            }

            .text_people {
                @include font(3.710083vw, 5.565125vw, 500);
                color: #454545;
                letter-spacing: 0.265006vw;
                position: absolute;
                top: 59.361336vw;
                right: 3.710083vw;

                i {
                    font-size: 4.120048vw;
                    color: #BBBBBB;
                    margin-right: 0.795018vw;
                }
            }
        }
    }
}
</style>
