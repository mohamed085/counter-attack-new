<template>
  <div>
    <div class="err" v-if="error">{{ error_message }}</div>

    <b-overlay :show="is_loading" rounded="sm">
      <div class="tabs-menu-lg">
                <span :class="(active_tab === 'about') ? 'active' : ''"
                      @click="active_tab = 'about'" class="tab">عن الفريق</span>
        <span :class="(active_tab === 'manger') ? 'active' : ''"
              @click="active_tab = 'manger'" class="tab">المسئول</span>
        <span :class="(active_tab === 'team') ? 'active' : ''"
              @click="active_tab = 'team'" class="tab">الفريق</span>
        <span :class="(active_tab === 'championships') ? 'active' : ''"
              @click="active_tab = 'championships'" class="tab">البطولات</span>
        <span :class="(active_tab === 'awards') ? 'active' : ''"
              @click="active_tab = 'awards'" class="tab">الجوائز</span>
        <span :class="(active_tab === 'financial_issues') ? 'active' : ''"
              @click="active_tab = 'financial_issues'" class="tab">الامور المالية</span>
      </div>
      <div class="tabs-menu-sm">
        <b-form-select v-model="active_tab" dir="rtl" lang="AR" class="mb-3">
          <b-form-select-option value="about">عن الفريق</b-form-select-option>
          <b-form-select-option value="manger">المسئول</b-form-select-option>
          <b-form-select-option value="team">الفريق</b-form-select-option>
          <b-form-select-option value="championships">البطولات</b-form-select-option>
          <b-form-select-option value="awards">الجوائز</b-form-select-option>
          <b-form-select-option value="financial_issues">الامور المالية</b-form-select-option>
        </b-form-select>

      </div>
      <div class="content">
        <div class="about" v-if="active_tab === 'about'">
          <b-form>
            <b-form-group class="mb-4" label="المقر:">
              <b-form-input v-model="team.lat"></b-form-input>
            </b-form-group>
            <b-form-group class="mb-4" label="متوفر اداوات رياضية:">
              <b-form-select v-model="team.sport_tool" class="w-100">
                <b-form-select-option value="1">نعم</b-form-select-option>
                <b-form-select-option value="0">لا</b-form-select-option>
              </b-form-select>
            </b-form-group>
            <b-form-group class="mb-4" label="لون التيشيرت الاساسي:">
              <div class="row">
                <div class="col-12 col-md-6" v-for="shirt in team.team_tshirts" :key="shirt.id">
                  <div class="team-shirt-container" v-if="shirt.type === 'home'">
                    <router-link :to="'/teams-accepted/edit/' + team.id + '/shirt/' + shirt.id" class="edit-btn"><i class="fas fa-pencil"></i></router-link>
                    <img class="team-shirt" :src="shirt.image">
                  </div>
                </div>
              </div>
            </b-form-group>
            <b-form-group class="mb-4" label="لون التيشيرت الاحتياطى:">
              <div class="row">
                <div class="col-12 col-md-6" v-for="shirt in team.team_tshirts" :key="shirt.id">
                  <div class="team-shirt-container" v-if="shirt.type === 'away'">
                    <router-link :to="'/teams-accepted/edit/' + team.id + '/shirt/' + shirt.id" class="edit-btn"><i class="fas fa-pencil"></i></router-link>
                    <img class="team-shirt" :src="shirt.image">
                  </div>
                </div>
              </div>
            </b-form-group>
            <b-button class="save-btn">حفظ التعديلات</b-button>

          </b-form>
        </div>
        <div class="manger" v-if="active_tab === 'manger'">
          <b-form>
            <b-form-group class="mb-4" label="الإسم:">
              <b-form-input v-model="team.teamleader_name"></b-form-input>
            </b-form-group>
            <b-form-group class="mb-4" label="رقم الجوال:">
              <b-form-input v-model="team.phone"></b-form-input>
            </b-form-group>
            <b-form-group class="mb-4" label="البريد الالكتروني:">
              <b-form-input v-model="team.email"></b-form-input>
            </b-form-group>
            <b-button class="save-btn">حفظ التعديلات</b-button>
          </b-form>
        </div>
        <div class="team" v-if="active_tab === 'team'">
          <div class="add-player-container">
            <router-link class="add-player" :to="'/teams-accepted/edit/' + team.id + '/add-player'">أضف لاعب جديد</router-link>
          </div>
          <div class="row">
            <div class="col-md-4 col-12 mb-4" v-for="player in team.team_players" :key="player.id">
              <div class="player">
                <router-link :to="'/teams-accepted/edit/' + team.id + '/player/' + player.id" class="edit-btn"><i class="fas fa-pencil"></i></router-link>
                <img class="player-img" :src="player.image">
                <span class="player-num">{{ player.number }}</span>
                <span class="player-name">{{ player.name }}</span>
                <span class="player-status" v-if="player.type === 'main'">لاعب اساسي</span>
                <span class="player-status" v-else-if="player.type === 'alt'">إحتياطي</span>
                <span class="player-status" v-else-if="player.type === 'goalkeeper'">حارس مرمي</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "edit-accepted-team-main",
  data() {
    return {
      active_tab: "about",
      is_loading: false,
      error: false,
      error_message: '',
      team: '',
    }
  },
  created() {
    window.scrollTo(0,0);

    if (!this.$store.getters.isAuthenticated) {
      router.push("/login")
    }
    if (this.$store.getters.role === this.$store.getters.adminRole)
      this.loadTeam(this.$route.params.id)

    if (this.$store.getters.role === this.$store.getters.teamRole)
      this.loadTeamByToken()
  },
  methods: {
    deletePlayer(playerId) {
      console.log(playerId)
    },
    async loadTeamByToken() {
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

      let url = this.$store.getters["main/getURL"] + '/api/team/get-team-by-token';
      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (!response.ok || !responseData.status) {
        console.log(responseData)
        this.error = true
        this.error_message = "حدث خطأ ما"
      } else {
        this.team = responseData.data
        this.is_loading = false
      }
    },
    async loadTeam(id) {
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

      let url = this.$store.getters["main/getURL"] + '/api/admin/get-team/' + id;

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (!response.ok || !responseData.status) {
        console.log(responseData)
        this.error = true
        this.error_message = "حدث خطأ ما"
      } else {
        this.team = responseData.data
        this.is_loading = false
      }
    },
    async updateTeamOverviewData() {
      this.overview_loading = true;
      this.error = false;

      let token = this.$store.getters.token;
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);

      let data = new FormData();
      data.append("team_name", this.team.team_name);
      data.append("teamleader_name", this.team.teamleader_name);
      data.append("phone", this.team.phone);
      data.append("sport_tool", this.team.sport_tool);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
      };

      let url = this.$store.getters["main/getURL"] + '/api/admin/update-team-info/' + this.team.id;
      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (!response.ok || !responseData.status) {
        console.log(responseData)
        this.is_loading = true;
        this.error = true
        this.error_message = "حدث خطأ ما"
      } else {
        this.overview_loading = false
        await this.loadTeam(this.$route.params.id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/admin-shared";
@import "../../../assets/css/admin-team";

</style>