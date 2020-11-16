<template>
    <div class="home">
        <right-panel></right-panel>

        <!--        <header class="head"></header>-->

        <div class="content">
            <!--占位标签-->
            <div class="top"></div>

            <!--banner图-->
            <div class="banner_shadow1"></div>
            <div class="banner_shadow2"></div>
            <div class="banner">
                <swiper class="swiper-container" :options="swiperOptions">
                    <swiper-slide v-for="item of photo" :key="item.id">
                        <img class="swiper-img" :src="item.src">
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>

            <div class="sloganOne">乘风创业，破浪创新</div>
            <div class="sloganTwo">世界互联网中国梦</div>
            <div class="photoOne">
                <img src="../../assets/img/homePhoto1.png">
            </div>

            <div class="backgroundOne">
                <div class="stateText">
                    乘李克强总理达沃斯论坛讲话批示之风，开创大众事业
                    <br><br>
                    冲开产业、行业之波浪，在创新、创意的激流中前进
                    <br><br>
                    达成习主席提出更加开放并与世界互联的中国梦
                    实现中华民族的伟大复兴
                </div>
                <div class="btn" @click="toCompetition">
                    <span>查看更多</span>
                    <i class="iconfont iconjiantou"></i>
                </div>
            </div>

            <div class="sloganThr">重磅嘉宾</div>
            <div class="sloganFou">Distinguished guests</div>
            <div class="guests">
                <div class="guests_profile">
                    <div class="guests_text" @click="readGuests">
                        <img src="../../assets/img/avatar1.png">
                        <div class="textOne">叶星千</div>
                        <div class="textTwo">评审委员会主席</div>
                    </div>
                    <i class="iconfont iconxiala" @click="handleDetail1" v-show="!showDetail1"></i>
                    <i class="iconfont iconshouqi" @click="handleDetail1" v-show="showDetail1"></i>
                </div>
                <div class="guests_detail" v-show="showDetail1">
                    <em></em>
                    <span>
                        故宫博物院古书画部副研究馆员
                        <br>
                        主编《故宫博物院藏品大系7至13卷》，撰写《清代宫廷画家笔下的皇家园林》、《徐渭的绘画思想》
                    </span>
                </div>
            </div>
            <div class="guests" style="margin-top: 5.300119vw;">
                <div class="guests_profile">
                    <div class="guests_text" @click="readGuests">
                        <img src="../../assets/img/avatar2.png">
                        <div class="textOne">赵炳文</div>
                        <div class="textTwo">评审委员会主席</div>
                    </div>
                    <i class="iconfont iconxiala" @click="handleDetail2" v-show="!showDetail2"></i>
                    <i class="iconfont iconshouqi" @click="handleDetail2" v-show="showDetail2"></i>
                </div>
                <div class="guests_detail" v-show="showDetail2">
                    <em></em>
                    <span>
                        故宫博物院古书画部副研究馆员
                        <br>
                        主编《故宫博物院藏品大系7至13卷》，撰写《清代宫廷画家笔下的皇家园林》、《徐渭的绘画思想》
                    </span>
                </div>
            </div>
            <div class="guests" style="margin-top: 5.300119vw;">
                <div class="guests_profile">
                    <div class="guests_text" @click="readGuests">
                        <img src="../../assets/img/avatar3.png">
                        <div class="textOne">朱高文</div>
                        <div class="textTwo">评审委员会主席</div>
                    </div>
                    <i class="iconfont iconxiala" @click="handleDetail3" v-show="!showDetail3"></i>
                    <i class="iconfont iconshouqi" @click="handleDetail3" v-show="showDetail3"></i>
                </div>
                <div class="guests_detail" v-show="showDetail3">
                    <em></em>
                    <span>
                        故宫博物院古书画部副研究馆员
                        <br>
                        主编《故宫博物院藏品大系7至13卷》，撰写《清代宫廷画家笔下的皇家园林》、《徐渭的绘画思想》
                    </span>
                </div>
            </div>
            <div class="guests" style="margin-top: 5.300119vw;">
                <div class="guests_profile">
                    <div class="guests_text" @click="readGuests">
                        <img src="../../assets/img/avatar4.png">
                        <div class="textOne">胡永和</div>
                        <div class="textTwo">评审委员会主席</div>
                    </div>
                    <i class="iconfont iconxiala" @click="handleDetail4" v-show="!showDetail4"></i>
                    <i class="iconfont iconshouqi" @click="handleDetail4" v-show="showDetail4"></i>
                </div>
                <div class="guests_detail" v-show="showDetail4">
                    <em></em>
                    <span>
                        故宫博物院古书画部副研究馆员
                        <br>
                        主编《故宫博物院藏品大系7至13卷》，撰写《清代宫廷画家笔下的皇家园林》、《徐渭的绘画思想》
                    </span>
                </div>
            </div>
            <div class="guests" style="margin-top: 5.300119vw;" v-show="showMoreGuests">
                <div class="guests_profile">
                    <div class="guests_text" @click="readGuests">
                        <img src="../../assets/img/avatar5.png" style="border-radius: 50%">
                        <div class="textOne">舒勇</div>
                        <div class="textTwo">评审委员会主席</div>
                    </div>
                    <i class="iconfont iconxiala" @click="handleDetail5" v-show="!showDetail5"></i>
                    <i class="iconfont iconshouqi" @click="handleDetail5" v-show="showDetail5"></i>
                </div>
                <div class="guests_detail" v-show="showDetail5">
                    <em></em>
                    <span>
                        中国社会艺术协会副主席
                        <br>
                        中国美术家协会理事
                        <br>
                        意大利佛罗伦萨国际艺术双年展终身成就奖获得者，第 55 届威尼斯双年展国家馆参展艺术家，联合国教科文组织官方合作艺术家。获颁阿斯塔纳世界博览会国际艺术展金奖和终身成就奖
                        <br>
                        世界科学合作组织颁发的“金质奖章”获得者，意大利总理府颁发的“中意文化交流贡献奖”获得者。
                        <br>
                        两届“一带一路”国际合作高峰论坛和 2018 年 9 月中非合作论坛北京峰会主会场、2019 首届亚洲文明对话大会主会场标志性人文景观作品《丝路金桥》创作者。
                    </span>
                </div>
            </div>
            <div class="load" @click="loadGuests" v-show="load">加载更多…</div>

            <div class="sloganFiv">获奖者荣誉</div>
            <div class="sloganSix">Honor of winners</div>
            <div class="honor">
                <img src="../../assets/img/homePhoto2.png" @click="readHonor" v-show="honorId === 1">
                <img src="../../assets/img/homePhoto3.png" @click="readHonor" v-show="honorId === 2">
                <img src="../../assets/img/homePhoto2.png" @click="readHonor" v-show="honorId === 3">
                <img src="../../assets/img/homePhoto3.png" @click="readHonor" v-show="honorId === 4">
                <img src="../../assets/img/homePhoto2.png" @click="readHonor" v-show="honorId === 5">
                <div class="honor_text" v-show="honorId === 1">奖状与奖杯（金奖独有）</div>
                <div class="honor_text" v-show="honorId === 2">获奖作品颁发区块链版权数字证书（直通互联网法院，图片存证即上链）</div>
                <div class="honor_text" v-show="honorId === 3">参加颁奖典礼（为用户提供展示自身形象和实力的机会）</div>
                <div class="honor_text" v-show="honorId === 4">获奖作品收录设计时代杂志专刊（提升企业或个人在该领域的影响力，塑造个人知名度和美誉度）</div>
                <div class="honor_text" v-show="honorId === 5">获奖作品入驻设计大赛知识产权知识产权运营管理平台（一站式直达服务，省去中间环节）</div>
                <div class="honor_bottom">
                    <i class="iconfont iconjiantou_left" :class="{ isActive: honorId!== 1 }" @click="lastHonor"></i>
                    <div>0{{ honorId }}</div>
                    <div></div>
                    <div>05</div>
                    <i class="iconfont iconjiantou_right" :class="{ isActive: honorId!== 5 }" @click="nextHonor"></i>
                </div>
            </div>

            <div class="sloganSev">关于大赛</div>
            <div class="sloganEig">About the competition</div>
            <div class="competition">
                <img src="../../assets/img/homePhoto3.png">
                <div class="title">大赛背景</div>
                <div class="text">
                    党的十九大报告明确提出要倡导创新文化，强化知识产权创造、保护、运用。商标是知识产权的重要组成部分，强化商标创造、保护、运用，大力培育和弘扬商标文化，提高企业商标创新意识，激发商标设计者创新热情，是推动知识产权强国和创新型国家建设的必然途径
                </div>
                <div class="title">大赛简介</div>
                <div class="text">
                    中华商标（国际）创意设计大赛是由中华商标协会与中国教育电视台联合主办，面向世界优秀设计人才和设计团队，特别是各大艺术设计院校、职业学校学生的中国唯一专业性商标设计大赛，是立足大中华地区影响国际的赛事
                </div>
                <div class="text" v-html="'&#8226  大赛采用多种赛制进行参赛作品筛选'"></div>
                <div class="text" v-html="'&#8226  评委由资深设计界、商业界、企业界专家组成'"></div>
                <div class="text" v-html="'&#8226  奖项由中华商标协会进行颁发'"></div>
                <div class="title">大赛宗旨</div>
                <div class="text">
                    培育商标设计人才。通过大赛进一步发掘优秀的设计人才和设计团队，在创业场地、资金和政策方面予以扶持，培育和孵化一批优秀设计师和设计团队
                </div>
            </div>
            <div class="backgroundTwo"></div>

            <div class="slide">
                <swiper ref="mySwiper" :options="swiperOptions2">
                    <swiper-slide v-for="item of slide" :key="item.id">
                        <img class="swiper-img" :src="item.src">
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>

            <div class="sloganNin">热点新闻</div>
            <div class="sloganTen">Hot News</div>

            <div class="allNews">
                <div class="allNews_whole" @click="readAllNews(item.articleId)" v-for="item in newsList" :key="item.articleId">
                    <div class="allNews_title">{{ item.articleTitle }}</div>
                    <div class="allNews_text">{{item.articleContent}}</div>
                    <img :src="item.coverUrl">
                    <div class="allNews_type">{{item.articleTag}}</div>
                    <div class="allNews_read">阅读原文</div>
                </div>

                <div class="btn" @click="toNewsCenter">
                    <span>查看更多</span>
                    <i class="iconfont iconjiantou"></i>
                </div>
            </div>

            <div class="sloganEle">合作伙伴</div>
            <div class="sloganTwe">Cooperative Partner</div>
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
import {mapGetters, mapMutations} from 'vuex'
import {guestsType} from "@/store/getters";
import {postFun} from "@/api/transit";

