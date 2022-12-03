<template>
  <b-overlay :show="is_loading" rounded="sm" class="items-layout">
    <div class="items-header">
      <span class="title">الصحفيين</span>
      <b-button @click="$router.push('/journalists/add')" class="add-new-btn">إضافة صحفي جديد</b-button>
    </div>

    <div class="err" v-if="error">{{ error_message }}</div>

    <div>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">الإسم</th>
            <th scope="col">الايميل</th>
            <th scope="col">الرقم السري</th>
          </tr>
          </thead>
          <tbody v-if="journalists.length > 0" class="table-group-divider">
          <tr v-for="journalist in journalists" :key="journalist.id">
            <th scope="row">{{ journalist.id }}</th>
            <td>{{ journalist.name }}</td>
            <td>{{ journalist.email }}</td>
            <td>{{ journalist.password }}</td>
          </tr>
          </tbody>
        </table>
      </div>

      <div v-if="journalists.length < 1">
        لايوجد صحفيين
      </div>
    </div>

  </b-overlay>
</template>

<script>
import router from "@/router";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "journalists",
  data() {
    return {
      is_loading: false,
      error: false,
      error_message: '',
      journalists: [],
      delete_success: false,
      selected_coach: ''
    }
  },
  created() {
    window.scrollTo(0,0);

    if (!this.$store.getters.isAuthenticated || this.$store.getters.role !== this.$store.getters.organizationRole) {
      router.push("/login")
    }
  },
  methods: {
    async loadJournalists() {
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

      let url = this.$store.getters["main/getURL"] + '/api/organization/get-team/';
      const response = await fetch(url, requestOptions);
      const responseData = await response.json();
      console.log(responseData)

      if (!response.ok || !responseData.status) {
        this.error = true
        this.error_message = "حدث خطأ ما"
      } else {
        this.journalists = responseData.data
        this.is_loading = false
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/admin-shared";


</style>