<template>
  <div class="add-container">
    <div class="items-header">
      <span class="title">الرد علي الرسالة</span>
    </div>

    <div class="err" v-if="error">{{ error_message }}</div>

    <b-overlay :show="is_loading" rounded="sm">
      <b-form @submit.prevent="validateCreateForm">
        <div class="form-group">
          <div class="title">الرسالة</div>
          <b-form-input
            type="text"
            placeholder="محتوي الرسالة"
            v-model="message.content"
            disabled
          ></b-form-input>
        </div>
        <div class="form-group">
          <div class="title">رد</div>
          <b-textarea
            placeholder="محتوي الرسالة"
            v-model="message.body"
          ></b-textarea>
        </div>

        <b-button type="submit" class="save-btn">رد</b-button>
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
      message: {
        content: '',
        body: '',
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
    this.getMessage()
  },

  methods: {
    validateCreateForm() {
      this.is_loading = true
      if (this.message.body == '') {
        this.$iziToast.error({
          timeout: 2000,
          message: 'حقل الرد علي الرسالة مطلوب',
          position: 'bottomCenter',
        })
        this.is_loading = false
        return
      } else {
        this.reply()
        return
      }
    },
    reply() {
      this.is_loading = true
      this.error = false

      let data = new FormData()

      data.append('reply', this.message.body)

      this.axios
        .post(`admin/message-reply/${this.id}`, data)
        .then((data) => {
          if (data.data.status == false) {
            if (data.data.msg) {
              this.$iziToast.error({
                timeout: 2000,
                message: data.data.msg,
                position: 'bottomCenter',
              })
            }
          } else {
            this.$iziToast.success({
              timeout: 2000,
              message: 'تمت الرد بنجاح',
              position: 'bottomCenter',
            })
          }
          this.is_loading = false
          this.$router.push('/messages/all')
        })
        .catch(() => {
          this.is_loading = false

          this.error_message = 'حدث خطأ ما'
        })
    },
    getMessage() {
      this.axios.get(`admin/get-message-by-id/${this.id}`).then((data) => {
        this.message.content = data.data.data.content
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/admin-shared';
</style>
