<template>
  <div class="add-container">
    <div class="step-head">
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
    </div>
    <div class="steps-content">
      <Form v-if="current === 0" :form="form" @next="next"></Form>
      <Detail
        v-else-if="current === 1"
        :form="form"
        @prev="prev"
        @submit="submit"
      />
    </div>
  </div>
</template>
<script>
import Form from "./Form";
import Detail from "./Detail";
import product from "@/api/product";

export default {
  data() {
    return {
      current: 0,
      steps: [
        {
          title: "填写商品基本信息",
        },
        {
          title: "填写商品销售信息",
        },
      ],
      form: {
        title: "",
        desc: "",
        category: "",
        c_items: [],
        tags: [],
        price: 0,
        price_off: 0,
        unit: "",
        inventory: 0,
        images: [],
      },
    };
  },
  created() {
    const id = this.$route.params.id;
    product.getProductDetail(id).then((res) => {
      this.form = res;
    });
  },
  methods: {
    next() {
      this.current++;
    },
    prev() {
      this.current--;
    },
    submit(form) {
      this.form = {
        ...this.form,
        form,
      };
      if (this.current === 1) {
        if (this.$route.params.id) {
          product.editPorduct(this.form).then(() => {
            this.$router.push({
              name: "List",
            });
          });
        } else {
          product.addProduct(this.form).then(() => {
            this.$router.push({ name: "List" });
          });
        }
      }
    },
  },
  components: { Form, Detail },
};
</script>
<style lang="less" scoped>
.add-container {
  margin: 10px;
  .step-head {
    padding: 10px;
    width: 660px;
    margin: 0 auto;
  }

  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }
}
</style>

