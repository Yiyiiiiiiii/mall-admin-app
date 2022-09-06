<template>
  <div class="form-container">
    <a-form-model
      ref="productForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item ref="title" label="商品标题" prop="title" required>
        <a-input
          v-model="form.title"
          @blur="
            () => {
              $refs.title.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
        <a-input
          v-model="form.desc"
          type="textarea"
          style="resize: none; outline: none"
        />
      </a-form-model-item>
      <a-form-model-item label="商品类目" prop="category" required>
        <a-select
          v-model="form.category"
          placeholder="请选择商品类目"
          @change="getCategoryItems"
        >
          <a-select-option
            v-for="item in categoryList"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
        <a-select v-model="form.c_item" placeholder="请选择商品子类目">
          <a-select-option v-for="i in categoryItems" :key="i" :value="i">
            {{ i }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item required prop="tags" label="商品标签">
        <a-select mode="tags" placeholder="请选择标签" v-model="form.tags">
          <a-select-option value="包邮，最晚次日达">
            包邮，最晚次日达
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 24 }" style="text-align: center">
        <a-button type="primary" @click="next"> 下一步 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import category from "@/api/category";
export default {
  data() {
    return {
      labelCol: { span: 5 },
      wrapperCol: { span: 13 },
      rules: {},
      categoryList: [],
      categoryItems: [],
    };
  },
  props: ["form"],
  created() {
    category.getCategory().then((res) => {
      this.categoryList = res.data;
    });
  },
  methods: {
    getCategoryItems(category) {
      for (let i = 0; i < this.categoryList.length; i++) {
        if (this.categoryList[i].id === category) {
          this.categoryItems = this.categoryList[i].c_items;
        }
      }
    },
    next() {
      this.$refs.productForm.validate((valid) => {
        if (valid) {
          this.$emit("next", this.form);
          return true;
        } else {
          console.log("失败");
          return false;
        }
      });
    },
  },
};
</script>
