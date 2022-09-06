<template>
  <div class="search-box">
    <a-form-model
      layout="inline"
      :model="FormData"
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <a-form-model-item>
        <span>检索关键字：</span>
        <a-input
          v-model="FormData.c_name"
          style="width: 200px"
          placeholder="请输入关键字"
        >
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <span>商品类目：</span>
        <a-select
          show-search
          placeholder="请选择商品类目"
          style="width: 200px"
          @change="handleChange"
          allowClear
        >
          <a-select-option v-for="item in data" :key="item.id" :value="item.id"
            >{{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" html-type="submit"> 搜索 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
export default {
  data() {
    return {
      FormData: {
        c_name: "",
        category: "",
      },
    };
  },
  props: ["data"],
  methods: {
    handleSubmit() {
      this.$emit("submit", this.FormData);
    },
    handleChange(val) {
      this.FormData.category = val;
    },
  },
};
</script>
<style lang="less" scoped>
.search-box {
  padding: 10px 30px;
}
</style>