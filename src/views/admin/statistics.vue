<template>
  <div>
    <div class="err" v-if="error">{{ error_message }}</div>

    <b-overlay :show="is_loading" rounded="sm" class="content">
      <div class="row">
        <div class="col-6 col-md-3 col-12 mb-4">
          <div class="status card">
            <div class="icon blue">
              <i class="blue fas fa-futbol"></i>
            </div>
            <div class="details">
              <span class="title">الملاعب </span>
              <span class="num">{{ statistics.playgrounds }}</span>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3 col-12 mb-4">
          <div class="status card">
            <div class="icon red">
              <i class="red fas fa-users"></i>
            </div>
            <div class="details">
              <span class="title">الفرق  </span>
              <span class="num">{{ statistics.teams }}</span>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3 col-12 mb-4">
          <div class="status card">
            <div class="icon green">
              <i class="green fas fa-users"></i>
            </div>
            <div class="details">
              <span class="title">اللجان المنظمة   </span>
              <span class="num">{{ statistics.organization_agencies }}</span>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3 col-12 mb-4">
          <div class="status card">
            <div class="icon red">
              <i class="red fas fa-users"></i>
            </div>
            <div class="details">
              <span class="title">الاكاديميات </span>
              <span class="num">{{ statistics.academies }}</span>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3 col-12 mb-4">
          <div class="status card">
            <div class="icon red">
              <i class="red fas fa-pen"></i>
            </div>
            <div class="details">
              <span class="title">المنشورات </span>
              <span class="num">{{ statistics.posts }}</span>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3 col-12 mb-4">
          <div class="status card">
            <div class="icon green">
              <i class="green fas fa-ad"></i>
            </div>
            <div class="details">
              <span class="title">الرعاه  </span>
              <span class="num">{{ statistics.sponsors }}</span>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3 col-12 mb-4">
          <div class="status card">
            <div class="icon red">
              <i class="red fas fa-ad"></i>
            </div>
            <div class="details">
              <span class="title">الاعلانات</span>
              <span class="num">{{ statistics.ads }}</span>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3 col-12 mb-4">
          <div class="status card">
            <div class="icon blue">
              <i class="blue fas fa-futbol"></i>
            </div>
            <div class="details">
              <span class="title">البطولات </span>
              <span class="num">{{ statistics.championships }}</span>
            </div>
          </div>
        </div>
      </div>


      <div class="row justify-content-center">
        <div class="col-12 col-md-6 mt-3">
          <pie-chart :option="users_option"></pie-chart>
        </div>

        <div class="col-12 col-md-6 mt-3">
          <pie-chart :option="users_details_option"></pie-chart>
        </div>

        <div class="col-12 col-md-6 mt-3">
          <pie-chart :option="products_option"></pie-chart>
        </div>

        <div class="col-12 col-md-6 mt-3">
          <pie-chart :option="messages_option"></pie-chart>
        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import PieChart from "@/components/charts/pie-chart";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "statistics",
  components: {
    PieChart
  },
  created() {
    this.loadStatistics();
  },
  data() {
    return {
      is_loading: false,
      error: false,
      error_message: '',
      statistics: null,
      users_option: {
        title: null,
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '8%',
          orient: 'vertical',
          left: 'right'
        },
        series: null
      },
      users_details_option: {
        title: null,
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '8%',
          orient: 'vertical',
          left: 'right'
        },
        series: null
      },
      products_option: {
        title: null,
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '8%',
          orient: 'vertical',
          left: 'right'
        },
        series: null
      },
      messages_option: {
        title: null,
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '8%',
          orient: 'vertical',
          left: 'right'
        },
        series: null
      },

    }
  },
  methods: {
    async loadStatistics() {
      this.is_loading = true;
      this.error = false;

      let token = this.$store.getters.token;
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      let url = this.$store.getters["main/getURL"] + '/api/admin/all-statistics';
      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (!response.ok || !responseData.status) {
        this.error = true
        this.error_message = "حدث خطأ ما"
      } else {
        this.statistics = responseData.data
        this.setUsersOptionData(this.statistics);
        this.setUsersDetailsOptionData(this.statistics);
        this.setProductsOptionData(this.statistics);
        this.setMessagesOptionData(this.statistics);
        this.is_loading = false
      }
    },
    setUsersOptionData(statistics) {
      this.users_option.title = {
        text: 'اعداد المستخدمين',
        left: 'center'
      };
      this.users_option.series = [
        {
          name: '',
          type: 'pie',
          radius: '50%',
          data: [
            { value: statistics.users.last_year, name: 'في اخر سنة' },
            { value: statistics.users.last_month, name: 'في اخر شهر' },
            { value: statistics.users.last_week, name: 'في اخر اسبوع' },
            { value: statistics.users.last_day, name: 'في اخر يوم' },
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
    },
    setUsersDetailsOptionData(statistics) {
      this.users_details_option.title = {
        text: 'تفاصيل المستخدمين',
        left: 'center'
      };
      this.users_details_option.series = [
        {
          name: '',
          type: 'pie',
          radius: '50%',
          data: [
            { value: statistics.players, name: 'عدد اللاعبين الاجمالى' },
            { value: statistics.rulers, name: 'عدد الحكام' },
            { value: statistics.journalists, name: 'عدد الصحفيين' },
            { value: statistics.photographers, name: 'عدد المصورين' },
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
    },
    setProductsOptionData(statistics) {
      this.products_option.title = {
        text: 'اعداد المنتجات ',
        left: 'center'
      };
      this.products_option.series = [
        {
          name: '',
          type: 'pie',
          radius: '50%',
          data: [
            { value: statistics.products.all, name: 'الاجمالى ' },
            { value: statistics.products.number_of_purchases, name: 'المباعه ' },
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
    },
    setMessagesOptionData(statistics) {
      this.messages_option.title = {
        text: 'اعداد الرسائل',
        left: 'center'
      };
      this.messages_option.series = [
        {
          name: '',
          type: 'pie',
          radius: '50%',
          data: [
            { value: statistics.messages.last_year, name: 'في اخر سنة' },
            { value: statistics.messages.last_month, name: 'في اخر شهر' },
            { value: statistics.messages.last_day, name: 'في اخر يوم' },
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
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/admin-shared";
@import "../../assets/css/admin-team";

</style>