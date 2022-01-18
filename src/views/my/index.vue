<template>
	<div class="my-container">
		<van-nav-bar
			fixed
			safe-area-inset-top
			:border="false"
			placeholder
			title="我"
		>
		</van-nav-bar>

		<van-cell-group class="login">
			<van-cell :title="userInfo.name" center v-if="user">
				<template #icon>
					<van-image
						round
						width="50"
						height="50"
						fit="cover"
						:src="userInfo.photo"
					/>
				</template>
			</van-cell>

			<van-cell
				title="登录 / 注册"
				center
				@click="switchShowLogin(true)"
				v-else
			>
				<template #icon>
					<van-image round width="50" height="50" fit="cover" />
				</template>
			</van-cell>
		</van-cell-group>

		<van-cell-group class="other">
			<van-cell title="消息中心" icon="shop-o" is-link></van-cell>
			<van-cell title="创作中心" icon="shop-o" is-link></van-cell>
			<van-cell title="我赞过的" icon="shop-o" is-link></van-cell>
			<van-cell title="收藏集" icon="shop-o" is-link></van-cell>
			<van-cell title="阅读记录" icon="shop-o" is-link></van-cell>
			<van-cell title="标签管理" icon="shop-o" is-link></van-cell>
		</van-cell-group>

		<van-cell-group class="settings" v-if="user">
			<van-cell title="退出登录" clickable border @click="logout"></van-cell>
		</van-cell-group>
	</div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { getCurrentUser } from '@/api/user.js'

export default {
	name: 'MyIndex',
	data() {
		return {}
	},
	computed: {
		...mapState('loginModel', ['user', 'userInfo']),
	},
	methods: {
		...mapMutations('loginModel', [
			'setUserInfo',
			'switchShowLogin',
			'setUser',
		]),

		logout() {
			this.$dialog
				.confirm({
					title: '确定退出？',
					// message: '弹窗内容',
				})
				.then(() => {
					// on confirm
					this.setUser(null)
					this.setUserInfo({})
				})
				.catch(() => {
					// on cancel
				})
		},
	},
}
</script>

<style scoped lang="less">
// .van-nav-bar {
//   overflow: hidden;
// }

.my-container {
	background-color: #f2f1f6;
	height: 617px;

	.van-cell-group {
		margin-top: 20px;
	}

	/* 登录单元格 */
	.login {
		.van-cell--center {
			padding: 20px 20px;
			.van-cell__title {
				font-size: 18px;
				margin-left: 20px;
			}
		}
	}

	/* 其他单元格 */
	.other {
		padding-top: 2px;
		padding-bottom: 2px;
		.van-cell {
			font-size: 16px;
			padding: 15px;

			.van-cell__title {
				margin-left: 10px;
			}
		}
	}

	.settings {
		.van-cell {
			font-size: 16px;
			padding: 15px;
			.van-cell__title {
				text-align: center;
				color: red;
			}
		}
	}
}
</style>
