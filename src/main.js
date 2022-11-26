import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import AOS from 'aos'
import BootstrapVue from 'bootstrap-vue'
import IconsPlugin from 'bootstrap-vue'

import 'aos/dist/aos.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDRymdCLWxCwLHFnwv36iieKAMjiwk8sdc',
    libraries: 'places',
  },
})

import { use } from 'echarts/core'

export * from 'echarts/core'

import { SVGRenderer, CanvasRenderer } from 'echarts/renderers'

import {
  LineChart,
  BarChart,
  PieChart,
  ScatterChart,
  RadarChart,
  MapChart,
  TreeChart,
  TreemapChart,
  GraphChart,
  GaugeChart,
  FunnelChart,
  ParallelChart,
  SankeyChart,
  BoxplotChart,
  CandlestickChart,
  EffectScatterChart,
  LinesChart,
  HeatmapChart,
  PictorialBarChart,
  ThemeRiverChart,
  SunburstChart,
  CustomChart,
} from 'echarts/charts'

import {
  GridComponent,
  PolarComponent,
  GeoComponent,
  SingleAxisComponent,
  ParallelComponent,
  CalendarComponent,
  GraphicComponent,
  ToolboxComponent,
  TooltipComponent,
  AxisPointerComponent,
  BrushComponent,
  TitleComponent,
  TimelineComponent,
  MarkPointComponent,
  MarkLineComponent,
  MarkAreaComponent,
  LegendComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  VisualMapComponent,
  VisualMapContinuousComponent,
  VisualMapPiecewiseComponent,
  AriaComponent,
  DatasetComponent,
  TransformComponent,
} from 'echarts/components'

import { UniversalTransition, LabelLayout } from 'echarts/features'

use([CanvasRenderer])
use([SVGRenderer])
use([
  LineChart,
  BarChart,
  PieChart,
  ScatterChart,
  RadarChart,
  MapChart,
  TreeChart,
  TreemapChart,
  GraphChart,
  GaugeChart,
  FunnelChart,
  ParallelChart,
  SankeyChart,
  BoxplotChart,
  CandlestickChart,
  EffectScatterChart,
  LinesChart,
  HeatmapChart,
  PictorialBarChart,
  ThemeRiverChart,
  SunburstChart,
  CustomChart,
])
use(GridComponent)
use(PolarComponent)
use(GeoComponent)
use(SingleAxisComponent)
use(ParallelComponent)
use(CalendarComponent)
use(GraphicComponent)
use(ToolboxComponent)
use(TooltipComponent)
use(AxisPointerComponent)
use(BrushComponent)
use(TitleComponent)
use(TimelineComponent)
use(MarkPointComponent)
use(MarkLineComponent)
use(MarkAreaComponent)
use(LegendComponent)
use(DataZoomComponent)
use(DataZoomInsideComponent)
use(DataZoomSliderComponent)
use(VisualMapComponent)
use(VisualMapContinuousComponent)
use(VisualMapPiecewiseComponent)
use(AriaComponent)
use(TransformComponent)
use(DatasetComponent)
use(UniversalTransition)
use(LabelLayout)

import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
Vue.prototype.$iziToast = iziToast // Glopal variable
Vue.use(iziToast)

axios.defaults.baseURL = 'https://counter-api.counterattack.top/api'

if (localStorage.getItem('token')) {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + localStorage.getItem('token')
}

axios.defaults.headers.common['Accept'] = 'application/json'

Vue.config.productionTip = false

Vue.use(AOS)
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  store,
  mounted() {
    AOS.init()
  },
  render: (h) => h(App),
}).$mount('#app')
