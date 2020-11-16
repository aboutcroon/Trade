<template>
    <div class="sample">

        <right-panel></right-panel>

        <!--占位标签-->
        <div class="head_replace"></div>

        <div class="content">
            <!--页面筛选弹框-->
            <div class="filter">
                <el-tabs v-model="activeName" @tab-click="tabClick" class="filter_tab">
                    <el-tab-pane label="全部" name="first"></el-tab-pane>
                    <el-tab-pane label="2020年度" name="second"></el-tab-pane>
                    <el-tab-pane label="2019年度" name="third"></el-tab-pane>
                    <el-tab-pane label="2018年度" name="fourth"></el-tab-pane>
                </el-tabs>
                <div class="filter_dialog" @click="filterVisible = true">
                    <i class="iconfont iconfliter"></i>
                </div>
                <el-dialog title="筛选" :visible.sync="filterVisible" width="90%" :before-close="filterClose">
                    <div class="typeOne">
                        <div class="filter_type">赛事筛选（必选）</div>
                        <div class="filter_all" @click="selectAll">全选</div>
                        <div class="filter_item" style="display: block" @click="filterClick">
                            <div :class="{ isActive: choose.third }" style="width: 40.810918vw; display: block">
                                <span>第三届中华商标大赛</span></div>
                            <div :class="{ isActive: choose.fourth }" style="width: 40.810918vw; display: block;"><span>第四届中华商标大赛</span>
                            </div>
                        </div>
                    </div>
                    <div class="typeTwo">
                        <div class="filter_type">阶段状态</div>
                        <div class="filter_all" style="top: 63.071419vw" @click="selectAll">全选</div>
                        <div class="filter_item" @click="filterClick">
                            <div :class="{ isActive: choose.firstFil }"><span>初筛通过</span></div>
                            <div :class="{ isActive: choose.secondFil }"><span>初审通过</span></div>
                            <div :class="{ isActive: choose.thirdFil }"><span>复审通过</span></div>
                        </div>
                    </div>
                    <div class="typeThree">
                        <div class="filter_type">奖项类型</div>
                        <div class="filter_all" style="top: 89.572015vw" @click="selectAll">全选</div>
                        <div class="filter_item" style="display: block" @click="filterClick">
                            <div :class="{ isActive: choose.creative }"><span>创意奖</span></div>
                            <div :class="{ isActive: choose.design }" style="margin-left: 3.180072vw;"><span>设计奖</span>
                            </div>
                        </div>
                    </div>
                    <div class="typeFour">
                        <div class="filter_type">奖项属性</div>
                        <div class="filter_all" style="top: 116.072612vw" @click="selectAll">全选</div>
                        <div class="filter_item" @click="filterClick">
                            <div :class="{ isActive: choose.personal }"><span>个人奖</span></div>
                            <div :class="{ isActive: choose.hot }"><span>人气奖</span></div>
                            <div :class="{ isActive: choose.group }"><span>团体奖</span></div>
                        </div>
                    </div>
                    <div class="typeFive">
                        <div class="filter_type">奖项等级</div>
                        <div class="filter_all" style="top: 142.573208vw" @click="selectAll">全选</div>
                        <div class="filter_item" @click="filterClick">
                            <div :class="{ isActive: choose.gold }"><span>金奖</span>
                            </div>
                            <div :class="{ isActive: choose.silver }"><span>银奖</span>
                            </div>
                            <div :class="{ isActive: choose.copper }"><span>铜奖</span>
                            </div>
                        </div>
                    </div>

                    <div class="confirm_all" @click="initSamples"><span>确定</span></div>
                    <div style="height: 0.265006vw"></div>
                </el-dialog>
            </div>

            <!--展示作品-->
            <div class="show" v-for="item in sampleList" :key="item.worksId" @click="readSample(item.worksId)">
                <div class="show_item">
                    <div class="show_tag1"><span>{{ item.prizeName }}</span></div>
                    <div class="show_like1">{{ item.agreeCount }}</div>
                    <div class="show_image">
                        <img :src="item.worksJpgUrl">
                    </div>
                    <div class="show_name">{{ item.worksName }}</div>
                    <div class="show_author"><span>设计师：{{ item.worksDesigner }}</span></div>
                    <div class="show_people">
                        <i class="iconfont iconeye"></i>
                        {{item.starValue}}人
                    </div>
                </div>
            </div>

            <div class="loadMore">加载更多…</div>
        </div>
    </div>
