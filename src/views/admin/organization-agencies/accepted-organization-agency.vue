<template>
  <div>
    <div class="err" v-if="error">{{ error_message }}</div>

    <b-overlay :show="is_loading" rounded="sm" class="content">
    <div class="header">
      <div class="breadcrumb">
        <router-link class="link" to="/teams-accepted">اللجان المنظمة / </router-link>
        <span v-if="!is_loading" class="active">{{ organization.competition_name }}</span>
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
              <div class="d-flex">
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
            <div class="d-flex">
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
              <b-button class="mt-3 btn-danger" block @click="$router.push('/teams-requested/')">إغلاق</b-button>
            </div>
          </b-overlay>
        </b-modal>

      </div>

      <div class="row">
      <div class="col-md-4 col-12 mb-5">
        <div class="card team-overview">
          <div class="main-img">
            <img class="logo-img" src="https://i.pinimg.com/originals/8f/04/55/8f0455ed68ce4d45007ab7cd232b5e73.png">
          </div>
          <div class="team-info">
            <span class="team-name">{{ organization.competition_name }}</span>
            <span class="team-bio">{{ organization.email }}</span>
            <span class="team-bio">{{ organization.phone }}</span>
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
                      @click="active_tab = 'about'" class="tab">عن المنظمة</span>
                <span :class="(active_tab === 'team') ? 'active' : ''"
                      @click="active_tab = 'team'" class="tab">الفريق</span>
                <span :class="(active_tab === 'championships') ? 'active' : ''"
                      @click="active_tab = 'championships'" class="tab">الصور الرياضية</span>
                <span :class="(active_tab === 'awards') ? 'active' : ''"
                      @click="active_tab = 'awards'" class="tab">البطولات</span>
              </div>
              <div class="tabs-menu-sm">
                <b-form-select v-model="active_tab" dir="rtl" lang="AR" class="mb-3">
                  <b-form-select-option value="about">عن المنظمة</b-form-select-option>
                  <b-form-select-option value="team">الفريق</b-form-select-option>
                  <b-form-select-option value="championships">الصور الرياضية</b-form-select-option>
                  <b-form-select-option value="awards">البطولات</b-form-select-option>
                </b-form-select>

              </div>
              <div class="content">
                <div class="about" v-if="active_tab === 'about'">
                  <div class="form-group">
                    <div class="title">اسم البطولة</div>
                    <b-form-input
                        type="text"
                        placeholder="ادخل الاسم"
                        v-model="organization.competition_name"
                        disabled
                    ></b-form-input>
                  </div>
                  <div class="form-group">
                    <div class="title">اسم البطولة</div>
                    <b-form-input
                        type="text"
                        placeholder="اسم المدير"
                        v-model="organization.head_name"
                        disabled
                    ></b-form-input>
                  </div>
                  <div class="form-group">
                    <div class="title">الإيميل</div>
                    <b-form-input
                        type="text"
                        placeholder="اسم المدير"
                        v-model="organization.email"
                        disabled
                    ></b-form-input>
                  </div>
                  <div class="form-group">
                    <div class="title">رقم الهاتف</div>
                    <b-form-input
                        type="text"
                        placeholder="اسم المدير"
                        v-model="organization.phone"
                        disabled
                    ></b-form-input>
                  </div>

                </div>
                <div class="team" v-if="active_tab === 'team'">
                  <div class="row">
                    <div
                        class="col-md-4 col-12 mb-4"
                        v-for="club in organization.club_images"
                        :key="club.id"
                    >
                      <div class="player">
                        <img class="player-img" :src="club.club_image" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="team" v-if="active_tab === 'championships'">
                  <div class="row">
                    <div
                        class="col-md-4 col-12 mb-4"
                        v-for="club in organization.sports_images"
                        :key="club.id"
                    >
                      <div class="player">
                        <img class="player-img" :src="club.sports_image" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="team" v-if="active_tab === 'awards'">
                  <div class="row">
                    <div
                        class="col-md-4 col-12 mb-4"
                        v-for="champion in organization.championships"
                        :key="champion.id"
                    >
                      <div class="champion">
                        <span class="name">{{ champion.name }}</span>
                        <span class="name">{{ champion.place }}</span>
                        <span class="name">{{ champion.goals }}</span>
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
  // eslint-disable-next-line vue/multi-word-component-names
  name: "accepted-organization-agency",
  data() {
    return {
      active_tab: "about",
      is_loading: false,
      error: false,
      error_message: '',
      organization: '',
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
    window.scrollTo(0,0);

    if (!this.$store.getters.isAuthenticated || this.$store.getters.role !== this.$store.getters.adminRole) {
      router.push("/login")
    }
    this.loadOrganization(this.$route.params.id)
  },
  methods: {
    async loadOrganization(id) {
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

      let url = this.$store.getters["main/getURL"] + '/api/admin/get-organization/' + id;

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (!response.ok || !responseData.status) {
        console.log(response)
        this.error = true
        this.error_message = "حدث خطأ ما"
      } else {
        this.organization = responseData.data
        console.log(this.organization)
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

      let url = this.$store.getters["main/getURL"] + '/api/admin/reject-organization-request/' + this.organization.id;
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

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
      };

      let url = this.$store.getters["main/getURL"] + '/api/admin/accept-organization-request/' + this.organization.id;
      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (!response.ok || !responseData.status) {
        console.log(response)
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
@import '../../../assets/css/admin-product';

.custom-file.b-form-file {
  display: none;
}
label img {
  cursor: pointer;
}

.champion {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: $color-primary-dark-2;
  background: $color-white;
  background-clip: border-box;
  border: 1px solid #ddd;
  box-shadow: -8px 12px 18px 0 #dadee8;
  padding: 15px 10px;
  margin-bottom: 10px;

}

</style>