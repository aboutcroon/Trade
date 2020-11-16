<template>
    <div class="honor">
        <right-panel></right-panel>
        <!--占位标签-->
        <div class="head_replace"></div>

        <div class="content">
            <div class="item" v-show="honorType === 1">
                <img src="../../assets/img/homePhoto2.png">
                <div class="text_title">奖状与奖杯</div>
                <div class="text_type">金奖独有</div>
                <div class="text_detail">
                    中华商标（国际）创意设计大赛的获奖者除了能获得奖状、奖杯外，中华商标（国际）创意设计大赛设计作品将获得中华商标协会、中国教育电视台的权威认证。
                </div>
            </div>
            <div class="item" v-show="honorType === 2">
                <img src="../../assets/img/homePhoto2.png">
                <div class="text_title">获奖作品颁发区块链版权数字证书</div>
                <div class="text_type">直通互联网法院，图片存证即上链</div>
                <div class="text_detail">
                    中华商标（国际）创意设计大赛作品将获得区块链版权数字证书，将作品信息上链存证，存证的商标作品加盖时 间戳并与注册作者关联，实现作品的确权，能够为作者提供真实性权属证明，极大地降低维权成本。作 品在各个监管节点间共识，环环相扣的数据结构使 其具有不可篡改性，从技术上排除了数据被篡改和 删减的可能，能够最大程度上保障参赛者的权益。
                </div>
            </div>
            <div class="item" v-show="honorType === 3">
                <img src="../../assets/img/homePhoto2.png">
                <div class="text_title">参加颁奖典礼</div>
                <div class="text_type">为用户提供展示自身形象和实力的机会</div>
                <div class="text_detail">
                    中华商标（国际）创意设计大赛奖颁奖盛典由中华商标协会、中国网、中国教育电视台三家行业权威机构、国家权威媒体联合主办，颁奖盛典将采用线上、线下活动的形式，届时将邀请行业领导、协会领导、大赛专家评委、国内外著名知识产权专家学者、著名企业家、品牌策划师等相关人士。
                </div>
            </div>
            <div class="item" v-show="honorType === 4">
                <img src="../../assets/img/homePhoto2.png">
                <div class="text_title">获奖作品收录设计时代杂志专刊</div>
                <div class="text_type">提升企业或个人在该领域的影响力，塑造个人知名度和美誉度</div>
                <div class="text_detail">
                    中华商标（国际）创意设计大赛作品将被收录当年《INTERNI 设计时代》专刊中，将被全球设计师、设计机构及企业进行参考。《INTERNI 设计时代》杂志为中国的"国际设计最新流行趋势及最新设计文化发展趋势代言人;全球最顶级、高端和先进的设计类产品的代言人。
                </div>
            </div>
            <div class="item" v-show="honorType === 5">
                <img src="../../assets/img/homePhoto2.png">
                <div class="text_title">获奖作品入驻设计大赛知识产权知识产权运营管理平台</div>
                <div class="text_type">一站式直达服务，省去中间环节</div>
                <div class="text_detail">
                    中华商标（国际）创意设计大赛区块链知识产权运营管理平台应用云计算+大数据+互联网（固定互联与移动互联相结合）汇集商标品牌大数据，形成商标品牌评估、区块链存证、商标交易、区域分析、侵权调解、精准营销、地标云为内容的商标品牌数据应用中心。获奖作品入驻平台可转化为数字资产进行安全可靠的知识产权交易。
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RightPanel from '../components/RightPanel/index'
import {mapGetters, mapMutations} from 'vuex'

export default {
    name: "honor",
    components: {
        RightPanel
    },
    mounted() {
        this.setActivePage(10)   // 修改当前激活的页面
    },
    computed: {
        ...mapGetters([
            'activePage',    // 当前激活的页面
            'honorType'
        ])
    },
    methods: {
        ...mapMutations({
            setActivePage: 'set_ActivePage',
            setHonorType: 'set_HonorType'
        }),
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/mixin";

.honor {

    .head_replace {
        @include wh(100%, 14.310322vw);
    }

    .content {
        @include fc;
        height: 100vh;

        .item {
            @include wh(91.957069vw, 97.7872vw);
            background: #ffffff;
            position: relative;
            margin-bottom: 5.300119vw;

            img {
                @include wh(100%, 49.821121vw);
                margin-top: 3.975089vw;
            }

            .text_title {
                @include font(4.240095vw, 6.360143vw, 500);
                color: #454545;
            }

            .text_type {
                @include font(3.180072vw, 4.770107vw, 500);
                margin-top: 0.265006vw;
                color: #BBBBBB;
            }

            .text_detail {
                @include font(3.710083vw, 5.830131vw);
                color: #636363;
                letter-spacing: 0.530012vw;
                margin-top: 2.65006vw;
            }
        }
    }
}
</style>
