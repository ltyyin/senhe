<template>
  <div class="login-container">
    <van-popup
      v-model="$store.state.loginAbout.showLogin"
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
      :close-on-click-overlay="false"
      ref="popup"
      @closed="changePhoneInput"
    >
      <!-- 头部关闭按钮nvabar -->
      <van-nav-bar
        fixed
        safe-area-inset-top
        right-text="新人注册"
        :border="false"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template #left>
          <i
            :style="{ fontSize: '18px', color: '#444444' }"
            class="shequ shequ-guanbi"
          ></i>
        </template>
      </van-nav-bar>

      <!-- 主要内容 -->
      <main class="main-content-wrap">
        <div class="main-content">
          <div class="welcome-title">欢迎登录森和<i class="shequ shequ-shequ"></i></div>
          <!-- 输入手机号获取验证码输入模块 -->
          <GetVerifyCode
            v-if="$store.state.loginAbout.displayField"
            @smsCode="smsCode = $event"
          />
          <AccountLoign v-else />
        </div>
      </main>

      <!-- 第三方登录 -->
      <div class="third-party-login">
        <van-divider>
          第三方登录
        </van-divider>
        <div class="wechat" @click="weChat">
          <i class="shequ shequ-wechat-"></i>
        </div>
        <p class="agreement">
          首次登录会自动创建新账号<br />且代表同意
          <span>《隐私政策》</span>
        </p>
      </div>

      <!-- 弹出验证码输入框 -->
      <VerifySms :smsCode="smsCode" />
    </van-popup>
  </div>
</template>

<script>
import GetVerifyCode from '@/components/login/GetVerifyCode.vue'
import AccountLoign from '@/components/login/AccountLogin.vue'

import VerifySms from '@/components/login/VerifySms.vue'
export default {
  name: 'LoginIndex',
  data() {
    return {
      smsCode: null,
    }
  },
  components: {
    GetVerifyCode,
    AccountLoign,
    VerifySms,
  },
  methods: {
    onClickLeft() {
      this.$store.commit('loginAbout/switchPhoneNum', '')
      this.$store.commit('loginAbout/showLogin', false)
    },

    async onClickRight() {
      try {
        console.log('新人注册')
      } catch (e) {
        console.log(e)
      }
    },

    changePhoneInput() {
      this.$store.commit('loginAbout/switchField', true)
    },

    /* 第三方微信登录 */
    weChat() {
      this.$toast({
        message: '敬请期待',
        position: 'top',
      })
    },
  },
}
</script>

<style scoped lang="less">
@content-distance-from-top: 100px;
@main-content-width: 88%;
@third-party-login-width: 300px;
.van-popup--bottom {
  // 登录页面的关闭和新人注册按钮表
  /deep/ .van-nav-bar {
    .van-nav-bar__content {
      height: 60px;
    }
    .van-nav-bar__text {
      font-size: 18px;
      color: #444444;
    }
  }

  .main-content-wrap {
    margin-top: @content-distance-from-top;
    .main-content {
      width: @main-content-width;
      margin: 0 auto;
      // 欢迎标题字体调整
      .welcome-title {
        font-size: 22px;
        font-weight: bold;
        color: #333333;
        letter-spacing: 2px;

        .shequ-shequ {
          color: #1eddb2;
          font-size: 40px;
        }
      }
    }
  }

  // 第三方登录样式
  .third-party-login {
    position: absolute;
    top: 480px;
    left: 50%;
    transform: translateX(-50%);
    width: @third-party-login-width;
    user-select: none;

    .wechat {
      width: 50px;
      height: $width;
      border: 1px solid #e2e2e2;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      margin: 0 auto;
      i {
        // color: #73c44e;
        color: #1fddb3;
        font-size: 25px;
      }
      &:active {
        border: 1px solid #f9f9f9;
        i {
          // color: #e0f3d9;
          color: #12a786;
        }
      }
    }
    .agreement {
      text-align: center;
      font-size: 12px;
      margin-top: 20px;
      color: #9c9c9c;
      span {
        color: #5fa5f7;
      }
    }
  }
}
</style>
