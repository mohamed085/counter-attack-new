<template>
  <div>
    <div class="err" v-if="error">{{ error_message }}</div>

    <b-overlay :show="is_loading" rounded="sm" class="content edit-team">
      <div v-if="this.$store.getters.role === this.$store.getters.adminRole" class="header">
        <div class="breadcrumb">
          <router-link class="link" to="/teams-accepted">الفرق / </router-link>
          <router-link v-if="!is_loading" class="link" :to="'/teams-accepted/view/' + team.id">{{ team.team_name }}</router-link>
        </div>
      </div>
      <div v-else-if="this.$store.getters.role === this.$store.getters.teamRole" class="header">
        <div class="breadcrumb">
          <router-link v-if="!is_loading" class="link" to="/my-team">فريقي</router-link>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4 col-12 mb-5">
          <b-overlay :show="overview_loading" rounded="sm" class="card team-overview">
            <b-form @submit.prevent="updateTeamOverviewData">
              <div class="main-img">
                <img class="logo-img" :src="logo">
              </div>
              <input type="file" accept="image/" class="hidden" ref="logoFile" @change="addLogo">
              <button class="add-logo-btn" @click="browseLogo">تعديل الصورة</button>
              <div class="team-info">
                <div v-if="!edit_name" class="d-flex justify-content-between align-items-center mt-4">
                  <span class="team-name">{{ team.team_name }}</span>
                  <button @click="edit_name = true" class="edit-btn"><i class="fas fa-pencil"></i></button>
                </div>
                <div v-else class="mt-4">
                  <b-form-input v-model="team.team_name"></b-form-input>
                </div>
                <div v-if="!edit_sub_name" class="d-flex justify-content-between align-items-center mt-2">
                  <span class="team-about">تست</span>
                  <button @click="edit_sub_name = true" class="edit-btn"><i class="fas fa-pencil"></i></button>
                </div>
                <div v-else class="mt-2">
                  <b-form-input value="تست"></b-form-input>
                </div>
              </div>
              <div v-if="!edit_desc" class="team-bio d-flex justify-content-between align-items-sm-start mt-4">
          <span>
            النص ما ازداد وضوحا على الظاهر لمعنى المتكلم، وهو سوق الكلام لأجل ذلك المعنى، فإذا قيل أحسنوا إلى فلان الذي يفرح بفرحي ويغتم بغمي، كان نصا في بيان محبته.
          </span>
                <button @click="edit_desc = true" class="edit-btn"><i class="fas fa-pencil"></i></button>
              </div>
              <div v-else class="mt-3">
                <b-textarea rows="6" value="النص ما ازداد وضوحا على الظاهر لمعنى المتكلم، وهو سوق الكلام لأجل ذلك المعنى، فإذا قيل أحسنوا إلى فلان الذي يفرح بفرحي ويغتم بغمي، كان نصا في بيان محبته."></b-textarea>
              </div>
              <div class="team-statistics row">
                <div class="col-4 item">
                  <span class="statistics-num">{{ team.team_followers }}</span>
                  <span class="statistics-title">متابَعًا</span>
                </div>
                <div class="col-4 item">
                  <span class="statistics-num">1</span>
                  <span class="statistics-title">متابِعًا</span>
                </div>
                <div class="col-4 item">
                  <span class="statistics-num">1</span>
                  <span class="statistics-title">منشور</span>
                </div>
              </div>
              <b-button type="submit" class="save-btn">حفظ التعديلات</b-button>
            </b-form>
          </b-overlay>
        </div>
        <div class="col-md-8 col-12 mb-5">
          <div class="row">
            <div class="col-md-4 col-12 mb-4">
              <div class="status card">
                <div class="icon blue">
                  <i class="blue fas fa-wrench"></i>
                </div>
                <div class="details">
                  <span class="title">تست</span>
                  <span class="num">1,587</span>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-12 mb-4">
              <div class="status card">
                <div class="icon red">
                  <i class="red fas fa-wrench"></i>
                </div>
                <div class="details">
                  <span class="title">تست</span>
                  <span class="num">1,587</span>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-12 mb-4">
              <div class="status card">
                <div class="icon green">
                  <i class="green fas fa-wrench"></i>
                </div>
                <div class="details">
                  <span class="title">تست</span>
                  <span class="num">1,587</span>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-12">
              <div class="card details-container">
                <router-view />
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
  name: "edit-accepted-team",
  data() {
    return {
      active_tab: "about",
      is_loading: false,
      overview_loading: false,
      error: false,
      error_message: '',
      team: '',
      logo_file: null,
      logo: 'https://i.pinimg.com/originals/8f/04/55/8f0455ed68ce4d45007ab7cd232b5e73.png',
      edit_name: false,
      edit_sub_name: false,
      edit_desc: false,
    }
  },
  created() {
    window.scrollTo(0,0);

    if (!this.$store.getters.isAuthenticated ) {
      router.push("/login")
    }

    if (this.$store.getters.role === this.$store.getters.adminRole)
      this.loadTeam(this.$route.params.id)

    if (this.$store.getters.role === this.$store.getters.teamRole)
      this.loadTeamByToken()
  },
  methods: {
    addLogo(e) {
      this.logo_file = e.target.files[0];
      this.$emit('input', this.logo_file);
      let reader = new FileReader();
      reader.readAsDataURL(this.logo_file);
      reader.onload = e => {
        this.logo = e.target.result;
      }
    },
    browseLogo() {
      this.$refs.logoFile.click();
    },
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