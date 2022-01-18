<template>
	<div class="verify-code-input">
		<span class="safety-tips">为了安全，我们会向您的手机发送验证码</span>
		<!-- 验证码输入框提交验证 -->
		<van-form
			validate-trigger="onSubmit"
			:show-error="false"
			:show-error-message="false"
			@submit="onSendSms"
			@failed="onFailed"
		>
			<van-field
				class="phone-num-input"
				v-model="localPhoneNum"
				type="number"
				label="+86"
				placeholder="请输入手机号码"
				maxlength="11"
				:border="false"
				key="phoneNum"
				center
				clearable
				:rules="formRules.mobile"
			/>
			<van-button
				type="primary"
				block
				round
				color="linear-gradient(to right, #0cb8e0, #1eddb4)"
				:disabled="sendBtnUse"
			>
				<template #icon>
					<span>获取验证码</span>
				</template>
			</van-button>
		</van-form>

		<!-- 切换账号密码输入登录 -->
		<div class="change-account-password" @click="changeAccountInput">
			密码登录>>
		</div>
	</div>
</template>

<script>
import { sendSms } from '@/api/user.js'
import { Notify } from 'vant'
import { mapMutations, mapState } from 'vuex'

export default {
	name: 'GetVerifyCode',
	data() {
		return {
			formRules: {
				mobile: [
					{ required: true, message: '请输入手机号' },
					{
						pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
						message: '请输入正确的手机号',
					},
				],
			},

			sendBtnUse: true,

			fetchCountSms: 0,
			fetchSmsTime: null,
			smsPopTime: null,
		}
	},
	computed: {
		...mapState('loginModel', ['phoneNum']),

		localPhoneNum: {
			get() {
				if (this.phoneNum.length === 0) {
					this.sendBtnUse = true
				} else {
					this.sendBtnUse = false
				}

				return this.phoneNum
			},
			set(val) {
				this.switchPhoneNum(val)
			},
		},
	},
	methods: {
		...mapMutations('loginModel', [
			'switchPhoneNum',
			'switchCodeInputFocus',
			'switchVerification',
			'switchField',
		]),

		/*  提交表单验证成功回调函数 */
		async onSendSms() {
			this.fetchSmsTime && clearTimeout(this.fetchSmsTime)
			this.smsPopTime && clearTimeout(this.smsPopTime)

			this.fetchCountSms++
			this.fetchSmsTime = setTimeout(() => {
				this.fetchCountSms = 0
			}, 6000)

			if (this.fetchCountSms >= 5) {
				this.$toast({
					message: '操作频繁，请稍后重试',
					position: 'top',
				})
				return
			}

			this.switchVerification(true)
			this.switchCodeInputFocus(true)

			/* 发送获取验证码请求 */
			try {
				const { data: info } = await sendSms()

				this.smsPopTime = setTimeout(() => {
					/* 这里出现了小问题 */
					this.$emit('smsCode', info.verifyCode)

					Notify({
						message: `欢迎登录森和社区，验证码：${info.verifyCode}`,
						background: '#e3e3e3',
					})
				}, 3000)
			} catch (err) {
				this.$toast({
					message: '获取短信验证码失败',
					position: 'top',
				})
			}
		},

		// 提交表单验证失败回调函数
		onFailed(err) {
			if (err.errors[0]) {
				this.$toast({
					message: err.errors[0].message,
					position: 'top',
				})
			}
		},

		// 切换成密码登录模块
		changeAccountInput() {
			this.switchField(false)
			this.localPhoneNum = ''
		},
	},
}
</script>

<style scoped lang="less">
@getCode-btn-maingTop: 40px;
.verify-code-input {
	margin-top: 10px;
	.safety-tips {
		display: block;
		color: #999999;
		font-size: 13px;
	}

	.van-form {
		// 电话号码输入框样式
		.phone-num-input {
			padding-left: 0;
			border-bottom: 1px solid #dddddd;
			margin-top: 20px;
			font-size: 15px;

			/deep/ .van-cell__title {
				width: fit-content;
				span {
					color: #666666;
				}
			}
		}

		// 获取验证码按钮
		.van-button--primary {
			margin: @getCode-btn-maingTop auto 0 auto;
		}
	}

	// 切换账号密码输入登录字体样式
	.change-account-password {
		font-size: 14px;
		text-align: center;
		margin-top: 25px;
		// color: #5ba3f7;
		color: #1edbb5;
		&:active {
			color: #17c7a4;
		}
	}
}
</style>
