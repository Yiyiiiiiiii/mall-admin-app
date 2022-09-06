<template>
  <div class="list-constainer">
    <Search :data="categoryList" @submit="searchSubmit" />
    <a-button type="primary" class="add-btn">
      <router-link :to="{ name: 'Add' }"> 增加商品 </router-link>
    </a-button>

    <div class="listTable-container">
      <div class="delete-btn">
        <a-button
          type="primary"
          :disabled="!hasSelected"
          :loading="loading"
          @click="deleteSeleted(record)"
        >
          删除
        </a-button>
      </div>
      <a-table
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
        }"
        :columns="columns"
        :data-source="productTable"
      >
        <div slot="operation" slot-scope="text, record">
          <a-button @click="editProduct(record)">编辑</a-button>
          <a-button @click="removeProduct(record)">删除</a-button>
        </div>
      </a-table>
    </div>
  </div>
</template>
<script>
import Search from "@/components/Search.vue";
import category from "@/api/category";
import product from "@/api/product";
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
    ellipsis: true,
  },
  {
    title: "描述",
    dataIndex: "desc",
    key: "desc",
    ellipsis: true,
  },
  {
    title: "类目",
    dataIndex: "categoryName",
    key: "category",
    ellipsis: true,
  },
  {
    title: "预售价格",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "折扣价格",
    dataIndex: "price_off",
    key: "price_off",
  },
  {
    title: "标签",
    dataIndex: "tags",
    key: "tags",
  },
  {
    title: "限制购买数量",
    dataIndex: "inventory",
    key: "inventory",
  },
  {
    title: "上加状态",
    dataIndex: "status",
    key: "status",
    customRender(text, record) {
      return record.status === 1 ? "上架" : "下架";
    },
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    width: 200,
    scopedSlots: { customRender: "operation" },
  },
];

export default {
  data() {
    return {
      categoryList: [],
      formData: {},
      productTable: [],
      columns,
      selectedRowKeys: [],
      loading: false,
      categoryName: {},
      tip: "",
      visible: false,
      confirmLoading: false,
    };
  },
  components: { Search },
  async created() {
    await category.getCategory().then((resp) => {
      this.categoryList = resp.data;
      resp.data.forEach((item) => {
        this.categoryName[item.id] = item;
      });
    });
    this.getProductTable();
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
  },
  methods: {
    searchSubmit(form) {
      this.formData = form;
      this.getProductTable();
    },
    deleteSeleted(record) {
      this.loading = true;
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false;
        this.removeProduct(record);
        this.selectedRowKeys = [];
      }, 1000);
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    getProductTable() {
      product
        .getProductAll({
          ...this.formData,
        })
        .then((res) => {
          this.productTable = res.data.map((item) => ({
            ...item,
            categoryName: this.categoryName[item.category].name,
            key: item.id,
          }));
        });
    },
    editProduct(record) {
      this.$emit("edit", record);
    },
    removeProduct(record) {
      this.$confirm({
        title: "确认删除",
        content: () => (
          <div style="color:red;">
            {`确认删除标题为:${record.title}的商品吗`}
          </div>
        ),
        onOk: () => {
          product
            .removeProduct({
              id: record.id,
            })
            .then(() => {
              this.getProductTable();
              console.log("删除成功");
            });
        },
        onCancel() {
          console.log(id);
          console.log("取消成功");
        },
        class: "confirm-box",
      });
    },
  },
};
</script>
<style lang="less" scoped>
.list-constainer {
  position: relative;
  margin-top: 0;
}
.delete-btn {
  position: absolute;
  right: 552px;
  top: 15px;
}
.add-btn {
  position: absolute;
  right: 65px;
  top: 15px;
}
</style>
