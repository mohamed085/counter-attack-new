<template>
  <div>
    <b-button
      @click="$bvModal.show(`delete-model${id}`)"
      v-b-tooltip.hover
      title="حذف"
      class="btn remove-btn"
    >
      <i class="far fa-trash-alt"></i>
    </b-button>
    <b-modal :id="`delete-model${id}`" title="حذف الفريق" hide-footer>
      <b-overlay :show="is_loading">
        <div class="d-block">
          <span>هل انت متاكد من الحذف</span>
        </div>
        <div class="d-flex">
          <b-button class="mt-3 ms-2 btn-success" @click="deleteItem" block>
            حذف
          </b-button>
          <b-button
            class="mt-3 btn-danger"
            type="reset"
            block
            @click="$bvModal.hide(`delete-model${id}`)"
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
  props: ['id', 'name'],
  data() {
    return {
      delete_success: false,
      is_loading: false,
      msg: '',
    }
  },
  methods: {
    deleteItem() {
      this.msg = ''
      this.is_loading = true
      this.axios
        .delete(`${this.name}/${this.id}`)
        .then((data) => {
          this.msg = data.data.msg
          this.$bvModal.hide(`delete-model${this.id}`)
          this.$emit('refreshData')
          this.is_loading = false
          this.$iziToast.success({
            timeout: 2000,
            message: data.data.msg,
            position: 'bottomCenter',
          })
        })
        .catch(() => {
          this.$bvModal.hide(`delete-model${this.id}`)
          this.is_loading = false
          this.$emit('refreshData')
          this.$iziToast.error({
            timeout: 2000,
            message: 'حدث خطأ',
            position: 'bottomCenter',
          })
        })
    },
  },
}
</script>

<style></style>
