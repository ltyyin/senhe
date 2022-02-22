<template>
	<div class="search-result-container">
		<ArticlesResult v-if="activeName === '文章'" />
		<UsersResult v-else />
	</div>
</template>

<script>
import UsersResult from './UsersResult.vue'
import ArticlesResult from './ArticlesResult.vue'

export default {
	name: 'SearchResult',
	components: { UsersResult, ArticlesResult },
	props: {
		activeName: {
			type: String,
			required: true,
		},
	},
}
</script>

<style lang="less">
div.search-result-container {
	position: fixed;
	top: 81.02px;
	left: 0;
	right: 0;
	bottom: 0;
	overflow-y: auto;
	background-color: #f2f1f6;
}
</style>