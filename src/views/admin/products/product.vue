<template>
  <b-overlay :show="is_loading" rounded="sm">
    <div class="container product-view">
      <div class="action-btns">
        <router-link class="btn edit-btn" v-b-tooltip.hover title="تعديل بيانات المنتج" :to="'/product/edit/' + product.id">
          <i class="fal fa-edit"></i>
        </router-link>
        <b-button v-b-modal.delete-model v-b-tooltip.hover title="حذف المنتج" class="btn remove-btn">
          <i class="far fa-trash-alt"></i>
        </b-button>
      </div>

      <div>
        <b-modal id="delete-model" title="حذف المنتج" hide-footer>
          <b-overlay v-if="!delete_success" :show="is_loading">
            <div class="d-block">
              <span>هل انت متاكد من حذف المنتج: {{ product.name }}</span>
            </div>
            <div>
              <b-button class="mt-3 ms-2 btn-success" @click="deleteProduct" block>حذف</b-button>
              <b-button class="mt-3 btn-danger" type="reset" block @click="$bvModal.hide('delete-model')">إغلاق</b-button>
            </div>
          </b-overlay>
          <b-overlay v-else-if="delete_success" :show="is_loading">
            <div class="d-block mb-2">
              <span>تم حذف الفريق المنتج</span>
            </div>
            <div>
              <b-button class="mt-3 btn-danger" block @click="$router.push('/products/')">إغلاق</b-button>
            </div>
          </b-overlay>
        </b-modal>
      </div>

      <div class="product-img">
        <img :src="product.image">
      </div>
      <div class="product-details">
        <span class="product-name">{{ product.name }}</span>
        <span class="product-desc">{{ product.description }}</span>
        <span class="product-price">EGP {{ product.price }}</span>
        <span class="product-sizes">
          <span class="me-2 ms-2">المقاس: </span>
          <span v-for="size in product.sizes" :key="size.id">
            <span class="size">{{ size.size }}</span>
          </span>
        </span>
        <span class="product-colors">
          <span class="me-2 ms-2">الالوان: </span>
          <span v-for="color in product.colors" :key="color.id">
            <span class="color">{{ color.color }}</span>
          </span>
        </span>

      </div>
    </div>
  </b-overlay>
</template>

<script>
import router from "@/router";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "product",
  data() {
    return {
      is_loading: false,
      error: false,
      error_message: '',
      delete_success: '',
      product:   {
        "id": 19,
        "name": "تيشرت",
        "description": "تيشرت الجمهور الرسمي",
        "price": "204",
        "image": "https://alahlystore.com.eg/wp-content/uploads/2022/05/NDA02298.jpg",
        "sizes": [
          {
            "id": 37,
            "size": "sm",
            "product_id": "19",
            "created_at": "2022-10-27T16:03:37.000000Z",
            "updated_at": "2022-10-27T16:03:37.000000Z"
          },
          {
            "id": 38,
            "size": "lg",
            "product_id": "19",
            "created_at": "2022-10-27T16:03:37.000000Z",
            "updated_at": "2022-10-27T16:03:37.000000Z"
          }
        ],
        "colors": [
          {
            "id": 51,
            "color": "red",
            "product_id": "19",
            "created_at": "2022-10-27T16:03:37.000000Z",
            "updated_at": "2022-10-27T16:03:37.000000Z"
          },
          {
            "id": 52,
            "color": "green",
            "product_id": "19",
            "created_at": "2022-10-27T16:03:37.000000Z",
            "updated_at": "2022-10-27T16:03:37.000000Z"
          },
          {
            "id": 53,
            "color": "black",
            "product_id": "19",
            "created_at": "2022-10-27T16:03:37.000000Z",
            "updated_at": "2022-10-27T16:03:37.000000Z"
          }
        ]
      },
    }
  },
  created() {
    window.scrollTo(0,0);

    if (!this.$store.getters.isAuthenticated || this.$store.getters.role !== this.$store.getters.adminRole) {
      router.push("/login")
    }
    this.loadProduct(this.$route.params.id)
  },
  methods: {
    async deleteProduct() {
      this.is_loading = true;

      let token = this.$store.getters.token;
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);


      let requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
      };

      let url = this.$store.getters["main/getURL"] + '/api/admin/delete-product/' + this.$route.params.id;
      await fetch(url, requestOptions)
          .then(response => response.json())
          .then(response => {
            if (response.status)
              this.delete_success = true;
          })
          .catch(error => {
            console.log(error)
            this.error_message = "حدث خطأ ما"
          });

      this.is_loading = false
    },
    async loadProduct(id) {
      this.is_loading = true;
      this.error = false;

      let token = this.$store.getters.token;
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
      };

      let url = this.$store.getters["main/getURL"] + '/api/admin/get-product/' + id;
      await fetch(url, requestOptions)
          .then(response => response.json())
          .then(response => {
            if (response.status)
              this.product = response.data
          })
          .catch(error => {
            console.log(error)
            this.error_message = "حدث خطأ ما"
          });

      this.is_loading = false

    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/admin-shared";
@import "../../../assets/css/admin-product";

</style>