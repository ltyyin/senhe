<template>
  <div class="account-password-input">
    <!-- 账号密码登录 -->
    <van-form
      validate-trigger="onSubmit"
      :show-error="false"
      :show-error-message="false"
      @submit="verifyAccount"
      @failed="onFailed"
    >
      <van-field
        class="account-input"
        v-model="account"
        type="number"
        placeholder="请输入手机号码"
        maxlength="11"
        key="account-input"
        :border="false"
        center
        clearable
        :rules="formRules.mobile"
        @input="watchInput"
      />
      <van-field
        class="password-input"
        v-model="password"
        :type="switchType"
        placeholder="请输入登录密码"
        key="password-input"
        ref="passwordInput"
        :border="false"
        center
        clearable
        @input="watchInput"
      >
        <template #right-icon>
          <i :class="eye" @click="switchEye"></i>
          <span>|</span>忘记密码
        </template>
      </van-field>

      <van-button
        type="primary"
        block
        round
        color="linear-gradient(to right, #0cb8e0, #1eddb4)"
        :disabled="loginBtnUse"
      >
        登录
      </van-button>
    </van-form>
    <div class="change-verify-code" @click="changeVerifyInput">
      短信快捷登录>>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
export default {
  name: 'AccountLoign',
  data() {
    return {
      account: '',
      password: '',
      // 表单验证
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          {
            pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
            message: '请输入正确的手机号',
          },
        ],
      },
      // 密码输入框明文和密文的切换，默认是密文
      switchType: 'password',
      // 明文和密文对应眼睛的切换，默认是闭眼
      eye: 'shequ shequ-yanjing1',
      // 一上来是否不开启登录按钮
      loginBtnUse: true,

      /* 节流 */
      veifyLoginCount: 0,
      veifyLoginTime: null,
    }
  },
  methods: {
    /*   登录按钮事件，发送请求检查账号密码登录按钮事件，发送请求检查账号密码 */
    verifyAccount() {
      this.veifyLoginCount++
      if (this.veifyLoginCount >= 6) {
        this.veifyLoginTime && clearTimeout(this.veifyLoginTime)

        this.$toast({
          message: '操作频繁，请稍后重试',
          position: 'top',
        })

        this.veifyLoginTime = setTimeout(_ => {
          this.veifyLoginCount = 0
        }, 6000)

        return
      }

      login({ phone: this.account, password: this.password })
        .then(status => {
          console.log(status)
          this.$store.commit('loginAbout/setUser', status.data)
          this.$toast.loading({
            overlay: true,
            message: '登录中...',
            forbidClick: true,
            onClose: () => {
              this.$store.commit('loginAbout/showLogin', false)
            },
          })
        })
        .catch(err => {
          this.$toast({
            message: err.response.data.message,
            position: 'top',
          })
        })
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
    // 进行眼睛密码输入框眼睛切换事件
    switchEye() {
      if (this.eye === 'shequ shequ-yanjing1') {
        this.switchType = 'text'
        this.eye = 'shequ shequ-yanjing'
        return
      }
      this.switchType = 'password'
      this.eye = 'shequ shequ-yanjing1'
    },

    changeVerifyInput() {
      this.$store.commit('loginAbout/switchField', true)
      this.account = ''
      this.password = ''
    },

    watchInput() {
      if (this.account.length <= 0 || this.password.length <= 0) {
        this.loginBtnUse = true
        return
      } else if (this.account.length > 0 && this.password.length > 0) {
        this.loginBtnUse = false
        return
      }
    },
  },
}
</script>

<style scoped lang="less">
@getCode-btn-maingTop: 40px;
.account-password-input {
  margin-top: 10px;

  .van-form {
    .account-input,
    .password-input {
      padding-left: 0;
      border-bottom: 1px solid #dddddd;
      margin-top: 20px;
      font-size: 15px;
    }

    /deep/.van-field__right-icon {
      padding-left: 10px;
      padding-right: 0;
      color: #666666;
      font-size: 14px;
      span {
        display: inline;
        margin: 0 5px;
        color: #eaeaea;
      }
    }

    // 获取验证码按钮
    .van-button--primary {
      margin: @getCode-btn-maingTop auto 0 auto;
    }
  }

  // 切换账号密码输入登录字体样式
  .change-verify-code {
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
