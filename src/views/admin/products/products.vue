<template>
  <div class="content">
    <div class="items-header">
      <span class="title">المنتجات</span>
      <b-button @click="$router.push('/product/add')" class="add-new-btn">إضافة منتج جديد</b-button>
    </div>

    <b-form @submit.prevent="loadProductsByKey" class="search-container">
      <b-form-input class="search-input" v-b-modal="key" placeholder="ابحث ...." required></b-form-input>
      <b-button type="submit" class="search-btn"><i class="fas fa-search"></i></b-button>
    </b-form>

    <b-overlay :show="is_loading" rounded="sm">
      <div class="row">
        <div class="col-12 col-md-3 product-container" v-for="product in products" :key="product.id">
          <router-link :to="'/product/view/' + product.id" class="product">
            <img class="product-img" :src="product.image">
            <span class="product-name">{{ product.name }}</span>
            <span class="product-price">${{ product.price }}</span>
          </router-link>
        </div>
      </div>

    </b-overlay>
  </div>
</template>

<script>
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
      await fetch(url, requestOptions)
          .then(response => response.json())
          .then(response => {
            if (response.status)
              this.products = response.data
          })
          .catch(error => console.log('error', error));

      this.is_loading = false

    },
    async loadProductsByKey() {
      this.is_loading = true;
      this.error = false;
      this.products = [];

      let token = this.$store.getters.token;
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);

      let formdata = new FormData();
      formdata.append("key", this.key);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      let url = this.$store.getters["main/getURL"] + '/api/admin/search-product';
      await fetch(url, requestOptions)
          .then(response => response.json())
          .then(response => {
            if (response.status)
              this.products = response.data
          })
          .catch(error => console.log('error', error));

      this.is_loading = false

    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/admin-shared";
@import "../../../assets/css/admin-product";

</style>