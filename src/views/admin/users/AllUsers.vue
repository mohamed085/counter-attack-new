<template>
  <div>
    <div class="err" v-if="error">{{ error_message }}</div>

    <b-overlay :show="is_loading" rounded="sm" class="items-layout">
      <div class="items-header">
        <span class="title">الاعضاء</span>
        <b-button @click="$router.push('/users/add')" class="add-new-btn">
          إضافة عضو جديد
        </b-button>
      </div>

      <div class="err" v-if="error">{{ error_message }}</div>

      <div>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">الاسم</th>
                <th scope="col">الايميل</th>
                <th scope="col">الحالة</th>
                <th scope="col">الاجراءات</th>
              </tr>
            </thead>
            <tbody v-if="users" class="table-group-divider">
              <tr v-for="user in users" :key="user.id">
                <th scope="row">{{ user.id }}</th>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <span
                    class="my-0 mx-3 p-1"
                    :class="user.is_blocked == '0' ? 'success' : 'danger'"
                  >
                    {{ user.is_blocked == '0' ? 'فعال' : 'محظور' }}
                  </span>
                </td>
                <td>
                  <b-button-group>
                    <b-button variant="info" @click="view(user.id)">
                      تعديل
                    </b-button>
                    <b-button
                      variant="success"
                      @click="unBlockUser(user.id)"
                      v-if="user.is_blocked == '1'"
                    >
                      الغاء الحظر
                    </b-button>
                    <b-button
                      variant="danger"
                      @click="blockUser(user.id)"
                      v-else
                    >
                      حظر
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
  name: 'accepted-teams',
  data() {
    return {
      is_loading: false,
      error: false,
      error_message: '',
      users: null,
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
    this.getUsers()
  },
  methods: {
    async getUsers() {
      this.is_loading = true
      this.error = false

      await this.axios
        .get('admin/all-users')
        .then((data) => {
          this.users = data.data.data

          this.is_loading = false
        })
        .catch(() => {
          this.is_loading = false

          this.error_message = 'حدث خطأ ما'
        })
    },

    blockUser(id) {
      this.axios.get(`admin/block-user/${id}`).then((data) => {
        console.log(data)
      })
      this.getUsers();
      },
    unBlockUser(id) {
      this.axios.get(`admin/unblock_user/${id}`).then((data) => {
        console.log(data)
      })
      this.getUsers();
    },

    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
    view(id) {
      this.$router.push('/users/edit/' + id)
    },
  },
}
</script>

<style lang="scss" scoped>
.danger {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  padding: 0.7rem 1rem;
  border: 1px solid red;
  font-size: 16px;
  color: #fff;
  background: red;
  border-radius: 10px;
}
@import '../../../assets/css/admin-shared';
</style>
