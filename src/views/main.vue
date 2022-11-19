<template>
<!--  <div v-if="$store.getters.role === $store.getters.adminRole">-->
<!--    <admin-statistics></admin-statistics>-->
<!--  </div>-->

  <admin-statistics></admin-statistics>

<!--  <div v-else-if="$store.getters.role === $store.getters.teamRole">-->
<!--    <team-statistics></team-statistics>-->
<!--  </div>-->
</template>

<script>
import AdminStatistics from "@/views/admin/statistics";
// import TeamStatistics from "@/views/team/statistics";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "main",
  components: {
    // TeamStatistics,
    AdminStatistics
  },
}
</script>

<style scoped>

</style>