<template>
  <div class="message-dialog">
    <div class="card"></div>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'add-user',
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
      } else if (this.user.password == '') {
        this.$iziToast.error({
          timeout: 2000,
          message: 'حقل الباسورد مطلوب',
          position: 'bottomCenter',
        })
        this.is_loading = false
        return
      } else if (this.user.cPassword == '') {
        this.$iziToast.error({
          timeout: 2000,
          message: ' حقل تاكيد الباسورد مطلوب ',
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
      data.append('password', this.user.password)

      this.axios
        .post('admin/add-user', data)
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
  },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/admin-shared';
@import '../../../assets/css/admin-product';
</style>
