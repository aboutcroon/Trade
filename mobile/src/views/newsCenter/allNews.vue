<template>
    <div class="allNews">
        <right-panel></right-panel>
        <!--占位标签-->
        <div class="head_replace"></div>

        <div class="content">
            <div class="item">
                <img src="../../assets/img/news2.png">
                <div class="text_title">示范区与约瑟基金开将获得中示范区</div>
                <div class="text_type">中华商标协会官方</div>
                <div class="text_time">
                    <span style="font-weight: 500">发布时间：</span>
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
    name: "allNews",
    components: {
        RightPanel
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
