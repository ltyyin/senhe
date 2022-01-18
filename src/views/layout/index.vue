<template>
	<div class="layout-container">
		<!-- 子路由 -->
		<keep-alive include="HomeIndex">
			<router-view></router-view>
		</keep-alive>

		<!-- 底部导航栏 -->
		<van-tabbar
			v-model="active"
			route
			fixed
			active-color="#1eddb2"
			inactive-color="#969695"
			class="bottom-tabbar"
		>
			<van-tabbar-item to="/" icon-prefix="shequ" icon="shouye">
				首页
			</van-tabbar-item>
			<van-tabbar-item to="/qa" icon-prefix="shequ" icon="wenda">
				问答
			</van-tabbar-item>
			<!-- <van-tabbar-item to="/video" icon-prefix="shequ" icon="shipin">
        视屏
      </van-tabbar-item> -->
			<van-tabbar-item to="/my" icon-prefix="shequ" icon="wode">
				我的
			</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
export default {
	name: 'LayoutIndex',
	components: {},
	props: {},
	data() {
		return { active: 0 }
	},
}
</script> 

<style scoped lang="less">
.layout-container {
	.bottom-tabbar {
		background-color: #f9f9f8;

		.van-tabbar-item--active {
			// background-color: #f9f9f8;
			background-color: unset;
		}
	}
}
</style>
