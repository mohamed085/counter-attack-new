<template>
  <div v-if="$store.getters.role === $store.getters.adminRole">
    <div class="row">
      <div class="col-12">
        <line-chart></line-chart>
      </div>
      <div class="col-12 col-md-6">
        <circle-pie-chart></circle-pie-chart>
      </div>
      <div class="col-12 col-md-6">
        <pie-chart></pie-chart>
      </div>
      <div class="col-12">
        <bar-chart></bar-chart>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/charts/line-chart";
import CirclePieChart from "@/components/charts/circle-pie-chart";
import PieChart from "@/components/charts/pie-chart";
import BarChart from "@/components/charts/bar-chart";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "main",
  components: {BarChart, PieChart, CirclePieChart, LineChart}
}
</script>

<style scoped>

</style>