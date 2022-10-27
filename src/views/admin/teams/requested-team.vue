<template>
  <b-overlay :show="is_loading" rounded="sm" class="content">
    <div class="header">
      <div class="breadcrumb">
        <router-link class="link" to="/teams-requested">الفرق / </router-link>
        <span v-if="!is_loading" class="active">{{ team.team_name }}</span>
      </div>
      <div class="action-btns">
        <b-button v-b-modal.message-model v-b-tooltip.hover title="إرسال رسالة" class="btn message-btn">
          <i class="fas fa-envelope"></i>
        </b-button>
        <b-button v-b-modal.accept-model v-b-tooltip.hover title="قبول طلب الفريق" class="btn edit-btn">
          <i class="fas fa-check"></i>
        </b-button>
        <b-button v-b-modal.reject-model v-b-tooltip.hover title="رفض طلب الفريق" class="btn remove-btn">
          <i class="fas fa-times"></i>
        </b-button>
      </div>
    </div>

    <div>
      <b-modal id="message-model" title="إرسال رسالة" hide-footer>
        <b-overlay :show="is_loading">
          <b-form @submit.prevent="sendMessage">
            <div class="d-block">
              <b-form-input type="text" v-model="message.title" placeholder="عنوان الرسالة" required></b-form-input>
              <b-form-input type="text" class="mt-2" v-model="message.message" placeholder="الرسالة" required></b-form-input>
            </div>
            <div>
              <b-button class="mt-3 ms-2 btn-success" type="submit" block>إرسال الرسالة</b-button>
              <b-button class="mt-3 btn-danger" type="reset" block @click="$bvModal.hide('message-model')">إغلاق</b-button>
            </div>
          </b-form>
        </b-overlay>
      </b-modal>

      <b-modal id="accept-model" title="قبول طلب الفريق" hide-footer>
        <b-overlay v-if="!accept_success" :show="is_loading">
          <div class="d-block mb-2">
            <span>هل انت متاكد من قبول الطلب</span>
          </div>
          <div>
            <b-button class="mt-3 ms-2 btn-success" @click="accept" block>قبول الطلب</b-button>
            <b-button class="mt-3 btn-danger" block @click="$bvModal.hide('accept-model')">إغلاق</b-button>
          </div>
        </b-overlay>
        <b-overlay v-else-if="accept_success" :show="is_loading">
          <div class="d-block mb-2">
            <span>تم قبول الطلب</span>
          </div>
          <div>
            <b-button class="mt-3 btn-danger" block @click="$router.push('/teams-requested/')">إغلاق</b-button>
          </div>
        </b-overlay>
      </b-modal>

      <b-modal id="reject-model" title="رفض طلب الفريق" hide-footer>
        <b-overlay v-if="!reject_success" :show="is_loading">
          <b-form @submit.prevent="reject">
            <div class="d-block">
              <b-form-input type="text" class="mt-2" v-model="reject_message" placeholder="سبب الرفض" required></b-form-input>
            </div>
            <div>
              <b-button class="mt-3 ms-2 btn-success" type="submit" block>رفض الطلب</b-button>
              <b-button class="mt-3 btn-danger" type="reset" block @click="$bvModal.hide('reject-model')">إغلاق</b-button>
            </div>
          </b-form>
        </b-overlay>
        <b-overlay v-else-if="reject_success" :show="is_loading">
          <div class="d-block mb-2">
            <span>تم رفض الطلب</span>
          </div>
          <div>
            <b-button class="mt-3 btn-danger" block @click="$router.push('/teams-requested/')">إغلاق</b-button>
          </div>
        </b-overlay>
      </b-modal>

    </div>

    <div class="row">
      <div class="col-md-4 col-12 mb-5">
        <div class="card team-overview">
          <div class="main-img">
            <img class="logo-img" :src="team.logo">
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
                    <b-form-input disabled ></b-form-input>
                  </b-form-group>
                  <b-form-group class="mb-4" label="متوفر اداوات رياضية:">
                    <span v-if="team.sport_tool == 1">نعم</span>
                    <span v-if="team.sport_tool == 0">لا</span>
                  </b-form-group>
                  <b-form-group class="mb-4" label="ألوان التيشيرت الاساسي:">
                    <div class="row">
                      <div class="col-12 col-md-6" v-for="shirt in team.team_tshirts" :key="shirt.id">
                        <img class="team-shirt" v-if="shirt.type === 'home'" :src="shirt.image">
                      </div>
                    </div>
                  </b-form-group>
                  <b-form-group class="mb-4" label="ألوان التيشيرت الاحتياطى:">
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
                  <div class="row" v-if="team.team_players.length > 1">
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
                  <div class="row" v-else>
                    <div class="col">لا يوجد اعضاء للفريق</div>
                  </div>
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
  // eslint-disable-next-line vue/multi-word-component-names
  name: "requested-team",
  data() {
    return {
      active_tab: "about",
      is_loading: false,
      error: false,
      error_message: '',
      team: '',
      message: {
        title: '',
        message: '',
      },
      reject_message: '',
      accept_success: false,
      reject_success: false,
    }
  },
  created() {
    this.loadTeam(this.$route.params.id)
  },
  methods: {
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
    async sendMessage() {
      this.is_loading = true;
      console.log(this.message)

      this.is_loading = false;
    },
    async reject() {
      this.is_loading = true;

      let token = this.$store.getters.token;
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);

      let data = new FormData();
      data.append("reason", this.reject_message);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
      };

      let url = this.$store.getters["main/getURL"] + '/api/admin/reject-team-request/' + this.team.id;
      await fetch(url, requestOptions)
          .then(response => response.json())
          .then(response => {
            console.log(response)
            if (response.status)
              this.reject_success = true;
          })
          .catch(error => console.log('error', error));

      this.is_loading = false
    },
    async accept() {
      this.is_loading = true;

      let token = this.$store.getters.token;
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
      };

      let url = this.$store.getters["main/getURL"] + '/api/admin/accept-team-request/' + this.team.id;
      await fetch(url, requestOptions)
          .then(response => response.json())
          .then(response => {
            if (response.status)
              this.accept_success = true;
          })
          .catch(error => console.log('error', error));

      this.is_loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/admin-shared";
@import "../../../assets/css/admin-team";

</style>