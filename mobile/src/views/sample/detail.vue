<template>
    <div class="detail">
        <right-panel></right-panel>
        <!--占位标签-->
        <div class="head_replace"></div>

        <div class="content">
            <div class="show">
                <div class="show_item">
                    <div class="show_tag1"><span>人气奖</span></div>
                    <div class="show_like1"></div>
                    <div class="show_image">
                        <img src="../../assets/img/sample1.png">
                    </div>
                    <div class="show_name">111</div>
                    <div class="show_author"><span>设计师：111</span></div>
                    <div class="show_people">
                        <i class="iconfont iconeye"></i>
                        2324人
                    </div>
                </div>
            </div>
            <div class="other">
                <div class="detail_title" style="margin-top: 3.975089vw;">大赛类型：</div>
                <div class="detail_text">酒类</div>
                <div class="detail_title">作品类型：</div>
                <div class="detail_text">原创商标设计</div>
                <div class="detail_title">赛事选择：</div>
                <div class="detail_text">崇礼奖</div>
                <div class="detail_title">奖项类型：</div>
                <div class="detail_text">优创设计奖</div>
                <div class="detail_title">说明：</div>
                <div class="detail_text">
                    改革开放40周年献礼。 2017年，中国的商标申请量达到570多万件。商标代表着企业独一无二的身份，注册商标不仅能得到法律保护，更是企业重要的无形资产
                </div>
                <div class="detail_title">区块链证书：</div>
                <div class="detail_text">此证书已经过多方确认备案，具有真实性</div>
                <div class="detail_img">
                    <img src="../../assets/img/sample2.png">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RightPanel from '../components/RightPanel/index'
import {mapGetters, mapMutations} from 'vuex'

export default {
    name: "sample_detail",
    components: {
        RightPanel
    },
    mounted() {
        this.setActivePage(12)   // 修改当前激活的页面
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
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/mixin";

.detail {
    @include fc;
    background: #F5F5F5;

    .head_replace {
        @include wh(100%, 14.310322vw);
    }

    .content {
        @include fc;
        width: 91.957069vw;
        background: #ffffff;
        margin-bottom: 10.600239vw;

        .show {
            position: relative;

            &:after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translate(-50%);
                height: 0.265006vw;
                width: 84.801908vw;
                background: #EFEFEF;
            }

            .show_item {
                @include wh(91.957069vw, 74.996687vw);
                position: relative;
                background-color: #fff;

                .show_tag1 {
                    @include wh(23.140453vw, 7.420167vw);
                    background: rgba(0, 0, 0, 0.15);
                    border-radius: 0 26.500596vw 26.500596vw 0;
                    position: absolute;
                    top: 7.155161vw;
                    left: 3.710083vw;
                    z-index: 10;

                    span {
                        @include wh(100%, 3.445078vw);
                        @include font(3.710083vw, 3.445078vw, Bold);
                        @include center;
                        text-align: center;
                        color: #FFFFFF;
                    }
                }

                .show_tag2 {
                    @include wh(18.020405vw, 7.420167vw);
                    background: rgba(0, 0, 0, 0.15);
                    border-radius: 0 26.500596vw 26.500596vw 0;
                    position: absolute;
                    top: 7.155161vw;
                    left: 3.710083vw;
                    z-index: 10;

                    span {
                        @include wh(100%, 3.445078vw);
                        @include font(3.710083vw, 3.445078vw, Bold);
                        @include center;
                        text-align: center;
                        color: #FFFFFF;
                    }
                }

                .show_tag3 {
                    @include wh(31.53571vw, 7.420167vw);
                    background: rgba(0, 0, 0, 0.15);
                    border-radius: 3.710083vw;
                    position: absolute;
                    top: 7.155161vw;
                    left: 5.565125vw;
                    z-index: 10;

                    span {
                        @include wh(100%, 3.445078vw);
                        @include font(3.710083vw, 3.445078vw, Bold);
                        @include center;
                        text-align: center;
                        color: #FFFFFF;
                    }
                }

                .show_like1 {
                    @include wh(13.250298vw, 12.720286vw);
                    background: rgba(0, 0, 0, 0.15);
                    position: absolute;
                    top: 3.975089vw;
                    right: 3.445078vw;
                    z-index: 10;
                }

                .show_image {
                    @include wh(84.801908vw, 49.821121vw);
                    @include cl;
                    top: 3.975089vw;
                    background-color: #F5F5F5;

                    img {
                        @include wh(100%, 100%);
                    }
                }

                .show_name {
                    @include wh(100%, 6.360143vw);
                    @include font(4.240095vw, 6.360143vw, Bold);
                    position: absolute;
                    color: #454545;
                    top: 57.506294vw;
                    left: 3.710083vw;
                }

                .show_author {
                    @include wh(100%, 4.770107vw);
                    @include font(3.180072vw, 4.770107vw);
                    position: absolute;
                    color: #636363;
                    top: 63.866437vw;
                    left: 3.710083vw;
                }

                .show_people {
                    height: 5.300119vw;
                    @include font(3.710083vw, 5.300119vw, 500);
                    position: absolute;
                    top: 58.301312vw;
                    right: 3.180072vw;
                    text-align: right;

                    i {
                        font-size: 4.120048vw;
                        color: #BBBBBB;
                        margin-right: 1.32503vw;
                    }
                }
            }
        }

        .other {
            width: 84.801908vw;
            position: relative;

            .detail_title {
                @include font(4.240095vw, 6.360143vw, 500);
                height: 4.240095vw;
                color: #636363;
                letter-spacing: 0.265006vw;
                margin-bottom: 2.65006vw;
            }

            .detail_text {
                @include font(3.710083vw, 5.565125vw);
                color: #454545;
                letter-spacing: 0.212005vw;
                margin-bottom: 6.625149vw;
            }

            .detail_img {
                @include wh(100%, 60.156354vw);
                margin-bottom: 8.745197vw;
                img {
                    @include wh(100%, 100%);
                }
            }
        }
    }
}
</style>
