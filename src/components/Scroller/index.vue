<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
    name : 'Scroller',
    props:{
        handleToScroll : {
            type : Function,
            default : function(){}
        },
        handleToTouchEnd: {
            type : Function,
            default : function(){}
        }
    },
    mounted () {
        var scroll = new BScroll(this.$refs.wrapper,{
			tap: true,
			click:true,
			probeType: 1
        }); 
        // 上拉加载
        scroll.on('scroll',pos=>{
            // console.log("scroll--test")
            this.handleToScroll(pos);
        });
        scroll.on('touchEnd',pos=>{
            // console.log("touchEnd--test")
            this.handleToTouchEnd(pos);
        });
    }
}
</script>

<style lang="scss" scoped>
    .wrapper{
        height: 100%;
    }
</style>

