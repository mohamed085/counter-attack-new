<template>
  <div class="add-container">
    <div class="items-header">
      <span class="title">
        إضافة إعلان جديد
      </span>
    </div>

    <div class="err" v-if="error">{{ error_message }}</div>

    <b-overlay :show="is_loading" rounded="sm">
      <b-form @submit.prevent="saveAd">
        <div class="form-group">
          <div class="title">الاسم</div>
          <b-form-input
              type="text"
              placeholder="ادخل الاسم"
              v-model="ad.title"
          ></b-form-input>
        </div>
        <div class="form-group">
          <div class="title">الوصف</div>
          <b-form-input
              type="text"
              placeholder="ادخل الوصف"
              v-model="ad.description"
          ></b-form-input>
        </div>
        <div class="form-group">
          <div class="title">النوع</div>
          <b-form-input
              type="text"
              placeholder="ادخل النوع"
              v-model="ad.type"
          ></b-form-input>
        </div>
        <div class="form-group">
          <div class="title">معلومات ذات صله</div>
          <b-form-input
              type="text"
              placeholder="اضف معلومات ذات صله"
              v-model="ad.related_information"
          ></b-form-input>
        </div>

        <b-button type="submit" class="save-btn">حفظ</b-button>
      </b-form>
    </b-overlay>
  </div>
</template>

<script>
export default {
  name: "AddAd",
  data() {
    return {
      is_loading: false,
      error: false,
      error_message: '',
      ad: {
        title: '',
        description: '',
        type: '',
        related_information: '',
      }
    }
  },
  methods: {
    async saveAd() {
      this.is_loading = true;
      this.error = false;

      let token = this.$store.getters.token;
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);

      let formdata = new FormData();
      formdata.append("title", this.ad.title);
      formdata.append("description", this.ad.description);
      formdata.append("type", this.ad.type);
      formdata.append("related_information", this.ad.related_information);

      this.axios
          .post('admin/add-ad', formdata)
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
            this.$router.push('/ads')
          })
          .catch(() => {
            this.is_loading = false

            this.error_message = 'حدث خطأ ما'
          })    },

  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/admin-shared';
@import '../../../assets/css/admin-product';


</style>