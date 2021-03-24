<template>
    <div class="movie_body">
		<Loading  v-if="isLoading"/>
		<Scroller v-else :key="comingList.length">
		<ul>
			<!-- <li>
				<div class="pic_show"><img src="/images/movie_1.jpg"></div>
				<div class="info_list">
					<h2>无名之辈</h2>
					<p><span class="person">17746</span> 人想看</p>
					<p>主演: 陈建斌,任素汐,潘斌龙</p>
					<p>2018-11-30上映</p>
				</div>
				<div class="btn_pre">
					预售
				</div>
			</li> -->
			
			<li v-for="item in comingList" :key="item.filmId">
				<v-touch @tap="handleToDetail(item.filmId)"><div class="pic_show"><img :src="item.poster | setWH('128.180')"></div></v-touch>
				<div class="info_list">
					<v-touch @tap="handleToDetail(item.filmId)"><h2>{{item.name}} <span class="item" v-if="item.filmType.name=='3D'">3D</span><span class="item" v-else>2D</span></h2></v-touch>
					<p v-if="item.actors">主演:{{item.actors | actorfilter}}</p>
                	<p v-else>暂无主演</p>
					<p>2018-11-30上映</p>
				</div>
				<div class="btn_pre">
					预售
				</div>
			</li>
		</ul>
		</Scroller>
	</div>
</template>

<script>
import Vue from 'vue'
import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})
Vue.filter('actorfilter', function (data) {
  const newlist = data.map(item => item.name)
  return newlist.join(' ')
})
export default {
	name : 'ComingSoon',
	data(){
		return {
			comingList : [],
			isLoading : true
		}
	},
	mounted () {
		this.axios({
			url: 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=2&k=1953704',
			headers: {
			'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1615691876558972813705217"}',
			'X-Host': 'mall.film-ticket.film.list'
			}
		}).then(res => {
			var msg = res.data.msg;
			if( msg === 'ok'){
				console.log(res.data.data.films)
				this.comingList = res.data.data.films;
				this.isLoading = false
			}
		})
	},
	methods : {
		handleToDetail(movieId){
			// console.log(movieId);
			this.$router.push(`/movie/detail/2/${movieId}`)
		}
	}
}
</script>

<style lang="scss" scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
.item{
	font-size: 9px;
    color: #fff;
    background-color: #d2d6dc;
    height: 14px;
    line-height: 14px;
    padding: 0 2px;
    border-radius: 2px;
}
</style>
