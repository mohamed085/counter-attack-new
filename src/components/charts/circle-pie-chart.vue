<template>
  <v-chart class="chart" :option="option" />
</template>

<script>
import VChart, { THEME_KEY } from "vue-echarts";

export default {
  name: "circle-pie-chart",
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
          top: '10%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
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