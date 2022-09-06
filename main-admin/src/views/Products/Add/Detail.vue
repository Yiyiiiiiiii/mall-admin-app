<template>
  <div class="detail-container">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item ref="price" label="商品售价" prop="price" required>
        <a-input
          v-model="form.price"
          @blur="
            () => {
              $refs.price.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item label="商品折扣价" prop="price_off">
        <a-input
          v-model="form.price_off"
          type="textarea"
          style="resize: none; outline: none; height: 25px"
        />
      </a-form-model-item>

      <a-form-model-item
        ref="inventory"
        label="商品库存"
        prop="inventory"
        required
      >
        <a-input
          v-model="form.inventory"
          @blur="
            () => {
              $refs.inventory.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item ref="unit" label="计量单位" prop="unit" required>
        <a-input
          v-model="form.unit"
          @blur="
            () => {
              $refs.unit.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item label="商品相册" prop="images">
        <a-upload
          :action="
            'http://mallapi.duyiedu.com/upload/images?appkey=' +
            $store.state.user.user.appkey
          "
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
          name="avatar"
        >
          <div v-if="fileList.length < 8">
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-modal
          :visible="previewVisible"
          :footer="null"
          @cancel="handleCancel"
        >
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submit"> 提交 </a-button>
        <a-button style="margin-left: 10px" @click="prev"> 上一步 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      rules: {},
      previewVisible: false,
      previewImage: "",
      loading: false,
      fileList: [],
    };
  },
  props: ["form"],
  created() {
    if (this.form.images.length > 0) {
      this.fileList = this.form.images.map((item, index) => ({
        uid: index,
        name: `image-${index}.png`,
        status: "done",
        url: item,
      }));
    }
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      const obj = file;
      if (!obj.url && !obj.preview) {
        obj.preview = await getBase64(obj.originFileObj);
      }
      this.previewImage = obj.url || obj.preview;
      this.previewVisible = true;
    },
    handleChange({ file, fileList }) {
      if (file.status === "done") {
        this.form.images.push(file.response.data.url);
      } else if (file.status === "removed") {
        const { url } = file.response.data;
        this.form.images = this.form.images.filter((item) => item !== url);
      }
      this.fileList = fileList;
    },
    submit() {
      this.$refs.productForm.validate((valid) => {
        if (valid) {
          this.$emit("submit", this.form);
          return true;
        } else {
          console.log("失败");
          return false;
        }
      });
    },
    prev() {
      this.$emit("prev");
    },
  },
};
</script>
<style lang="less" scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>