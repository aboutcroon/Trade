<template>
    <div class="partner">
        <right-panel></right-panel>

        <!--占位标签-->
        <div class="head_replace"></div>

        <div class="content">
            <div class="cooperate">
                <img src="../../assets/img/partnerBig.png">
            </div>

            <div class="sloganOne">合作方式</div>
            <div class="sloganTwo">Mode of cooperation</div>
            <div class="detail"
                 v-html="'&#12288;作为一家立足于大中华地区影响国际，帮助国内外众多行业协会、研究机构、专业媒体解决商标设计、地区地标为支撑的特色经济机构，公司一直相信“合作创造价值”，建立在双方资源互补、双赢基础上的商业合作能够为合作双方贷来丰厚的回报。公司现在采取了五种合作方式：冠名单位、协办单位、支持单位、颁奖晚宴冠名单位、企业商标定制化服务等，为不同赞助商提供各种类型宣传服务。而在合作过程中，公司表现出的专业、务实和坦诚态度，获得了合作者的极大赞誉'"></div>
            <div class="background"></div>

            <div class="sloganThr">合作企业类型</div>
            <div class="sloganFou">Types of cooperative enterprises</div>
            <div class="cooperate_type" style="margin-top: 4.505101vw;">
                <i class="iconfont iconjigou"></i>
                <div>政府机构</div>
                <div>20+</div>
            </div>
            <div class="cooperate_type">
                <i class="iconfont iconxiehui"></i>
                <div>行业协会</div>
                <div>2000+</div>
            </div>
            <div class="cooperate_type">
                <i class="iconfont iconmeitihuoban"></i>
                <div>媒体机构</div>
                <div>3000+</div>
            </div>

            <div class="sloganFiv">合作企业</div>
            <div class="sloganSix">Cooperative Enterprises</div>
            <div class="partner">
                <div class="red"></div>
                <div class="title">公司名称</div>
                <div class="text">中国网++（国家互联网服务平台）</div>
                <div class="text">中国网(china.com.cn/china.org.cn)</div>
                <div class="text">中华商标协会(cta.org.cn)</div>
                <div class="text">中国教育电视台(centv.cn)</div>
                <div class="text">北大区块链研究中心</div>
                <div class="text">人民大学中国商标品牌研究院（rmbs.ruc.edu.cn）</div>
                <div class="text">中国市场监管报社（cicn.com.cn）</div>
                <div class="text">国家知识产权运营公共服务平台（sipop.cn）</div>
                <div class="text">《世界生态》杂志（world-ecological.com）</div>
            </div>

            <foot-bottom></foot-bottom>
        </div>
    </div>
</template>

<script>
import RightPanel from '../components/RightPanel/index'
import FootBottom from '../components/FootBottom/index'
import {mapGetters, mapMutations} from "vuex"

