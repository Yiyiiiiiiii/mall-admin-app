<template>
  <div class="left-menu">
    <a-layout-sider v-model="collapsed" collapsible>
      <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="user" /><span>首页</span></span>
          <a-menu-item key="3"> 统计</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="team" /><span>商品</span></span>
          <a-menu-item key="6"> 商品列表 </a-menu-item>
          <a-menu-item key="8"> 添加商品</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
  </div>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>

<style lang="less" scoped>
.ant-layout-sider {
  height: 100%;
}
</style>