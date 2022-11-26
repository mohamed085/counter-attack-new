<template>
  <div>
    <div class="err" v-if="error">{{ error_message }}</div>

    <b-overlay :show="is_loading" rounded="sm" class="items-layout">
      <div class="items-header">
        <span class="title">الخصائص</span>
        <div>
          <b-button
            variant="success"
            id="show-btn"
            @click="$bvModal.show('bv-modal-example')"
          >
            اضافة خاصية جديدة
          </b-button>

          <b-modal id="bv-modal-example" hide-footer>
            <template #modal-title>
              اضافة خاصية جديدة
            </template>
            <div class="d-block text-center">
              <b-form-input
                v-model="featureName"
                placeholder="ادخل اسم الخاصية"
              ></b-form-input>
            </div>
            <div class="d-flex">
              <b-button
                variant="success"
                class="mt-3"
                block
                @click="addFeature"
                :disabled="is_loading"
              >
                اضافة
              </b-button>
              <b-button
                class="mt-3"
                block
                variant="info"
                @click="$bvModal.hide('bv-modal-example')"
              >
                الغاء
              </b-button>
            </div>
          </b-modal>
        </div>
      </div>

      <div class="err" v-if="error">{{ error_message }}</div>

      <div>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">الاسم</th>

                <th scope="col ">
                  <span class="d-block text-end">الاجراءات</span>
                </th>
              </tr>
            </thead>
            <tbody v-if="features" class="table-group-divider">
              <tr v-for="feature in features" :key="feature.id">
                <th scope="row">{{ feature.id }}</th>
                <td>{{ feature.name }}</td>

                <td>
                  <div class="actions d-flex justify-content-end">
                    <edit
                      name="admin/update-feature"
                      :id="feature.id"
                      @refreshData="getfeatures"
                      :editValue="feature.name"
                    />

                    <deleter
                      name="admin/delete-feature"
                      @refreshData="getfeatures"
                      :id="feature.id"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="!features">
          لا توجد خصائص متاحه
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
import Edit from '@/components/Edit.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'all_features',
  components: { Deleter, Edit },
  data() {
    return {
      is_loading: false,
      error: false,
      error_message: '',
      features: null,
      featureName: '',
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
    this.getfeatures()
  },
  methods: {
    async getfeatures() {
      this.is_loading = true
      this.error = false

      this.axios
        .get('admin/get-all-features')
        .then((data) => {
          this.features = data.data.data
          console.log(this.features)
          this.is_loading = false
        })
        .catch(() => {
          this.is_loading = false

          this.error_message = 'حدث خطأ ما'
        })
    },
    addFeature() {
      this.is_loading = true
      let data = new FormData()
      data.append('name', this.featureName)
      this.axios.post('admin/add-feature', data).then((data) => {
        this.featureName = ''
        this.$iziToast.success({
          timeout: 2000,
          message: data.data.msg,
          position: 'bottomCenter',
        })
        this.getfeatures()
        this.is_loading = false
        this.$bvModal.hide('bv-modal-example')
      })
    },
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
    view(id) {
      this.$router.push('/features/all/' + id)
    },
  },
}
</script>

<style lang="scss">
.text-end {
  text-align: end !important;
}
@import '../../../assets/css/admin-shared';
</style>
