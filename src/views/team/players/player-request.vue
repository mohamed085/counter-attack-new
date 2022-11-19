<template>
  <div>
    <div class="err" v-if="error">{{ error_message }}</div>

    <b-overlay :show="is_loading" rounded="sm" class="content">
      <div class="header">
        <div class="breadcrumb">
          <router-link class="link" to="/players-requests">طلبات انضمام اللاعبين / </router-link>
          <span v-if="!is_loading" class="active">{{ player.name }}</span>
        </div>

        <div class="action-btns">
          <b-button v-b-modal.accept-model v-b-tooltip.hover title="قبول طلب اللاعب" class="btn edit-btn">
            <i class="fas fa-check"></i>
          </b-button>
          <b-button v-b-modal.reject-model v-b-tooltip.hover title="رفض طلب اللاعب" class="btn remove-btn">
            <i class="fas fa-times"></i>
          </b-button>
        </div>
      </div>

      <div>
        <b-modal id="accept-model" title="قبول طلب اللاعب" hide-footer>
          <b-overlay v-if="!accept_success" :show="is_loading">
            <b-form @submit.prevent="accept">
              <div class="d-block mb-2">
                <div class="d-block">
                  <b-form-input type="number" class="mt-2" v-model="add_player.number" placeholder="رقم التشرت" required></b-form-input>
                </div>
                <div class="d-block">
                  <b-form-select v-model="add_player.type" class="select mb-3" required>
                    <b-form-select-option value="main">لاعب اساسي</b-form-select-option>
                    <b-form-select-option value="alt">إحتياطي</b-form-select-option>
                    <b-form-select-option value="goalkeeper">حارس مرمي</b-form-select-option>
                  </b-form-select>
                </div>
              </div>
              <div class="d-flex">
                <b-button class="mt-3 ms-2 btn-success" type="submit" block>قبول الطلب</b-button>
                <b-button class="mt-3 btn-danger" block type="button" @click="$bvModal.hide('accept-model')">إغلاق</b-button>
              </div>
            </b-form>
          </b-overlay>
          <b-overlay v-else-if="accept_success" :show="is_loading">
            <div class="d-block mb-2">
              <span>تم قبول الطلب</span>
            </div>
            <div>
              <b-button class="mt-3 btn-danger" block @click="$router.push('/my-team')">إغلاق</b-button>
            </div>
          </b-overlay>
        </b-modal>

        <b-modal id="reject-model" title="رفض طلب اللاعب" hide-footer>
          <b-overlay v-if="!reject_success" :show="is_loading">
            <b-form @submit.prevent="reject">
              <div class="d-block">
                <b-form-input type="text" class="mt-2" v-model="reject_message" placeholder="سبب الرفض" required></b-form-input>
              </div>
              <div class="d-flex">
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
              <b-button class="mt-3 btn-danger" block @click="$router.push('/players-requests')">إغلاق</b-button>
            </div>
          </b-overlay>
        </b-modal>
      </div>

      <div class="row">
        <div class="col-md-4 col-12 mb-5">
          <div class="card team-overview">
            <div class="main-img">
              <img class="logo-img" v-if="player.user.user_info == null" src="../../../assets/img/default-team-logo.png">
              <img class="logo-img" v-else-if="player.user.user_info.image == null || player.user.user_info.image === ''" src="../../../assets/img/default-team-logo.png">
              <img class="logo-img" v-else :src="player.user.user_info.image">
            </div>
            <div class="team-info">
              <span class="team-name">{{ player.name }}</span>
              <span class="team-about">{{ player.user.name }}</span>
            </div>
            <div class="team-bio" v-if="player.user.user_info != null">
            <span>{{ player.user.user_info.description}}</span>
            </div>
          </div>
        </div>
        <div class="col-md-8 col-12 mb-5">
          <div class="row mt-3">
            <div class="col-12">
              <div class="card details-container">
                <div class="tabs-menu-lg">
                <span :class="(active_tab === 'about') ? 'active' : ''"
                      @click="active_tab = 'about'" class="tab">عن اللاعب</span>
                </div>
                <div class="content">
                  <div class="about" v-if="active_tab === 'about'">
                    <b-form-group class="mb-4" label="المهارات:">
                      <span v-for="skill in player.skills" :key="skill.length">
                        <span class="skill">{{ skill }}</span>
                      </span>
                    </b-form-group>
                    <b-form-group class="mb-4" label="السن:">
                      <b-form-input disabled v-model="player.age"></b-form-input>
                    </b-form-group>
                    <b-form-group class="mb-4" label="البريد الإلكتروني:">
                      <b-form-input disabled v-model="player.user.email"></b-form-input>
                    </b-form-group>
                    <b-form-group class="mb-4" label="البلد:" v-if="player.user.user_info !== null">
                      <b-form-input disabled v-model="player.user.user_info.country"></b-form-input>
                    </b-form-group>
                    <b-form-group class="mb-4" label="الطول:" v-if="player.user.user_info !== null">
                      <b-form-input disabled v-model="player.user.user_info.length"></b-form-input>
                    </b-form-group>
                    <b-form-group class="mb-4" label="الوزن:" v-if="player.user.user_info !== null">
                      <b-form-input disabled v-model="player.user.user_info.weight"></b-form-input>
                    </b-form-group>
                    <b-form-group class="mb-4" label="تاريخ الميلاد:" v-if="player.user.user_info !== null">
                      <b-form-input disabled v-model="player.user.user_info.birthdaty"></b-form-input>
                    </b-form-group>
                    <b-form-group class="mb-4" label="رقم الهاتف:" v-if="player.user.user_info !== null">
                      <b-form-input disabled v-model="player.user.user_info.phone"></b-form-input>
                    </b-form-group>
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
  // eslint-disable-next-line vue/multi-word-component-names
  name: "player-request",
  data() {
    return {
      active_tab: "about",
      is_loading: false,
      error: false,
      error_message: '',
      player: '',
      reject_message: '',
      accept_success: false,
      reject_success: false,
      add_player: {
        number: '',
        type: '',
      }
    }
  },
  created() {
    window.scrollTo(0,0);

    if (!this.$store.getters.isAuthenticated || this.$store.getters.role !== this.$store.getters.teamRole) {
      router.push("/login")
    }
    this.loadPlayer(this.$route.params.id)
  },
  methods: {
    async loadPlayer(id) {
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

      let url = this.$store.getters["main/getURL"] + '/api/team/get-join-request/' + id;

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (!response.ok || !responseData.status) {
        this.error = true
        this.error_message = "حدث خطأ ما"
      } else {
        this.player = responseData.data
        this.is_loading = false
      }
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

      let url = this.$store.getters["main/getURL"] + '/api/team/reject-join-request/' + this.player.id;
      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (!response.ok || !responseData.status) {
        console.log(responseData)
        this.error = true
        this.error_message = "حدث خطأ ما"
      } else {
        this.reject_success = true;
        this.is_loading = false
      }
    },
    async accept() {
      this.is_loading = true;

      let token = this.$store.getters.token;
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);

      let formData = new FormData();
      formData.append("number", this.add_player.number);
      formData.append("type", this.add_player.type);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow'
      };

      let url = this.$store.getters["main/getURL"] + '/api/team/accept-join-request/' + this.player.id;
      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (!response.ok || !responseData.status) {
        console.log(responseData)
        this.error = true
        this.error_message = "حدث خطأ ما"
      } else {
        this.accept_success = true;
        this.is_loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/admin-shared";
@import "../../../assets/css/admin-team";

.skill {
  background-color: $color-grey-light-1;
  margin: 3px 4px 0;
  padding: 0 5px;
  border-radius: 5px;
}

.select {
  margin: 5px 0;
}

</style>