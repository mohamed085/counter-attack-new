<template>
  <div class="card">
    <v-chart class="chart" :option="option" />
  </div>
</template>

<script>
import VChart, { THEME_KEY } from "vue-echarts";

export default {
  name: "pie-chart",
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: ""
  },
  props: ['option'],
  data() {
    return {
    };
  }

}
</script>

<style lang="scss" scoped>

@import "../../assets/css/variables";
@import "../../assets/css/mixins";


.chart {
  height: 420px;
  width: 100%;
  padding: 20px 10px 0;

  @include respond('tab-port') {
    height: 300px;
  }

}

.card {
  background: $color-white;
  background-clip: border-box;
  border: 1px solid #deebfd;
  box-shadow: -8px 12px 18px 0 #dadee8;
  padding: 15px 10px;

}
</style>