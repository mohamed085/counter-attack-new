<template>
  <div class="add-container">
    <div class="items-header">
      <span class="title">المنتجات</span>
    </div>

    <b-overlay :show="is_loading" rounded="sm">
      <b-form @submit.prevent="addProduct">
        <div class="form-group">
          <div class="title">إسم المنتج: </div>
          <b-form-input v-model="product.name"></b-form-input>
        </div>
        <div class="form-group">
          <div class="title">وصف المنتج: </div>
          <b-form-input v-model="product.description"></b-form-input>
        </div>
        <div class="form-group">
          <div class="title">سعر المنتج: </div>
          <b-form-input type="number" v-model="product.price"></b-form-input>
        </div>
        <div class="form-group">
          <div class="title">مقاسات المنتج المتوفرة: </div>
          <div class="d-flex flex-wrap">
            <span v-for="size in sizes" :key="size.id">
              <span class="size"
                    :class="size.active ? 'active' : ''"
                    @click="size.active = !size.active">{{ size.size }}</span>
            </span>
          </div>
        </div>
        <div class="form-group">
          <div class="title">الوان المنتج المتاحه: </div>
          <div class="d-flex flex-column w-100">
            <div class="color-input" v-for="color in product.colors" :key="color.id">
              <b-form-input v-model="color.color"></b-form-input>
              <i @click="addNewColor" class="fas fa-plus"></i>
              <i v-if="product.colors.length > 1" @click="deleteColorById(color.id)" class="fas fa-times"></i>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="title">إضافة صوره المنتج: </div>
          <div class="d-flex flex-column">
            <img class="img" v-if="product.image_src" :src="product.image_src">
            <input type="file" accept="image/" class="hidden" ref="imageFile" @change="addImage">
            <button type="button" class="add-image-btn" @click="browseImage">أختار الصورة</button>
          </div>
        </div>
        <b-button type="submit" class="save-btn">حفظ التعديلات</b-button>
      </b-form>
    </b-overlay>

  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "add-product",
  data() {
    return {
      is_loading: false,
      product: {
        name: "",
        description: "",
        price: "",
        image: "",
        image_src: '',
        colors: [{id: new Date(), color: ''}],
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
    window.scrollTo(0,0);

    if (!this.$store.getters.isAuthenticated || this.$store.getters.role !== this.$store.getters.adminRole) {
      router.push("/login")
    }
  },
  methods: {
    addNewColor() {
      this.product.colors.push({id: new Date(), color: ''});
    },
    deleteColorById(id) {
      let i = this.product.colors.map(item => item.id).indexOf(id) // find index of your object
      this.product.colors.splice(i, 1)
    },
    addImage(e) {
      this.product.image = e.target.files[0];
      this.$emit('input', this.product.image);
      let reader = new FileReader();
      reader.readAsDataURL(this.product.image);
      reader.onload = e => {
        this.product.image_src = e.target.result;
      }
    },
    browseImage() {
      this.$refs.imageFile.click();
    },
    async addProduct() {
      this.is_loading = true;
      this.error = false;

      let token = this.$store.getters.token;
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);

      let data = new FormData();
      data.append("name", this.product.name);
      data.append("description", this.product.description);
      data.append("price", this.product.price);
      data.append("image", this.product.image);
      this.product.colors.forEach((value, index) => {
        data.append("colors[" + index + "]", value.color);
      })
      this.sizes.forEach((value, index) => {
        if (value.active === true) {
          data.append("sizes[" + index + "]", value.size);
        }
      })

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
      };

      let url = this.$store.getters["main/getURL"] + '/api/admin/add-product';
      await fetch(url, requestOptions)
          .then(response => response.json())
          .then(response => {
            if (response.status)
              this.$router.push('/product/view/' + response.data.id)
          })
          .catch(error => {
            console.log(error)
            this.error_message = "حدث خطأ ما"
          });

      this.is_loading = false

    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/admin-shared";
@import "../../../assets/css/admin-product";

</style>