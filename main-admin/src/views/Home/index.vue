<template>
  <div class="home-container">
    <a-layout style="min-height: 100vh">
      <LeftMenu></LeftMenu>
      <a-layout-content>
        <Nav></Nav>
        <router-view />
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import LeftMenu from "@/components/Left-menu.vue";
import Nav from "@/components/Nav.vue";
export default {
  data() {
    return {};
  },
  components: { LeftMenu, Nav },
};
</script>

<style>
</style>
