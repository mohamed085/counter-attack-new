<template>
  <div>
    <div class="err" v-if="error">{{ error_message }}</div>


    <b-overlay :show="is_loading" rounded="sm" class="content">
      <div class="header mb-4">
        <div class="breadcrumb">
          <router-link class="link" to="/championships">بطولاتي / </router-link>
          <router-link class="link" :to="'/championships/view/' + champion.id">{{ champion.name }} / </router-link>
          <span v-if="!is_loading" class="active"> بدأ البطولة </span>
        </div>
      </div>


      <div v-if="select_teams" class="select-team-container">
        <div class="container select-team">
          <span class="main-title">اختار الفريق</span>
          <div class="close" @click="select_teams = false"><i class="fas fa-times"></i></div>
          <div class="row">
            <div class="col-12 col-md-3" v-for="team in teams" :key="team.id">
              <div @click="selectTeam(team)" class="team">
                <div class="img">
                  <img :src="team.logo">
                </div>
                <spna>{{ team.team_name }}</spna>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div :class="select_teams ? 'dis-active' : ''">
        <div v-if="displayed_section === 'step-1'" class="container step-1">
          <span class="main-title">أختار نظام البطولة</span>
          <div class="types row">
            <div class="col-12 col-md-4">
              <div @click="setChampionType('league')" class="type">
                <span>دوري</span>
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div @click="setChampionType('group_cup')" class="type">
                <span>كأس بنظام المجموعات</span>
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div @click="setChampionType('knockout_cup')" class="type">
                <span>كأس بنظام خروج المغلوب</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="displayed_section === 'step-2'" class="container step-2">
          <div v-if="champion_type === 'league'" >
            <span class="main-title">نظام الدوري</span>
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

          <div v-else-if="champion_type === 'group_cup'">
            <span class="main-title">كأس بنظام المجموعات</span>
            <div class="group_cup">
              <div v-if="champion.number_of_teams == 16">
                <div class="groups">
                  <div class="group" v-for="group in groups_16" :key="group.name">
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
                      <div class="team row" v-for="(team, index) in group.teams" :key="team.length">
                        <div class="col-1">{{ index + 1 }}</div>
                        <div class="col-6">
                          <b-button v-if="!team.select" class="add-team" @click="displayTeams('groups_16', group.name, index,)">اختار الفريق</b-button>
                          <div v-else class="team-logo">
                            <span class="img"><img :src="team.team.logo"></span>
                            <span>{{ team.team.team_name }}</span>
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
              <div v-if="champion.number_of_teams == 32">
                <div class="groups">
                  <div class="group" v-for="group in groups_32" :key="group.name">
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
                      <div class="team row" v-for="(team, index) in group.teams" :key="team.length">
                        <div class="col-1">{{ index + 1 }}</div>
                        <div class="col-6">
                          <b-button v-if="!team.select" class="add-team" @click="displayTeams">اختار الفريق</b-button>
                          <div v-else class="team-logo">
                            <span class="img"><img :src="team.team.logo"></span>
                            <span>{{ team.team.team_name }}</span>
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
      </div>

    </b-overlay>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "championship-start",
  data() {
    return {
      is_loading: false,
      error: false,
      error_message: '',
      success: false,
      success_message: '',
      displayed_section: 'step-1',
      champion: '',
      teams: '',
      champion_type: '',
      groups_16: [
        { name: 'المجموعة أ', teams: [
            { team: null, select: false },
            { team: null, select: false },
            { team: null, select: false },
            { team: null, select: false }
          ]
        },
        { name: 'المجموعة ب', teams: [
            { team: null, select: false },
            { team: null, select: false },
            { team: null, select: false },
            { team: null, select: false }
          ]
        },
        { name: 'المجموعة ج', teams: [
            { team: null, select: false },
            { team: null, select: false },
            { team: null, select: false },
            { team: null, select: false }
          ]
        },
        { name: 'المجموعة د', teams: [
            { team: null, select: false },
            { team: null, select: false },
            { team: null, select: false },
            { team: null, select: false }
          ]
        },
      ],
      groups_32: [
        { name: 'المجموعة أ', teams: [
            { team: null, select: false },
            { team: null, select: false },
            { team: null, select: false },
            { team: null, select: false }
          ]
        },
        { name: 'المجموعة ب', teams: [
            { team: null, select: false },
            { team: null, select: false },
            { team: null, select: false },
            { team: null, select: false }
          ]
        },
        { name: 'المجموعة ج', teams: [
            { team: null, select: false },
            { team: null, select: false },
            { team: null, select: false },
            { team: null, select: false }
          ]
        },
        { name: 'المجموعة د', teams: [
            { team: null, select: false },
            { team: null, select: false },
            { team: null, select: false },
            { team: null, select: false }
          ]
        },
        { name: 'المجموعة ه', teams: [
            { team: null, select: false },
            { team: null, select: false },
            { team: null, select: false },
            { team: null, select: false }
          ]
        },
        { name: 'المجموعة و', teams: [
            { team: null, select: false },
            { team: null, select: false },
            { team: null, select: false },
            { team: null, select: false }
          ]
        },
        { name: 'المجموعة ز', teams: [
            { team: null, select: false },
            { team: null, select: false },
            { team: null, select: false },
            { team: null, select: false }
          ]
        },
        { name: 'المجموعة ح', teams: [
            { team: null, select: false },
            { team: null, select: false },
            { team: null, select: false },
            { team: null, select: false }
          ]
        },
      ],
      select_teams: false,
      selected_group_type: '',
      selected_group_name: '',
      selected_team_index: ''
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
        this.teams = championResponseData.data.acceptedTeams;
        this.is_loading = false
      }
    },
    setChampionType(type) {
      if (type === 'knockout_cup')
        this.displayed_section = 'step-3';
      this.displayed_section = 'step-2';
      this.champion_type = type;
    },
    selectTeam(team) {
      let index = this.teams.indexOf(team);
      this.teams.splice(index, 1);

      console.log(this.teams);

      if (this.selected_group_type === 'groups_16') {
        this.groups_16.forEach(value => {
          if (value.name === this.selected_group_name) {
            value.teams.forEach((value1, index) => {
              if (index === this.selected_team_index) {
                value1.team = team;
                value1.select = true;
              }
            })
          }
        })
      }

      this.select_teams = false;
    },
    displayTeams(group_type, group_name, team_index) {
      this.selected_group_type = group_type;
      this.selected_group_name = group_name;
      this.selected_team_index = team_index;

      this.select_teams = true;

    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/admin-shared";
@import "../../../assets/css/start-champion";

</style>