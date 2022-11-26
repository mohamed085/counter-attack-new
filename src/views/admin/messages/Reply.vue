<template>
  <div>
    <b-button
      @click="$bvModal.show(`edit-model${id}`)"
      v-b-tooltip.hover
      title="رد"
      variant="success"
    >
      رد
    </b-button>
    <b-modal :id="`edit-model${id}`" title="تعديل" hide-footer>
      <b-overlay :show="is_loading">
        <div class="form-group">
          <div class="title">الرسالة</div>
          <b-form-input
            type="text"
            placeholder="محتوي الرسالة"
            v-model="content"
            disabled
          ></b-form-input>
        </div>
        <div class="form-group">
          <div class="title">رد</div>
          <b-textarea placeholder="محتوي الرسالة" v-model="body"></b-textarea>
        </div>
        <div class="d-flex">
          <b-button class="mt-3 ms-2 btn-success" @click="editItem" block>
            رد
          </b-button>
          <b-button
            class="mt-3 btn-danger"
            type="reset"
            block
            @click="$bvModal.hide(`edit-model${id}`)"
          >
            إغلاق
          </b-button>
        </div>
      </b-overlay>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: ['id', 'name', 'message'],
  data() {
    return {
      delete_success: false,
      is_loading: false,
      msg: '',
      content: '',
      body: '',
    }
  },
  methods: {
    editItem() {
      const data = new FormData()
      data.append('reply', this.body)
      this.is_loading = true
      if (this.body == '') {
        this.is_loading = false
        this.$iziToast.error({
          timeout: 2000,
          message: 'حقل الرد مطلوب',
          position: 'bottomCenter',
        })
      } else {
        this.axios
          .post(`${this.name}/${this.id}`, data)
          .then((data) => {
            this.$bvModal.hide(`edit-model${this.id}`)
            this.$emit('refreshData')

            this.is_loading = false
            this.$iziToast.success({
              timeout: 2000,
              message: data.data.msg,
              position: 'bottomCenter',
            })
          })
          .catch(() => {
            this.$bvModal.hide(`edit-model${this.id}`)
            this.is_loading = false
            this.$iziToast.error({
              timeout: 2000,
              message: 'حدث خطأ',
              position: 'bottomCenter',
            })
          })
      }
    },
  },
  mounted() {
    this.content = this.message
  },
}
</script>

<style></style>
