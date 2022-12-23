<template>
  <b-overlay :show="is_loading" rounded="sm" class="items-layout">
    <div class="items-header">
      <span class="title">الحكام</span>
      <b-button @click="$router.push('/rulers/add')" class="add-new-btn">إضافة حكم جديد</b-button>
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
          </tr>
          </thead>
          <tbody v-if="rulers.length > 0" class="table-group-divider">
          <tr v-for="ruler in rulers" :key="ruler.id">
            <th scope="row">{{ ruler.id }}</th>
            <td>{{ ruler.name }}</td>
            <td>{{ ruler.email }}</td>
          </tr>
          </tbody>
        </table>
      </div>

      <div v-if="rulers.length < 1">
        لايوجد حكام
      </div>
    </div>

  </b-overlay>
</template>

<script>
import router from "@/router";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "rulers",
  data() {
    return {
      is_loading: false,
      error: false,
      error_message: '',
      rulers: [],
      delete_success: false,
      selected_coach: ''
    }
  },
  created() {
    window.scrollTo(0,0);

    if (!this.$store.getters.isAuthenticated || this.$store.getters.role !== this.$store.getters.organizationRole) {
      router.push("/login")
    }
    this.loadJournalists();
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
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      let url = this.$store.getters["main/getURL"] + '/api/organization/organization-journalists';
      const response = await fetch(url, requestOptions);
      const responseData = await response.json();
      console.log(responseData)

      if (!response.ok || !responseData.status) {
        this.error = true
        this.error_message = "حدث خطأ ما"
      } else {
        this.rulers = responseData.data
        this.is_loading = false
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/admin-shared";


</style>