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
            <div v-if="drop" class="home__navbar__content__settings__drop">
<!--              <router-link to="/account" class="link">-->
<!--                <i class="fas fa-user-alt"></i>-->
<!--                <span>الصفحة الشخصية</span>-->
<!--              </router-link>-->
<!--              <router-link to="/settings" class="link">-->
<!--                <i class="fas fa-user-cog"></i>-->
<!--                <span>الإعدادات</span>-->
<!--              </router-link>-->
              <span @click="$store.dispatch('logout')" class="link">
                <i class="fas fa-sign-out"></i>
                <span>تسجيل الخروج</span>
              </span>
            </div>
            <span class="logout">
              <span @click="$store.dispatch('logout')" class="link">
                <i class="fas fa-sign-out"></i>
                <span>تسجيل الخروج</span>
              </span>
            </span>

<!--            <img @click="drop = !drop" src="../assets/img/logo-sm.png">-->
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
  data() {
    return {
      is_loading: false,
      sidebar: (window.innerWidth > 900),
      search_value: '',
      drop: false
    }
  },
  created() {
    window.scrollTo(0,0);

    if (!this.$store.getters.isAuthenticated) {
      router.push("/login")
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/css/home";

</style>