<template>
    <div class="guests">
        <right-panel></right-panel>
        <!--占位标签-->
        <div class="head_replace"></div>

        <div class="content">
            <div class="guests_item" v-show="guestsType === 1">
                <div class="guests_head">
                    <div class="avatar">
                        <img src="../../assets/img/avatar1.png">
                    </div>
                    <div class="textOne">叶星千</div>
                    <div class="textTwo">评审委员会主席</div>
                    <el-tabs v-model="activeName" @tab-click="tabClick" class="filter_tab">
                        <el-tab-pane label="#资料" name="first"></el-tab-pane>
                        <el-tab-pane label="#他的作品" name="second"></el-tab-pane>
                    </el-tabs>
                </div>
                <div class="show">
                    <div v-show="showSample === 1">
                        <div class="show_text">
                            <div class="text">
                                故宫博物院古书画部副研究馆员
                                <br>
                                主编《故宫博物院藏品大系7至13卷》，撰写《清代宫廷画家笔下的皇家园林》、《徐渭的绘画思想》
                            </div>
                        </div>
                    </div>
<!--                    <div v-show="showSample === 2">-->
<!--                        <div class="show_item">-->
<!--                            <div class="show_image">-->
<!--                                <img src="../../assets/img/sample1.png">-->
<!--                            </div>-->
<!--                            <div class="show_name">作品名</div>-->
<!--                        </div>-->
<!--                        <div class="show_item">-->
<!--                            <div class="show_image">-->
<!--                                <img src="../../assets/img/sample2.png">-->
<!--                            </div>-->
<!--                            <div class="show_name">作品名</div>-->
<!--                        </div>-->
<!--                    </div>-->
                </div>
            </div>

            <div class="guests_item" v-show="guestsType === 2">
                <div class="guests_head">
                    <div class="avatar">
                        <img src="../../assets/img/avatar2.png">
                    </div>
                    <div class="textOne">赵炳文</div>
                    <div class="textTwo">北京商标品牌创新示范区评委</div>
                    <el-tabs v-model="activeName" @tab-click="tabClick" class="filter_tab">
                        <el-tab-pane label="#资料" name="first"></el-tab-pane>
                        <el-tab-pane label="#他的作品" name="second"></el-tab-pane>
                    </el-tabs>
                </div>
                <div class="show">
                    <div v-show="showSample === 1">
                        <div class="show_text">
                            <div class="text">
                                故宫博物院古书画部副研究馆员
                                <br>
                                主编《故宫博物院藏品大系7至13卷》，撰写《清代宫廷画家笔下的皇家园林》、《徐渭的绘画思想》
                            </div>
                        </div>
                    </div>
<!--                    <div v-show="showSample === 2">-->
<!--                        <div class="show_item">-->
<!--                            <div class="show_image">-->
<!--                                <img src="../../assets/img/sample1.png">-->
<!--                            </div>-->
<!--                            <div class="show_name">作品名</div>-->
<!--                        </div>-->
<!--                        <div class="show_item">-->
<!--                            <div class="show_image">-->
<!--                                <img src="../../assets/img/sample2.png">-->
<!--                            </div>-->
<!--                            <div class="show_name">作品名</div>-->
<!--                        </div>-->
<!--                    </div>-->
                </div>
            </div>

            <div class="guests_item" v-show="guestsType === 3">
                <div class="guests_head">
                    <div class="avatar">
                        <img src="../../assets/img/avatar3.png">
                    </div>
                    <div class="textOne">朱高文</div>
                    <div class="textTwo">北京商标品牌创新示范区评委</div>
                    <el-tabs v-model="activeName" @tab-click="tabClick" class="filter_tab">
                        <el-tab-pane label="#资料" name="first"></el-tab-pane>
                        <el-tab-pane label="#他的作品" name="second"></el-tab-pane>
                    </el-tabs>
                </div>
                <div class="show">
                    <div v-show="showSample === 1">
                        <div class="show_text">
                            <div class="text">
                                故宫博物院古书画部副研究馆员
                                <br>
                                主编《故宫博物院藏品大系7至13卷》，撰写《清代宫廷画家笔下的皇家园林》、《徐渭的绘画思想》
                            </div>
                        </div>
                    </div>
<!--                    <div v-show="showSample === 2">-->
<!--                        <div class="show_item">-->
<!--                            <div class="show_image">-->
<!--                                <img src="../../assets/img/sample1.png">-->
<!--                            </div>-->
<!--                            <div class="show_name">作品名</div>-->
<!--                        </div>-->
<!--                        <div class="show_item">-->
<!--                            <div class="show_image">-->
<!--                                <img src="../../assets/img/sample2.png">-->
<!--                            </div>-->
<!--                            <div class="show_name">作品名</div>-->
<!--                        </div>-->
<!--                    </div>-->
                </div>
            </div>

            <div class="guests_item" v-show="guestsType === 4">
                <div class="guests_head">
                    <div class="avatar">
                        <img src="../../assets/img/avatar4.png">
                    </div>
                    <div class="textOne">胡永和</div>
                    <div class="textTwo">北京商标品牌创新示范区评委</div>
                    <el-tabs v-model="activeName" @tab-click="tabClick" class="filter_tab">
                        <el-tab-pane label="#资料" name="first"></el-tab-pane>
                        <el-tab-pane label="#他的作品" name="second"></el-tab-pane>
                    </el-tabs>
                </div>
                <div class="show">
                    <div v-show="showSample === 1">
                        <div class="show_text">
                            <div class="text">
                                故宫博物院古书画部副研究馆员
                                <br>
                                主编《故宫博物院藏品大系7至13卷》，撰写《清代宫廷画家笔下的皇家园林》、《徐渭的绘画思想》
                            </div>
                        </div>
                    </div>
