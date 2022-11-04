<template>
  <div class="layout">
    <div class="err" v-if="error">{{ error_message }}</div>

    <div class="success" v-if="success">{{ success_message }}</div>

    <b-overlay :show="is_loading" rounded="sm">
      <b-button v-b-modal.delete-model v-b-tooltip.hover title="حذف الفريق" class="btn remove-btn">
        <i class="far fa-trash-alt"></i>
      </b-button>

      <div>
        <b-modal id="delete-model" title="حذف الفريق" hide-footer>
          <b-overlay v-if="!delete_success" :show="is_loading">
            <div class="d-block">
              <span>هل انت متاكد من حذف اللاعب: {{ player.name }}</span>
            </div>
            <div class="d-flex">
              <b-button class="mt-3 ms-2 btn-success" @click="deletePlayer" block>حذف</b-button>
              <b-button class="mt-3 btn-danger" type="reset" block @click="$bvModal.hide('delete-model')">إغلاق</b-button>
            </div>
          </b-overlay>
          <b-overlay v-else-if="delete_success" :show="is_loading">
            <div class="d-block mb-2">
              <span>تم حذف اللاعب بنجاح</span>
            </div>
            <div>
              <b-button class="mt-3 btn-danger" block @click="$router.push('/teams-accepted/edit/' + $route.params.id)">إغلاق</b-button>
            </div>
          </b-overlay>
        </b-modal>
      </div>

      <b-form @submit.prevent="editPlayer">
        <div class="player-layout">
          <div class="player-img">
            <img :src="player.image">
            <input type="file" accept="image/" class="hidden" ref="imageFile" @change="addImage">
            <button type="button" class="add-logo-btn" @click="browseImage">تعديل الصورة</button>
          </div>
          <div class="player-info">
            <div class="form-group">
              <div class="title mb-2">إسم اللاعب: </div>
              <b-form-input v-model="player.name"></b-form-input>
            </div>
            <div class="form-group mt-3">
              <div class="title mb-2">رقم اللاعب: </div>
              <b-form-input v-model="player.number"></b-form-input>
            </div>
            <div class="form-group mt-3">
              <div class="title mb-2">رقم اللاعب: </div>
              <b-form-select v-model="player.type" class="mb-3">
                <b-form-select-option value="main">لاعب اساسي</b-form-select-option>
                <b-form-select-option value="alt">إحتياطي</b-form-select-option>
                <b-form-select-option value="goalkeeper">حارس مرمي</b-form-select-option>
              </b-form-select>
            </div>
          </div>
        </div>
        <b-button type="submit" class="save-btn">حفظ التعديلات</b-button>
      </b-form>
    </b-overlay>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "edit-accepted-team-player",
  data() {
    return {
      is_loading: false,
      error: false,
      error_message: '',
      success: false,
      success_message: '',
      delete_success: false,
      player: ''
    }
  },
  created() {
    if (!this.$store.getters.isAuthenticated) {
      router.push("/login")
    }
    this.loadPlayer(this.$route.params.playerId)
  },
  methods: {
    addImage(e) {
      this.player.image_file = e.target.files[0];
      this.$emit('input', this.player.image_file);
      let reader = new FileReader();
      reader.readAsDataURL(this.player.image_file);
      reader.onload = e => {
        this.player.image = e.target.result;
      }
    },
    browseImage() {
      this.$refs.imageFile.click();
    },
    async loadPlayer(id) {
      this.is_loading = true;
      this.error = false;

      let token = this.$store.getters.token;
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      let url;
      if (this.$store.getters.role === this.$store.getters.adminRole)
        url = this.$store.getters["main/getURL"] + '/api/admin/get-player/' + id;
      else if (this.$store.getters.role === this.$store.getters.teamRole)
        url = this.$store.getters["main/getURL"] + '/api/team/get-player/' + id;

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();
      console.log(responseData)

      if (!response.ok || !responseData.status) {
        this.error = true
        this.error_message = "حدث خطأ ما"
      } else {
        this.player = responseData.data
        this.is_loading = false
      }

    },
    async editPlayer() {
      this.is_loading = true;
      this.error = false;

      let token = this.$store.getters.token;
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);

      let formData = new FormData();
      formData.append("image", this.image_file);
      formData.append("type", this.player.type);
      formData.append("name", this.player.name);
      formData.append("number", this.player.number);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow'
      };

      let url;
      if (this.$store.getters.role === this.$store.getters.adminRole)
        url = this.$store.getters["main/getURL"] + '/api/admin/update-team-player/' + this.$route.params.id + '/' + this.player.id;
      else if (this.$store.getters.role === this.$store.getters.teamRole)
        url = this.$store.getters["main/getURL"] + '/api/team/update-team-player/' + this.$route.params.id + '/' + this.player.id;

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();
      console.log(responseData)

      if (!response.ok || !responseData.status) {
        this.error = true
        this.error_message = "حدث خطأ ما"
      } else {
        this.is_loading = false
        await this.loadShirt(this.$route.params.shirtId);
        this.success = true;
        this.success_message = "تم تعديل الصورة بنجاح"
      }
    },
    async deletePlayer() {
      this.is_loading = true;

      let token = this.$store.getters.token;
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);


      let requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
      };

      let url;
      if (this.$store.getters.role === this.$store.getters.adminRole)
        url = this.$store.getters["main/getURL"] + '/api/admin/remove-team-player/' + this.player.id;
      else if (this.$store.getters.role === this.$store.getters.teamRole)
        url = this.$store.getters["main/getURL"] + '/api/team/remove-team-player/' + this.player.id;

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (!response.ok || !responseData.status) {
        console.log(responseData)
        this.error = true
        this.error_message = "حدث خطأ ما"
      } else {
        this.delete_success = true;
        this.is_loading = false
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/admin-shared";
@import "../../../assets/css/admin-team";

.layout {
  position: relative;

  & .remove-btn {
    position: absolute;
    left: 10px;
    z-index: 10;
  }
}
</style>