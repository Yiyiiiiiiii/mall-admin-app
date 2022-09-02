<template>
  <div class="left-menu">
    <a-layout-sider v-model="collapsed" collapsible>
      <a-menu
        theme="dark"
        :default-selected-keys="[defaultSelectedKeys]"
        :default-open-keys="[defaultOpenKey]"
        mode="inline"
      >
        <a-sub-menu key="menu1">
          <span slot="title"><a-icon type="home" /><span>首页</span></span>
          <a-menu-item
            :key="$store.state.menu.menuRoutes.name"
            @click="hadnleCharts"
            ><a-icon type="area-chart" /> 统计</a-menu-item
          >
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="shop" /><span>商品</span></span>
          <a-menu-item
            :key="$store.state.menu.menuRoutes.name"
            @click="handleList"
          >
            <a-icon type="unordered-list" />商品列表
          </a-menu-item>
          <a-menu-item
            :key="$store.state.menu.menuRoutes.name"
            @click="handleAdd"
            ><a-icon type="file-add" /> 添加商品</a-menu-item
          >
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
  created() {
    const resp = this.$route;
    this.$store.dispatch("menu/fetchMenuRoutes", resp);
  },
  computed: {
    defaultSelectedKeys: {
      get() {
        return this.$router.currentRoute.matched[1]
          ? this.$router.currentRoute.matched[1].name
          : "";
      },
    },
    defaultOpenKey: {
      get() {
        return this.$router.currentRoute.matched[0].name;
      },
    },
  },
  methods: {
    hadnleCharts() {
      this.$router.push({
        name: "Charts",
      });
    },
    handleList() {
      this.$router.push({
        name: "List",
      });
    },
    handleAdd() {
      this.$router.push({
        name: "Add",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.ant-layout-sider {
  height: 100%;
}
</style>