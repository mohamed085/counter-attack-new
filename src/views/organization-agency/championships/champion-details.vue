<template>
  <div>
    <div class="err" v-if="error">{{ error_message }}</div>

    <div class="success" v-if="success">{{ success_message }}</div>


    <b-overlay :show="is_loading" rounded="sm" class="content">
      <div v-if="select_match_teams" class="select-team-container">
        <div class="container select-team">
          <span class="main-title">اختار الفريق</span>
          <div class="close" @click="select_match_teams = false"><i class="fas fa-times"></i></div>
          <div class="row">
            <div class="col-12 col-md-3" v-for="team in champion.acceptedTeams" :key="team.id">
              <div @click="selectMatchTeam(team)" class="team">
                <div class="img">
                  <img :src="team.logo">
                </div>
                <span>{{ team.team_name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="header mb-4">
        <div class="breadcrumb">
          <router-link class="link" to="/championships">بطولاتي / </router-link>
          <router-link class="link" :to="'/championships/view/' + champion.id">{{ champion.name }} / </router-link>
          <span v-if="!is_loading" class="active"> بدأ البطولة </span>
        </div>
      </div>

      <div>
        <div v-if="displayed_section === 'step-1'" class="container step-1">
          <span class="main-title">نظام البطولة</span>
          <div class="types row justify-content-center">
            <div v-if="champion.type === 'league'"
                 @click="displayed_section = 'step-2'"
                 class="col-12 col-md-4">
              <div class="type active">
                <span>عرض الدوري</span>
              </div>
            </div>
            <div v-if="champion.type === 'group_cup'"
                 @click="displayed_section = 'step-2'"
                 class="col-12 col-md-4">
              <div class="type active">
                <span>عرض الكأس بنظام المجموعات</span>
              </div>
            </div>
            <div v-if="champion.type === 'knockout_cup'"
                 @click="displayed_section = 'step-2'"
                 class="col-12 col-md-4">
              <div class="type active">
                <span>عرض الكأس بنظام خروج المغلوب</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="displayed_section === 'step-2'" class="container step-2">
          <div v-if="champion.type === 'league'" >
            <div class="d-flex justify-content-between">
              <span class="main-title">نظام الدوري</span>
              <b-button type="button" class="add-team" @click="displayed_section = 'step-3'">المباريات</b-button>
            </div>
            <div class="league">
              <div class="header row">
                <div class="col-1">#</div>
                <div class="col-6">الفريق</div>
                <div class="col-1">نقاط</div>
                <div class="col-1">لعب</div>
                <div class="col-1">فاز</div>
                <div class="col-1">تعادل</div>
                <div class="col-1">خسر</div>

              </div>
              <div v-for="(team, index) in champion.acceptedTeams" :key="team.id">
                <router-link class="team row" :to="'/teams-accepted/view/' + team.id">
                  <div class="col-1">{{ index + 1 }}</div>
                  <div class="col-6 team-logo">
                    <span class="img"><img :src="team.logo"></span>
                    <span>{{ team.team_name }}</span>
                  </div>
                  <div class="col-1">0</div>
                  <div class="col-1">0</div>
                  <div class="col-1">0</div>
                  <div class="col-1">0</div>
                  <div class="col-1">0</div>
                </router-link>
              </div>
            </div>
          </div>

          <div v-else-if="champion.type === 'group_cup'">
            <div class="d-flex justify-content-between">
              <span class="main-title">كأس بنظام المجموعات</span>
              <b-button type="button" class="add-team" @click="displayed_section = 'step-3'">المباريات</b-button>
            </div>
            <div class="group_cup">
              <div>
                <div class="groups">
                  <div class="group" v-for="group in groups" :key="group.name">
                    <span>{{ group.name }}</span>
                    <div class="league">
                      <div class="header row">
                        <div class="col-1">#</div>
                        <div class="col-6">الفريق</div>
                        <div class="col-1">نقاط</div>
                        <div class="col-1">لعب</div>
                        <div class="col-1">فاز</div>
                        <div class="col-1">تعادل</div>
                        <div class="col-1">خسر</div>

                      </div>
                      <div class="team row" v-for="(team, index) in group.teams" :key="team.id">
                        <div class="col-1">{{ index + 1 }}</div>
                        <div class="col-6">
                          <div class="team-logo">
                            <span class="img"><img :src="team.logo"></span>
                            <span>{{ team.team_name }}</span>
                          </div>
                        </div>
                        <div class="col-1">0</div>
                        <div class="col-1">0</div>
                        <div class="col-1">0</div>
                        <div class="col-1">0</div>
                        <div class="col-1">0</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="displayed_section === 'step-3'" class="container step-3">
          <div class="d-flex justify-content-between">
            <span class="main-title">المباريات</span>
            <b-button type="button" class="add-team" @click="addMatch">إنشاء مبارة جديدة</b-button>
          </div>

          <b-form @submit.prevent="saveMatches">
            <div v-for="match in matches" :key="match.length">
              <div class="add-match">
                <div class="teams">
                  <div class="team">
                    <b-button type="button"
                              v-if="!match.home_team_selected"
                              class="add-team"
                              @click="displayMatchTeams(match.id, 'home')">اختار الفريق المضيف</b-button>
                    <div v-else class="team-logo">
                      <span class="team-name">{{ match.home_team.team_name }}</span>
                      <span class="img"><img :src="match.home_team.logo"></span>
                    </div>
                  </div>
                  <div class="time">
                    <b-form-input type="time" class="mb-2" v-model="match.time" required></b-form-input>
                    <b-form-input type="date" class="mb-2" v-model="match.date" required></b-form-input>
                    <b-form-input type="text" v-model="match.place" placeholder="المكان" required></b-form-input>
                  </div>
                  <div class="team">
                    <b-button type="button"
                              v-if="!match.away_team_selected"
                              class="add-team"
                              @click="displayMatchTeams(match.id, 'away')">اختار الفريق الضيف</b-button>
                    <div v-else class="team-logo">
                      <span class="img"><img :src="match.away_team.logo"></span>
                      <span class="team-name">{{ match.away_team.team_name }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <b-button v-if="matches.length > 0" type="submit" class="add-team bg"> حفظ المباريات</b-button>
          </b-form>

          <div v-for="match in exist_matches" :key="match.length">
            <div class="add-match">
              <div class="teams">
                <div class="team">
                  <div class="team-logo">
                    <span class="team-name">{{ match.home_team_id.team_name }}</span>
                    <span class="img"><img :src="match.home_team_id.logo"></span>
                  </div>
                </div>
                <div class="time">
                  <b-form-input type="time" class="mb-2" v-model="match.time" disabled></b-form-input>
                  <b-form-input type="date" class="mb-2" v-model="match.date" disabled></b-form-input>
                  <b-form-input type="text" v-model="match.place" placeholder="المكان" disabled></b-form-input>
                </div>
                <div class="team">
                  <div class="team-logo">
                    <span class="img"><img :src="match.away_team_id.logo"></span>
                    <span class="team-name">{{ match.away_team_id.team_name }}</span>
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
  name: "champion-details",
  data() {
    return {
      is_loading: false,
      is_add_groups_loading: false,
      error: false,
      error_message: '',
      success: false,
      success_message: '',
      displayed_section: 'step-1',
      champion: '',
      groups: '',
      champion_type: '',
      select_teams: false,
      selected_group_type: '',
      selected_group_name: '',
      selected_team_index: '',
      exist_matches: '',
      matches: [],
      select_match_teams: false,
      selected_match: {
        id: null,
        teamType: null,
      },
    }
  },
  created() {
    window.scrollTo(0,0);

    if (!this.$store.getters.isAuthenticated || this.$store.getters.role !== this.$store.getters.organizationRole) {
      router.push("/login")
    }
    this.loadChampion(this.$route.params.id);
    this.loadMatches(this.$route.params.id);
  },
  methods: {
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
        if (championResponseData.data.type === 'group_cup') {
          this.loadGroups(championResponseData.data.id)
        }
        this.is_loading = false
      }
    },
    async loadGroups(id) {
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

      let championURL = this.$store.getters["main/getURL"] + '/api/organization/get-championship-groups/' + id;
      const championResponse = await fetch(championURL, requestOptions);
      const championResponseData = await championResponse.json();

      if (!championResponse.ok || !championResponseData.status) {
        this.error = true
        this.error_message = "حدث خطأ ما"
      } else {
        this.groups = championResponseData.data;
        this.is_loading = false
      }
    },
    async loadMatches(id) {
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

      let championURL = this.$store.getters["main/getURL"] + '/api/organization/championship-matches/' + id;
      const championResponse = await fetch(championURL, requestOptions);
      const championResponseData = await championResponse.json();

      if (!championResponse.ok || !championResponseData.status) {
        this.error = true
        this.error_message = "حدث خطأ ما"
      } else {
        this.exist_matches = championResponseData.data;
        console.log(this.exist_matches)
        this.is_loading = false
      }
    },
    addMatch() {
      let match = {
        id: Date.now(),
        home_team: null,
        home_team_selected: null,
        away_team: null,
        away_team_selected: null,
        place: null,
        date: null,
        time: null,
        group_id: null
      }
      this.matches.push(match)
    },
    displayMatchTeams(id, teamType) {
      this.selected_match.id = id;
      this.selected_match.teamType = teamType;

      this.select_match_teams = true
    },
    selectMatchTeam(team) {
      this.matches.forEach(value => {
        if (value.id === this.selected_match.id) {
          if (this.selected_match.teamType === 'home') {
            value.home_team = team;
            value.home_team_selected = true
          } else if (this.selected_match.teamType === 'away') {
            value.away_team = team;
            value.away_team_selected = true;
          }
        }
      })

      this.select_match_teams = false
    },
    async saveMatches() {
      this.is_loading = true;
      this.error = false;

      let token = this.$store.getters.token;
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
      myHeaders.append("Content-Type", "application/json");
      console.log(this.matches)

      let matches = [];
      this.matches.forEach(value => {
        matches.push({
          home_team_id: value.home_team.id,
          away_team_id: value.away_team.id,
          place: value.place,
          date: value.date,
          time: value.time,
          group_id: '',
        })
      })


      let raw = JSON.stringify({
        "matches": matches
      });

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      let url = this.$store.getters["main/getURL"] + '/api/organization/create-championship-matches/' + this.champion.id;

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (!response.ok || !responseData.status) {
        this.error = true
        this.error_message = "حدث خطأ ما"
      } else {
        this.success = true;
        this.success_message = "تم إضافة المباريات بنجاح"
        this.matches = [];
        await this.loadMatches(this.champion.id);
        this.is_loading = false
      }

    }

  }

}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/admin-shared";
@import "../../../assets/css/start-champion";

.select-team-container {
  width: 80%;
}
</style>