<template>
  <v-chart class="chart" :option="option" />
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
  data() {
    return {
      option: {
        title: {
          text: 'Referer of a Website',
          subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '8%',
          orient: 'vertical',
          left: 'right'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
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