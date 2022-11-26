<template>
  <div>
    <b-button
      @click="$bvModal.show(`edit-model${id}`)"
      v-b-tooltip.hover
      title="تعديل"
      variant="success"
    >
      تعديل
    </b-button>
    <b-modal :id="`edit-model${id}`" title="تعديل" hide-footer>
      <b-overlay :show="is_loading">
        <div class="d-block">
          <b-form-input
            v-model="edit"
            placeholder="ادخل اسم جديد"
          ></b-form-input>
        </div>
        <div class="d-flex">
          <b-button class="mt-3 ms-2 btn-success" @click="editItem" block>
            تعديل
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
  props: ['id', 'name', 'editValue'],
  data() {
    return {
      delete_success: false,
      is_loading: false,
      msg: '',
      edit: '',
    }
  },
  methods: {
    editItem() {
      const data = new FormData()
      data.append('name', this.edit)
      this.is_loading = true
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
    },
  },
  mounted() {
    this.edit = this.editValue
  },
}
</script>

<style></style>
