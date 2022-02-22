<template>
	<div class="top-bar-container">
		<!-- 顶部导航标签 -->
		<van-tabs
			v-model="activeName"
			color="#1eddb2"
			line-width="30px"
			line-height="1px"
		>
			<van-tab
				:title-style="{
					flex: 'unset',
					padding: '0 20px',
					alignItems: 'center',
					color: '#a5a6a8',
				}"
				v-for="(tab, index) in tabs"
				:title="tab.title"
				:name="tab.title"
				:key="index + '-' + tab.title"
			>
				<SearchResult v-if="isResultShow" :activeName="activeName" />
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
import SearchResult from './SearchResult.vue'

export default {
	name: 'TopBar',
	components: { SearchResult },
	props: {
		// 搜索结果是否展示的状态
		isResultShow: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {
			activeName: '', // 当前的展示栏
			tabs: [{ title: '文章' }, { title: '用户' }],
		}
	},
}
</script>

<style lang="less" >
div.top-bar-container {
	div.van-tabs__wrap {
		height: 25px;
		border-bottom: 2px solid #eeedf1;

		.van-tab--active {
			span {
				color: @theme-color;
			}
		}
	}
}
</style>