export default {
    components: {
        RightPanel,
        FootBottom
    },
    data() {
        return {
            // swiper相关配置
            swiperOptions: {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,    // 可点击切换
                    type: 'custom',
                    // 改变分页器pagination的样式
                    renderCustom: function (swiper, current, total) {
                        const activeColor = '#B30000';
                        const normalColor = '#D2D2D2';
                        let color = '';
                        let paginationStyle = '';
                        let pageHtml = '';
                        for (let i = 1; i <= total; i++) {
                            if (i === current) {    // 当为active状态时
                                color = activeColor
                                paginationStyle = `background:${color};width:4.770107vw;height:0.795018vw;cursor:pointer;border-radius:0%;margin-right:1.32503vw;opacity:1;`
                            } else {
                                color = normalColor
                                paginationStyle = `background:${color};width:2.385054vw;height:0.795018vw;cursor:pointer;border-radius:0%;margin-right:1.32503vw;opacity:1;`
                            }
                            pageHtml += `<span class="swiper-pagination-bullet" style=${paginationStyle}></span>`;
                        }
                        return pageHtml;
                    }
                },
                loop: true,
                autoplay: true
            },
            swiperOptions2: {
                loop: true,
                autoplay: true
            },
            // 轮播图图片
            photo: [{
                id: 1,
                src: require('../../assets/img/banner1@3x.png')
            }, {
                id: 2,
                src: require('../../assets/img/banner1@3x.png')
            }, {
                id: 3,
                src: require('../../assets/img/banner1@3x.png')
            }],
            // 轮播图图片
            slide: [{
                id: 1,
                src: require('../../assets/img/slide1.png')
            }, {
                id: 2,
                src: require('../../assets/img/slide2.png')
            }],
            // 嘉宾下拉信息
            showDetail1: false,
            showDetail2: false,
            showDetail3: false,
            showDetail4: false,
            showDetail5: false,
            load: true,             // 是否展示加载更多按钮
            showMoreGuests: false,  // 是否展示更多嘉宾
            honorId: 1,             // 当前获奖者荣誉图片
            // 初始化接口数据
            initData: {
                pageNumber: 1,
                pageSize: 5
            },
            newsList: []            // 新闻列表
        }
    },
    computed: {
        ...mapGetters([
            'activePage',    // 当前激活的页面
            'honorType',     // 获奖者荣誉类型
            'guestsType'     // 重磅嘉宾类型
        ])
    },
    mounted() {
        this.setActivePage(1)   // 修改当前激活的页面
        // this.setHonorType(1)    // 修改当前激活的获奖者荣誉图片
        this.honorId = this.honorType
        this.initNews()
    },
    methods: {
        ...mapMutations({
            setActivePage: 'set_ActivePage',
            setHonorType: 'set_HonorType',
            setGuestsType: 'set_GuestsType'
        }),
        nextHonor() {
            if (this.honorId !== 5) {
                this.honorId++
            }
            this.setHonorType(this.honorId)
        },
        lastHonor() {
            if (this.honorId !== 1) {
                this.honorId--
            }
            this.setHonorType(this.honorId)
        },
        loadGuests() {
            this.showMoreGuests = true
            this.load = false
        },
        // 跳转到首页->全部新闻
        readAllNews(key) {
            this.$router.push({
                name: 'homeAllNews',
                query: {
                    'allNewsId': key
                }
            })
            this.setActivePage(6)
        },
        // 跳转到首页->热点新闻
        readHotNews() {
            this.$router.push({
                name: 'homeHotNews',
                query: {
                    'hotNewsId': 1
                }
            })
            this.setActivePage(8)
        },
        // 跳转到首页->获奖者荣誉
        readHonor() {
            this.$router.push({
                name: 'homeHonor',
                query: {
                    'honorId': 1
                }
            })
            this.setActivePage(10)
        },
        // 跳转到首页->重磅嘉宾
        readGuests(event) {
            let name = event.target.parentNode.childNodes[1].innerText
            // let source = event.target.src?.substring(39, 40)    // 这里的字符串要先进行判断是否有值，有值才能进行substring，否则没有值的话则进入到这一句就抛出错误下面语句不执行
            if (name === '叶星千') {
                this.setGuestsType(1)
            } else if (name === '赵炳文') {
                this.setGuestsType(2)
            } else if (name === '朱高文') {
                this.setGuestsType(3)
            } else if (name === '胡永和') {
                this.setGuestsType(4)
            } else if (name === '舒勇') {
                this.setGuestsType(5)
            }
            this.$router.push({
                name: 'homeGuests',
                query: {
                    guestsId: this.guestsType
                }
            })
            this.setActivePage(11)
        },
        toNewsCenter() {
            this.$router.push('/newsCenter')
        },
        // 获取新闻列表
        async initNews() {
            const {data: res} = await postFun('/trade-web/api/article/pageList', this.initData)
            this.newsList = res.list.slice(0, 3)    // 首页只展示有限个
        },
        // 嘉宾介绍下拉
        handleDetail1() {
            this.showDetail1 = !this.showDetail1
        },
        handleDetail2() {
            this.showDetail2 = !this.showDetail2
        },
        handleDetail3() {
            this.showDetail3 = !this.showDetail3
        },
        handleDetail4() {
            this.showDetail4 = !this.showDetail4
        },
        handleDetail5() {
            this.showDetail5 = !this.showDetail5
        },
        toCompetition() {
            this.$router.push('competition')
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/mixin";

.home {
    /*.head {
        @include wh(100%, 13.78031vw);
    }*/
    .content {
        position: relative;

        .top {
            @include wh(100%, 0.265006vw)
        }

        .banner_shadow1 {
            @include wh(80.031801vw, 42.930966vw);
            @include cl;
            top: 19.345435vw;
            background: #EBEBEB;
        }

        .banner_shadow2 {
            @include wh(84.271896vw, 45.31602vw);
            @include cl;
            top: 21.465483vw;
            background: #C5C5C5;
        }

        .banner {
            @include wh(88.776997vw, 54.856234vw);
            @include cl;
            top: 23.585531vw;

            img {
                @include wh(88.776997vw, 54.856234vw);
            }

            .swiper-container {
                .swiper-pagination {
                    position: static;
                }
            }
        }

        .sloganOne {
            @include wh(100%, 8.7vw);
            @include font(6.1vw, 8.7vw, Bold);
            @include cl;
            text-align: center;
            top: 90.897045vw;
            color: #454545;
            letter-spacing: 1.060024vw;
        }

        .sloganTwo {
            @include wh(65.986485vw, 5.300119vw);
            @include font(3.710083vw, 5.300119vw);
            @include cl;
            text-align: center;
            top: 99.907248vw;
            color: #BBBBBB;
            letter-spacing: 0.265006vw;
        }

        .photoOne {
            @include wh(86.65695vw, 106.532397vw);
            @include cl;
            top: 107.857427vw;
            z-index: 10;

            img {
                @include wh(86.65695vw, 106.532397vw);
            }
        }

        .backgroundOne {
            @include wh(100%, 126.407844vw);
            position: relative;
            background-color: #F5F5F5;
            margin-top: 156.618524vw;

            .stateText {
                @include wh(83.211872vw, 39.750894vw);
                @include cl;
                @include font(3.710083vw, 5.300119vw);
                color: #4E4E4E;
                top: 64.396449vw;
            }

            .btn {
                @include wh(25.970584vw, 10.070227vw);
                position: absolute;
                top: 109.712469vw;
                left: 65.986485vw;
                background-color: #B30000;
                border-color: #B30000;

                span {
                    @include font(3.445078vw, 5.035113vw, 500);
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

        .sloganThr {
            @include wh(29.415662vw, 8.745197vw);
            @include font(6.095137vw, 8.745197vw, Bold);
            @include cl;
            text-align: center;
            margin-top: 9.275209vw;
            color: #454545;
            letter-spacing: 1.060024vw;
        }

        .sloganFou {
            @include wh(48.231085vw, 4.505101vw);
            @include font(3.180072vw, 4.505101vw);
            @include cl;
            text-align: center;
            margin-top: 18.285411vw;
            color: #BBBBBB;
            letter-spacing: 0.265006vw;
        }

        .guests {
            margin-top: 25.175566vw;
            position: relative;

            &:after {
                content: '';
                position: absolute;
                bottom: -2.915066vw;
                left: 7.950179vw;
                height: 0.265006vw;
                width: 83.476878vw;
                background-color: #EFEFEF;
            }

            .guests_profile {
                @include wh(100%, 19.875447vw);
                position: relative;
                /*border-bottom: 0.265006vw solid #EFEFEF;*/

                i {
                    @include ct;
                    color: #B30000;
                    left: 86.921956vw;
                    font-size: 4.120048vw;
                }

                .guests_text {
                    display: flex;

                    img {
                        @include wh(15.900358vw, 15.900358vw);
                        //@include ct;
                        margin-left: 7.950179vw;
                    }

                    .textOne {
                        height: 6.095137vw;
                        @include font(4.240095vw, 6.095137vw, 500);
                        color: #454545;
                        margin-left: 2.120048vw;
                        margin-top: 3.445078vw;
                    }

                    .textTwo {
                        height: 4.505101vw;
                        @include font(3.180072vw, 4.505101vw);
                        color: #BBBBBB;
                        letter-spacing: 0.212005vw;
                        position: absolute;
                        left: 25.970584vw;
                        top: 9.805221vw;
                    }
                }
            }

            .guests_detail {
                @include wh(88.776997vw, 26.500596vw);
                @include cl;
                background-color: #F5F5F5;
                border: 1.32503vw solid #F5F5F5;
                position: relative;

                em {
                    display: block;
                    border-width: 1.590036vw;
                    position: absolute;
                    top: -4.240095vw;
                    left: 7.950179vw;
                    border-style: solid dashed dashed;
                    border-color: transparent transparent #F5F5F5;
                    font-size: 0;
                    line-height: 0;
                }

                span {
                    @include font(3.445078vw, 5.035113vw);
                    @include center;
                    color: #454545;
                    letter-spacing: 0.530012vw;
                    width: 77.116735vw;
                    overflow: hidden;
                    display: -webkit-box; /* autoprefixer: off */
                    -webkit-box-orient: vertical; /* autoprefixer: on */
                    -webkit-line-clamp: 4;
                }
            }
        }

        .load {
            @include font(3.710083vw, 4.505101vw, 500);
            text-align: center;
            color: #B5B5B5;
            letter-spacing: 0.212005vw;
            margin-top: 6.890155vw;
            margin-left: 50%;
            transform: translate(-50%, 0);
        }

        .sloganFiv {
            @include wh(36.570823vw, 8.745197vw);
            @include font(6.095137vw, 8.745197vw, Bold);
            @include cl;
            text-align: center;
            color: #454545;
            letter-spacing: 1.060024vw;
            margin-top: 9.275209vw;
        }

        .sloganSix {
            @include wh(36.570823vw, 4.505101vw);
            @include font(3.180072vw, 4.505101vw);
            @include cl;
            text-align: center;
            color: #BBBBBB;
            letter-spacing: 0.212005vw;
            margin-top: 18.020405vw;
        }

        .honor {
            @include wh(88.776997vw, 51.941169vw);
            @include cl;
            margin-top: 25.175566vw;

            img {
                @include wh(88.776997vw, 51.941169vw);
            }

            .honor_text {
                @include font(3.710083vw, 5.300119vw, Bold);
                width: 78.176759vw;
                color: #FFFFFF;
                position: absolute;
                bottom: 2.65006vw;
                left: 5.300119vw;
            }

            .honor_bottom {
                @include wh(100%, 7.420167vw);
                position: relative;

                i:nth-of-type(1) {
                    @include ct;
                    left: 5.300119vw;
                    font-size: 7.420167vw;
                    color: #C3C3C3;
                }

                .isActive {
                    color: #B30000 !important;
                }

                div:nth-of-type(1) {
                    @include wh(6.890155vw, 7.685173vw);
                    @include font(5.300119vw, 7.685173vw, Bold);
                    @include ct;
                    letter-spacing: 0.265006vw;
                    left: 36.835829vw;
                }

                div:nth-of-type(2) {
                    @include wh(0.530012vw, 5.300119vw);
                    @include ct;
                    left: 44.786008vw;
                    background: #C3C3C3;

                }

                div:nth-of-type(3) {
                    @include wh(5.300119vw, 5.565125vw);
                    @include font(3.975089vw, 5.565125vw, Bold);
                    @include ct;
                    color: #C3C3C3;
                    right: 36.570823vw;
                }

                i:nth-of-type(2) {
                    @include ct;
                    right: 5.300119vw;
                    font-size: 7.420167vw;
                    color: #C3C3C3;
                }
            }
        }

        .sloganSev {
            @include wh(29.415662vw, 8.745197vw);
            @include font(6.095137vw, 8.745197vw, Bold);
            @include cl;
            text-align: center;
            letter-spacing: 1.060024vw;
            margin-top: 96.727176vw;
        }

        .sloganEig {
            @include wh(47.966079vw, 4.505101vw);
            @include font(3.180072vw, 4.505101vw);
            @include cl;
            text-align: center;
            color: #BBBBBB;
            letter-spacing: 0.212005vw;
            margin-top: 105.472373vw;
        }

        .competition {
            @include cl;
            margin-top: 112.627534vw;
            z-index: 10;

            img {
                @include wh(88.776997vw, 44.786008vw);
            }

            .title {
                @include wh(100%, 6.095137vw);
                @include font(4.240095vw, 6.095137vw, 500);
                color: #454545;
                margin-top: 3.975089vw;
            }

            .text {
                @include font(3.710083vw, 6.890155vw);
                width: 100%;
                color: #636363;
                letter-spacing: 0.212005vw;
                margin-top: 1.060024vw;
            }
        }

        .backgroundTwo {
            @include wh(100%, 177.023983vw);
            position: relative;
            background-color: #F5F5F5;
            margin-top: 136.478071vw;

            .btn {
                @include wh(25.970584vw, 10.070227vw);
                position: absolute;
                top: 71.816616vw;
                left: 68.106532vw;
                background-color: #B30000;
                border-color: #B30000;

                span {
                    @include font(3.445078vw, 5.035113vw, 500);
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

        .slide {
            @include wh(89.042003vw, 22.260501vw);
            @include cl;
            margin-top: 2.385054vw;

            img {
                @include wh(89.042003vw, 22.260501vw);
            }
        }

        .sloganNin {
            @include wh(29.415662vw, 8.745197vw);
            @include font(6.095137vw, 8.745197vw, Bold);
            @include cl;
            text-align: center;
            color: #454545;
            letter-spacing: 1.060024vw;
            margin-top: 32.860739vw;
        }

        .sloganTen {
            @include wh(29.415662vw, 4.505101vw);
            @include font(3.180072vw, 4.505101vw);
            @include cl;
            text-align: center;
            color: #C3C3C3;
            letter-spacing: 0.212005vw;
            margin-top: 41.605936vw;
        }

        .hotNews {
            @include fc;
            width: 100%;
            margin-top: 48.761097vw;

            img {
                @include wh(88.776997vw, 53.001193vw);
                z-index: 1;
            }

            .hotNews_time {
                @include wh(15.635352vw, 14.840334vw);
                background-color: #fff;
                position: absolute;
                right: 5.300119vw;
                z-index: 1;

                .month {
                    @include font(3.180072vw, 4.505101vw, 500);
                    @include cl;
                    top: 3.975089vw;
                    color: #4E4E4E;
                    letter-spacing: 0.212005vw;
                }

                .day {
                    @include font(4.770107vw, 6.890155vw, Bold);
                    @include cl;
                    top: 7.420167vw;
                    color: #B30000;
                    letter-spacing: 0.265006vw;
                }
            }

            .hotNews_title {
                @include wh(88.776997vw, 6.360143vw);
                margin-top: 2.915066vw;
                z-index: 1;

                div {
                    @include font(4.240095vw, 5.035113vw, 500);
                    color: #4E4E4E;
                    width: 69.696568vw;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis; // 单行溢出解决方案
                }
            }

            .hotNews_detail {
                @include wh(88.776997vw, 34.450775vw);
                z-index: 1;

                div {
                    @include font(3.710083vw, 6.890155vw);
                    color: #636363;
                    letter-spacing: 0.212005vw;
                    overflow: hidden;
                    display: -webkit-box; /* autoprefixer: off */
                    -webkit-box-orient: vertical; /* autoprefixer: on */
                    -webkit-line-clamp: 5; // 多行溢出解决方案，上面加上注释防止webpack打包时将其去除
                }

            }
        }

        .backgroundThr {
            @include wh(100%, 69.166556vw);
            position: relative;
            background-color: #F5F5F5;
            margin-top: -63.866437vw;

            .btn {
                @include wh(25.970584vw, 10.070227vw);
                position: absolute;
                top: 69.166556vw;
                left: 68.106532vw;
                background-color: #B30000;
                border-color: #B30000;

                span {
                    @include font(3.445078vw, 5.035113vw, 500);
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

        .allNews {
            margin-top: 54.591228vw;
            height: 138.863124vw;

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

        .sloganEle {
            @include wh(29.415662vw, 9.010203vw);
            @include font(6.095137vw, 7.420167vw, Bold);
            @include cl;
            text-align: center;
            margin-top: 9.010203vw;
            color: #4E4E4E;
            letter-spacing: 1.060024vw;
        }

        .sloganTwe {
            @include wh(42.135948vw, 4.770107vw);
            @include font(3.180072vw, 3.710083vw);
            @include cl;
            text-align: center;
            margin-top: 18.020405vw;
            color: #CACACA;
            letter-spacing: 0.212005vw;
        }

        .partner {
            @include wh(100%, 100.536902vw);
            position: relative;
            margin-top: 25.970584vw;

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
}
</style>
