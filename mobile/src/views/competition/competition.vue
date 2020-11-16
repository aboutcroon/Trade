<template>
    <div class="competition">
        <right-panel></right-panel>

        <!--占位标签-->
        <div class="head_replace"></div>

        <div class="content">
            <!--大赛视频-->
            <div class="video">
                <video src="../../assets/video/apple.mp4" width="100%" ref="myVideo" @pause="clickPause">
                    当前浏览器不支持video标签
                </video>
                <div v-show="showVideo">
                    <svg t="1605259326349" @click="playPause" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="2093" width="200" height="200">
                        <path
                            d="M512 0c282.758737 0 512 229.241263 512 512s-229.241263 512-512 512S0 794.758737 0 512 229.241263 0 512 0z m-92.510316 272.006737v479.986526l160.013474-119.996631L739.489684 512l-159.986526-119.996632-160.013474-119.996631z"
                            p-id="2094" fill="#ffffff"></path>
                    </svg>
                    <div class="video_title">中国商标大赛2020届宣传视频</div>
                </div>
            </div>

            <div class="sloganOne">乘风创业，破浪创新</div>
            <div class="sloganTwo">世界互联网中国梦</div>
            <div class="photoOne">
                <img src="../../assets/img/homePhoto1.png">
                <!--                <div class="btn">-->
                <!--                    <span>立即报名</span>-->
                <!--                    <i class="iconfont iconjiantou"></i>-->
                <!--                </div>-->
                <div class="stateText">
                    <span style="margin-top: 0;">乘李克强总理达沃斯论坛讲话批示之风，开创大众事业</span>
                    <span>冲开产业、行业之波浪，在创新、创意的激流中前进</span>
                    <span>达成习主席提出更加开放并与世界互联的中国梦 实现中华民族的伟大复兴</span>
                </div>
            </div>
            <div class="background"></div>

            <div class="sloganThr">组织结构</div>
            <div class="sloganFou">ORGANIZATION</div>
            <div class="red"></div>
            <div class="organization">
                <div class="org_title" style="margin-top: 0;">主办单位</div>
                <div class="org_detail" style="margin-top: 3.975089vw;">中华商标协会</div>
                <div class="org_detail">中华网</div>
                <div class="org_detail">中国教育电台</div>

                <div class="org_title">承办单位</div>
                <div class="org_detail" style="margin-top: 3.975089vw;">北京中商协知识产权咨询有限公司</div>

                <div class="org_title">协办单位</div>
                <div class="org_detail" style="margin-top: 3.975089vw;">中国人民大学中国商标品牌研究院</div>
                <div class="org_detail">《中华商标》杂志社</div>
                <div class="org_detail">中企商标鉴定中心</div>
                <div class="org_detail">各省市自治区商标协会</div>
                <div class="org_detail">北京大学信息科学技术学院</div>
                <div class="org_detail">各大高校联盟</div>
                <div class="org_detail">香港中华总商会</div>
                <div class="org_detail">香港进出口商会等</div>

                <div class="org_title">支持单位
                    <span>排名不分先后</span>
                </div>
                <div class="org_detail" style="margin-top: 3.975089vw;">中央美术学院</div>
                <div class="org_detail">中国美术学院</div>
                <div class="org_detail">西安美术学院</div>
                <div class="org_detail">四川美术学院</div>
                <div class="org_detail">鲁迅美术学院</div>
                <div class="org_detail">湖北美术学院</div>
                <div class="org_detail">天津美术学院</div>
                <div class="org_detail">北京服装学院</div>
                <div class="org_detail">中国传媒大学</div>
                <div class="org_detail">等国内知名美术院及设计公司</div>

                <div class="design">
                    <img src="../../assets/img/design.png">
                </div>
                <div class="sloganFiv">大赛规则</div>
                <div class="sloganSix">COMPETITION RULES</div>
                <div class="rule">
                    “大众创业、万众创新”出自2014年9月夏季达
                    沃斯论坛上李克强总理的讲话，李克强提出，要
                    在960万平方公里土地上掀起“大众创业”、“
                    草根创业”的新浪潮，形成“万众创新”、“人
                    人创新”的新势态。此后，他在首届世界互联网
                    大会、国务院常务会议和2015年《政府工作报告
                    》等场合中频频阐释这一关键词。每到一地考察
                    ，他几乎都要与当地年轻的“创客”会面。他希
                    望激发民族的创业精神和创新基因。
                </div>

                <div class="sloganSev">大赛赛程</div>
                <div class="sloganEig">COMPETITION SCHEDULE</div>
            </div>

            <div class="container">
                <div class="process">
                    <div class="process_title" style="margin-left: 7.950179vw;">作品征集</div>
                    <div class="process_title">作品初审</div>
                    <div class="process_title">初审公布</div>
                    <div class="process_title">作品终审</div>
                    <div class="process_title">获奖结果</div>
                    <div class="process_title">颁奖典礼</div>
                    <div class="process_bar">
                        <div class="bar"></div>
                        <div class="circle"></div>
                        <div class="bar" style="left: 18.550417vw; background: #BBBBBB;"></div>
                        <div class="bar" style="left: 31.800716vw; background: #BBBBBB;"></div>
                        <div class="circle" style="left: 45.31602vw; width: 4.240095vw; height: 4.240095vw; background: #ffffff; border: 0.265006vw solid #BBBBBB;"></div>
                        <div class="bar" style="left: 50.351133vw; background: #BBBBBB;"></div>
                        <div class="bar" style="left: 63.601431vw; background: #BBBBBB;"></div>
                        <div class="circle"
                             style="left: 76.851729vw; width: 4.240095vw; height: 4.240095vw; background: #ffffff; border: 0.265006vw solid #BBBBBB;"></div>
                        <div class="bar" style="left: 81.091825vw; background: #BBBBBB;"></div>

                        <div class="bar" style="left: 93.812111vw; background: #BBBBBB;"></div>
                        <div class="circle"
                             style="left: 107.327415vw; width: 4.240095vw; height: 4.240095vw; background: #ffffff; border: 0.265006vw solid #BBBBBB;"></div>
                        <div class="bar" style="left: 111.56751vw; background: #BBBBBB;"></div>

                        <div class="bar" style="left: 124.817808vw; background: #BBBBBB;"></div>
                        <div class="circle"
                             style="left: 138.333112vw; width: 4.240095vw; height: 4.240095vw; background: #ffffff; border: 0.265006vw solid #BBBBBB;"></div>
                        <div class="bar" style="left: 142.573208vw; background: #BBBBBB;"></div>

                        <div class="bar" style="left: 155.823506vw; background: #BBBBBB;"></div>
                        <div class="circle"
                             style="left: 169.33881vw; width: 4.240095vw; height: 4.240095vw; background: #ffffff; border: 0.265006vw solid #BBBBBB;"></div>
                        <div class="bar" style="left: 173.843911vw; background: #BBBBBB;"></div>

                    </div>
                    <div class="process_time">2020.12.06</div>
                    <div class="process_time" style="top: 19.875447vw; left: 13.78031vw">至</div>
                    <div class="process_time" style="top: 25.175566vw">2021.01.24</div>
                    <div class="process_time" style="left: 37.365841vw">2021.01.25</div>
                    <div class="process_time" style="top: 19.875447vw; left: 45.846032vw">至</div>
                    <div class="process_time" style="left: 37.365841vw; top: 25.175566vw">2021.01.28</div>
                    <div class="process_time" style="left: 68.90155vw">2021.01.28</div>
                    <div class="process_time" style="top: 19.875447vw; left: 77.381741vw">至</div>
                    <div class="process_time" style="left: 68.90155vw; top: 25.175566vw">2021.01.31</div>
                    <div class="process_time" style="left: 100.702266vw">2021.02.01</div>
                    <div class="process_time" style="top: 19.875447vw; left: 109.182457vw">至</div>
                    <div class="process_time" style="left: 100.702266vw; top: 25.175566vw">2021.02.03</div>
                    <div class="process_time" style="left: 131.442957vw">2021.02.03</div>
                    <div class="process_time" style="left: 163.243673vw">2021.02.05</div>
                </div>
            </div>

            <div class="sloganNin">奖项设置</div>
            <div class="sloganTen">AWARDS SETTING</div>
            <div class="awards">
                <div class="awards_text1">
                    该奖项意在鼓励商标设计师大胆发挥想象力，设计出让人耳目一新而且又符合商标注册规则并且能够进行注册的作品，所有作品均应属于作者原创作品
                </div>
                <div class="awards_quantity" style="margin-top: 6.360143vw;">“10000元、奖杯奖状”</div>
                <div class="awards_circle">
                    <svg t="1604572813119" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="2106" width="200" height="200">
                        <path
                            d="M374.698667 275.285333v179.968c-77.568-13.312-136.746667-81.066667-136.746667-162.346666v-17.621334h136.746667m45.568-45.589333H192.362667v63.210667c0 116.138667 94.144 210.304 210.304 210.304h17.6v-273.493334z m364.672 45.589333v17.621334c0 81.28-59.178667 149.013333-136.746667 162.346666v-179.968h136.746667m45.589333-45.589333H602.602667v273.493333h17.621333c116.16 0 210.304-94.144 210.304-210.282666v-63.210667zM602.602667 822.293333H420.266667l45.589333-296.298666h91.178667l45.568 296.298666z"
                            fill="#FF8B00" p-id="2107"></path>
                        <path d="M329.109333 822.293333H693.76v182.336H329.109333z" fill="#1E1E1E" p-id="2108"></path>
                        <path d="M374.698667 867.882667h273.493333v91.157333H374.698667z" fill="#2D2D2D"
                              p-id="2109"></path>
                        <path
                            d="M511.445333 685.546667c-125.866667 0-227.925333-102.037333-227.925333-227.925334V138.538667h455.850667V457.6c0 125.866667-102.037333 227.925333-227.925334 227.925333z m0-684.608l14.592 29.568 32.618667 4.736L535.04 58.24l5.568 32.469333-29.162667-15.338666-29.184 15.36 5.589334-32.490667-23.616-22.997333 32.64-4.736 14.570666-29.568zM387.114667 47.36l10.730666 21.76 24.042667 3.498667-17.386667 16.96 4.096 23.936-21.482666-11.306667-21.504 11.306667 4.117333-23.936-17.386667-16.96 24.021334-3.477334 10.752-21.76z m250.709333 0l10.730667 21.76 24.042666 3.498667-17.386666 16.96 4.117333 23.936-21.504-11.306667-21.482667 11.306667 4.096-23.936-17.386666-16.96 24.021333-3.477334 10.752-21.76z"
                            fill="#FFC200" p-id="2110"></path>
                    </svg>
                    <div>金奖3名</div>
                </div>
                <div class="awards_quantity">“5000元、奖杯奖状”</div>
                <div class="awards_circle">
                    <svg t="1604572949870" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="2235" width="200" height="200">
                        <path
                            d="M374.698667 275.285333v179.968c-77.568-13.312-136.746667-81.066667-136.746667-162.346666v-17.621334h136.746667m45.568-45.589333H192.362667v63.210667c0 116.138667 94.144 210.304 210.304 210.304h17.6v-273.493334z m364.672 45.589333v17.621334c0 81.28-59.178667 149.013333-136.746667 162.346666v-179.968h136.746667m45.589333-45.589333H602.602667v273.493333h17.621333c116.16 0 210.304-94.144 210.304-210.282666v-63.210667zM602.602667 822.293333H420.266667l45.589333-296.298666h91.178667l45.568 296.298666z"
                            fill="#CAD2DE" p-id="2236"></path>
                        <path d="M329.109333 822.293333H693.76v182.336H329.109333z" fill="#1E1E1E" p-id="2237"></path>
                        <path d="M374.698667 867.882667h273.493333v91.157333H374.698667z" fill="#1E1E1E"
                              p-id="2238"></path>
                        <path
                            d="M511.445333 685.546667c-125.866667 0-227.925333-102.037333-227.925333-227.925334V138.538667h455.850667V457.6c0 125.866667-102.037333 227.925333-227.925334 227.925333z m0-684.608l14.592 29.568 32.618667 4.736L535.04 58.24l5.568 32.469333-29.162667-15.338666-29.184 15.36 5.589334-32.490667-23.616-22.997333 32.64-4.736 14.570666-29.568zM387.114667 47.36l10.730666 21.76 24.042667 3.498667-17.386667 16.96 4.096 23.936-21.482666-11.306667-21.504 11.306667 4.117333-23.936-17.386667-16.96 24.021334-3.477334 10.752-21.76z m250.709333 0l10.730667 21.76 24.042666 3.498667-17.386666 16.96 4.117333 23.936-21.504-11.306667-21.482667 11.306667 4.096-23.936-17.386666-16.96 24.021333-3.477334 10.752-21.76z"
                            fill="#ADB8CB" p-id="2239"></path>
                    </svg>
                    <div>银奖6名</div>
                </div>
                <div class="awards_quantity">“5000元、奖杯奖状”</div>
                <div class="awards_circle">
                    <svg t="1604572969429" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="2364" width="200" height="200">
                        <path
                            d="M374.698667 275.285333v179.968c-77.568-13.312-136.746667-81.066667-136.746667-162.346666v-17.621334h136.746667m45.568-45.589333H192.362667v63.210667c0 116.138667 94.144 210.304 210.304 210.304h17.6v-273.493334z m364.672 45.589333v17.621334c0 81.28-59.178667 149.013333-136.746667 162.346666v-179.968h136.746667m45.589333-45.589333H602.602667v273.493333h17.621333c116.16 0 210.304-94.144 210.304-210.282666v-63.210667zM602.602667 822.293333H420.266667l45.589333-296.298666h91.178667l45.568 296.298666z"
                            fill="#FBA35B" p-id="2365"></path>
                        <path d="M329.109333 822.293333H693.76v182.336H329.109333z" fill="#444444" p-id="2366"></path>
                        <path d="M374.698667 867.882667h273.493333v91.157333H374.698667z" fill="#444444"
                              p-id="2367"></path>
                        <path
                            d="M511.445333 685.546667c-125.866667 0-227.925333-102.037333-227.925333-227.925334V138.538667h455.850667V457.6c0 125.866667-102.037333 227.925333-227.925334 227.925333z m0-684.608l14.592 29.568 32.618667 4.736L535.04 58.24l5.568 32.469333-29.162667-15.338666-29.184 15.36 5.589334-32.490667-23.616-22.997333 32.64-4.736 14.570666-29.568zM387.114667 47.36l10.730666 21.76 24.042667 3.498667-17.386667 16.96 4.096 23.936-21.482666-11.306667-21.504 11.306667 4.117333-23.936-17.386667-16.96 24.021334-3.477334 10.752-21.76z m250.709333 0l10.730667 21.76 24.042666 3.498667-17.386666 16.96 4.117333 23.936-21.504-11.306667-21.482667 11.306667 4.096-23.936-17.386666-16.96 24.021333-3.477334 10.752-21.76z"
                            fill="#B35214" p-id="2368"></path>
                    </svg>
                    <div>铜奖8名</div>
                </div>
                <div class="awards_quantity">“奖状”</div>
                <div class="awards_circle" style="margin-bottom: 0;">
                    <svg t="1604572981092" class="icon" viewBox="0 0 1280 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="2493" width="200" height="200">
                        <path
                            d="M121.664 0.352H116.16a115.2 115.2 0 0 0-114.88 114.88v5.152A120.352 120.352 0 0 1 121.696 0.384z m661.92 16.64H550.08v10.976A265.984 265.984 0 0 1 67.968 180.064v715.808A115.2 115.2 0 0 0 182.656 1011.2h600.96a115.2 115.2 0 0 0 114.848-114.88V131.68a115.2 115.2 0 0 0-114.88-114.688z m-190.496 668.928a27.424 27.424 0 0 1-46.88 19.456l-62.816-62.848-63.04 62.656a27.104 27.104 0 0 1-19.296 8 27.424 27.424 0 0 1-24.736-16.64 27.424 27.424 0 0 1-2.144-10.624v-90.272a191.488 191.488 0 0 0 219.424 0l-0.512 90.24z m-109.696-83.136a164.576 164.576 0 1 1 164.576-164.544 164.576 164.576 0 0 1-164.576 165.376v-0.832zM1028.48 146.816l-64.512-16.64a19.936 19.936 0 0 0-24.64 19.456v812.224h1.536c4.992-1.312 13.28-5.824 25.28-35.552 2.304-5.824 5.12-13.632 7.968-22.944L1118.4 290.112a120.352 120.352 0 0 0-89.92-143.296z m196.8 211.456l-39.552-20.48a19.936 19.936 0 0 0-28.608 12.992l-147.264 590.464h1.824a51.84 51.84 0 0 0 24.256-20.8c3.744-4.928 7.136-10.176 10.144-15.616l218.24-424.224a91.104 91.104 0 0 0-39.04-122.336z"
                            fill="#FFC200" p-id="2494"></path>
                        <path d="M318.816 438.88a164.576 164.576 0 1 0 329.12 0 164.576 164.576 0 0 0-329.12 0z"
                              fill="#FFFFFF" p-id="2495"></path>
                        <path
                            d="M373.664 595.648v89.44a27.424 27.424 0 0 0 8 19.264 27.424 27.424 0 0 0 38.72 0l62.816-62.816 62.848 62.816a27.424 27.424 0 0 0 46.88-19.424v-89.28a191.488 191.488 0 0 1-219.424 0h0.16z"
                            fill="#FFFFFF" p-id="2496"></path>
                        <path
                            d="M285.216 293.28A265.984 265.984 0 0 0 551.2 27.296V16.32H188.16a120.352 120.352 0 0 0-120.032 120v43.744a264.8 264.8 0 0 0 217.088 113.216z"
                            fill="#FF7E00" p-id="2497"></path>
                        <path
                            d="M285.216 293.28A265.984 265.984 0 0 0 551.2 27.296V16.32H188.16a120.352 120.352 0 0 0-120.032 120v43.744a264.8 264.8 0 0 0 217.088 113.216z"
                            fill="#FFD241" p-id="2498"></path>
                    </svg>
                    <div>优秀奖若干</div>
                </div>
                <div class="awards_text2">
                    <span>获得上述所有商标设计奖的金奖、银奖、铜奖的作品的所有权原则归主办方所有；如参赛者明确表示不放弃所有权，将仅获应得奖金的</span>
                    <span class="bold">百分之五十。</span>
                    <br>
                    <span style="line-height: 5.565125vw; letter-spacing: 0.212005vw">上述奖金金额均为</span>
                    <span class="bold" style="line-height: 5.565125vw; letter-spacing: 0.212005vw">税前</span>
                </div>
            </div>

            <div class="sloganEle">重磅嘉宾</div>
            <div class="sloganTwe">Distinguished guests</div>
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

            <!--            <div class="sloganThi">人气作品排行榜</div>-->
            <!--            <div class="sloganFour">LIST OF POPULAR WORKS</div>-->
            <!--            <el-tabs v-model="activeName" @tab-click="tabClick" class="filter_tab">-->
            <!--                <el-tab-pane label="人气总榜" name="first"></el-tab-pane>-->
            <!--                <el-tab-pane label="月度总榜" name="second"></el-tab-pane>-->
            <!--                <el-tab-pane label="今日总榜" name="third"></el-tab-pane>-->
            <!--            </el-tabs>-->
            <!--            <div class="show">-->
            <!--                <div v-show="showSample === 1">-->
            <!--                    <div class="show_item">-->
            <!--                        <div class="show_tag3"><span>正在评比中…</span></div>-->
            <!--                        <div class="show_like1"></div>-->
            <!--                        <div class="show_image">-->
            <!--                            <img src="../../assets/img/sample1.png">-->
            <!--                        </div>-->
            <!--                        <div class="show_name">作品名</div>-->
            <!--                        <div class="show_author"><span>设计师：</span></div>-->
            <!--                        <div class="show_people">-->
            <!--                            <i class="iconfont iconeye"></i>-->
            <!--                            2324人-->
            <!--                        </div>-->
            <!--                    </div>-->
            <!--                    <div class="show_item">-->
            <!--                        <div class="show_tag3"><span>正在评比中…</span></div>-->
            <!--                        <div class="show_like1"></div>-->
            <!--                        <div class="show_image">-->
            <!--                            <img src="../../assets/img/sample2.png">-->
            <!--                        </div>-->
            <!--                        <div class="show_name">作品名</div>-->
            <!--                        <div class="show_author"><span>设计师：</span></div>-->
            <!--                        <div class="show_people">-->
            <!--                            <i class="iconfont iconeye"></i>-->
            <!--                            2324人-->
            <!--                        </div>-->
            <!--                    </div>-->
            <!--                </div>-->
            <!--                <div v-show="showSample === 2">-->
            <!--                    <div class="show_item">-->
            <!--                        <div class="show_tag3"><span>正在评比中…</span></div>-->
            <!--                        <div class="show_like1"></div>-->
            <!--                        <div class="show_image">-->
            <!--                            <img src="../../assets/img/sample2.png">-->
            <!--                        </div>-->
            <!--                        <div class="show_name">作品名</div>-->
            <!--                        <div class="show_author"><span>设计师：</span></div>-->
            <!--                        <div class="show_people">-->
            <!--                            <i class="iconfont iconeye"></i>-->
            <!--                            2324人-->
            <!--                        </div>-->
            <!--                    </div>-->
            <!--                </div>-->
            <!--                <div v-show="showSample === 3">-->
            <!--                    <div class="show_item">-->
            <!--                        <div class="show_tag3"><span>正在评比中…</span></div>-->
            <!--                        <div class="show_like1"></div>-->
            <!--                        <div class="show_image">-->
            <!--                            <img src="../../assets/img/sample1.png">-->
            <!--                        </div>-->
            <!--                        <div class="show_name">作品名</div>-->
            <!--                        <div class="show_author"><span>设计师：</span></div>-->
            <!--                        <div class="show_people">-->
            <!--                            <i class="iconfont iconeye"></i>-->
            <!--                            2324人-->
            <!--                        </div>-->
            <!--                    </div>-->
            <!--                </div>-->
            <!--                <div class="load" style="margin-top: 0;margin-bottom: 5.300119vw;">加载更多…</div>-->
            <!--            </div>-->
            <div class="line"></div>
            <foot-bottom></foot-bottom>
        </div>
    </div>
