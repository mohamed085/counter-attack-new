<template>
  <div>
    <div class="home">
      <div v-if="sidebar" class="home__sidebar">
        <sidebar></sidebar>
      </div>

      <div class="home__navbar" :class="sidebar ? 'main-sidebar-on' : 'main-sidebar-off'">
        <div class="home__navbar__content">
          <i @click="sidebar = !sidebar" class="home__navbar__content__icon fas fa-align-justify"></i>
          <div class="home__navbar__content__search">
            <b-form-input v-model="search_value" placeholder="ابحث هنا..."></b-form-input>
            <i class="fas fa-search"></i>
          </div>
          <div class="home__navbar__content__settings">
            <img src="../assets/img/user-small.png">
          </div>
        </div>
      </div>

      <div :class="sidebar ? 'main-sidebar-on' : 'main-sidebar-off'">
        <div class="home__main">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/sidebar";
import router from "@/router";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "home",
  components: {
    Sidebar
  },
  created() {
    window.scrollTo(0,0);

    if (!this.$store.getters.isAuthenticated) {
      router.push("/login")
    }
  },
  data() {
    return {
      is_loading: false,
      sidebar: (window.innerWidth > 900),
      search_value: '',

    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/home";

</style>