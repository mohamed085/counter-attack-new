<template>
  <div>
    <div class="err" v-if="error">{{ error_message }}</div>

    <b-overlay :show="is_loading" rounded="sm" class="content">
      <div class="header">
        <div class="breadcrumb">
          <span v-if="!is_loading" class="active">فريقي</span>
        </div>
        <div v-if="!is_loading" class="action-btns">
          <router-link class="btn edit-btn" v-b-tooltip.hover title="تعديل بيانات الفريق" :to="'/teams-accepted/edit/' + team.id">
            <i class="fal fa-edit"></i>
          </router-link>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4 col-12 mb-5">
          <div class="card team-overview">
            <div class="main-img">
              <img class="logo-img" v-if="team.logo == null || team.logo === ''" src="../../assets/img/default-team-logo.png">
              <img class="logo-img" v-else :src="team.logo">
            </div>
            <div class="team-info">
              <span class="team-name">{{ team.team_name }}</span>
              <span class="team-about">تست</span>
            </div>
            <div class="team-bio">
            <span>
              النص ما ازداد وضوحا على الظاهر لمعنى المتكلم، وهو سوق الكلام لأجل ذلك المعنى، فإذا قيل أحسنوا إلى فلان الذي يفرح بفرحي ويغتم بغمي، كان نصا في بيان محبته.
            </span>
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
          </div>
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
                    <b-form-group class="mb-4" label="المقر:">
                      <b-form-input disabled v-model="team.lat"></b-form-input>
                    </b-form-group>
                    <b-form-group class="mb-4" label="متوفر اداوات رياضية:">
                      <span v-if="team.sport_tool == 1">نعم</span>
                      <span v-if="team.sport_tool == 0">لا</span>
                    </b-form-group>
                    <b-form-group class="mb-4" label="لون التيشيرت الاساسي:">
                      <div class="row">
                        <div class="col-12 col-md-6" v-for="shirt in team.team_tshirts" :key="shirt.id">
                          <img class="team-shirt" v-if="shirt.type === 'home'" :src="shirt.image">
                        </div>
                      </div>
                    </b-form-group>
                    <b-form-group class="mb-4" label="لون التيشيرت الاحتياطى:">
                      <div class="row">
                        <div class="col-12 col-md-6" v-for="shirt in team.team_tshirts" :key="shirt.id">
                          <img class="team-shirt" v-if="shirt.type === 'away'" :src="shirt.image">
                        </div>
                      </div>
                    </b-form-group>
                  </div>
                  <div class="manger" v-if="active_tab === 'manger'">
                    <b-form-group class="mb-4" label="الإسم:">
                      <b-form-input disabled v-model="team.teamleader_name"></b-form-input>
                    </b-form-group>
                    <b-form-group class="mb-4" label="رقم الجوال:">
                      <b-form-input disabled v-model="team.phone"></b-form-input>
                    </b-form-group>
                    <b-form-group class="mb-4" label="البريد الالكتروني:">
                      <b-form-input disabled v-model="team.email"></b-form-input>
                    </b-form-group>

                  </div>
                  <div class="team" v-if="active_tab === 'team'">
                    <div class="add-player-container">
                      <router-link class="add-player" :to="'/teams-accepted/edit/' + team.id + '/add-player'">أضف لاعب جديد</router-link>
                    </div>
                    <div class="row">
                      <div class="col-md-4 col-12 mb-4" v-for="player in team.team_players" :key="player.id">
                        <div class="player">
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
  name: "my-team",
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

    if (!this.$store.getters.isAuthenticated || this.$store.getters.role !== this.$store.getters.teamRole) {
      router.push("/login")
    }
    this.loadTeam()
  },
  methods: {
    async loadTeam() {
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
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/admin-shared";
@import "../../assets/css/admin-team";

</style>