<template>
  <div>
    <div class="err" v-if="error">{{ error_message }}</div>

    <b-overlay :show="is_loading" rounded="sm" class="content">
      <div class="header">
        <div class="breadcrumb">
          <router-link class="link" to="/championships">بطولاتي / </router-link>
          <span v-if="!is_loading" class="active">{{ champion.name }}</span>
        </div>

        <div class="action-btns">
          <router-link v-if="champion.count_of_accepted_teams >= champion.number_of_teams && champion.start_status === 'pending'" class="start-champion" :to="'/championships/start/' + champion.id">أبدا البطولة</router-link>
          <router-link v-if="champion.start_status === 'started'" class="start-champion" :to="'/championships/details/' + champion.id">عرض البطولة</router-link>
        </div>
      </div>

      <div>
        <div class="row mobile">
          <div class="col">
            <div class="container steps">
              <div class="item"
                   :class="active_info_section ? 'active' : ''"
                   @click="changeDisplayedSection('info')">
                <span class="item-num">1</span>
                <span class="item-title animate__animated animate__slideInLeft"
                      :class="displayed_section === 'info' ? 'active': ''">البيانات الأساسية</span>
              </div>
              <div class="item"
                   :class="active_awards_section ? 'active' : ''"
                   @click="changeDisplayedSection('awards')">
                <span class="item-num">2</span>
                <span class="item-title animate__animated animate__slideInLeft"
                      :class="displayed_section === 'awards' ? 'active': ''">الجوائز</span>
              </div>
              <div class="item"
                   :class="active_sponsors_section ? 'active' : ''"
                   @click="changeDisplayedSection('sponsors')">
                <span class="item-num">3</span>
                <span class="item-title animate__animated animate__slideInLeft"
                      :class="displayed_section === 'sponsors' ? 'active': ''">الرعاة</span>
              </div>
              <div class="item"
                   :class="active_accepted_teams_section ? 'active' : ''"
                   @click="changeDisplayedSection('accepted-teams')">
                <span class="item-num">4</span>
                <span class="item-title animate__animated animate__slideInLeft"
                      :class="displayed_section === 'accepted-teams' ? 'active': ''">الفرق الموجودة</span>
              </div>
              <div class="item"
                   :class="active_requested_teams_section ? 'active' : ''"
                   @click="changeDisplayedSection('requested-teams')">
                <span class="item-num">5</span>
                <span class="item-title animate__animated animate__slideInLeft"
                      :class="displayed_section === 'requested-teams' ? 'active': ''">طلبات الفرق</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="container steps">
              <div class="item"
                   :class="active_info_section ? 'active' : ''"
                   @click="changeDisplayedSection('info')">
                <span class="item-num">1</span>
                <span class="item-title">البيانات الأساسية</span>
              </div>
              <div class="item"
                   :class="active_awards_section ? 'active' : ''"
                   @click="changeDisplayedSection('awards')">
                <span class="item-num">2</span>
                <span class="item-title">الجوائز</span>
              </div>
              <div class="item"
                   :class="active_sponsors_section ? 'active' : ''"
                   @click="changeDisplayedSection('sponsors')">
                <span class="item-num">3</span>
                <span class="item-title">الرعاة</span>
              </div>
              <div class="item"
                   :class="active_accepted_teams_section ? 'active' : ''"
                   @click="changeDisplayedSection('accepted-teams')">
                <span class="item-num">4</span>
                <span class="item-title">الفرق الموجودة</span>
              </div>
              <div class="item"
                   :class="active_requested_teams_section ? 'active' : ''"
                   @click="changeDisplayedSection('requested-teams')">
                <span class="item-num">5</span>
                <span class="item-title">طلبات الفرق</span>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-8">
            <div class="container details">
              <div v-if="displayed_section === 'info'">
                <div class="info animate__animated animate__fadeIn">
                  <div class="details-title">البيانات الأساسية</div>
                    <div class="form-group mt-3">
                      <div class="title">إسم البطولة</div>
                      <b-form-input v-model="champion.name" disabled></b-form-input>
                    </div>
                    <div class="form-group">
                      <div class="title">تاريخ البدء</div>
                      <b-form-input type="date" v-model="champion.start_date" disabled></b-form-input>
                    </div>
                    <div class="form-group">
                      <div class="title">تاريخ النهاية</div>
                      <b-form-input type="date" v-model="champion.end_date" disabled></b-form-input>
                    </div>
                    <div class="form-group">
                      <div class="title">وقت البدء</div>
                      <b-form-input type="time" v-model="champion.start_time" disabled></b-form-input>
                    </div>
                    <div class="form-group">
                      <div class="title">مكان الإقامة</div>
                      <b-form-input v-model="champion.place" disabled></b-form-input>
                    </div>
                    <div class="form-group">
                      <div class="title">الهدف من البطولة</div>
                      <b-form-input v-model="champion.goals" disabled></b-form-input>
                    </div>
                    <div class="form-group">
                      <div class="title">عدد الفرق</div>
                      <b-form-select v-model="champion.number_of_teams" class="mb-3" disabled>
                        <b-form-select-option value="16">16</b-form-select-option>
                        <b-form-select-option value="32">32</b-form-select-option>
                      </b-form-select>
                    </div>
                    <div class="form-group">
                      <div class="title">الحالة</div>
                      <b-form-select v-model="champion.status" class="mb-3" disabled>
                        <b-form-select-option value="in_place">ملاعب</b-form-select-option>
                        <b-form-select-option value="electronic">إلكتروني</b-form-select-option>
                      </b-form-select>
                    </div>
                </div>
              </div>
              <div v-else-if="displayed_section === 'awards'">
                <div class="awards animate__animated animate__fadeIn">
                  <div class="details-title">الجوائز</div>
                  <div v-if="champion.awards.length > 0">
                    <div v-for="award in champion.awards" :key="award.id">
                      <div class="award">
                        <div class="inputs d-flex">
                          <b-form-input v-model="award.name" placeholder="إسم الجائزة" disabled></b-form-input>
                          <b-form-input type="number" v-model="award.value" placeholder="قيمة الجائزة" disabled></b-form-input>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="mt-3">لا يوجد جوائز</div>
                </div>
              </div>
              <div v-else-if="displayed_section === 'sponsors'" >
                <div class="sponsors animate__animated animate__fadeIn">
                  <div class="details-title">الرعاة</div>
                  <div v-if="champion.sponsors.length > 0">
                    <div class="sponsor-container" v-for="sponsor in champion.sponsors" :key="sponsor.id">
                      <div class="btns d-flex">
                      </div>
                      <div class="sponsor">
                        <div class="sponsor-img">
                          <img :src="sponsor.image">
                        </div>
                        <div class="sponsor-details">
                          <div class="mb-3">
                            <div class="mb-2">الإسم</div>
                            <b-form-input v-model="sponsor.name" disabled></b-form-input>
                          </div>
                          <div class="mb-3">
                            <div class="mb-2">الوصف</div>
                            <b-form-input v-model="sponsor.description" disabled></b-form-input>
                          </div>
                          <div class="mb-3">
                            <div class="mb-2">المبلغ</div>
                            <b-form-input type="number" v-model="sponsor.value" disabled></b-form-input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="mt-3">لا يوجد رعاه</div>
                </div>
              </div>
              <div v-else-if="displayed_section === 'accepted-teams'">
                <div class="animate__animated animate__fadeIn">
                  <div class="details-title">الفرق الموجودة</div>
                  <div class="row justify-content-center mt-3" v-if="champion.acceptedTeams.length > 0">
                    <div class="col-12 col-md-4" v-for="team in champion.acceptedTeams" :key="team.id">
                      <router-link :to="'/teams-accepted/view/' + team.id" class="team">
                        <img class="logo-img" v-if="team.logo == null || team.logo === ''" src="../../../assets/img/default-team-logo.png">
                        <img class="logo-img" v-else :src="team.logo">
                        <span class="team-name">{{ team.team_name }}</span>
                      </router-link>
                    </div>
                  </div>
                  <div v-else>لا يوجد فرق موجودة</div>
                </div>
              </div>
              <div v-else-if="displayed_section === 'requested-teams'">
                <div class="animate__animated animate__fadeIn">
                  <div class="details-title">طلبات الفرق</div>
                  <div class="row justify-content-center mt-3" v-if="requested_teams.length > 0">
                    <div class="col-12 col-md-4" v-for="team in requested_teams" :key="team.id">
                      <router-link :to="'/champion/' + champion.id + '/team-request/' + team.id" class="team">
                        <img class="logo-img" v-if="team.logo == null || team.logo === ''" src="../../../assets/img/default-team-logo.png">
                        <img class="logo-img" v-else :src="team.logo">
                        <span class="team-name">{{ team.team_name }}</span>
                      </router-link>
                    </div>
                  </div>
                  <div v-else>لا يوجد طلبات فرق موجودة</div>
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
  // eslint-disable-next-line vue/multi-word-component-names
  name: "championship",
  data() {
    return {
      is_loading: false,
      error: false,
      error_message: '',
      champion: '',
      requested_teams: '',
      success: false,
      success_message: '',
      active_info_section: true,
      active_awards_section: true,
      active_sponsors_section: true,
      active_requested_teams_section: true,
      active_accepted_teams_section: true,
      displayed_section: 'info',
    }
  },
  created() {
    window.scrollTo(0,0);

    if (!this.$store.getters.isAuthenticated || this.$store.getters.role !== this.$store.getters.organizationRole) {
      router.push("/login")
    }
    this.loadChampion(this.$route.params.id)
  },
  methods: {
    changeDisplayedSection(to) {
      if (to === 'info') {
        this.displayed_section = 'info'
      } else if (to === 'awards') {
        this.displayed_section = 'awards'
      } else if (to === 'sponsors') {
        this.displayed_section = 'sponsors'
      } else if (to === 'requested-teams') {
        this.displayed_section = 'requested-teams'
      } else if (to === 'accepted-teams') {
        this.displayed_section = 'accepted-teams'
      } else {
        this.displayed_section = 'info';
      }
    },
    async loadChampion(id) {
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

      let championURL = this.$store.getters["main/getURL"] + '/api/organization/get-championship/' + id;
      const championResponse = await fetch(championURL, requestOptions);
      const championResponseData = await championResponse.json();

      if (!championResponse.ok || !championResponseData.status) {
        this.error = true
        this.error_message = "حدث خطأ ما"
      } else {
        this.champion = championResponseData.data;
        this.is_loading = false
      }

      let requestedTeamsURL = this.$store.getters["main/getURL"] + '/api/organization/championship-requested-teams/' + this.champion.id;
      const requestedTeamsResponse = await fetch(requestedTeamsURL, requestOptions);
      const requestedTeamsResponseData = await requestedTeamsResponse.json();

      if (!requestedTeamsResponse.ok || !requestedTeamsResponseData.status) {
        this.error = true
        this.error_message = "حدث خطأ ما"
      } else {
        this.requested_teams = requestedTeamsResponseData.data;
        this.is_loading = false
      }

    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/admin-shared";
@import "../../../assets/css/add-championship";
@import "../../../assets/css/orgnization";

</style>