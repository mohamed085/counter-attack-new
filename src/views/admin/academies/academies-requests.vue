<template>
  <div>
    <div class="err" v-if="error">{{ error_message }}</div>

    <b-overlay :show="is_loading" rounded="sm" class="content">

    </b-overlay>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "academies-requests",
  data() {
    return {
      is_loading: false,
      error: false,
      error_message: '',

    }
  },
  created() {
    window.scrollTo(0,0);

    if (!this.$store.getters.isAuthenticated || this.$store.getters.role !== this.$store.getters.adminRole) {
      router.push("/login")
    }
    this.loadAcademies();
  },
  methods: {
    async loadAcademies() {
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

      let url = this.$store.getters["main/getURL"] + '/api/admin/academy-requests';

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (!response.ok || !responseData.status) {
        console.log(response)
        this.error = true
        this.error_message = "حدث خطأ ما"
      } else {
        this.organization_requests = responseData.data
        this.is_loading = false
      }

    },
  }

}
</script>

<style scoped>

</style>