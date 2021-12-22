<template>
  <div class="layout-container">
    <!-- 子路由 -->
    <div class="showRoute">
      <router-view></router-view>
    </div>

    <!-- 底部导航栏 -->
    <div class="bottom-bar">
      <van-tabbar v-model="active" route>
        <van-tabbar-item to="/" icon-prefix="shequ" icon="shouye">
          首页
        </van-tabbar-item>
        <van-tabbar-item to="/qa" icon-prefix="shequ" icon="wenda">
          问答
        </van-tabbar-item>
        <!-- <van-tabbar-item to="/video" icon-prefix="shequ" icon="shipin">
        视屏
      </van-tabbar-item> -->
        <van-tabbar-item to="/my" icon-prefix="shequ" icon="wode">
          我的
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  components: {},
  props: {},
  data() {
    return { active: 0 }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="less">
.layout-container {
  .showRoute {
    // height: 79vh;
    overflow: auto;
  }

  .bottom-bar {
    height: 45px;
  }
}
</style>
