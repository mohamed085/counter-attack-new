<template>
  <div>
    <div class="err" v-if="error">{{ error_message }}</div>

    <div class="post-layout">

      <div class="add-post">
        <b-form @submit.prevent="savePost">
          <b-form-textarea class="input"
            v-model="post.content"
            placeholder="ماذا يدور في بالك؟"
          ></b-form-textarea>

          <img class="img" v-if="post.image_src" :src="post.image_src">

          <div class="btns">
            <b-button type="submit" class="post">نشر</b-button>
            <input type="file" accept="image/" class="hidden" ref="imageFile" @change="addImage">
            <button type="button" class="add-image-btn" @click="browseImage"><i class="fas fa-image"></i></button>
          </div>
        </b-form>

      </div>

      <b-overlay :show="is_loading" rounded="sm">
        <div class="posts-timeline">
          <div v-for="post in posts" :key="post.id">
            <div class="post">
              <div class="post-details">
                <b-avatar size="4rem"></b-avatar>
                <div class="w-100">
                  <div class="user-name d-flex flex-column">
                    <span class="name">{{ post.post_owner.name }} </span>
                    <span class="created_at">{{ post.time }} {{ post.date }}</span>
                  </div>
                  <div class="content">{{ post.content }}</div>
                  <div v-if="post.image != null" class="image"><img :src="post.image"></div>
                  <div class="post-actions">
                    <div class="likes">
                      <i class="far fa-heart"></i>
                      <span>{{ post.post_likes }}</span>
                    </div>
                    <div class="coments">
                      <i class="far fa-comment" @click="active_comments.push(post.id)"></i>
                      <span>{{ post.post_comments.length }}</span>
                    </div>
                  </div>
                  <div class="comments-details" v-if="active_comments.includes(post.id)">
                    <div v-for="comment in post.post_comments" :key="comment.length">
                      <div class="post-details comment">
                        <b-avatar size="3rem" class="ms-3" :src="comment.user.user_info.image"></b-avatar>
                        <div>
                          <div class="user-name d-flex flex-column">
                            <span class="name">{{ comment.user.name }} </span>
                            <span class="created_at">{{ comment.time }} {{ comment.date }}</span>
                          </div>
                          <div class="content">{{ comment.content }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-overlay>

    </div>
  </div>
</template>

<script>
export default {
  name: "posts",
  data() {
    return {
      is_loading: false,
      error: false,
      error_message: '',
      post: {
        content: '',
        image: null,
        image_src: ''
      },
      active_comments: [],
      posts: null
    }
  },
  created() {
    this.loadPosts();
  },
  methods: {
    addImage(e) {
      this.post.image = e.target.files[0];
      this.$emit('input', this.post.image);
      let reader = new FileReader();
      reader.readAsDataURL(this.post.image);
      reader.onload = e => {
        this.post.image_src = e.target.result;
      }
    },
    browseImage() {
      this.$refs.imageFile.click();
    },
    async loadPosts() {
      this.is_loading = true
      await this.axios.get('admin/get-admin-posts').then((data) => {
        this.posts = data.data.data
        console.log(this.posts)
      })
      this.is_loading = false
    },
    async savePost() {
      this.is_loading = true

      let data = new FormData()
      data.append('content', this.post.content)
      data.append('image', this.post.image)

      await this.axios
          .post('admin/admin-create-post', data)
          .then((data) => {
            console.log(data)
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
          })
          .catch(() => {
            this.is_loading = false

            this.error_message = 'حدث خطأ ما'
          })

      this.post.content = null;
      this.post.image_src = null;
      this.post.image = null;
      await this.loadPosts();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/admin-shared";
@import "../../../assets/css/posts";

</style>