<template>
  <div>
    <div class="err" v-if="error">{{ error_message }}</div>

    <div class="success" v-if="success">{{ success_message }}</div>

    <b-overlay :show="is_loading" rounded="sm">
      <b-form @submit.prevent="editShirt">
        <img class="img" :src="shirt.image">
        <br>
        <input type="file" accept="image/" class="hidden" ref="imageFile" @change="addImage">
        <button type="button" class="add-logo-btn mt-3" @click="browseImage">تعديل الصورة</button>
        <b-button type="submit" class="save-btn">حفظ التعديلات</b-button>
      </b-form>
    </b-overlay>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "edit-accepted-team-shirt",
  data() {
    return {
      is_loading: false,
      error: false,
      error_message: '',
      success: false,
      success_message: '',
      shirt: '',
      image_file: '',
    }
  },
  created() {
    if (!this.$store.getters.isAuthenticated) {
      router.push("/login")
    }
    this.loadShirt(this.$route.params.shirtId)
  },
  methods: {
    addImage(e) {
      this.image_file = e.target.files[0];
      this.$emit('input', this.image_file);
      let reader = new FileReader();
      reader.readAsDataURL(this.image_file);
      reader.onload = e => {
        this.shirt.image = e.target.result;
      }
    },
    browseImage() {
      this.$refs.imageFile.click();
    },
    async loadShirt(id) {
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

      let url;
      if (this.$store.getters.role === this.$store.getters.adminRole)
        url = this.$store.getters["main/getURL"] + '/api/admin/get-tshirt/' + id;
      else if (this.$store.getters.role === this.$store.getters.teamRole)
        url = this.$store.getters["main/getURL"] + '/api/team/get-tshirt/' + id;

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();
      console.log(responseData)

      if (!response.ok || !responseData.status) {
        this.error = true
        this.error_message = "حدث خطأ ما"
      } else {
        this.shirt = responseData.data
        this.is_loading = false
      }
    },
    async editShirt() {
      this.is_loading = true;
      this.error = false;

      let token = this.$store.getters.token;
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);

      let formData = new FormData();
      formData.append("image", this.image_file);
      formData.append("type", this.shirt.type);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow'
      };

      let url;
      if (this.$store.getters.role === this.$store.getters.adminRole)
        url = this.$store.getters["main/getURL"] + '/api/admin/update-team-tshirt/' + this.$route.params.id + '/' + this.shirt.id;
      else if (this.$store.getters.role === this.$store.getters.teamRole)
        url = this.$store.getters["main/getURL"] + '/api/team/update-team-tshirt/' + this.$route.params.id + '/' + this.shirt.id;

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();
      console.log(responseData)

      if (!response.ok || !responseData.status) {
        this.error = true
        this.error_message = "حدث خطأ ما"
      } else {
        this.is_loading = false
        await this.loadShirt(this.$route.params.shirtId);
        this.success = true;
        this.success_message = "تم تعديل الصورة بنجاح"
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/admin-shared";
@import "../../../assets/css/admin-team";

</style>