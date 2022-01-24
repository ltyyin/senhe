<template>
	<div class="channel-edit">
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

		<van-grid :gutter="10" :border="false">
			<van-grid-item
				class="grid-item"
				:class="{ 'channel-disabled': index === 0 && isEdit }"
				v-for="(channel, index) in channels"
				:key="channel.id"
				:text="channel.name"
				:icon="isEdit && index !== 0 ? 'clear' : ''"
				@click="isUserChannelClick(channel, index)"
			/>
		</van-grid>

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
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'

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

		recommendChannels() {
			const result = this.allChannel.filter((channel) => {
				return !this.channels.find((item) => {
					return item.id === channel.id
				})
			})

			return result
		},
	},
	methods: {
		async onAdd(channel) {
			this.channels.push(channel)

			// 频道：数据持久化
			if (this.user) {
				// 登录了，数据存储到线上
				await addUserChannel({
					channelID: channel.id,
					userID: this.userInfo.userID,
				})
			} else {
				// 没有登录，数据存储到本地
				// setItem('user-channels', this.channels)
			}
		},

		isUserChannelClick(channel, index) {
			// 如果isEdit为true则表示进入了编辑状态，进行编辑操作
			if (this.isEdit) {
				this.deleteChannel(channel, index)
			} else {
				// 否则就是频道的切换
				this.switchChannel(channel, index)
			}
		},

		async deleteChannel(channel, index) {
			// 如果删除的是推荐频道，则什么都不做
			if (index === 0) {
				return
			}

			//如果删除的是当前激活频道之前的频道
			if (index <= this.active) {
				// 更新激活批到的索引
				this.$emit('update-active', this.active - 1)
			}

			this.channels.splice(index, 1)

			// 频道：数据持久化
			if (this.user) {
				// 登录了，数据存储到线上
				await deleteUserChannel({
					channelID: channel.id,
					userID: this.userInfo.userID,
				})
			} else {
				// 没有登录，数据存储到本地
				// setItem('user-channels', this.channels)
			}
		},

		switchChannel(channel, index) {
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
.channel-edit {
	// padding-top: 54px;
	.channel-edit-title {
		color: #272829;
		font-weight: bold;
		line-height: 50px;
		border-bottom: 1px solid #efefef;
		text-align: center;
	}
	.channel-title {
		font-size: 16px;
		color: #333;
		span {
			color: #949795;
			font-size: 13px;
		}
	}
	.recommend-title {
		margin-top: 10px;
	}
	/deep/ .van-button {
		width: 50px;
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

	.channel-disabled {
		/deep/ .van-grid-item__content {
			background-color: #f7f8fa;
			.van-grid-item__text {
				color: #c9cacc;
			}
		}
	}
}
</style>