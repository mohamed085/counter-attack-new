<template>
  <div>
    <div class="err" v-if="error">{{ error_message }}</div>

    <b-overlay :show="is_loading" rounded="sm" class="items-layout">
      <div class="items-header">
        <span class="title">الملاعب</span>
        <b-button @click="$router.push('/ads/add')" class="add-new-btn">
          إضافة إعلان جديد
        </b-button>
      </div>

      <div class="err" v-if="error">{{ error_message }}</div>

      <div>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">الاسم</th>
              <th scope="col">الوصف</th>
              <th scope="col">النوع</th>
              <th scope="col">معلومات ذات صله</th>
              <th scope="col"></th>
            </tr>
            </thead>
            <tbody v-if="ads" class="table-group-divider">
            <tr v-for="ad in ads" :key="ad.id">
              <th scope="row">{{ ad.id }}</th>
              <td>{{ ad.title }}</td>
              <td>{{ ad.description }}</td>
              <td>{{ ad.type }}</td>
              <td>{{ ad.related_information }}</td>
              <td>
                <b-button-group>
                  <b-button variant="info" @click="view(ad.id)">
                    تعديل
                  </b-button>
                  <deleter
                      @refreshData="getPlaygrounds()"
                      :id="ad.id"
                      name="admin/delete-ad"
                  />
                </b-button-group>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div v-if="!ads">
          لايوجد إعلانات متاحه
        </div>
      </div>

      <!--    <div class="overflow-auto p-5">-->
      <!--      <b-pagination-nav :link-gen="linkGen" :number-of-pages="10" use-router align="right" size="lg"></b-pagination-nav>-->
      <!--    </div>-->
    </b-overlay>

  </div>
</template>

<script>
import router from '@/router'
import Deleter from '@/components/Deleter.vue'

export default {
  components: { Deleter },
  name: "AllAds",
  data() {
    return {
      is_loading: false,
      error: false,
      error_message: '',
      ads: null,
    }
  },
  created() {
    window.scrollTo(0, 0)

    if (
        !this.$store.getters.isAuthenticated ||
        this.$store.getters.role !== this.$store.getters.adminRole
    ) {
      router.push('/login')
    }
    this.getPlaygrounds()
  },
  methods: {
    getPlaygrounds() {
      this.is_loading = true
      this.error = false

      this.axios
          .get('admin/get-ads')
          .then((data) => {
            this.ads = data.data.data

            this.is_loading = false
          })
          .catch(() => {
            this.is_loading = false

            this.error_message = 'حدث خطأ ما'
          })
    },
    deletePlayground(id) {
      console.log(id)
    },

    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
    view(id) {
      this.$router.push('/ads/edit/' + id)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/admin-shared';
</style>
