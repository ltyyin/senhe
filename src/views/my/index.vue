<template>
  <div class="my-container">
    <div class="nav-bar-wrap">
      <van-nav-bar
        fixed
        safe-area-inset-top
        :border="false"
        title="我"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <!-- <template #right>
          <van-icon class-prefix="shequ" name="shezhi" size="25" />
        </template> -->
      </van-nav-bar>
    </div>

    <van-cell-group class="login">
      <van-cell title="登录 / 注册" center @click="showLogin">
        <template #icon>
          <van-image round width="50" height="50" src="" fit="cover" />
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="other">
      <van-cell title="消息中心" icon="shop-o" is-link></van-cell>
      <van-cell title="创作中心" icon="shop-o" is-link></van-cell>
      <van-cell title="签到" icon="shop-o" is-link></van-cell>
      <van-cell title="我赞过的" icon="shop-o" is-link></van-cell>
      <van-cell title="收藏集" icon="shop-o" is-link></van-cell>
      <van-cell title="阅读记录" icon="shop-o" is-link></van-cell>
      <van-cell title="标签管理" icon="shop-o" is-link></van-cell>
    </van-cell-group>

    <van-cell-group class="settings">
      <van-cell title="意见反馈" icon="shop-o" is-link></van-cell>
      <van-cell title="设置" icon="shop-o" is-link></van-cell>
    </van-cell-group>

    <div class="subscribe-nav"></div>
  </div>
</template>

<script>
export default {
  name: 'MyIndex',
  data() {
    return {}
  },
  methods: {
    onClickLeft() {},
    onClickRight() {},

    showLogin() {
      this.$store.commit('loginAbout/showLogin', true)
    },
  },
}
</script>

<style scoped lang="less">
// .van-nav-bar {
//   overflow: hidden;
// }

.my-container {
  background-color: #f2f1f6;

  .nav-bar-wrap {
    height: 46.01px;
  }
}

.van-cell-group {
  margin-top: 20px;
}

/* 登录单元格 */
.login {
  .van-cell--center {
    padding: 20px 20px;
    .van-cell__title {
      font-size: 18px;
      margin-left: 20px;
    }
  }
}

/* 其他单元格 */
.other,
.settings {
  padding-top: 2px;
  padding-bottom: 2px;

  .van-cell {
    font-size: 16px;
    padding: 15px;

    .van-cell__title {
      margin-left: 10px;
    }
  }
}
</style>
