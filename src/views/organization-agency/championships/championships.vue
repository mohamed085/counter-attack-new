<template>
  <div>
    <div class="err" v-if="error">{{ error_message }}</div>

    <b-overlay :show="is_loading" rounded="sm" class="items-layout">
      <div class="items-header">
        <span class="title">بطولتي</span>
      </div>

      <div class="err" v-if="error">{{ error_message }}</div>

      <div>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">اسم البطولة</th>
              <th scope="col">المكان</th>
              <th scope="col">نوع البطولة</th>
              <th scope="col">عدد الفرق</th>
              <th scope="col">عدد الفرق الموجودة</th>
              <th scope="col">عدد الفرق المقدمة</th>
            </tr>
            </thead>
            <tbody v-if="champions.length > 0" class="table-group-divider">
            <tr v-for="champion in champions" :key="champion.id" @click="view(champion.id)">
              <th scope="row">{{ champion.id }}</th>
              <td>{{ champion.name }}</td>
              <td>{{ champion.place }}</td>
              <td>{{ champion.status }}</td>
              <td>{{ champion.number_of_teams }}</td>
              <td>{{ champion.count_of_accepted_teams }}</td>
              <td>{{ champion.count_of_all_teams }}</td>
            </tr>
            </tbody>
          </table>
        </div>

        <div v-if="champions.length < 1">
          لايوجد فرق متاحة
        </div>
      </div>

      <!--    <div class="overflow-auto p-5">-->
      <!--      <b-pagination-nav :link-gen="linkGen" :number-of-pages="10" use-router align="right" size="lg"></b-pagination-nav>-->
      <!--    </div>-->

    </b-overlay>
  </div>
</template>

<script>
import router from "@/router";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
    name: "championships",
  data() {
    return {
      is_loading: false,
      error: false,
      error_message: '',
      champions: []
    }
  },
  created() {
    window.scrollTo(0,0);

    if (!this.$store.getters.isAuthenticated || this.$store.getters.role !== this.$store.getters.organizationRole) {
      router.push("/login")
    }
    this.loadChampions();
  },
  methods: {
    async loadChampions() {
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

      let url = this.$store.getters["main/getURL"] + '/api/organization/get-organization-championships';
      const response = await fetch(url, requestOptions);
      const responseData = await response.json();
      console.log(responseData)

      if (!response.ok || !responseData.status) {
        this.error = true
        this.error_message = "حدث خطأ ما"
      } else {
        this.champions = responseData.data
        this.is_loading = false
      }
    },
    view(id) {
      this.$router.push("/championships/view/" + id);
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/admin-shared";


</style>