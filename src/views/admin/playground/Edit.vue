<template>
  <div class="add-container">
    <div class="items-header">
      <span class="title">
        تعديل
      </span>
    </div>

    <div class="err" v-if="error">{{ error_message }}</div>

    <b-overlay :show="is_loading" rounded="sm">
      <b-form @submit.prevent="validateCreateForm1">
        <div class="card p-3 mb-5">
          <div class="form-group">
            <div class="title">الاسم</div>
            <b-form-input
              type="text"
              placeholder="ادخل الاسم"
              v-model="playground.name"
            ></b-form-input>
          </div>
          <div class="form-group">
            <div class="title">المنطقة</div>
            <b-form-input
              type="text"
              placeholder="المنطقة"
              v-model="playground.area"
            ></b-form-input>
          </div>
          <div class="form-group">
            <div class="title">سعر الساعه</div>
            <b-form-input
              type="number"
              placeholder="سعر الساعه"
              v-model="playground.hour_price"
            ></b-form-input>
          </div>
          <div class="form-group">
            <div class="title">اقصي عدد لاعبين</div>
            <b-form-input
              type="number"
              placeholder="اقصي عدد لاعبين"
              v-model="playground.max_players"
            ></b-form-input>
          </div>
          <div class="form-group">
            <div class="title">من الساعة</div>
            <b-form-timepicker
              v-model="playground.work_from"
              locale="en"
              placeholder="اختر الوقت"
            ></b-form-timepicker>
          </div>
          <div class="form-group">
            <div class="title">الي الساعة</div>

            <b-form-timepicker
              v-model="playground.work_to"
              locale="en"
              placeholder="اختر الوقت"
            ></b-form-timepicker>
          </div>
          <div class="row">
            <div class="col-2">الموقع</div>
            <div class="col-10">
              <!-- <div class="col-lg-12 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  id="autocomplete2"
                  @click="getAddress"
                  v-model.trim="playground.location_description"
                />
                <label for="autocomplete2" class="form-label">
                  الموقع
                </label>
              </div>
            </div> -->

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="title">lat</div>
                    <b-form-input
                      type="text"
                      placeholder="Latitude"
                      v-model="playground.lat"
                    ></b-form-input>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="title">lng</div>
                    <b-form-input
                      type="text"
                      placeholder="langitude"
                      v-model="playground.lng"
                    ></b-form-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center">
            <b-button
              type="button"
              @click="validateCreateForm1"
              class="save-btn mx-auto"
            >
              حفظ
            </b-button>
          </div>
        </div>
        <div class="card p-3 mb-5">
          <div class="title col-2 mb-3 fs-4">الايام</div>
          <div class="row mb-4" v-if="playground.days">
            <div
              class="form-group col-6"
              v-for="day in playground.days"
              :key="day.id"
            >
              <div class="card flex-1 ml-2 px-3 py-2">
                <p class="m-0">
                  <span>{{ day.name }}</span>
                </p>
              </div>
              <b-button
                type="button"
                @click="changeDayStatus(day.id)"
                :variant="day.status == 'on' ? 'danger' : 'success'"
                class="mx-2"
              >
                {{ day.status == 'on' ? 'الغاء التفعيل' : 'تفعيل' }}
              </b-button>
              <deleter
                :id="day.id"
                name="admin/delete-playground-day"
                @refreshData="getPlayground()"
              />
            </div>
          </div>
          <div class="row mb-5">
            <div class="title col-2 fs-5">اضافة جديد</div>
            <div class="col-10 py-3 card">
              <div class="row">
                <div
                  class="col-12 mb-2 py-0 d-flex align-items-center"
                  v-for="(day, day_index) in days"
                  :key="day_index"
                >
                  <div class="form-group m-0 col-10">
                    <div class="title">اليوم</div>

                    <b-form-datepicker
                      v-model="day.value"
                      @input="setDaysValues(day_index, day.value)"
                    ></b-form-datepicker>
                  </div>
                  <div
                    class="py-0 col-1 d-flex justify-content-center align-items-center"
                    v-if="day_index == days.length - 1"
                  >
                    <span class="append" @click="appendDay()">
                      <i class="fas fa-plus-circle"></i>
                    </span>
                  </div>
                  <div
                    class="col-1 py-0 d-flex justify-content-center align-items-center"
                    v-if="days.length > 1"
                  >
                    <span class="append" @click="deleteDay(day_index)">
                      <i class="fas fa-minus-circle"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center">
            <b-button
              type="button"
              @click="updateForm2"
              class="save-btn mx-auto"
              :disabled="!days[0].value"
            >
              حفظ
            </b-button>
          </div>
        </div>
        <div class="card p-3 mb-5">
          <div class="row mt-4">
            <div class="title col-2 my-3 fs-4">الخصائص</div>
            <div class="row my-3" v-if="playground.features">
              <div
                class="form-group col-6"
                v-for="feature in playground.features"
                :key="feature.id"
              >
                <div class="card flex-1 ml-2 px-3 py-2">
                  <p class="m-0">
                    <span>{{ feature.name }}</span>
                  </p>
                </div>

                <deleter
                  :id="`${id}/${feature.id}`"
                  name="admin/delete-playground-feature"
                  @refreshData="getPlayground()"
                />
              </div>
            </div>
            <div class="title col-2 my-3 fs-5">اضافه جديد</div>
            <div class="col-10 py-3 card">
              <div class="row">
                <div
                  class="col-12 mb-2 py-0 d-flex align-items-center"
                  v-for="(feature, feature_index) in featuresRow"
                  :key="feature_index"
                >
                  <div class="form-group m-0 col-10">
                    <b-form-select
                      v-model="feature.value"
                      class="w-100"
                      @change="setFeaturesValue(feature_index, feature.value)"
                    >
                      <b-form-select-option :value="null">
                        حدد خاصية
                      </b-form-select-option>
                      <b-form-select-option
                        v-for="feature in features"
                        :key="feature.id"
                        :value="feature.id"
                      >
                        {{ feature.name }}
                      </b-form-select-option>
                    </b-form-select>
                  </div>
                  <div
                    class="py-0 col-1 d-flex justify-content-center align-items-center"
                    v-if="feature_index == featuresRow.length - 1"
                  >
                    <span class="append" @click="appendFeature()">
                      <i class="fas fa-plus-circle"></i>
                    </span>
                  </div>
                  <div
                    class="col-1 py-0 d-flex justify-content-center align-items-center"
                    v-if="featuresRow.length > 1"
                  >
                    <span class="append" @click="deleteFeature(feature_index)">
                      <i class="fas fa-minus-circle"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center">
            <b-button
              type="button"
              @click="validateCreateForm3"
              class="save-btn mx-auto"
              :disabled="!featuresRow[0].value"
            >
              حفظ
            </b-button>
          </div>
        </div>
        <div class="card p-3 mb-5">
          <div class="row mt-4">
            <div class="title col-2 fs-4">الصور</div>
            <div class="row" v-if="playground.images">
              <div
                class="form-group col-5"
                v-for="image in playground.images"
                :key="image.id"
              >
                <div class="card flex-1 ml-2 px-3 py-2">
                  <img
                    v-if="image.image"
                    :src="image.image"
                    class="img-fluid"
                    alt="image"
                  />
                </div>

                <deleter
                  :id="image.id"
                  name="admin/delete-playground-image"
                  @refreshData="getPlayground()"
                />
              </div>
            </div>
            <div class="col-10 py-3 card">
              <div class="row">
                <div
                  class="col-6 mb-2 py-0 d-flex align-items-center"
                  v-for="(image, image_index) in images"
                  :key="image_index"
                >
                  <div class="form-group m-0 col-10">
                    <!-- v-model="image.img_file"
                    :state="Boolean(image.img_file)" -->
                    <label :for="`image${image_index}`">
                      <img
                        v-if="image.src"
                        :src="image.src"
                        class="img-fluid"
                        alt="image"
                      />
                      <img
                        v-else
                        src="@/assets/img/drop.png"
                        class="img-fluid"
                        alt="image"
                      />
                    </label>
                    <p class="error" v-if="image.err_msg">
                      حجم الصوره يجب الا يتجاوز 2 ميجا
                    </p>
                    <b-form-file
                      accept="image/*"
                      :id="`image${image_index}`"
                      @change="setImagesValue(image_index, $event)"
                      placeholder="اختار صوره او اسحب هنا "
                      drop-placeholder="اسحب"
                    ></b-form-file>
                  </div>
                  <div
                    class="py-0 col-1 d-flex justify-content-center align-items-center"
                    v-if="image_index == images.length - 1"
                  >
                    <span class="append" @click="appendImage()">
                      <i class="fas fa-plus-circle"></i>
                    </span>
                  </div>
                  <div
                    class="col-1 py-0 d-flex justify-content-center align-items-center"
                    v-if="images.length > 1"
                  >
                    <span class="append" @click="deleteImage(image_index)">
                      <i class="fas fa-minus-circle"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center">
            <b-button
              type="button"
              @click="validateCreateForm4"
              class="save-btn mx-auto"
              :disabled="!images[0].value"
            >
              حفظ
            </b-button>
          </div>
        </div>
      </b-form>
    </b-overlay>
  </div>
