<template>
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
</template>

<script>
import BarChart from "@/components/charts/bar-chart";
import PieChart from "@/components/charts/pie-chart";
import CirclePieChart from "@/components/charts/circle-pie-chart";
import LineChart from "@/components/charts/line-chart";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "statistics",
  components: {BarChart, PieChart, CirclePieChart, LineChart}

}
</script>

<style scoped>

</style>