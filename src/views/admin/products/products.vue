<template>
  <div class="content">
    <div class="items-header">
      <span class="title">المنتجات</span>
      <b-button @click="$router.push('/product/add')" class="add-new-btn">إضافة منتج جديد</b-button>
    </div>

    <div class="err" v-if="error">{{ error_message }}</div>

    <b-overlay :show="is_loading" rounded="sm">
      <b-form @submit.prevent="loadProductsByKey" class="search-container">
        <b-form-input class="search-input" v-model="key" placeholder="ابحث ...." required></b-form-input>
        <b-button type="submit" class="search-btn"><i class="fas fa-search"></i></b-button>
      </b-form>

      <div class="row">
        <div class="col-12 col-md-4 product-container" v-for="product in products" :key="product.id">
          <router-link :to="'/product/view/' + product.id" class="product">
            <img class="product-img" :src="product.image">
            <span class="product-name text-center">{{ product.name }}</span>
            <span class="product-price">${{ product.price }}</span>
          </router-link>
        </div>
      </div>

    </b-overlay>
  </div>
</template>

<script>
import router from "@/router";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "products",
  data() {
    return {
      is_loading: false,
      error: false,
      error_message: '',
      key: '',
      products: []
    }
  },
  created() {
    window.scrollTo(0,0);

    if (!this.$store.getters.isAuthenticated || this.$store.getters.role !== this.$store.getters.adminRole) {
      router.push("/login")
    }
    this.loadProducts();
  },
  methods: {
    async loadProducts() {
      this.is_loading = true;
      this.error = false;

      let token = this.$store.getters.token;
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      let url = this.$store.getters["main/getURL"] + '/api/admin/all-products';

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (!response.ok || !responseData.status) {
        console.log(responseData)
        this.is_loading = true;
        this.error = true
        this.error_message = "حدث خطأ ما"
      } else {
        this.products = responseData.data
        this.is_loading = false;
      }
    },
    async loadProductsByKey() {
      this.is_loading = true;
      this.error = false;
      this.products = [];

      let token = this.$store.getters.token;
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);

      let formData = new FormData();
      formData.append("key", this.key);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow'
      };

      let url = this.$store.getters["main/getURL"] + '/api/auth/search-product';

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (!response.ok || !responseData.status) {
        console.log(responseData)
        this.is_loading = true;
        this.error = true
        this.error_message = "حدث خطأ ما"
      } else {
        this.products = responseData.data
        this.is_loading = false;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/admin-shared";
@import "../../../assets/css/admin-product";

</style>