<!--                    <div v-show="showSample === 2">-->
<!--                        <div class="show_item">-->
<!--                            <div class="show_image">-->
<!--                                <img src="../../assets/img/sample1.png">-->
<!--                            </div>-->
<!--                            <div class="show_name">作品名</div>-->
<!--                        </div>-->
<!--                        <div class="show_item">-->
<!--                            <div class="show_image">-->
<!--                                <img src="../../assets/img/sample2.png">-->
<!--                            </div>-->
<!--                            <div class="show_name">作品名</div>-->
<!--                        </div>-->
<!--                    </div>-->
                </div>
            </div>

            <div class="guests_item" v-show="guestsType === 5">
                <div class="guests_head">
                    <div class="avatar">
                        <img src="../../assets/img/avatar5.png" style="border-radius: 50%">
                    </div>
                    <div class="textOne">舒勇</div>
                    <div class="textTwo">北京商标品牌创新示范区评委</div>
                    <el-tabs v-model="activeName" @tab-click="tabClick" class="filter_tab">
                        <el-tab-pane label="#资料" name="first"></el-tab-pane>
                        <el-tab-pane label="#他的作品" name="second"></el-tab-pane>
                    </el-tabs>
                </div>
                <div class="show">
                    <div v-show="showSample === 1">
                        <div class="show_text">
                            <div class="text">
                                中国社会艺术协会副主席
                                <br>
                                中国美术家协会理事
                                <br>
                                意大利佛罗伦萨国际艺术双年展终身成就奖获得者。
                                <br>
                                第 55 届威尼斯双年展国家馆参展艺术家，联合国教科文组织官方合作艺术家。
                                <br>
                                获颁阿斯塔纳世界博览会国际艺术展金奖和终身成就奖，世界科学合作组织颁发的“金质奖章”获得者，意大利总理府颁发的“中意文化交流贡献奖”获得者。
                                <br>
                                两届“一带一路”国际合作高峰论坛和 2018 年 9 月中非合作论坛北京峰会主会场、2019 首届亚洲文明对话大会主会场标志性人文景观作品《丝路金桥》创作者。
                            </div>
                        </div>
                    </div>
<!--                    <div v-show="showSample === 2">-->
<!--                        <div class="show_item">-->
<!--                            <div class="show_image">-->
<!--                                <img src="../../assets/img/sample1.png">-->
<!--                            </div>-->
<!--                            <div class="show_name">作品名</div>-->
<!--                        </div>-->
<!--                        <div class="show_item">-->
<!--                            <div class="show_image">-->
<!--                                <img src="../../assets/img/sample2.png">-->
<!--                            </div>-->
<!--                            <div class="show_name">作品名</div>-->
<!--                        </div>-->
<!--                    </div>-->
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import RightPanel from '../components/RightPanel/index'
import {mapGetters, mapMutations} from "vuex";

export default {
    name: "guests",
    components: {
        RightPanel
    },
    data() {
        return {
            activeName: 'first',    // tab激活状态
            showSample: 1
        }
    },
    mounted() {
        if (this.$route.path === '/home/guests') {
            this.setActivePage(11)
        } else {
            this.setActivePage(13)   // 修改当前激活的页面
        }
    },
    computed: {
        ...mapGetters([
            'activePage',    // 当前激活的页面
            'guestsType'
        ])
    },
    methods: {
        ...mapMutations({
            setActivePage: 'set_ActivePage',
            setGuestsType: 'set_GuestsType',
        }),
        // 作品栏tab切换
        tabClick() {
            if (this.activeName === 'first') {
                this.showSample = 1
            } else if (this.activeName === 'second') {
                this.showSample = 2
            } else if (this.activeName === 'third') {
                this.showSample = 3
            }
        },
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/mixin";

.guests {
    background: #F5F5F5;

    .head_replace {
        @include wh(100%, 14.310322vw);
    }

    .content {
        @include fc;

        .guests_item {
            width: 100%;

            .guests_head {
                @include wh(100%, 46.641049vw);
                background: #ffffff;
                position: relative;

                .avatar {
                    @include wh(15.900358vw, 15.900358vw);
                    position: absolute;
                    top: 3.975089vw;
                    left: 7.685173vw;
                    img {
                        @include wh(100%, 100%);
                    }
                }

                .textOne {
                    @include font(4.240095vw, 6.360143vw, 500);
                    height: 4.240095vw;
                    color: #454545;
                    position: absolute;
                    top: 22.525507vw;
                    left: 9.010203vw;
                }

                .textTwo {
                    @include font(3.180072vw, 4.770107vw, 500);
                    height: 3.180072vw;
                    color: #BBBBBB;
                    letter-spacing: 0.212005vw;
                    position: absolute;
                    top: 28.090632vw;
                    left: 9.010203vw;
                }

                .filter_tab {
                    position: absolute;
                    top: 35.775805vw;
                }
            }

            .show {
                @include fc;
                width: 100%;
                height: 100vh;
                background: #F7F7F7;
                margin-top: 3.975089vw;

                .show_text {
                    @include wh(100%, 128.792898vw);
                    .text {
                        @include font(3.445078vw, 5.830131vw);
                        width: 91.957069vw;
                        color: #454545;
                        letter-spacing: 0.530012vw;
                        background: #ffffff;
                        padding: 3.975089vw 3.710083vw;
                    }
                }

                .show_item {
                    @include wh(91.957069vw, 65.986485vw);
                    position: relative;
                    background-color: #fff;
                    margin-bottom: 5.300119vw;

                    .show_tag1 {
                        @include wh(20.140453vw, 7.420167vw);
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
                        @include wh(100%, 3.710083vw);
                        @include font(3.710083vw, 5.565125vw, 500);
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
        }
    }
}

</style>