</template>

<script>
import RightPanel from '../components/RightPanel/index'
import {mapGetters, mapMutations} from "vuex"
import {getFun, postFun} from '@/api/transit.js'

export default {
    name: "sample",
    components: {
        RightPanel
    },
    data() {
        return {
            activeName: 'first',        // tab栏活跃状态
            filterVisible: false,       // 筛选框
            choose: {                   // 筛选选项
                third: true,            // 第三届中华商标大赛
                fourth: false,          // 第四届中华商标大赛
                firstFil: true,         // 初筛通过
                secondFil: false,       // 初审通过
                thirdFil: false,        // 终审通过
                creative: false,        // 创意奖
                design: false,          // 设计奖
                personal: false,        // 个人奖
                hot: false,             // 人气奖
                group: false,           // 团体奖
                gold: false,            // 金奖
                silver: false,          // 银奖
                copper: false           // 铜奖
            },
            // 初始化接口数据
            initData: {
                pageNumber: 1,
                pageSize: 4,
                paras: {
                    competitionId: 100,
                    categoryNameList: ['公益', '酒类'],
                    prizeRateNameList: ['第三届中华商标大赛', '初筛通过']
                }
            },
            // 作品数据
            sampleList: []
        }
    },
    computed: {
        ...mapGetters([
            'activePage'
        ])
    },
    mounted() {
        this.setActivePage(3)
        this.initSamples()
    },
    methods: {
        ...mapMutations({
            setActivePage: 'set_ActivePage'
        }),
        // 跳转到作品展示厅->作品详情
        readSample(key) {
            this.$router.push({
                name: 'sampleDetail',
                query: {
                    'sampleId': key
                }
            })
            this.setActivePage(12)
        },
        selectAll(event) {
            if (event.target.parentNode.className === 'typeOne') {
                this.choose.third = true
                this.choose.fourth = true
            } else if (event.target.parentNode.className === 'typeTwo') {
                this.choose.firstFil = true
                this.choose.secondFil = true
                this.choose.thirdFil = true
            } else if (event.target.parentNode.className === 'typeThree') {
                this.choose.creative = true
                this.choose.design = true
            } else if (event.target.parentNode.className === 'typeFour') {
                this.choose.personal = true
                this.choose.hot = true
                this.choose.group = true
            } else if (event.target.parentNode.className === 'typeFive') {
                this.choose.gold = true
                this.choose.silver = true
                this.choose.copper = true
            }
        },
        // 切换tab
        tabClick() {
            // if (this.activeName === 'first') {
            //     this.choose.ch20 = true
            //     this.choose.ch19 = true
            //     this.choose.ch18 = true
            // } else if (this.activeName === 'second') {
            //     this.choose.ch20 = true
            //     this.choose.ch19 = false
            //     this.choose.ch18 = false
            // } else if (this.activeName === 'third') {
            //     this.choose.ch20 = false
            //     this.choose.ch19 = true
            //     this.choose.ch18 = false
            // } else if (this.activeName === 'fourth') {
            //     this.choose.ch20 = false
            //     this.choose.ch19 = false
            //     this.choose.ch18 = true
            // }
        },
        // 关闭筛选框
        filterClose() {
            this.filterVisible = false
        },
        // 点击每个筛选选项时
        filterClick(event) {
            const text = event.target.innerText
            let ch

            if (text === '第三届中华商标大赛') {
                this.choose.third = !this.choose.third
                ch = this.choose.third
            } else if (text === '第四届中华商标大赛') {
                this.choose.fourth = !this.choose.fourth
                ch = this.choose.fourth
            } else if (text === '初筛通过') {
                this.choose.firstFil = !this.choose.firstFil
                ch = this.choose.firstFil
            } else if (text === '初审通过') {
                this.choose.secondFil = !this.choose.secondFil
                ch = this.choose.secondFil
            } else if (text === '复审通过') {
                this.choose.thirdFil = !this.choose.thirdFil
                ch = this.choose.thirdFil
            } else if (text === '创意奖') {
                this.choose.creative = !this.choose.creative
                ch = this.choose.creative
            } else if (text === '设计奖') {
                this.choose.design = !this.choose.design
                ch = this.choose.design
            } else if (text === '个人奖') {
                this.choose.personal = !this.choose.personal
                ch = this.choose.personal
            } else if (text === '人气奖') {
                this.choose.hot = !this.choose.hot
                ch = this.choose.hot
            } else if (text === '团体奖') {
                this.choose.group = !this.choose.group
                ch = this.choose.group
            } else if (text === '金奖') {
                this.choose.gold = !this.choose.gold
                ch = this.choose.gold
            } else if (text === '银奖') {
                this.choose.silver = !this.choose.silver
                ch = this.choose.silver
            } else if (text === '铜奖') {
                this.choose.copper = !this.choose.copper
                ch = this.choose.copper
            }

            if (ch) {
                // 如果prizeRateNameList数组中没有，则添加
                this.initData.paras.prizeRateNameList.push(text)
            } else {
                // 如果prizeRateNameList数组中有，则去除
                let index = this.initData.paras.prizeRateNameList.indexOf(text)
                this.initData.paras.prizeRateNameList.splice(index, 1)
            }
        },
        // 筛选请求
        async initSamples() {
            const {data: res} = await postFun('/trade-web/api/works/pageList', this.initData)
            this.sampleList = res.list
            this.filterVisible = false
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/mixin";

.sample {
    background-color: #F7F7F7;

    .head_replace {
        @include wh(100%, 19.345435vw);
    }

    .content {
        position: relative;
        @include fc;

        .filter {
            @include wh(91.957069vw, 12.190274vw);
            position: relative;
            background-color: #fff;
            margin-top: 3.975089vw;

            .filter_tab {
                @include wh(91.957069vw, 100%);
            }

            .filter_dialog {
                @include wh(8.745197vw, 9.275209vw);
                @include ct;
                right: 2.65006vw;
                box-shadow: -2.120048vw 0 1.590036vw -1.855042vw rgba(0, 0, 0, 0.07);

                i {
                    @include center;
                    font-size: 4.505101vw;
                }
            }

            .filter_type {
                @include font(4.240095vw, 6.360143vw, Bold);
                height: 6.360143vw;
                margin-left: 5.300119vw;
                color: #454545;
                margin-top: 7.950179vw;
            }

            .filter_all {
                @include wh(12.720286vw, 5.300119vw);
                @include font(3.710083vw, 3.710083vw, 500);
                position: absolute;
                color: #454545;
                left: 77.116735vw;
                top: 23.320525vw;
            }

            .filter_item {
                padding: 0 6.095137vw;
                display: flex;
                justify-content: space-between;

                .isActive {
                    span {
                        color: #B30000;
                    }

                    background: #F7E5E5;
                    border: 0.265006vw solid #B30000;
                }

                div {
                    @include wh(24.115543vw, 9.010203vw);
                    position: relative;
                    border: 0.265006vw solid #BBBBBB;
                    margin-top: 2.65006vw;
                    display: inline-block;

                    span {
                        @include wh(100%, 5.300119vw);
                        @include font(3.710083vw, 5.300119vw);
                        @include center;
                        text-align: center;
                        color: #454545;
                    }
                }
            }

            .confirm_all {
                @include wh(78.706771vw, 10.070227vw);
                position: relative;
                background: #B30000;
                margin-left: 5.565125vw;
                margin-top: 6.095137vw;
                margin-bottom: 5.300119vw;

                span {
                    @include font(3.445078vw, 3.445078vw, 500);
                    @include center;
                    color: #FFFFFF;
                }
            }
        }

        .show {
            .show_item {
                @include wh(91.957069vw, 74.996687vw);
                position: relative;
                background-color: #fff;
                margin-bottom: 5.300119vw;

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
            @include wh(16.960382vw, 6.360143vw);
            @include font(4.240095vw, 6.360143vw, Bold);
            color: #454545;
            margin-left: -74.20167vw;
            margin-bottom: 2.65006vw;
        }

        .others {
            @include wh(91.957069vw, 30.740692vw);
            background-color: #fff;
            margin-bottom: 5.300119vw;
        }

        .loadMore {
            @include wh(19.875447vw, 5.300119vw);
            @include font(3.710083vw, 5.300119vw, Bold);
            color: #B5B5B5;
            margin-bottom: 7.420167vw;
        }
    }
}
</style>
