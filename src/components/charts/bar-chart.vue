<template>
  <v-chart class="chart" :option="option" />
</template>

<script>
import VChart, { THEME_KEY } from "vue-echarts";

export default {
  name: "bar-chart",
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: ""
  },
  data() {
    return {
      option: {
        title: {
          text: 'Stacked Line',
          left: 'center'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [
              {
                value: 50,
                itemStyle: {
                  color: '#a90000'
                }
              },
              200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      }
    };
  }

}
</script>

<style scoped>
.chart {
  height: 600px;
  padding: 40px 20px 0;
}

</style>