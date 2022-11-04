<template>
  <b-overlay :show="is_loading" rounded="sm" class="items-layout">
    <div class="items-header">
      <span class="title">طلبات الفرق</span>
    </div>

    <div class="err" v-if="error">{{ error_message }}</div>

    <div v-else>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">اسم الفريق</th>
            <th scope="col">اسم المسؤل</th>
            <th scope="col">الايميل الرسمى</th>
            <th scope="col">رقم الجوال</th>
          </tr>
          </thead>
          <tbody v-if="teams.length > 0" class="table-group-divider">
          <tr v-for="team in teams" :key="team.id" @click="view(team.id)">
            <th scope="row">{{ team.id }}</th>
            <td>{{ team.team_name }}</td>
            <td>{{ team.teamleader_name }}</td>
            <td>{{ team.email }}</td>
            <td>{{ team.phone }}</td>
          </tr>
          </tbody>
        </table>
      </div>

      <div v-if="teams.length < 1">
        لايوجد فرق متاحة
      </div>
    </div>

    <!--    <div class="overflow-auto p-5">-->
    <!--      <b-pagination-nav :link-gen="linkGen" :number-of-pages="10" use-router align="right" size="lg"></b-pagination-nav>-->
    <!--    </div>-->

  </b-overlay>
</template>

<script>
import router from "@/router";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "accepted-teams",
  data() {
    return {
      is_loading: false,
      error: false,
      error_message: '',
      teams: []
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

      let url = this.$store.getters["main/getURL"] + '/api/admin/team-requests';
      await fetch(url, requestOptions)
          .then(response => response.json())
          .then(response => {
            if (response.status)
              this.teams = response.data
          })
          .catch(error => console.log('error', error));

      this.is_loading = false

    },
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
    view(id) {
      this.$router.push("/teams-requested/view/" + id);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/admin-shared";



</style>