</template>

<script>
import RightPanel from '../components/RightPanel/index'
import FootBottom from '../components/FootBottom/index'
import {mapGetters, mapMutations} from "vuex"

export default {
    name: "competition",
    components: {
        RightPanel,
        FootBottom
    },
    data() {
        return {
            // 是否展示嘉宾的下拉内容
            showDetail1: false,
            showDetail2: false,
            showDetail3: false,
            showDetail4: false,
            showDetail5: false,
            activeName: 'first',    // 作品栏的当前tab页面
            showSample: 1,          // 切换作品tab栏
            showVideo: true,        // 视频按键的显示
            showMoreGuests: false,  // 是否展示更多嘉宾
            load: true
        }
    },
    computed: {
        ...mapGetters([
            'activePage',
            'guestsType'
        ])
    },
    mounted() {
        this.setActivePage(2)
    },
    methods: {
        ...mapMutations({
            setActivePage: 'set_ActivePage',
            setGuestsType: 'set_GuestsType'
        }),
        // 处理嘉宾介绍下拉
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
        // 视频的播放，点击播放时去除视频上图标，展示controls
        playPause() {
            let video = this.$refs.myVideo
            if (video.paused) {
                video.play()
                this.showVideo = false
                this.$refs.myVideo.controls = 'controls'
            } else {
                video.pause()
            }
        },
        // 点击暂停时
        clickPause() {
            this.showVideo = true
            this.$refs.myVideo.controls = ''
        },
        // 跳转到第四届大赛->重磅嘉宾
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
                name: 'competitionGuests',
                query: {
                    guestsId: this.guestsType
                }
            })
            this.setActivePage(13)
        },
        loadGuests() {
            this.showMoreGuests = true
            this.load = false
        },
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/mixin";

