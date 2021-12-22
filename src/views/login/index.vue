<template>
  <div class="login-container"></div>
</template>

<script>
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data() {
    return {}
  },
}
</script>

<style scoped lang="less">
.van-field__button button {
  background-color: #ededed;
  border: none;
  span {
    color: #666666;
  }
}

.login-btn {
  margin-top: 20px;
  padding: 0 10px;
  button {
    background: #6db4fb;
    border: none;
    border-radius: 5px;
  }
}
</style>
