<template>
  <div>
    <div class="items-header">
      <span class="title">إضافة حكم جديدة</span>
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

          <b-button type="submit" variant="success" class="mt-4">إضافة حكم</b-button>
        </b-form>
      </b-overlay>

    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "add-ruler",
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

     let formdata = new FormData();
     formdata.append("name", this.journalist.name);
     formdata.append("email", this.journalist.email);
     formdata.append("password", this.journalist.password);

     this.axios
         .post('organization/add-ruler', formdata)
         .then((data) => {
           if (data.data.status == false) {
             if (data.data.msg.email) {
               this.$iziToast.error({
                 timeout: 2000,
                 message: data.data.msg.email[0],
                 position: 'bottomCenter',
               })
             }
             if (data.data.msg.name) {
               this.$iziToast.error({
                 timeout: 2000,
                 message: data.data.msg.name[0],
                 position: 'bottomCenter',
               })
             }
             if (data.data.msg.password) {
               this.$iziToast.error({
                 timeout: 2000,
                 message: data.data.msg.password[0],
                 position: 'bottomCenter',
               })
             }
           } else {
             this.$iziToast.success({
               timeout: 2000,
               message: data.data.msg,
               position: 'bottomCenter',
             })
           }
           this.is_loading = false
           this.$router.push('/rulers')
         })
         .catch(() => {
           this.is_loading = false

           this.error_message = 'حدث خطأ ما'
         })
   },
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/admin-shared';
@import '../../../assets/css/admin-product';

.container {
  background: $color-white;
  background-clip: border-box;
  border: 1px solid #deebfd;
  box-shadow: -8px 12px 18px 0 #dadee8;
  padding: 25px 30px;
  margin-bottom: 10px;
}

</style>