</template>
<!--<script src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyDRymdCLWxCwLHFnwv36iieKAMjiwk8sdc"></script>-->
<script>
import router from '@/router'
import Deleter from '@/components/Deleter.vue'

export default {
  components: { Deleter },
  name: 'add-user',
  props: ['id'],
  data() {
    return {
      location: {
        lat: 41.0082376,
        lng: 28.97835889999999,
      },
      is_loading: false,
      error: false,
      error_message: '',
      playground: {
        name: '',
        area: '',
        hour_price: null,
        max_players: null,
        work_from: null,
        work_to: null,
        location_description: '',
        lat: '',
        lng: '',
      },
      days: [
        {
          value: null,
        },
      ],

      featuresRow: [
        {
          value: null,
        },
      ],

      images: [
        {
          value: null,
          src: null,
          err_msg: false,
        },
      ],
      features: null,
    }
  },
  created() {
    window.scrollTo(0, 0)
    this.getFeatures()
    if (
      !this.$store.getters.isAuthenticated ||
      this.$store.getters.role !== this.$store.getters.adminRole
    ) {
      router.push('/login')
    }
  },
  methods: {
    // getAddress() {
    //   var self = this
    //   var input = document.getElementById('autocomplete2')
    //   var searchBox = new google.maps.places.SearchBox(input)
    //   searchBox.addListener('places_changed', function () {
    //     var places = searchBox.getPlaces()
    //     if (places.length == 0) {
    //       return
    //     }
    //     var bounds = new google.maps.LatLngBounds()
    //     places.forEach(function (place) {
    //       bounds.extend(place.geometry.location)
    //       place.geometry.location.lng()
    //       place.geometry.location.lat()
    //       place.formatted_address
    //       self.playground.lng = place.geometry.location.lng()
    //       self.playground.lat = place.geometry.location.lat()
    //       self.playground.location_description = place.formatted_address
    //     })
    //   })
    // },
    formateDate(date) {
      return new Date(date).toLocaleDateString()
    },
    validateCreateForm1() {
      this.is_loading = true
      if (this.playground.name == '') {
        this.$iziToast.error({
          timeout: 2000,
          message: 'حقل الاسم مطلوب',
          position: 'bottomCenter',
        })
        this.is_loading = false
        return
      } else if (this.playground.area == '') {
        this.$iziToast.error({
          timeout: 2000,
          message: 'حقل المنطقه مطلوب',
          position: 'bottomCenter',
        })
        this.is_loading = false
        return
      } else if (this.playground.hour_price == '') {
        this.$iziToast.error({
          timeout: 2000,
          message: 'حقل سعر الساعه مطلوب',
          position: 'bottomCenter',
        })
        this.is_loading = false
        return
      } else if (this.playground.max_players == '') {
        this.$iziToast.error({
          timeout: 2000,
          message: ' حقل اقصي عدد مطلوب ',
          position: 'bottomCenter',
        })
        this.is_loading = false
        return
      } else if (this.playground.work_from == '') {
        this.$iziToast.error({
          timeout: 2000,
          message: ' حقل من الساعه مطلوب ',
          position: 'bottomCenter',
        })
        this.is_loading = false
        return
      } else if (this.playground.work_to == '') {
        this.$iziToast.error({
          timeout: 2000,
          message: ' حقل الي الساعة مطلوب ',
          position: 'bottomCenter',
        })
        this.is_loading = false
        return
      } else if (this.playground.lat == '') {
        this.$iziToast.error({
          timeout: 2000,
          message: ' حقل lat  مطلوب ',
          position: 'bottomCenter',
        })
        this.is_loading = false
        return
      } else if (this.playground.lng == '') {
        this.$iziToast.error({
          timeout: 2000,
          message: ' حقل lng مطلوب ',
          position: 'bottomCenter',
        })
        this.is_loading = false
        return
      } else {
        this.updateForm1()
        return
      }
    },

    validateCreateForm3() {
      this.updateForm3()
    },
    validateCreateForm4() {
      this.updateForm4()
    },

    changeDayStatus(id) {
      this.is_loading = true
      this.axios.post(`admin/change-day-status/${id}`).then((data) => {
        this.is_loading = false
        this.$iziToast.success({
          timeout: 2000,
          message: data.data.msg,
          position: 'bottomCenter',
        })

        this.getPlayground()
      })
    },
    updateForm1() {
      this.is_loading = true
      let data = new FormData()
      data.append('name', this.playground.name)
      data.append('area', this.playground.area)
      data.append('hour_price', this.playground.hour_price)
      data.append('max_players', this.playground.max_players)
      data.append('work_from', this.playground.work_from)
      data.append('work_to', this.playground.work_to)
      data.append('lat', this.playground.lat)
      data.append('lng', this.playground.lng)

      this.axios
        .post(`admin/update-playground-info/${this.id}`, data)
        .then((data) => {
          this.is_loading = false
          this.$iziToast.success({
            timeout: 2000,
            message: data.data.msg,
            position: 'bottomCenter',
          })
          this.getPlayground()
        })
        .catch(() => {
          this.is_loading = false

          this.error_message = 'حدث خطأ ما'
        })
    },
    updateForm2() {
      this.is_loading = true
      let data = new FormData()

      if (this.days[0].value) {
        this.days.forEach((item, index) => {
          data.append(`days[${index}]`, item.value)
        })
      }

      this.axios
        .post(`admin/add-playground-day/${this.id}`, data)
        .then(() => {
          this.is_loading = false

          this.$iziToast.success({
            timeout: 2000,
            message: 'تمت الاضافة بنجاح',
            position: 'bottomCenter',
          })
          this.days = [{}]
          this.days[0].value = null
          this.getPlayground()
        })
        .catch(() => {
          this.is_loading = false

          this.error_message = 'حدث خطأ ما'
        })
    },
    updateForm3() {
      this.is_loading = true
      let data = new FormData()
      if (this.featuresRow[0].value) {
        this.featuresRow.forEach((item, index) => {
          data.append(`features[${index}]`, item.value)
        })
      }
      this.axios
        .post(`admin/add-playground-feature/${this.id}`, data)
        .then(() => {
          this.is_loading = false
          this.$iziToast.success({
            timeout: 2000,
            message: 'تمت الاضافة بنجاح',
            position: 'bottomCenter',
          })
          this.getPlayground()
          this.featuresRow = [{}]
          this.featuresRow[0].value = null
        })
        .catch(() => {
          this.is_loading = false
          this.error_message = 'حدث خطأ ما'
        })
    },
    updateForm4() {
      this.is_loading = true
      let data = new FormData()
      if (this.images[0].value) {
        this.images.forEach((item, index) => {
          if (item.value) {
            data.append(`images[${index}]`, item.value)
          }
        })
      }
      this.axios
        .post(`admin/add-playground-images/${this.id}`, data)
        .then(() => {
          this.is_loading = false
          this.$iziToast.success({
            timeout: 2000,
            message: 'تمت الاضافة بنجاح',
            position: 'bottomCenter',
          })
          this.getPlayground()
          this.images = [{}]
          this.images[0].value = null
          // this.$router.push('/playgrounds/all')
        })
        .catch(() => {
          this.is_loading = false

          this.error_message = 'حدث خطأ ما'
        })
    },
    getFeatures() {
      this.is_loading = true
      this.axios.get('admin/get-all-features').then((data) => {
        this.is_loading = false
        this.features = data.data.data
      })
    },
    appendDay() {
      this.days.push({
        value: null,
      })
    },
    deleteDay(day_row_index) {
      this.days.splice(day_row_index, 1)
    },
    appendFeature() {
      this.featuresRow.push({
        value: null,
      })
    },
    deleteFeature(feature_row_index) {
      this.featuresRow.splice(feature_row_index, 1)
    },
    appendImage() {
      this.images.push({
        value: null,
      })
    },
    deleteImage(image_row_index) {
      this.images.splice(image_row_index, 1)
    },
    setDaysValues(index, value) {
      this.days[index].value = value
    },
    setFeaturesValue(index, value) {
      this.featuresRow[index].value = value
    },
    setImagesValue(index, value) {
      if (value.target.files[0].size > 2097152) {
        this.images[index].err_msg = true
      } else {
        this.images[index].value = value.target.files[0]
        this.images[index].src = URL.createObjectURL(value.target.files[0])
        this.appendImage()
      }
    },
    getPlayground() {
      this.axios.get(`admin/get-playground/${this.id}`).then((data) => {
        let result = data.data.data
        this.playground = result
      })
    },
  },
  mounted() {
    this.getPlayground()
  },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/admin-shared';
@import '../../../assets/css/admin-product';
.custom-file.b-form-file {
  display: none;
}
label img {
  cursor: pointer;
}
.flex-1 {
  flex: 1;
}
.ml-2 {
  margin-left: 5px;
}
</style>
