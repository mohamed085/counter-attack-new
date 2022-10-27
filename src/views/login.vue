<template>
  <b-overlay :show="is_loading" rounded="sm" class="login-container">
    <div class="login-form">
      <h2 class="login-title">تسجيل الدخول</h2>
      <div>
        <div class="err" v-if="error">{{ error_message }}</div>
        <b-form-input type="email" class="login-input" v-model="email" placeholder="البريد الالكتروني" required></b-form-input>
        <b-form-input type="password" class="login-input" v-model="password" placeholder="الرقم السري" required></b-form-input>
        <b-button @click="login" class="login-btn">تسجيل الدخول</b-button>
      </div>
    </div>
  </b-overlay>
</template>

<script>
import router from "@/router";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "login",
  data() {
    return {
      is_loading: false,
      error: false,
      error_message: "",
      email: '',
      password: ''
    }
  },
  created() {
    window.scrollTo(0,0);

    if (this.$store.getters.isAuthenticated) {
      router.push("/")
    }
  },
  methods: {
    async login() {
      this.is_loading = true;
      this.error = false;

      let url = this.$store.getters["main/getURL"];

      try {
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
          url: url
        })
        await router.push('/')
      } catch (e) {
        console.log(e)
        this.error = true
        this.error_message = "اسم المستخدم او الرقم السري غير صحيح من فضلك تاكد من البيانات.";
        this.is_loading = false;
      }

    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/login";

</style>