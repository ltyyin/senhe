<template>
	<div id="app">
		<!-- 路由出口 -->
		<keep-alive include="LayoutIndex">
			<router-view></router-view>
		</keep-alive>

		<!-- 登录弹出框 -->
		<Login />
	</div>
</template>

<script>
import Login from '@/views/login/Index.vue'
import { mapMutations, mapState } from 'vuex'
import { getCurrentUser } from '@/api/user.js'

export default {
	name: 'App',
	computed: mapState('loginModel', ['user']),
	components: { Login },
	methods: mapMutations('loginModel', ['setUserInfo', 'setUser']),

	async created() {
		if (this.user) {
			try {
				const { data } = await getCurrentUser()
				this.setUserInfo(data)
			} catch (err) {
				if (err.respose.status === 401) this.setUser(null)
			}
		}
	},
}
</script>
