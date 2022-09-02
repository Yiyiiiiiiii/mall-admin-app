<template>
  <div class="nav-container">
    <a-breadcrumb class="breadcrumb">
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>统计</a-breadcrumb-item>
    </a-breadcrumb>
    <a-dropdown>
      <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
        {{ $store.state.user.user.username }} <a-icon type="down" />
      </a>
      <a-menu slot="overlay">
        <a-menu-item>
          <li @click="handleRemove">退出</li>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  methods: {
    handleRemove() {
      this.$store.dispatch("user/fetchUserRemove");
      this.$router.push({
        name: "Login",
      });
    },
  },
};
</script>

<style scoped lang="less">
.nav-container {
  height: 50px;
  width: 100%;
  line-height: 50px;
  background-color: #fff;
  display: table;
  padding: 0 10px;
  .breadcrumb {
    display: table-cell;
    vertical-align: middle;
  }
  .ant-dropdown-link {
    float: right;
  }
}
</style>