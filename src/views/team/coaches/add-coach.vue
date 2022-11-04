<template>
  <div class="add-container">
    <div class="items-header">
      <span class="title">المدربون</span>
    </div>

    <b-overlay :show="is_loading" rounded="sm">
      <b-form @submit.prevent="addCoach">
        <div class="form-group">
          <div class="title">البريد الالكتروني: </div>
          <b-form-input v-model="coach.email"></b-form-input>
        </div>
        <div class="form-group">
          <div class="title">الرقم السري: </div>
          <b-form-input type="password" v-model="coach.password"></b-form-input>
        </div>
        <div class="form-group">
          <div class="title">الصورة: </div>
          <div class="d-flex flex-column">
            <img class="img" v-if="coach.image_src" :src="coach.image_src">
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
  name: "add-coach",
  data() {
    return {
      is_loading: false,
      coach: {
        email: '',
        password: '',
        image_src: '',
        image_file: '',
      }
    }
  },
  created() {
    window.scrollTo(0,0);

    if (!this.$store.getters.isAuthenticated || this.$store.getters.role !== this.$store.getters.teamRole) {
      router.push("/login")
    }
  },
  methods: {
    addImage(e) {
      this.coach.image_file = e.target.files[0];
      this.$emit('input', this.coach.image_file);
      let reader = new FileReader();
      reader.readAsDataURL(this.coach.image_file);
      reader.onload = e => {
        this.coach.image_src = e.target.result;
      }
    },
    browseImage() {
      this.$refs.imageFile.click();
    },
    async addCoach() {
      this.is_loading = true;
      this.error = false;

      let token = this.$store.getters.token;
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);

      let data = new FormData();
      data.append("email", this.coach.email);
      data.append("password", this.coach.password);
      data.append("image", this.coach.image_file);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
      };

      let url = this.$store.getters["main/getURL"] + '/api/team/add-coach';
      await fetch(url, requestOptions)
          .then(response => response.json())
          .then(response => {
            if (response.status)
              this.$router.push('/coaches')
          })
          .catch(error => console.log('error', error));

      this.is_loading = false

    }
  }

}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/admin-shared";
@import "../../../assets/css/team-shared";

</style>