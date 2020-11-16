<template>
    <div>
        <footer class="foot">
            <div class="foot_top">
                <img src="../../../assets/img/titleLogo.png" class="foot_logo">
                <div class="foot_text">中华商标（国际）设计大赛</div>
                <i class="iconfont icondouyin foot_partnerOne"></i>
                <i class="iconfont icongongzhonghao foot_partnerTwo"></i>
            </div>
            <div class="foot_bottom">
                <div style="width: 62.541407vw; height: 5.300119vw; top: 3.975089vw">copyright©️2020.shangbiaotong</div>
                <div style="width: 78.176759vw; height: 5.300119vw; top: 9.805221vw">All rights reserved 京ICP备 18029099-1号</div>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: "FootBottom"
}
</script>

<style lang="scss" scoped>
@import "../../../assets/mixin";

.foot {
    margin-top: 3.180072vw;

    .foot_top {
        @include wh(100vw, 7.950179vw);
        position: relative;

        .foot_logo {
            @include wh(10.600239vw, 5.565125vw);
            @include ct;
            left: 3.710083vw;
        }

        .foot_text {
            @include wh(54.856234vw, 4.240095vw);
            @include ct;
            @include font(4.240095vw, 4.240095vw, NotoSansHans-Bold);
            color: #595959;
            letter-spacing: 0.265006vw;
            left: 15.635352vw;
        }

        .foot_partnerOne {
            @include ct;
            font-size: 7.950179vw;
            left: 77.116735vw;
            border-radius: 1.32503vw;
        }

        .foot_partnerTwo {
            @include ct;
            font-size: 7.950179vw;
            left: 87.716974vw;
            border-radius: 1.32503vw;
        }
    }

    .foot_bottom {
        @include wh(100%, 21.730489vw);
        position: relative;

        div {
            @include font(3.710083vw, 5.300119vw, NotoSansHans-Light);
            @include cl;
            color: #454545;
            letter-spacing: 0.265006vw;
            white-space: nowrap;
        }
    }
}
</style>
