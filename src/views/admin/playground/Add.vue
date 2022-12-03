<template>
  <div class="add-container">
    <div class="items-header">
      <span class="title">
        الملاعب
      </span>
    </div>

    <div class="err" v-if="error">{{ error_message }}</div>

    <b-overlay :show="is_loading" rounded="sm">
      <b-form @submit.prevent="validateCreateForm">
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
        <div class="row">
          <div class="title col-2">الايام</div>
          <div class="col-10 py-3 card">
            <div class="row">
              <div
                class="col-12 mb-2 py-0 d-flex align-items-center"
                v-for="(day, day_index) in playground.days"
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
                  v-if="day_index == playground.days.length - 1"
                >
                  <span class="append" @click="appendDay()">
                    <i class="fas fa-plus-circle"></i>
                  </span>
                </div>
                <div
                  class="col-1 py-0 d-flex justify-content-center align-items-center"
                  v-if="playground.days.length > 1"
                >
                  <span class="append" @click="deleteDay(day_index)">
                    <i class="fas fa-minus-circle"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="title col-2">الخصائص</div>
          <div class="col-10 py-3 card">
            <div class="row">
              <div
                class="col-12 mb-2 py-0 d-flex align-items-center"
                v-for="(feature, feature_index) in playground.features"
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
                  v-if="feature_index == playground.features.length - 1"
                >
                  <span class="append" @click="appendFeature()">
                    <i class="fas fa-plus-circle"></i>
                  </span>
                </div>
                <div
                  class="col-1 py-0 d-flex justify-content-center align-items-center"
                  v-if="playground.features.length > 1"
                >
                  <span class="append" @click="deleteFeature(feature_index)">
                    <i class="fas fa-minus-circle"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="title col-2">الصور</div>
          <div class="col-10 py-3 card">
            <div class="row">
              <div
                class="col-6 mb-2 py-0 d-flex align-items-center"
                v-for="(image, image_index) in playground.images"
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
                  v-if="image_index == playground.images.length - 1"
                >
                  <span class="append" @click="appendImage()">
                    <i class="fas fa-plus-circle"></i>
                  </span>
                </div>
                <div
                  class="col-1 py-0 d-flex justify-content-center align-items-center"
                  v-if="playground.images.length > 1"
                >
                  <span class="append" @click="deleteImage(image_index)">
                    <i class="fas fa-minus-circle"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <b-button type="submit" class="save-btn">حفظ</b-button>
      </b-form>
    </b-overlay>
  </div>
</template>
<script src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyDRymdCLWxCwLHFnwv36iieKAMjiwk8sdc"></script>
<script>
import router from '@/router'

export default {
  name: 'add-user',

  data() {
    return {
      apiKey: 'sd',
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
        days: [
          {
            value: null,
          },
        ],

        features: [
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

        lat: '',
        lng: '',
      },
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
    getAddress() {
      var self = this
      var input = document.getElementById('autocomplete2')
      var searchBox = new google.maps.places.SearchBox(input)
      searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces()
        if (places.length == 0) {
          return
        }
        var bounds = new google.maps.LatLngBounds()
        places.forEach(function (place) {
          bounds.extend(place.geometry.location)
          place.geometry.location.lng()
          place.geometry.location.lat()
          place.formatted_address
          self.playground.lng = place.geometry.location.lng()
          self.playground.lat = place.geometry.location.lat()
          self.playground.location_description = place.formatted_address
        })
      })
    },

    validateCreateForm() {
      // this.is_loading = true
      // if (this.user.name == '') {
      //   this.$iziToast.error({
      //     timeout: 2000,
      //     message: 'حقل الاسم مطلوب',
      //     position: 'bottomCenter',
      //   })
      //   this.is_loading = false
      //   return
      // } else if (this.user.email == '') {
      //   this.$iziToast.error({
      //     timeout: 2000,
      //     message: 'حقل الايميل مطلوب',
      //     position: 'bottomCenter',
      //   })
      //   this.is_loading = false
      //   return
      // } else if (this.user.password == '') {
      //   this.$iziToast.error({
      //     timeout: 2000,
      //     message: 'حقل الباسورد مطلوب',
      //     position: 'bottomCenter',
      //   })
      //   this.is_loading = false
      //   return
      // } else if (this.user.cPassword == '') {
      //   this.$iziToast.error({
      //     timeout: 2000,
      //     message: ' حقل تاكيد الباسورد مطلوب ',
      //     position: 'bottomCenter',
      //   })
      //   this.is_loading = false
      //   return
      // } else if (this.user.password != this.user.cPassword) {
      //   this.$iziToast.error({
      //     timeout: 2000,
      //     message: 'الباسورد لا يتطابق مع تاكيد الباسورد',
      //     position: 'bottomCenter',
      //   })
      //   this.is_loading = false
      //   return
      // } else {
      //   this.addPlayground()
      //   return
      // }
      this.addPlayground()
    },
    addPlayground() {
      this.is_loading = true
      // this.error = false

      let data = new FormData()
      data.append('name', this.playground.name)
      data.append('area', this.playground.area)
      data.append('hour_price', this.playground.hour_price)
      data.append('max_players', this.playground.max_players)
      data.append('work_from', this.playground.work_from)
      data.append('work_to', this.playground.work_to)
      data.append('lat', this.playground.lat)
      data.append('lng', this.playground.lng)
      if (this.playground.days[0].value) {
        this.playground.days.forEach((item, index) => {
          data.append(`days[${index}]`, item.value)
        })
      }
      if (this.playground.features[0].value) {
        this.playground.features.forEach((item, index) => {
          data.append(`features[${index}]`, item.value)
        })
      }
      if (this.playground.images[0].value) {
        this.playground.images.forEach((item, index) => {
          if (item.value) {
            data.append(`images[${index}]`, item.value)
          }
        })
      }

      this.axios
        .post('admin/add-playground', data)
        .then((data) => {
          if (data.data.status == false) {
            if (data.data.msg.email) {
              this.$iziToast.error({
                timeout: 2000,
                message: data.data.msg.email[0],
                position: 'bottomCenter',
              })
            }
            if (data.data.msg.name) {
              this.$iziToast.error({
                timeout: 2000,
                message: data.data.msg.name[0],
                position: 'bottomCenter',
              })
            }
            if (data.data.msg.password) {
              this.$iziToast.error({
                timeout: 2000,
                message: data.data.msg.password[0],
                position: 'bottomCenter',
              })
            }
          } else {
            this.$iziToast.success({
              timeout: 2000,
              message: data.data.msg,
              position: 'bottomCenter',
            })
          }
          this.is_loading = false
          this.$router.push('/playgrounds/all')
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
      this.playground.days.push({
        value: null,
      })
    },
    deleteDay(day_row_index) {
      this.playground.days.splice(day_row_index, 1)
    },
    appendFeature() {
      this.playground.features.push({
        value: null,
      })
    },
    deleteFeature(feature_row_index) {
      this.playground.features.splice(feature_row_index, 1)
    },
    appendImage() {
      this.playground.images.push({
        value: null,
      })
    },
    deleteImage(image_row_index) {
      this.playground.images.splice(image_row_index, 1)
    },
    setDaysValues(index, value) {
      this.playground.days[index].value = value
    },
    setFeaturesValue(index, value) {
      this.playground.features[index].value = value
    },
    setImagesValue(index, value) {
      if (value.target.files[0].size > 2097152) {
        this.playground.images[index].err_msg = true
      } else {
        this.playground.images[index].value = value.target.files[0]
        this.playground.images[index].src = URL.createObjectURL(
          value.target.files[0],
        )
        this.appendImage()
      }
    },
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
</style>
