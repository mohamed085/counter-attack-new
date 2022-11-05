<template>
  <div class="sidebar">
    <router-link to="/" class="logo">
      <img src="../assets/img/logo.png">
    </router-link>

    <div class="user">
      <img class="profile-img" src="https://pbs.twimg.com/profile_images/1501322370090471424/ObjAN9Dn_400x400.jpg">
      <span class="name">Mohamed Emad</span>
      <span v-if="role === this.$store.getters.adminRole" class="role">ادمن</span>
      <span v-if="role === this.$store.getters.teamRole" class="role">ادمن الفريق</span>
      <span v-if="role === this.$store.getters.organizationRole" class="role">ادمن المنظمة</span>
    </div>

    <admin-sidebar-items v-if="role === this.$store.getters.adminRole"></admin-sidebar-items>
    <team-sidebar-items v-if="role === this.$store.getters.teamRole"></team-sidebar-items>
    <organization-agency-sidebar-items v-if="role === this.$store.getters.organizationRole"></organization-agency-sidebar-items>
  </div>
</template>

<script>
import AdminSidebarItems from "@/components/admin/sidebar-items";
import TeamSidebarItems from "@/components/team/sidebar-items";
import OrganizationAgencySidebarItems from "@/components/organization-agency/sidebar-items";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "sidebar",
  components: {
    AdminSidebarItems,
    TeamSidebarItems,
    OrganizationAgencySidebarItems,
  },
  data() {
    return {
      role: '',
    }
  },
  created() {
    this.role = this.$store.getters.role;
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/variables";

.sidebar {
  color: $color-white;
  transition: all .5s ease-in-out !important;

  & .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    padding: 10px 0;

    & img {
      width: 85%;
    }
  }

  & .user {
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    & .profile-img {
      max-width: 60%;
      max-height: 100px;
      border: 2px solid #c9d2e8;
      box-shadow: 0 5px 5px 0 rgb(44 44 44 / 20%);
      padding: 3px;
      background: #fff;
      border-radius: 100%;
    }

    & .name {
      margin-top: 10px;
      font-size: 16px;
    }
  }

}
</style>