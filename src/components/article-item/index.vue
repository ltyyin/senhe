<template>
	<van-cell class="article-item" :title="article.title">
		<!-- 文章的标题栏 -->
		<template #title>
			<div class="title van-multi-ellipsis--l2" v-html="highLightShow()"></div>
		</template>

		<!-- 文章的内容和封面展示区 -->
		<template #label>
			<div class="middle-content">
				<div class="left">
					<div class="source">
						<span>{{ article.author }}</span>
						<span>|</span>
						<span>{{ article.pubdate | relativeTime }}</span>
					</div>
					<div class="article van-multi-ellipsis--l2">
						文章的正式内容文章的正式内容文章的正式内容文章的正式内容文章的正式内容文章的正式内容文章的正式内容文章的正式内容文章的正式内容文章的正式内容文章的正式内容文章的正式内容文章的正式内容文章的正式内容文章的正式内容
					</div>
				</div>
				<van-image
					v-if="article.cover"
					class="right"
					fit="cover"
					:src="article.cover"
				/>
			</div>

			<!-- 文章简介中的评论、点赞、分类的展示 -->
			<div class="comment">
				<span>
					<i class="shequ shequ-dianzan"></i>
					{{ article.like_count }}
				</span>
				<span>
					<i class="shequ shequ-pinglun"></i>
					{{ article.comm_count }}
				</span>
				<span>{{ article.category }}</span>
			</div>
		</template>
	</van-cell>
</template>

<script>
export default {
	name: 'ArticleItem',
	props: {
		// 文章
		article: {
			type: Object,
			required: true,
		},
		// 显示关键词高亮的状态
		isHighLight: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		// 针对搜索模块搜索关键词的高亮
		highLightShow() {
			const text = this.article.title
			if (this.isHighLight) {
				const searchText = this.$store.state.searchModel.searchText
				return text.replace(
					new RegExp(searchText, 'ig'),
					`<span style="color:red;">${searchText}</span>`
				)
			} else {
				return text
			}
		},
	},
}
</script>

<style lang="less" scoped>
.article-item {
	margin-top: 8px;

	.title {
		font-size: 16px;
		color: black;
	}

	/deep/ .van-cell__label {
		.middle-content {
			display: flex;
			.left {
				flex: 1;
				margin-right: 10px;
				.source {
					margin-bottom: 5px;

					span {
						color: #808487;

						&:nth-child(2) {
							margin: 0 8px;
							color: #e5e5e5;
						}
					}
				}
				.article {
					font-size: 14px;
					color: #50535d;
					margin-bottom: 8px;
				}
			}
			.right {
				width: 90px;
				height: 60px;
			}
		}
		.comment {
			span {
				&:nth-child(2) {
					margin: 0 15px;
					i {
						font-size: 14px;
						margin-right: 1px;
					}
				}

				&:last-child {
					float: right;
					// margin-right: 10px;
					padding: 0 8px;
					background-color: #f4f4f4;
					border-radius: 2px;
				}
			}
		}
	}
}
</style>