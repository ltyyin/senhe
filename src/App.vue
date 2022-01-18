<template>
	<div id="app">
		<!-- 路由出口 -->
		<router-view></router-view>

		<!-- 登录弹出框 -->
		<Login></Login>
	</div>
</template>

<script>
import Login from '@/views/login/Index.vue'
export default {
	name: 'App',
	data() {
		return {}
	},
	components: { Login },
}
</script>

<style lang="less">
</style>
