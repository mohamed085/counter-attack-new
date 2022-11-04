<template>
  <b-overlay :show="is_loading" rounded="sm" class="items-layout">
    <div class="items-header">
      <span class="title">الإداريون</span>
      <b-button @click="$router.push('/administrators/add')" class="add-new-btn">إضافة إداري جديد</b-button>
    </div>

    <div class="err" v-if="error">{{ error_message }}</div>

    <b-modal id="delete-model" title="حذف الإداري" hide-footer>
      <b-overlay v-if="!delete_success" :show="is_loading">
        <div class="d-block">
          <span>هل انت متاكد من حذف الإداري: {{ selected_administrator.id }}</span>
        </div>
        <div class="d-flex">
          <b-button class="mt-3 ms-2 btn-success" @click="deleteAdministrator" block>حذف</b-button>
          <b-button class="mt-3 btn-danger" type="reset" block @click="$bvModal.hide('delete-model')">إغلاق</b-button>
        </div>
      </b-overlay>
      <b-overlay v-else-if="delete_success" :show="is_loading">
        <div class="d-block mb-2">
          <span>تم حذف الإداري بنجاح</span>
        </div>
        <div>
          <b-button class="mt-3 btn-danger" block @click="loadAdministrators">إغلاق</b-button>
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
          <tbody v-if="administrators.length > 0" class="table-group-divider">
          <tr v-for="administrator in administrators" :key="administrator.id">
            <th scope="row">{{ administrator.id }}</th>
            <td><img class="administrator-img" :src="administrator.image"></td>
            <td>{{ administrator.email }}</td>
            <td>
              <b-button @click="displayDeleteModel(administrator)" v-b-tooltip.hover title="حذف الإداري" class="btn remove-btn">
                <i class="far fa-trash-alt"></i>
              </b-button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div v-if="administrators.length < 1">
        لايوجد إداريون
      </div>
    </div>

    <!--    <div class="overflow-auto p-5">-->
    <!--      <b-pagination-nav :link-gen="linkGen" :number-of-pages="10" use-router align="right" size="lg"></b-pagination-nav>-->
    <!--    </div>-->

  </b-overlay>
</template>

<script>
import router from "@/router";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "administrators",
  data() {
    return {
      is_loading: false,
      error: false,
      error_message: '',
      administrators: [],
      delete_success: false,
      selected_administrator: ''
    }
  },
  created() {
    window.scrollTo(0,0);

    if (!this.$store.getters.isAuthenticated || this.$store.getters.role !== this.$store.getters.teamRole) {
      router.push("/login")
    }
    this.loadAdministrators();
  },
  methods: {
    async loadAdministrators() {
      this.is_loading = true;
      this.error = false;
      this.administrators = [];
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

      let url = this.$store.getters["main/getURL"] + '/api/team/get-team-adminstratives';
      await fetch(url, requestOptions)
          .then(response => response.json())
          .then(response => {
            if (response.status)
              this.administrators = response.data
            console.log(this.administrators)
          })
          .catch(error => console.log('error', error));

      this.is_loading = false

    },
    displayDeleteModel(administrator) {
      this.selected_administrator = administrator;
      this.$bvModal.show('delete-model')
    },
    async deleteAdministrator() {
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

      let url = this.$store.getters["main/getURL"] + '/api/team/delete-adminstrative/' + this.selected_administrator.id;
      await fetch(url, requestOptions)
          .then(response => response.json())
          .then(response => {
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