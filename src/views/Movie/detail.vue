<template>
    	<div id="detailContainer" class="slide-enter-active">
		<Header title="影片详情">
            <i class="iconfont icon-right" @touchstart="handleToBack"></i>
        </Header>    
        <Loading v-if="isLoading"/>
		<div v-else id="content" class="contentDetail">
			<div class="detail_list">
				<div class="detail_list_bg" :style="{'background-image': `url(${film.poster})`}"></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img">
						<img :src="film.poster" alt="">
					</div>
					<div class="detail_list_info">
						<h2>{{film.name}}</h2>
						<p>{{film.category}}</p>
						<p>{{film.nation}} / {{film.runtime}}分钟</p>
						<p>2018-11-16大陆上映</p>
					</div>
				</div>
			</div>
			<div class="detail_intro">
				<p>{{film.synopsis}}</p>
			</div>
			<div class="detail_player swiper-container" ref="detail_player">
				<ul class="swiper-wrapper">
					<li v-for="(item,index) in film.photos" :key="index" class="swiper-slide">
						<div>
							<img :src="item" alt="">
						</div>
						
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import Header from '@/components/Header';
export default {
    name : 'Detail',
    data(){
        return {
            film : {},
            isLoading : true
        }
    },
    components: {
        Header,
    },
    props : ['movieId'],
    methods: {
        handleToBack(){
            this.$router.back();
        }
    },
    mounted () {
        // console.log(this.movieId);
        this.axios({
            url: `https://m.maizuo.com/gateway?filmId=${this.movieId}&k=2917818`,
            headers : {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16162254242302012276342785"}',
                'X-Host': 'mall.film-ticket.film.info'
            }
        }).then(res =>{
            var msg = res.data.msg;
            if( msg ==='ok'){
                this.film = res.data.data.film;
                // console.log(this.film.poster)
                this.isLoading = false;
                this.$nextTick(()=>{
                    new Swiper(this.$refs.detail_player,{
                        slidesPerView : 'auto',
                        freeMode : true,
                        freeModeSticky : true
                    })
                });
                
            }
        })
    }
}
</script>

<style lang="scss" scoped>
#detailContainer{position: absolute; left: 0; top: 0; z-index: 100; width: 100%; min-height: 100%;background: white}#content.contentDetail{ display: block; margin-bottom:0;}
#detailContainer.slide-enter-active{animation: .3s slideMove;}
@keyframes slideMove{
    0%{transform: translateX(100%);}
    100%{transform: translateX(0);}
}
#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
.detail_list .detail_list_bg{ width:100%; height:100%; background:  0 40%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;}
.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
.detail_list .detail_list_img img{ width:100%; height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}
#content .detail_intro{ padding: 10px;}
#content .detail_player{ margin:20px;}
.detail_player .swiper-slide{ width:70px; margin-right: 20px; text-align: center; font-size: 14px;}
.detail_player .swiper-slide img{ width:100%; margin-bottom: 5px;}
.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}
</style>
