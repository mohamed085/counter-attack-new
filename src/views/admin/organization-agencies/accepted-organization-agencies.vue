<template>
  <div>
    <div class="err" v-if="error">{{ error_message }}</div>

    <b-overlay :show="is_loading" rounded="sm" class="items-layout">
      <div class="items-header">
        <span class="title">اللجان المنظمة</span>
      </div>

      <div class="err" v-if="error">{{ error_message }}</div>

      <div>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">اسم البطوله</th>
              <th scope="col">اسم المسؤل</th>
              <th scope="col">الايميل الرسمى</th>
              <th scope="col">رقم الجوال</th>
            </tr>
            </thead>
            <tbody v-if="organization_requests.length > 0" class="table-group-divider">
            <tr v-for="organization_request in organization_requests" :key="organization_request.id" @click="view(organization_request.id)">
              <th scope="row">{{ organization_request.id }}</th>
              <td>{{ organization_request.competition_name }}</td>
              <td>{{ organization_request.head_name }}</td>
              <td>{{ organization_request.email }}</td>
              <td>{{ organization_request.phone }}</td>
            </tr>
            </tbody>
          </table>
        </div>

        <div v-if="organization_requests.length < 1">
          لايوجد لجان المنظمة
        </div>
      </div>

      <!--    <div class="overflow-auto p-5">-->
      <!--      <b-pagination-nav :link-gen="linkGen" :number-of-pages="10" use-router align="right" size="lg"></b-pagination-nav>-->
      <!--    </div>-->

    </b-overlay>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "requested-organization-agencies",
  data() {
    return {
      is_loading: false,
      error: false,
      error_message: '',
      organization_requests: []
    }
  },
  created() {
    window.scrollTo(0,0);

    if (!this.$store.getters.isAuthenticated || this.$store.getters.role !== this.$store.getters.adminRole) {
      router.push("/login")
    }
    this.loadTeams();
  },
  methods: {
    async loadTeams() {
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

      let url = this.$store.getters["main/getURL"] + '/api/auth/accepted-organization-requests';

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
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
    view(id) {
      this.$router.push("/organization-agency-accepted/view/" + id);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/admin-shared";



</style>