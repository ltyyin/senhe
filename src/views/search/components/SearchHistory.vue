<template>
	<div class="search-history-container">
		<!-- 搜索历史标签 -->
		<van-cell title="搜索历史" :border="false">
			<div class="delete-text" v-if="isEdit">
				<span @click="$emit('deleteHistoryAll')">删除全部</span>
				<small>|</small>
				<span @click="isEdit = false">完成</span>
			</div>
			<div class="delete-icon" v-else>
				<van-icon name="delete-o" @click="isEdit = true" />
			</div>
		</van-cell>

		<!-- 历史记录展示 -->
		<section>
			<div
				v-for="(str, index) in searchHistories"
				:key="index + '-' + str"
				class="history-item"
				@click="shortcutSearch(str)"
			>
				{{ str }}
				<span v-if="isEdit" @click="$emit('deleteHistoryItem', str)">
					<van-icon name="clear" />
				</span>
			</div>
		</section>
		<!-- 历史记录展示 -->
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
	name: 'SearchHistory',
	props: {
		// 搜索历史记录的列表
		searchHistories: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			isEdit: false, // 搜索历史编辑状态
		}
	},
	methods: {
		...mapMutations('searchModel', ['searchTextMu']),

		// 历史记录快捷搜索
		shortcutSearch(str) {
			if (!this.isEdit) {
				this.searchTextMu(str)
				this.$emit('shortcutSearch', str)
			}
		},
	},
}
</script>

<style lang="less">
@search-boundary: 15px;
@search-model-color: #a5a9ac;

div.search-history-container {
	margin-top: 10px;
	.van-cell {
		padding-bottom: unset;
		color: @search-model-color;

		div.delete-text {
			color: @theme-color;
			small {
				color: @search-model-color;
				padding: 0 5px;
			}
		}

		div.delete-icon {
			font-size: 20px;
			color: @search-model-color;
		}
	}

	// 历史记录展示样式
	section {
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding-right: @search-boundary;
		.history-item {
			margin-top: 10px;
			margin-left: @search-boundary;
			padding: 5px 13px;
			background-color: #eef2f5;
			border-radius: 20px;
			font-size: 14px;
			color: @search-model-color;
			position: relative;

			span {
				position: absolute;
				right: -5px;
				top: -3px;
			}
		}
	}
}
</style>