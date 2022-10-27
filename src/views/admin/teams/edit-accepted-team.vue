<template>
  <b-overlay :show="is_loading" rounded="sm" class="content edit-team">
    <div class="header">
      <div class="breadcrumb">
        <router-link class="link" to="/teams-accepted">الفرق / </router-link>
        <router-link v-if="!is_loading" class="link" :to="'/teams-accepted/view/' + team.id">{{ team.team_name }}</router-link>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 col-12 mb-5">
        <b-overlay :show="overview_loading" rounded="sm" class="card team-overview">
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
              <span class="statistics-num">12312</span>
              <span class="statistics-title">متابع</span>
            </div>
            <div class="col-4 item">
              <span class="statistics-num">12312</span>
              <span class="statistics-title">متابع</span>
            </div>
            <div class="col-4 item">
              <span class="statistics-num">12312</span>
              <span class="statistics-title">متابع</span>
            </div>
          </div>
          <button class="save-btn">حفظ التعديلات</button>
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
                          <div v-if="shirt.type === 'home'">
                            <img class="team-shirt" :src="shirt.image">
                            <button class="add-logo-btn">تعديل الصورة</button>
                          </div>
                        </div>
                      </div>
                    </b-form-group>
                    <b-form-group class="mb-4" label="لون التيشيرت الاحتياطى:">
                      <div class="row">
                        <div class="col-12 col-md-6" v-for="shirt in team.team_tshirts" :key="shirt.id">
                          <div v-if="shirt.type === 'away'">
                            <img class="team-shirt" :src="shirt.image">
                            <button class="add-logo-btn">تعديل الصورة</button>
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
                    <button class="save-btn">حفظ التعديلات</button>
                  </b-form>
                </div>
                <div class="team" v-if="active_tab === 'team'">
                  <button class="add-logo-btn">إضافة لاعب جديد</button>
                  <b-form>
                    <div class="row mt-4">
                      <div class="col-md-4 col-12 mb-4" v-for="player in team.team_players" :key="player.id">
                        <div class="player">
                          <div class="d-flex justify-content-between align-items-sm-start">
                            <img class="player-img" :src="player.image">
                            <button class="add-logo-btn" @click="deletePlayer(player.id)"><i class="fas fa-user-alt-slash"></i></button>
                          </div>
                          <button class="add-logo-btn">تعديل الصورة</button>
                          <b-form-input class="mt-3" v-model="player.number"></b-form-input>
                          <b-form-input class="mt-3" v-model="player.name"></b-form-input>
                          <b-form-select v-model="player.type" class="w-100 mt-3">
                            <b-form-select-option value="main">لاعب اساسي</b-form-select-option>
                            <b-form-select-option value="alt">لاعب إحتياطي</b-form-select-option>
                            <b-form-select-option value="alt">حارس مرمي</b-form-select-option>
                          </b-form-select>
                        </div>
                      </div>
                    </div>
                    <b-button class="save-btn">حفظ التعديلات</b-button>
                  </b-form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-overlay>
</template>

<script>
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
      home_shirt_file: null,
      selected_shirt_id: null,
    }
  },
  created() {
    this.loadTeam(this.$route.params.id)
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
      this.team.team_players.splice(this.team.team_players.findIndex(function(i){
        return i.id === playerId;
      }), 1);
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
      await fetch(url, requestOptions)
          .then(response => response.json())
          .then(response => {
            if (response.status)
              this.team = response.data
          })
          .catch(error => console.log('error', error));

      this.is_loading = false

    },
  }

}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/admin-shared";
@import "../../../assets/css/admin-team";

</style>