<template>
  <div class="verification-container">
    <van-popup
      v-model="$store.state.loginAbout.showVerification"
      position="right"
      :style="{ width: '100%', height: '100%' }"
      ref="verifyProp"
    >
      <!-- 头部关闭按钮nvabar -->
      <van-nav-bar
        left-arrow
        @click-left="onClickLeft"
        :border="false"
        :fixed="true"
        :safe-area-inset-top="true"
        class="left-arrow"
      />

      <!-- 提示文字 -->
      <div class="text">
        <div>请输入验证码</div>
        <span>短信验证码已经发送至{{ $store.state.loginAbout.phoneNum }}</span>
      </div>

      <!-- 验证码输入框 -->
      <van-password-input
        :value="code"
        :length="4"
        :mask="false"
        :focused="$store.state.loginAbout.codeInputFocus"
        :gutter="30"
        @focus="$store.commit('loginAbout/switchCodeInputFocus', true)"
      />

      <!-- 数字键盘 -->
      <van-number-keyboard
        v-model="code"
        :show="$store.state.loginAbout.codeInputFocus"
        maxlength="4"
        @blur="$store.commit('loginAbout/switchCodeInputFocus', false)"
      />

      <div class="countdown-wrap">
        <div
          class="again-send"
          v-if="$store.state.loginAbout.isCountDownShow"
          @click="againSend"
        >
          重新发送
        </div>
        <div class="countdown" v-else>
          <van-count-down
            ref="countDown"
            :time="1000 * 10"
            format="ss"
            @finish="finish"
          />
          <span>秒后重新发送</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { verifyCode } from '@/api/user.js'
import { sendSms } from '@/api/user.js'
import { Notify } from 'vant'

export default {
  name: 'VerifySms',
  props: {
    smsCode: {
      default: null,
    },
  },
  data() {
    return {
      code: '',
      localSmsCode: this.smsCode,
    }
  },
  computed: {
    phoneNum() {
      return this.$store.loginAbout.phoneNum
    },
  },
  methods: {
    onClickLeft() {
      this.$store.commit('loginAbout/showVerification', false)
      this.code = ''
      // this.$store.commit('loginAbout/switchCountDown', false)
    },

    /* 重新获取验证码 */
    async againSend() {
      this.$store.commit('loginAbout/switchCountDown', false)

      /* 再次获取获取验证码请求 */
      try {
        const info = await sendSms()
        this.localSmsCode = info.data.verifyCode

        setTimeout(() => {
          Notify({
            message: `欢迎登录森和社区，验证码：${info.data.verifyCode}`,
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

    // 输入完验证码后进行验证错误的回调函数
    vefifyError(msg) {
      // this.$store.commit('loginAbout/showVerification', false)
      this.$toast({
        message: msg,
        position: 'top',
      })
      this.code = ''
    },

    // 倒计时结束是调用
    finish() {
      this.$store.commit('loginAbout/switchCountDown', true)
    },
  },
  watch: {
    async code(val) {
      if (val.length >= 4) {
        if (this.$store.state.loginAbout.isCountDownShow) {
          this.vefifyError('验证码已过期')
          return
        }

        if (this.code !== this.localSmsCode) {
          this.$toast({
            message: '请输入有效验证码',
            position: 'top',
          })
          return
        }

        /* 到这一步登录成功 */
        this.$store.commit('loginAbout/showVerification', false)
        this.code = ''
        this.$toast.loading({
          overlay: true,
          message: '登录中...',
          forbidClick: true,
          onClose: () => {
            this.$store.commit('loginAbout/showLogin', false)
            this.$store.commit('loginAbout/switchPhoneNum', '')
          },
        })
      }
    },

    smsCode() {
      this.localSmsCode = this.smsCode
    },
  },

  mounted() {
    this.$nextTick(_ => {
      // setTimeout(() => {
      //   console.log(this.$refs)
      // }, 5000)
    })

    this.$refs.verifyProp.$on('open', () => {
      this.$nextTick(() => {
        this.$refs.countDown && this.$refs.countDown.reset()
      })
    })

    this.$refs.verifyProp.$on('close', () => {
      this.$refs.countDown && this.$refs.countDown.pause()
    })
  },
}
</script>

<style lang="less" scoped>
.verification-container {
  overflow: hidden;
  /deep/ .van-popup {
    .van-nav-bar {
      .van-nav-bar__content {
        height: 60px;
        .van-icon {
          font-size: 24px;
          color: #444444;
        }
      }
    }

    .text {
      margin: 100px 0 0 25px;
      div {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 5px;
      }
      span {
        font-size: 12px;
        color: #adadad;
      }
    }

    .van-password-input {
      padding: 0 10px;
      margin-top: 50px;
      .van-password-input__item {
        border-bottom: 1px solid #d4d4d4;
      }

      .border-color {
        border-bottom: 1px solid red;
      }
    }

    .countdown-wrap {
      margin-top: 15px;
      .countdown,
      .again-send {
        display: flex;
        justify-content: center;
        font-size: 14px;
        color: rgb(138, 138, 138);
        .van-count-down {
          color: red;
          margin-right: 2px;
        }
      }

      .again-send {
        color: #5ba3f7;
        &:active {
          color: rgb(138, 138, 138);
        }
      }
    }
  }
}
</style>
