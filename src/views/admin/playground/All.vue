<template>
  <div>
    <div class="err" v-if="error">{{ error_message }}</div>

    <b-overlay :show="is_loading" rounded="sm" class="items-layout">
      <div class="items-header">
        <span class="title">الملاعب</span>
        <b-button @click="$router.push('/playgrounds/add')" class="add-new-btn">
          إضافة معلب جديد
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
                <th scope="col">المنطقة</th>
                <th scope="col">اقصي عدد لاعيبه</th>
                <th scope="col">سعر الساعة</th>
                <th scope="col">الاجراءات</th>
              </tr>
            </thead>
            <tbody v-if="playgrounds" class="table-group-divider">
              <tr v-for="playground in playgrounds" :key="playground.id">
                <th scope="row">{{ playground.id }}</th>
                <td>{{ playground.name }}</td>
                <td>{{ playground.area }}</td>
                <td>{{ playground.max_players }}</td>
                <td>{{ playground.hour_price }}</td>
                <td>
                  <b-button-group>
                    <b-button variant="info" @click="view(playground.id)">
                      تعديل
                    </b-button>

                    <b-button
                      variant="danger"
                      @click="deletePlayground(playground.id)"
                    >
                      حذف
                    </b-button>
                  </b-button-group>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="!playgrounds">
          لايوجد ملاعب متاحه
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

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'accepted-teams',
  data() {
    return {
      is_loading: false,
      error: false,
      error_message: '',
      playgrounds: null,
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
        .get('admin/get-playgrounds')
        .then((data) => {
          this.playgrounds = data.data.data

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
      this.$router.push('/playgrounds/edit/' + id)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/admin-shared';
</style>
