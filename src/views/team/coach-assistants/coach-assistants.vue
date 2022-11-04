<template>
  <b-overlay :show="is_loading" rounded="sm" class="items-layout">
    <div class="items-header">
      <span class="title">مساعدون المدرب</span>
      <b-button @click="$router.push('/coach-assistants/add')" class="add-new-btn">إضافة مساعد مدرب جديد</b-button>
    </div>

    <div class="err" v-if="error">{{ error_message }}</div>

    <b-modal id="delete-model" title="حذف مساعد المدرب" hide-footer>
      <b-overlay v-if="!delete_success" :show="is_loading">
        <div class="d-block">
          <span>هل انت متاكد من حذف مساعد المدرب: {{ selected_coach_assistant.id }}</span>
        </div>
        <div class="d-flex">
          <b-button class="mt-3 ms-2 btn-success" @click="deleteCoach" block>حذف</b-button>
          <b-button class="mt-3 btn-danger" type="reset" block @click="$bvModal.hide('delete-model')">إغلاق</b-button>
        </div>
      </b-overlay>
      <b-overlay v-else-if="delete_success" :show="is_loading">
        <div class="d-block mb-2">
          <span>تم حذف مساعد المدرب</span>
        </div>
        <div>
          <b-button class="mt-3 btn-danger" block @click="loadCoaches">إغلاق</b-button>
        </div>
      </b-overlay>
    </b-modal>

    <div>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">الصورة</th>
            <th scope="col">الايميل</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody v-if="coach_assistants.length > 0" class="table-group-divider">
          <tr v-for="coach in coach_assistants" :key="coach.id">
            <th scope="row">{{ coach.id }}</th>
            <td><img class="administrator-img" :src="coach.image"></td>
            <td>{{ coach.email }}</td>
            <td>
              <b-button @click="displayDeleteModel(coach)" v-b-tooltip.hover title="حذف مساعد المدرب" class="btn remove-btn">
                <i class="far fa-trash-alt"></i>
              </b-button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div v-if="coach_assistants.length < 1">
        لايوجد إداريون
      </div>
    </div>


  </b-overlay>
</template>

<script>
import router from "@/router";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "coach-assistants",
  data() {
    return {
      is_loading: false,
      error: false,
      error_message: '',
      coach_assistants: [],
      delete_success: false,
      selected_coach_assistant: ''
    }
  },
  created() {
    window.scrollTo(0,0);

    if (!this.$store.getters.isAuthenticated || this.$store.getters.role !== this.$store.getters.teamRole) {
      router.push("/login")
    }
    this.loadCoaches();
  },
  methods: {
    async loadCoaches() {
      this.is_loading = true;
      this.error = false;
      this.coach_assistants = [];
      this.$bvModal.hide('delete-model')

      let token = this.$store.getters.token;
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      let url = this.$store.getters["main/getURL"] + '/api/team/get-team-coach-assistant';
      await fetch(url, requestOptions)
          .then(response => response.json())
          .then(response => {
            if (response.status)
              this.coach_assistants = response.data
          })
          .catch(error => console.log('error', error));

      this.is_loading = false

    },
    displayDeleteModel(coach) {
      this.selected_coach_assistant = coach;
      this.$bvModal.show('delete-model')
    },
    async deleteCoach() {
      this.is_loading = true;

      let token = this.$store.getters.token;
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);


      let requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
      };

      let url = this.$store.getters["main/getURL"] + '/api/team/delete-coach-assistant/' + this.selected_coach_assistant.id;
      await fetch(url, requestOptions)
          .then(response => response.json())
          .then(response => {
            console.log(response)
            if (response.status)
              this.delete_success = true;
          })
          .catch(error => console.log('error', error));

      this.is_loading = false
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/admin-shared";


</style>