export default {
    name: "partner",
    components: {
        RightPanel,
        FootBottom
    },
    data() {
        return {
            // swiper配置
            swiperOptions: {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,     //允许分页点击跳转
                    type: 'custom',
                    // 改变分页器样式
                    renderCustom: function (swiper, current, total) {
                        const activeColor = '#B30000';
                        const normalColor = '#D2D2D2';
                        let color = '';
                        let paginationStyle = '';
                        let pageHtml = '';
                        for (let i = 1; i <= total; i++) {
                            if (i === current) {    // 当为active状态时
                                color = activeColor
                            } else {
                                color = normalColor
                            }
                            paginationStyle = `background:${color};width:1.590036vw;height:1.590036vw;cursor:pointer;border-radius:13.250298vw;margin-right:1.32503vw;opacity:1;`
                            pageHtml += `<span class="swiper-pagination-bullet" style=${paginationStyle}></span>`;
                        }
                        return pageHtml;
                    }
                },
                loop: true
            }
        }
    },
    computed: {
        ...mapGetters([
            'activePage'
        ])
    },
    mounted() {
        this.setActivePage(5)
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

.head_replace {
    @include wh(100%, 19.345435vw);
}

.content {
    @include fc;
    position: relative;

    .cooperate {
        @include wh(91.957069vw, 138.068107vw);
        position: relative;
        margin-top: 3.975089vw;
        background-color: #F5F5F5;
        z-index: 10;

        img {
            @include wh(91.957069vw, 138.068107vw)
        }

        /*.cooperate_text {
            @include wh(39.220882vw, 20.405459vw);
            background: rgba(0, 0, 0, 0.15);
            position: absolute;
            bottom: 0;
            left: 0;

            div:nth-of-type(1) {
                @include wh(100%, 5.300119vw);
                @include font(5.300119vw, 7.950179vw, 500);
                text-align: center;
                color: #FFFFFF;
                letter-spacing: 0.265006vw;
                margin-top: 4.505101vw;
            }

            div:nth-of-type(2) {
                @include wh(100%, 3.710083vw);
                @include font(3.710083vw, 5.565125vw);
                text-align: center;
                color: #FFFFFF;
                letter-spacing: 1.060024vw;
                margin-top: 1.590036vw;
            }
        }*/
    }

    .sloganOne {
        @include wh(100%, 6.095137vw);
        @include font(6.095137vw, 9.275209vw, Bold);
        text-align: center;
        color: #454545;
        letter-spacing: 1.060024vw;
        margin-top: 9.010203vw;
        z-index: 10;
    }

    .sloganTwo {
        @include wh(100%, 3.180072vw);
        @include font(3.180072vw, 4.770107vw);
        text-align: center;
        color: #BBBBBB;
        letter-spacing: 0.212005vw;
        margin-top: 1.32503vw;
        z-index: 10;
    }

    .detail {
        @include wh(78.441765vw, 96.46217vw);
        @include font(3.710083vw, 6.890155vw);
        color: #636363;
        letter-spacing: 1.060024vw;
        z-index: 10;
        margin-top: 2.65006vw;

    }

    .background {
        @include wh(100%, 177.819001vw);
        background-color: #F5F5F5;
        position: absolute;
        top: 89.572015vw;
    }

    .sloganThr {
        @include wh(100%, 6.095137vw);
        @include font(6.095137vw, 9.275209vw, Bold);
        text-align: center;
        color: #454545;
        letter-spacing: 1.060024vw;
        margin-top: 15.635352vw;
    }

    .sloganFou {
        @include wh(100%, 6.095137vw);
        @include font(3.180072vw, 4.770107vw);
        text-align: center;
        color: #BBBBBB;
        letter-spacing: 0.212005vw;
        margin-top: 1.32503vw;
    }

    .cooperate_type {
        @include wh(39.750894vw, 39.750894vw);
        position: relative;
        box-shadow: 0 3.975089vw 3.710083vw 0 rgba(242, 242, 242, 0.5);
        border-radius: 50%;
        margin-top: 9.010203vw;

        i {
            @include cl;
            top: 11.660262vw;
            font-size: 6.360143vw;
        }

        div:nth-of-type(1) {
            @include wh(100%, 3.710083vw);
            @include font(3.710083vw, 5.565125vw);
            position: absolute;
            top: 21.995495vw;
            text-align: center;
            color: #666666;
            letter-spacing: 0.265006vw;
        }

        div:nth-of-type(2) {
            @include wh(100%, 3.710083vw);
            @include font(3.710083vw, 5.565125vw, 500);
            position: absolute;
            top: 26.765602vw;
            text-align: center;
            color: #B30000;
            letter-spacing: 0.265006vw;
        }
    }

    .sloganFiv {
        @include wh(100%, 6.095137vw);
        @include font(6.095137vw, 9.275209vw, Bold);
        text-align: center;
        color: #454545;
        letter-spacing: 1.060024vw;
        margin-top: 11.660262vw;
    }

    .sloganSix {
        @include wh(100%, 3.180072vw);
        @include font(3.180072vw, 4.770107vw);
        text-align: center;
        color: #BBBBBB;
        letter-spacing: 0.212005vw;
        margin-top: 1.32503vw;
    }

    .cooperate_item {
        @include wh(100%, 47.966079vw);
        position: relative;
        display: flex;
        justify-content: space-between;
        margin-top: 2.65006vw;

        &:after {
            content: '';
            position: absolute; // 因为是绝对定位，所以父级需要开启相对定位才能是after变到底部，且底部不算父级元素的margin-bottom的值
            bottom: 0;
            left: 36.570823vw;
            height: 0.265006vw;
            width: 26.500596vw;
            background: #D8D8D8;
        }

        .swiper-container {
            @include wh(100%, 31.270704vw);

            .swiper-slide {
                div {
                    @include wh(33.125745vw, 13.250298vw);
                    display: inline-block;
                    position: relative;

                    img {
                        @include center;
                    }
                }
            }

            .swiper-pagination {
                bottom: 0;
            }
        }
    }

    .partner {
        @include wh(100%, 100.536902vw);
        position: relative;
        margin-top: 3.975089vw;

        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 36.570823vw;
            height: 0.265006vw;
            width: 26.500596vw;
            background: #D8D8D8;
        }

        .red {
            @include wh(5.035113vw, 1.590036vw);
            background: #b30000;
            position: absolute;
            top: 2.120048vw;
        }

        .title {
            @include font(4.240095vw, 6.360143vw, 500);
            color: #454545;
            letter-spacing: 0.265006vw;
            margin-left: 8.480191vw;
        }

        .text {
            @include font(3.710083vw, 5.565125vw);
            color: #636363;
            letter-spacing: 0.212005vw;
            margin-top: 3.975089vw;
            margin-left: 8.480191vw;
        }
    }
}
</style>
