<template>
    <div class="hotNews">
        <right-panel></right-panel>
        <!--占位标签-->
        <div class="head_replace"></div>

        <div class="content">
            <div class="item">
                <img src="../../assets/img/hotNews1.png">
                <div class="text_title">北京国际设计周</div>
                <div class="text_type">中华商标协会官方</div>
                <div class="text_time">
                    <span>发布时间：</span>
                    <span>2020/10/28 上午11:12</span>
                </div>
                <div class="text_detail">
                    中华商标（国际）创意设计大赛的获奖者除了能获得奖状、奖杯外，中华商标（国际）创意设计大赛设计作品将获得中华商标协会、中国教育电视台的权威认证
                    中华商标（国际）创意设计大赛的获奖者除了能获得奖状、奖杯外，中华商标（国际）创意设计大赛设计作品将获得中华商标协会、中国教育电视台的权威认证
                </div>
                <div class="text_people">
                    <i class="iconfont iconeye"></i>
                    2324人
                </div>
            </div>

            <div class="item">
                <img src="../../assets/img/hotNews1.png">
                <div class="text_title">北京国际设计周</div>
                <div class="text_type">中华商标协会官方</div>
                <div class="text_time">
                    <span>发布时间：</span>
                    <span>2020/10/28 上午11:12</span>
                </div>
                <div class="text_detail">
                    中华商标（国际）创意设计大赛的获奖者除了能获得奖状、奖杯外，中华商标（国际）创意设计大赛设计作品将获得中华商标协会、中国教育电视台的权威认证
                    中华商标（国际）创意设计大赛的获奖者除了能获得奖状、奖杯外，中华商标（国际）创意设计大赛设计作品将获得中华商标协会、中国教育电视台的权威认证
                </div>
                <div class="text_people">
                    <i class="iconfont iconeye"></i>
                    2324人
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RightPanel from '../components/RightPanel/index'
export default {
    name: "hotNews",
    components: {
        RightPanel
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/mixin";

.hotNews {
    background: #F5F5F5;

    .head_replace {
        @include wh(100%, 14.310322vw);
    }

    .content {
        @include fc;

        .item {
            @include wh(91.957069vw, 103.087319vw);
            background: #ffffff;
            position: relative;
            margin-bottom: 5.300119vw;

            img {
                @include wh(84.271896vw, 49.556115vw);
                @include cl;
                top: 3.975089vw;
            }

            .text_title {
                @include font(4.240095vw, 6.360143vw, 500);
                color: #454545;
                position: absolute;
                left: 3.710083vw;
                top: 57.506294vw;
                width: 59.361336vw;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .text_type {
                @include font(3.180072vw, 4.770107vw, 500);
                color: #BBBBBB;
                position: absolute;
                left: 3.710083vw;
                top: 63.071419vw;
            }

            .text_time {
                position: absolute;
                left: 3.710083vw;
                top: 68.90155vw;

                span {
                    @include font(3.710083vw, 5.565125vw);
                    color: #454545;
                    letter-spacing: 0.265006vw;
                }
            }

            .text_detail {
                @include wh(84.801908vw, 21.200477vw);
                @include font(3.710083vw, 5.300119vw);
                @include cl;
                color: #636363;
                letter-spacing: 0.530012vw;
                top: 75.261693vw;
                overflow: hidden;
                display: -webkit-box; /* autoprefixer: off */
                -webkit-box-orient: vertical; /* autoprefixer: on */
                -webkit-line-clamp: 4;
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
