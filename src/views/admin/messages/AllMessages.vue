<template>
  <div>
    <div class="err" v-if="error">{{ error_message }}</div>

    <b-overlay :show="is_loading" rounded="sm" class="items-layout">
      <div class="items-header">
        <span class="title">الرسائل</span>
      </div>

      <div class="err" v-if="error">{{ error_message }}</div>

      <div>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">العضو</th>
                <th scope="col">عنوان الرسالة</th>
                <th scope="col">الرسالة</th>
                <th scope="col">الاجراءات</th>
              </tr>
            </thead>
            <tbody v-if="messages" class="table-group-divider">
              <tr v-for="message in messages" :key="message.id">
                <th scope="row">{{ message.id }}</th>
                <td>{{ message.user.name }}</td>
                <td>{{ message.title }}</td>
                <td>{{ message.content }}</td>
                <td>
                  <b-button-group>
                    <b-button variant="info" @click="view(message.id)">
                      الرد
                    </b-button>
                  </b-button-group>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="!users">
          لايوجد اعضاء متاحه
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

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'all_messages',
  data() {
    return {
      is_loading: false,
      error: false,
      error_message: '',
      messages: null,
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
    this.getMessages()
  },
  methods: {
    async getMessages() {
      this.is_loading = true
      this.error = false

      this.axios
        .get('admin/all-messages')
        .then((data) => {
          this.messages = data.data.data
          console.log(this.messages)
          this.is_loading = false
        })
        .catch(() => {
          this.is_loading = false

          this.error_message = 'حدث خطأ ما'
        })
    },

    blockUser(id) {
      this.axios.get(`admin/block_user/${id}`).then((data) => {
        console.log(data)
      })
    },
    unBlockUser(id) {
      this.axios.get(`admin/unblock_user/${id}`).then((data) => {
        console.log(data)
      })
    },

    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
    view(id) {
      this.$router.push('/messages/view/' + id)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/admin-shared';
</style>
