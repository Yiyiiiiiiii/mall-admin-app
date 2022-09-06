<template>
  <div class="left-menu">
    <a-layout-sider>
      <a-menu
        mode="inline"
        theme="dark"
        :default-selected-keys="[defaultSelectedKeys]"
        :default-open-keys="[defaultOpenKey]"
        :inline-collapsed="$store.state.collapsed"
      >
        <template v-for="route in $store.state.menu.menuRoutes">
          <a-sub-menu v-if="!route.meta.hidden" :key="route.name">
            <span slot="title">
              <a-icon :type="route.meta.icon" />
              <span>{{ route.meta.title }}</span>
            </span>
            <template v-for="child in route.children">
              <a-menu-item v-if="!child.meta.hidden" :key="child.name">
                <router-link :to="{ name: child.name }">
                  <a-icon :type="child.meta.icon" />
                  {{ child.meta.title }}
                </router-link>
              </a-menu-item>
            </template>
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
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
  methods: {},
};
</script>

<style lang="less" scoped>
.ant-layout-sider {
  height: 100%;
}
</style>