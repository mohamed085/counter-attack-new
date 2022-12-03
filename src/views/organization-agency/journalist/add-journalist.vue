<template>
  <div>
    <div class="items-header">
      <span class="title">إضافة صحفي جديدة</span>
    </div>

    <div class="err" v-if="error">{{ error_message }}</div>

    <div class="success" v-if="success">{{ success_message }}</div>

    <div class="container">
      <b-overlay :show="is_loading" rounded="sm">
        <b-form @submit.prevent="saveJournalist">
          <div class="form-group mt-3">
            <div class="title">الإسم</div>
            <b-form-input v-model="journalist.name" required></b-form-input>
          </div>
          <div class="form-group mt-3">
            <div class="title">الإيميل</div>
            <b-form-input v-model="journalist.email" type="email" required></b-form-input>
          </div>
          <div class="form-group mt-3">
            <div class="title">الرقم السري</div>
            <b-form-input v-model="journalist.password" type="password" required></b-form-input>
          </div>

          <b-button type="submit" variant="success" class="mt-4">إضافة الصحفي</b-button>
        </b-form>
      </b-overlay>

    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "add-journalist",
  data() {
    return {
      is_loading: false,
      error: false,
      error_message: '',
      success: false,
      success_message: '',
      journalist: {
        name: '',
        email: '',
        password: '',
      }
    }
  },
  created() {
    window.scrollTo(0,0);

    if (!this.$store.getters.isAuthenticated || this.$store.getters.role !== this.$store.getters.organizationRole) {
      router.push("/login")
    }
  },
  methods: {
   async saveJournalist() {
     this.is_loading = true;
     this.error = false;

     let token = this.$store.getters.token;
     let myHeaders = new Headers();
     myHeaders.append("Accept", "application/json");
     myHeaders.append("Authorization", "Bearer " + token);

     let formdata = new FormData();
     formdata.append("name", this.journalist.name);
     formdata.append("email", this.journalist.email);
     formdata.append("password", this.journalist.password);

     let requestOptions = {
       method: 'POST',
       headers: myHeaders,
       body: formdata,
       redirect: 'follow'
     };

     let url = this.$store.getters["main/getURL"] + '/api/organization/add-journalist';
     const response = await fetch(url, requestOptions);
     const responseData = await response.json();
     console.log(responseData)

     if (!response.ok || !responseData.status) {
       this.error = true
       this.error_message = "حدث خطأ ما"
     } else {
       this.journalists = responseData.journalists
       this.is_loading = false
     }
   },
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/admin-shared";

.container {
  background: $color-white;
  background-clip: border-box;
  border: 1px solid #deebfd;
  box-shadow: -8px 12px 18px 0 #dadee8;
  padding: 25px 30px;
  margin-bottom: 10px;
}

</style>