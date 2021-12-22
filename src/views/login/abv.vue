<template>
  <!-- 登录bar -->
  <van-nav-bar
    safe-area-inset-top
    title="登录"
    left-arrow
    @click-left="$router.back()"
  />

  <!-- 输入框 -->
  <van-cell-group>
    <van-field
      v-model="value1"
      clearable
      placeholder="请输入手机号"
      icon-prefix="shequ"
      left-icon="shouji"
      type="number"
    />
    <van-field
      v-model="value2"
      clearable
      placeholder="请输入验证码"
      icon-prefix="shequ"
      left-icon="yanzhengma"
      type="number"
    >
      <template #button>
        <van-button size="small" type="primary">
          发送验证码
        </van-button>
      </template>
    </van-field>
  </van-cell-group>

  <!-- 登录按钮 -->
  <div class="login-btn">
    <van-button type="primary" block @click="show = true">
      登录
    </van-button>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