.competition {

    .head_replace {
        @include wh(100%, 19.345435vw);
    }

    .content {
        position: relative;
        @include fc;

        .video {
            @include wh(100%, 53.001193vw);
            position: relative;

            .icon {
                @include wh(10.070227vw, 10.070227vw);
                @include cl;
                top: 19.635352vw;
            }

            .video_title {
                @include font(4.240095vw, 3.710083vw, 500);
                @include cl;
                top: 31.825626vw;
                height: 4.240095vw;
                white-space: nowrap;
                color: #FFFFFF;
                letter-spacing: 0.265006vw;
            }

            .video_text {
                @include wh(23.585531vw, 6.890155vw);
                @include cl;
                top: 37.895853vw;
                background: #343434;
                border-radius: 3.710083vw;
                opacity: 0.62;

                span {
                    @include font(3.180072vw, 4.770107vw, 500);
                    @include center;
                    color: #FFFFFF;
                    letter-spacing: 0.212005vw;
                    white-space: nowrap;
                }
            }
        }

        .sloganOne {
            @include wh(100%, 6.095137vw);
            @include font(6.095137vw, 9.275209vw, Bold);
            text-align: center;
            color: #454545;
            letter-spacing: 1.060024vw;
            margin-top: 9.010203vw;
        }

        .sloganTwo {
            @include wh(100%, 5.300119vw);
            @include font(3.710083vw, 5.300119vw);
            text-align: center;
            color: #BBBBBB;
            letter-spacing: 0.212005vw;
            margin-top: 1.590036vw;
        }

        .photoOne {
            width: 86.65695vw;
            z-index: 10;
            margin-top: 2.65006vw;
            position: relative;

            img {
                @include wh(100%, 106.532397vw);
            }

            .btn {
                @include wh(25.970584vw, 10.070227vw);
                position: absolute;
                top: 80.031801vw;
                left: 51.676163vw;
                background-color: #B30000;
                border-color: #B30000;

                span {
                    @include font(3.445078vw, 5.035113vw, Bold);
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

            .stateText {
                @include wh(81.356831vw, 41.870942vw);
                @include font(3.710083vw, 6.360143vw);
                color: #595959;
                margin-top: 3.445078vw;

                span {
                    display: inline-block;
                    margin-top: 1.855042vw;
                }
            }
        }

        .background {
            @include wh(100%, 109.977474vw);
            background: #F5F5F5;
            position: absolute;
            top: 125.34782vw;
        }

        .sloganThr {
            @include wh(100%, 6.095137vw);
            @include font(6.095137vw, 9.275209vw, Bold);
            text-align: center;
            color: #454545;
            letter-spacing: 1.060024vw;
            margin-top: 15.900358vw;
        }

        .sloganFou {
            @include wh(100%, 5.300119vw);
            @include font(3.710083vw, 5.300119vw);
            text-align: center;
            color: #BBBBBB;
            letter-spacing: 0.212005vw;
            margin-top: 1.590036vw;
        }

        .red {
            @include wh(5.035113vw, 1.590036vw);
            background: #B30000;
            position: absolute;
            top: 265.005963vw;
            left: 0;
        }

        .organization {
            width: 84.00689vw;
            margin-top: 3.180072vw;

            .org_title {
                @include wh(100%, 4.240095vw);
                @include font(4.240095vw, 6.360143vw, 500);
                color: #454545;
                letter-spacing: 0.265006vw;
                margin-top: 13.250298vw;

                span {
                    @include font(3.710083vw, 5.565125vw);
                    color: #BBBBBB;
                    letter-spacing: 0.212005vw;
                    margin-left: 1.590036vw;
                }
            }

            .org_detail {
                @include wh(100%, 3.710083vw);
                @include font(3.710083vw, 5.565125vw);
                color: #636363;
                letter-spacing: 0.212005vw;
                width: 100%;
                margin-top: 2.65006vw;
            }

            .design {
                margin-top: 9.010203vw;
                margin-left: 0.795018vw;

                img {
                    @include wh(81.621836vw, 28.88565vw);
                }
            }

            .sloganFiv {
                @include wh(100%, 4.240095vw);
                @include font(4.240095vw, 6.360143vw, Bold);
                color: #454545;
                letter-spacing: 0.795018vw;
                margin-top: 0.265006vw;
            }

            .sloganSix {
                @include wh(100%, 3.710083vw);
                @include font(2.65006vw, 3.710083vw);
                color: #BBBBBB;
                letter-spacing: 0.159004vw;
                margin-top: 1.32503vw;
            }

            .rule {
                @include wh(100%, 58.301312vw);
                @include font(3.710083vw, 6.360143vw);
                color: #636363;
                letter-spacing: 0.212005vw;
                margin-top: 1.32503vw;
            }

            .sloganSev {
                @include wh(100%, 4.240095vw);
                @include font(4.240095vw, 6.360143vw, Bold);
                color: #454545;
                letter-spacing: 0.795018vw;
                margin-top: 10.865244vw;
            }

            .sloganEig {
                @include wh(100%, 3.710083vw);
                @include font(2.65006vw, 3.710083vw);
                color: #BBBBBB;
                letter-spacing: 0.159004vw;
                margin-top: 1.32503vw;
            }
        }

        .container {
            @include wh(91.957069vw, 30.475686vw);

            .process {
                @include wh(100%, 30.475686vw);
                margin-top: 3.710083vw;
                position: relative;
                overflow-x: scroll;     // 滑动
                white-space: nowrap;    // 使其不换行，才能滑动

                .process_title {
                    @include font(3.710083vw, 5.565125vw, 500);
                    color: #454545;
                    letter-spacing: 0.212005vw;
                    height: 3.710083vw;
                    display: inline-block;
                    margin-left: 15.900358vw;
                    margin-top: 1.590036vw;
                }

                .process_bar {
                    @include wh(100%, 4.240095vw);
                    position: absolute;
                    top: 7.950179vw;

                    .bar {
                        @include wh(13.250298vw, 0.265006vw);
                        @include ct;
                        background: #B30000;
                    }

                    .circle {
                        @include wh(2.65006vw, 2.65006vw);
                        @include ct;
                        left: 14.575328vw;
                        background: #B30000;
                        border-radius: 50%;
                    }
                }

                .process_time {
                    @include font(3.710083vw, 5.565125vw);
                    color: #636363;
                    letter-spacing: 0.212005vw;
                    height: 3.710083vw;
                    position: absolute;
                    top: 13.250298vw;
                    left: 5.300119vw;
                }
            }
        }

        .sloganNin {
            @include wh(84.00689vw, 4.240095vw);
            @include font(4.240095vw, 6.360143vw, Bold);
            color: #454545;
            letter-spacing: 0.795018vw;
            margin-top: 9.010203vw;
        }

        .sloganTen {
            @include wh(84.00689vw, 3.710083vw);
            @include font(2.65006vw, 3.710083vw);
            color: #BBBBBB;
            letter-spacing: 0.159004vw;
            margin-top: 1.32503vw;
        }

        .awards {
            @include fc;
            width: 84.00689vw;
            margin-top: 1.060024vw;

            .awards_text1 {
                @include wh(100%, 25.440572vw);
                @include font(3.710083vw, 6.360143vw);
                color: #636363;
                letter-spacing: 0.212005vw;
            }

            .awards_quantity {
                @include font(3.710083vw, 5.565125vw);
                color: #636363;
                letter-spacing: 0.265006vw;
                height: 3.710083vw;
                margin-bottom: 1.590036vw;
            }

            .awards_circle {
                @include wh(39.750894vw, 39.750894vw);
                box-shadow: 0 3.975089vw 3.710083vw 0 rgba(242, 242, 242, 0.5);
                border-radius: 50%;
                margin-bottom: 14.045316vw;
                position: relative;

                svg {
                    @include wh(7.950179vw, 12.720286vw);
                    @include center;
                }

                div {
                    @include font(3.710083vw, 5.565125vw, Bold);
                    @include cl;
                    top: 27.030608vw;
                    color: #454545;
                    letter-spacing: 0.265006vw;
                }
            }

            .awards_text2 {
                @include wh(100%, 30.475686vw);
                @include font(3.710083vw, 6.360143vw);
                color: #636363;
                margin-top: 6.360143vw;

                .bold {
                    font-weight: Bold;
                }
            }
        }

        .sloganEle {
            @include wh(100%, 6.095137vw);
            @include font(6.095137vw, 9.275209vw, Bold);
            text-align: center;
            color: #454545;
            letter-spacing: 1.060024vw;
        }

        .sloganTwe {
            @include wh(100%, 3.180072vw);
            @include font(3.180072vw, 4.770107vw);
            text-align: center;
            color: #BBBBBB;
            letter-spacing: 0.212005vw;
            margin-top: 2.65006vw;
        }

        .guests {
            width: 100%;
            margin-top: 3.975089vw;
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
            @include font(3.710083vw, 5.565125vw);
            color: #B5B5B5;
            letter-spacing: 0.212005vw;
            margin-top: 6.890155vw;
        }

        .sloganThi {
            @include wh(100%, 6.095137vw);
            @include font(6.095137vw, 9.275209vw, Bold);
            text-align: center;
            color: #454545;
            letter-spacing: 1.060024vw;
            margin-top: 9.010203vw;
        }

        .sloganFour {
            @include wh(100%, 3.180072vw);
            @include font(3.180072vw, 4.770107vw);
            text-align: center;
            color: #BBBBBB;
            letter-spacing: 0.212005vw;
            margin-top: 2.65006vw;
        }

        .filter_tab {
            margin-top: 3.180072vw;
        }

        .show {
            @include fc;
            width: 100%;
            background: #F7F7F7;

            .show_item {
                @include wh(91.957069vw, 74.996687vw);
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

        .line {
            @include wh(26.500596vw, 0.265006vw);
            background: #D8D8D8;
            margin-top: 10.865244vw;
        }
    }
}
</style>
