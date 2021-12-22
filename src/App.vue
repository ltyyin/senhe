<template>
  <div id="app">
    <!-- 路由出口 -->
    <router-view></router-view>

    <!-- 登录弹出框 -->
    <Login></Login>
  </div>
</template>

<script>
import Login from '@/components/login/Index.vue'
export default {
  name: 'App',
  data() {
    return {}
  },
  computed: {},
  methods: {},
  components: { Login },
}
</script>

<style lang="less">
.test {
  width: 300px;
  height: 100px;
  background: skyblue;
}
</style>
