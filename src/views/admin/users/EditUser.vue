<template>
  <div class="add-container">
    <div class="items-header">
      <span class="title">الاعضاء</span>
    </div>

    <div class="err" v-if="error">{{ error_message }}</div>

    <b-overlay :show="is_loading" rounded="sm">
      <b-form @submit.prevent="validateCreateForm">
        <div class="form-group">
          <div class="title">الاسم</div>
          <b-form-input
            type="text"
            placeholder="ادخل الاسم"
            v-model="user.name"
          ></b-form-input>
        </div>
        <div class="form-group">
          <div class="title">الايميل</div>
          <b-form-input
            disabled
            type="email"
            placeholder="ادخل الايميل"
            v-model="user.email"
          ></b-form-input>
        </div>
        <div class="form-group">
          <div class="title">الباسورد</div>
          <b-form-input
            type="password"
            placeholder="ادخل الباسورد"
            v-model="user.password"
          ></b-form-input>
        </div>
        <div class="form-group">
          <div class="title">تاكيد الباسورد</div>
          <b-form-input
            type="password"
            placeholder="تاكيد الباسورد"
            v-model="user.cPassword"
          ></b-form-input>
        </div>

        <b-button type="submit" class="save-btn">حفظ التعديلات</b-button>
      </b-form>
    </b-overlay>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'edit-user',
  props: ['id'],
  data() {
    return {
      is_loading: false,
      error: false,
      error_message: '',
      user: {
        name: '',
        email: '',
        password: '',
        cPassword: '',
      },
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
    this.getUser()
  },

  methods: {
    validateCreateForm() {
      this.is_loading = true
      if (this.user.name == '') {
        this.$iziToast.error({
          timeout: 2000,
          message: 'حقل الاسم مطلوب',
          position: 'bottomCenter',
        })
        this.is_loading = false
        return
      } else if (this.user.email == '') {
        this.$iziToast.error({
          timeout: 2000,
          message: 'حقل الايميل مطلوب',
          position: 'bottomCenter',
        })
        this.is_loading = false
        return
      } else if (this.user.password != this.user.cPassword) {
        this.$iziToast.error({
          timeout: 2000,
          message: 'الباسورد لا يتطابق مع تاكيد الباسورد',
          position: 'bottomCenter',
        })
        this.is_loading = false
        return
      } else {
        this.addUser()
        return
      }
    },
    addUser() {
      this.is_loading = true
      this.error = false

      let data = new FormData()

      data.append('name', this.user.name)

      data.append('email', this.user.email)
      if (this.user.password != '') {
        data.append('password', this.user.password)
      }

      this.axios
        .post(`admin/update-user/${this.id}`, data)
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
              message: 'تمت الاضافة بنجاح',
              position: 'bottomCenter',
            })
          }
          this.is_loading = false
          this.$router.push('/users/all')
        })
        .catch(() => {
          this.is_loading = false

          this.error_message = 'حدث خطأ ما'
        })
    },
    getUser() {
      this.axios.get(`admin/get-user/${this.id}`).then((data) => {
        console.log(data)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/admin-shared';
</style>
