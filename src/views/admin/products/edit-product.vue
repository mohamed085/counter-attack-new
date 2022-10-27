<template>
  <b-overlay :show="is_loading" rounded="sm">
    <div class="container product-view edit-product-view">

      <div class="product-img">
        <img :src="product.image">
        <input type="file" accept="image/" class="hidden" ref="imageFile" @change="addImage">
        <button class="add-image-btn" @click="browseImage">تعديل الصورة</button>
      </div>

      <div class="product-details">
        <div v-if="!edit_name" class="edit-container">
          <span class="product-name">{{ product.name }}</span>
          <button @click="edit_name = true" class="edit-btn"><i class="fas fa-pencil"></i></button>
        </div>
        <div v-else>
          <b-form-input class="product-name" v-model="product.name"></b-form-input>
        </div>

        <div v-if="!edit_desc" class="edit-container">
          <span class="product-desc">{{ product.description }}</span>
          <button @click="edit_desc = true" class="edit-btn"><i class="fas fa-pencil"></i></button>
        </div>
        <div v-else>
          <b-form-input class="edit_desc" v-model="product.description"></b-form-input>
        </div>

        <div v-if="!edit_price" class="edit-container">
          <span class="product-price">EGP {{ product.price }}</span>
          <button @click="edit_price = true" class="edit-btn"><i class="fas fa-pencil"></i></button>
        </div>
        <div v-else class="mt-2 d-flex align-items-center">
          <b-form-input class="edit_desc w-25" v-model="product.price"></b-form-input>
          <span class="me-2 ms-2">EGP</span>
        </div>

        <div v-if="!edit_sizes" class="edit-container">
          <span class="product-sizes">
          <span class="me-2 ms-2">المقاس: </span>
          <span v-for="size in product.sizes" :key="size.id">
            <span class="size">{{ size.size }}</span>
          </span>
        </span>
          <button @click="edit_sizes = true" class="edit-btn"><i class="fas fa-pencil"></i></button>
        </div>
        <div v-else class="mt-2 mb-2">
          <div class="d-flex flex-wrap">
            <span v-for="size in sizes" :key="size.id">
              <span class="size"
                    :class="size.active ? 'active' : ''"
                    @click="size.active = !size.active">{{ size.size }}</span>
            </span>
          </div>
        </div>

        <div v-if="!edit_colors" class="edit-container">
          <span class="product-colors">
          <span class="me-2 ms-2">الالوان: </span>
          <span v-for="color in product.colors" :key="color.id">
            <span class="color">{{ color.color }}</span>
          </span>
        </span>
          <button @click="edit_colors = true" class="edit-btn"><i class="fas fa-pencil"></i></button>
        </div>
        <div v-else class="mt-2">
          <div class="color-input" v-for="color in product.colors" :key="color.id">
            <b-form-input v-model="color.color"></b-form-input>
            <i @click="addNewColor" class="fas fa-plus"></i>
            <i v-if="product.colors.length > 1" @click="deleteColorById(color.id)" class="fas fa-times"></i>
          </div>

        </div>

        <button class="save-btn">حفظ التعديلات</button>

      </div>
    </div>
  </b-overlay>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "edit-product",
  data() {
    return {
      is_loading: false,
      error: false,
      error_message: '',
      delete_success: '',
      image_file: null,
      edit_name: false,
      edit_desc: false,
      edit_price: false,
      edit_sizes: false,
      edit_colors: false,
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
      sizes: [
        { active: false, size: 'XS' },
        { active: false, size: 'S' },
        { active: false, size: 'M' },
        { active: false, size: 'L' },
        { active: false, size: 'XL' },
        { active: false, size: '2XL' },
        { active: false, size: '3XL' },
      ]
    }
  },
  created() {
    // this.loadProduct(this.$route.params.id)
  },
  methods: {
    addNewColor() {
      this.product.colors.push({
        id: new Date(),
        color: '',
      });
    },
    deleteColorById(id) {
      let i = this.product.colors.map(item => item.id).indexOf(id) // find index of your object
      this.product.colors.splice(i, 1)
    },
    addImage(e) {
      this.image_file = e.target.files[0];
      this.$emit('input', this.image_file);
      let reader = new FileReader();
      reader.readAsDataURL(this.image_file);
      reader.onload = e => {
        this.product.image = e.target.result;
      }
    },
    browseImage() {
      this.$refs.imageFile.click();
    },
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
          .catch(error => console.log('error', error));

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