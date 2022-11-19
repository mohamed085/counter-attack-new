<template>
  <b-overlay :show="is_loading" rounded="sm" class="items-layout">
    <div class="items-header">
      <span class="title">طلبات انضمام اللاعبين</span>
    </div>

    <div class="err" v-if="error">{{ error_message }}</div>

    <div>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">الصورة</th>
            <th scope="col">الإسم</th>
            <th scope="col">العمر</th>
            <th scope="col">الايميل</th>
          </tr>
          </thead>
          <tbody v-if="players.length > 0" class="table-group-divider">
          <tr v-for="player in players" :key="player.id" @click="view(player.id)">
            <th scope="row">{{ player.id }}</th>
            <td><span v-if="player.user.user_info"><img class="administrator-img" :src="player.user.user_info.image"></span></td>
            <td>{{ player.name }}</td>
            <td>{{ player.age }}</td>
            <td>{{ player.user.email }}</td>
          </tr>
          </tbody>
        </table>
      </div>

      <div v-if="players.length < 1">
        لايوجد طلبات انضمام
      </div>
    </div>


  </b-overlay>
</template>

<script>
import router from "@/router";

export default {
  name: "players-requests",
  data() {
    return {
      is_loading: false,
      error: false,
      error_message: '',
      players: [],
      delete_success: false,
      selected_player: ''
    }
  },
  created() {
    window.scrollTo(0,0);

    if (!this.$store.getters.isAuthenticated || this.$store.getters.role !== this.$store.getters.teamRole) {
      router.push("/login")
    }
    this.loadPlayers();
  },
  methods: {
    async loadPlayers() {
      this.is_loading = true;
      this.error = false;
      this.coach_assistants = [];
      this.$bvModal.hide('delete-model')

      let token = this.$store.getters.token;
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      let url = this.$store.getters["main/getURL"] + '/api/team/get-requstes-join-to-team';
      await fetch(url, requestOptions)
          .then(response => response.json())
          .then(response => {
            if (response.status)
              this.players = response.data
          })
          .catch(error => console.log('error', error));

      this.is_loading = false

    },
    view(id) {
      this.$router.push("/players-requests/view/" + id);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/admin-shared";


</style>