<template>
	<van-cell class="article-item" :title="article.title">
		<template #title>
			<div class="title van-multi-ellipsis--l2">
				{{ article.title }}
			</div>
		</template>
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
				<!-- <div class="right"></div> -->
				<van-image
					v-if="article.cover"
					class="right"
					fit="cover"
					:src="article.cover"
				/>
			</div>

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
		article: {
			type: Object,
			required: true,
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