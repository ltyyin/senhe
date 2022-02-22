<template>
	<div class="channel-edit-container">
		<!-- 频道编辑按钮区 -->
		<div class="channel-edit-title">频道设置</div>
		<van-cell center :border="false">
			<template #title>
				<div class="channel-title">
					我的频道
					<span>点击进入频道</span>
				</div>
			</template>
			<van-button
				type="danger"
				plain
				round
				size="mini"
				@click="$emit('switch-is-edit', !isEdit)"
				>{{ isEdit ? '完成' : '编辑' }}</van-button
			>
		</van-cell>

		<!-- 频道编辑 -->
		<div class="my-channels-wrapper">
			<div
				class="channel"
				:class="{ clearState: isEdit }"
				@click="isUserChannelClick(recommendChannel, -1)"
			>
				<span class="content">推荐</span>
			</div>

			<div
				class="channel"
				v-for="(channel, index) in channels"
				:key="channel.id"
				@click="isUserChannelClick(channel, index)"
			>
				<span class="content">{{ channel.name }}</span>
				<span class="clear-icon" v-if="isEdit">
					<van-icon name="clear" />
				</span>
			</div>
		</div>

		<van-cell center :border="false">
			<template #title>
				<div class="channel-title recommend-title">
					频道推荐
					<span>点击添加频道</span>
				</div>
			</template>
		</van-cell>

		<van-grid :gutter="10" :border="false">
			<van-grid-item
				class="recommend-item"
				v-for="item in recommendChannels"
				:key="item.id"
				:text="item.name"
				icon="add"
				@click="onAdd(item)"
			/>
		</van-grid>
	</div>
</template>

<script>
import { getAllChannel, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapMutations, mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
import { recommendChannel } from '../localData/channels'

export default {
	name: 'ChannelEdit',
	props: {
		channels: {
			type: Array,
			required: true,
		},
		active: {
			type: Number,
			required: true,
		},
		isEdit: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {
			allChannel: [],
		}
	},
	computed: {
		...mapState('loginModel', ['user', 'userInfo']),

		// 推荐频道
		recommendChannel() {
			return recommendChannel()
		},

		// 推荐列表频道
		recommendChannels() {
			return this.allChannel.filter((channel) => {
				return !this.channels.find((item) => {
					return item.id === channel.id
				})
			})
		},
	},
	methods: {
		...mapMutations('loginModel', ['switchShowLogin']),

		async onAdd(channel) {
			this.channels.push(channel)
			// 频道：数据持久化
			if (this.user) {
				try {
					// 登录了，数据存储到线上
					await addUserChannel({
						channelID: channel.id,
					})
				} catch (err) {
					if (err.response.status === 401) {
						this.switchShowLogin(true)
						this.channels.pop(channel)
						return
					}
				}
			} else {
				// 没有登录，数据存储到本地
				// setItem('user-channels', this.channels)
			}
		},

		isUserChannelClick(channel, index) {
			// 如果isEdit为true则表示进入了编辑状态，进行编辑操作
			if (this.isEdit) {
				// 如果删除的是推荐频道，则什么都不做
				if (index === -1) return
				this.deleteChannel(channel, index)
			} else {
				// 否则就是频道的切换
				this.switchChannel(index + 1)
			}
		},

		async deleteChannel(channel, index) {
			//如果删除的是当前激活频道之前的频道
			if (index <= this.active) {
				// 更新激活批到的索引
				this.$emit('update-active', this.active - 1)
			}

			this.channels.splice(index, 1)

			// 频道：数据持久化
			if (this.user) {
				// 登录了，数据存储到线上
				try {
					await deleteUserChannel(channel.id)
				} catch (err) {
					if (err.response.status === 401) {
						this.switchShowLogin(true)
						this.channels.splice(index, 0, channel)
						return
					}
				}
			} else {
				// 没有登录，数据存储到本地
				// setItem('user-channels', this.channels)
			}
		},

		switchChannel(index) {
			// 切换频道
			this.$emit('update-active', index)
			// 关闭弹出层
			this.$emit('close')
		},
	},

	async created() {
		const { data } = await getAllChannel()
		this.allChannel = data
	},
}
</script>

<style lang="less" scoped>
.channel-edit-container {
	// padding-top: 54px;
	/* 顶部频道设置标签样式*/
	.channel-edit-title {
		color: #272829;
		font-weight: bold;
		line-height: 50px;
		border-bottom: 1px solid #efefef;
		text-align: center;
	}

	/* 按钮样式*/
	/deep/ .van-button {
		width: 50px;
	}

	/* 我的频道和频道推荐字体栏中的样式*/
	.channel-title {
		font-size: 16px;
		color: #333;
		span {
			color: #949795;
			font-size: 13px;
		}
	}

	/* 频道推荐标签栏样式*/
	.recommend-title {
		margin-top: 10px;
	}

	.grid-item,
	.recommend-item {
		width: 80px;
		height: 43px;

		/deep/ .van-grid-item__content {
			background-color: #eef2f5;
			border-radius: 5px;
			position: relative;

			.van-grid-item__icon {
				font-size: 17px;
				color: #cbccd0;
				position: absolute;
				top: -5px;
				right: -7px;
			}

			.van-grid-item__text {
				color: #535760;
				font-size: 14px;
				margin: unset;
			}
		}
	}

	.recommend-item {
		/deep/ .van-grid-item__content {
			border: 1px solid #e3e3e3;
			background-color: unset;
			.van-grid-item__text {
				color: #575c63;
			}
		}
	}

	/* 我的频道item中的样式*/
	.my-channels-wrapper {
		display: flex;
		flex-wrap: wrap;
		padding-left: 5px;
		.channel {
			background-color: #eef2f5;
			border-radius: 5px;
			width: 81px;
			height: 43px;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #535760;
			font-size: 15px;
			position: relative;
			margin: 10px 5px 0;

			.clear-icon {
				position: absolute;
				font-size: 19px;
				right: -5px;
				top: -5px;
				.van-icon {
					color: #cbccd0;
				}
			}
		}
		// 清除时的状态
		.clearState {
			opacity: 0.6;
		}
	}
}
</style>