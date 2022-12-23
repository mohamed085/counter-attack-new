<template>
  <div>
    <div class="items-header">
      <span class="title">إنشاء بطولة جديدة</span>
    </div>

    <div class="err" v-if="error">{{ error_message }}</div>

    <div class="success" v-if="success">{{ success_message }}</div>

    <b-overlay :show="is_loading" rounded="sm">
      <div class="row mobile">
        <div class="col">
          <div class="container steps">
            <div class="item"
                 :class="active_info_section ? 'active' : ''"
                 @click="changeDisplayedSection('info')">
              <span class="item-num">1</span>
              <span class="item-title animate__animated animate__slideInLeft"
                    :class="displayed_section === 'info' ? 'active': ''">البيانات الأساسية</span>
            </div>
            <div class="item"
                 :class="active_awards_section ? 'active' : ''"
                 @click="changeDisplayedSection('awards')">
              <span class="item-num">2</span>
              <span class="item-title animate__animated animate__slideInLeft"
                    :class="displayed_section === 'awards' ? 'active': ''">الجوائز</span>
            </div>
            <div class="item"
                 :class="active_sponsors_section ? 'active' : ''"
                 @click="changeDisplayedSection('sponsors')">
              <span class="item-num">3</span>
              <span class="item-title animate__animated animate__slideInLeft"
                    :class="displayed_section === 'sponsors' ? 'active': ''">الرعاة</span>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <div class="container steps">
            <div class="item"
                 :class="active_info_section ? 'active' : ''"
                 @click="changeDisplayedSection('info')">
              <span class="item-num">1</span>
              <span class="item-title">البيانات الأساسية</span>
            </div>
            <div class="item"
                 :class="active_awards_section ? 'active' : ''"
                 @click="changeDisplayedSection('awards')">
              <span class="item-num">2</span>
              <span class="item-title">الجوائز</span>
            </div>
            <div class="item"
                 :class="active_sponsors_section ? 'active' : ''"
                 @click="changeDisplayedSection('sponsors')">
              <span class="item-num">3</span>
              <span class="item-title">الرعاة</span>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-8">
          <div class="container details">
            <div v-if="displayed_section === 'info'">
              <div class="info animate__animated animate__fadeIn">
                <div class="details-title">البيانات الأساسية</div>
                <b-form class="form" @submit.prevent="addChampionshipInfo">
                  <div class="form-group">
                    <div class="title">إسم البطولة</div>
                    <b-form-input v-model="champion.name" required></b-form-input>
                  </div>
                  <div class="form-group">
                    <div class="title">تاريخ البدء</div>
                    <b-form-input type="date" v-model="champion.start_date" required></b-form-input>
                  </div>
                  <div class="form-group">
                    <div class="title">تاريخ النهاية</div>
                    <b-form-input type="date" v-model="champion.end_date" required></b-form-input>
                  </div>
                  <div class="form-group">
                    <div class="title">وقت البدء</div>
                    <b-form-input type="time" v-model="champion.start_time" required></b-form-input>
                  </div>
                  <div class="form-group">
                    <div class="title">مكان الإقامة</div>
                    <b-form-input v-model="champion.place" required></b-form-input>
                  </div>
                  <div class="form-group">
                    <div class="title">الهدف من البطولة</div>
                    <b-form-input v-model="champion.goal" required></b-form-input>
                  </div>
                  <div class="form-group">
                    <div class="title">عدد الفرق</div>
                    <b-form-select v-model="champion.num_teams" class="mb-3" required>
                      <b-form-select-option value="16">16</b-form-select-option>
                      <b-form-select-option value="32">32</b-form-select-option>
                    </b-form-select>
                  </div>
                  <div class="form-group">
                    <div class="title">الحالة</div>
                    <b-form-select v-model="champion.status" class="mb-3" required>
                      <b-form-select-option value="in_place">ملاعب</b-form-select-option>
                      <b-form-select-option value="electronic">إلكتروني</b-form-select-option>
                    </b-form-select>
                  </div>
                  <b-button type="submit" class="save-btn">التالي</b-button>
                </b-form>
              </div>
            </div>
            <div v-else-if="displayed_section === 'awards'">
              <div class="awards animate__animated animate__fadeIn">
                <div class="details-title">الجوائز</div>
                <b-form class="form" @submit.prevent="addChampionshipAwards">
                  <div v-for="award in champion.awards" :key="award.id">
                    <div class="award">
                      <div class="inputs d-flex">
                        <b-form-input v-model="award.name" placeholder="إسم الجائزة" required></b-form-input>
                        <b-form-input type="text" v-model="award.value" placeholder="قيمة الجائزة" required></b-form-input>
                      </div>
                      <div class="btns d-flex">
                        <span class="add"
                              @click="addAward"><i class="fas fa-plus"></i></span>
                        <span class="remove"
                              v-if="champion.awards.length > 1"
                              @click="removeAward(award.id)"><i class="fas fa-times"></i></span>
                      </div>
                    </div>
                  </div>
                  <b-button type="submit" class="save-btn">التالي</b-button>
                </b-form>
              </div>
            </div>
            <div v-else-if="displayed_section === 'sponsors'" >
              <div class="sponsors animate__animated animate__fadeIn">
                <div class="details-title">الرعاة</div>
                <b-form class="form" @submit.prevent="saveChampionship">
                  <div class="sponsor-container" v-for="(sponsor, index) in champion.sponsors" :key="sponsor.id">
                    <div class="btns d-flex">
                        <span class="add"
                              @click="addSponsor"><i class="fas fa-plus"></i></span>
                      <span class="remove"
                            v-if="champion.sponsors.length > 1"
                            @click="removeSponsor(sponsor.id)"><i class="fas fa-times"></i></span>
                    </div>
                    <div class="sponsor">
                      <div class="sponsor-img">
                        <img :src="sponsor.image">
                        <b-form-file class="mt-3" @change="uploadImage($event, index)"
                                     v-model="sponsor.image_file" plain required></b-form-file>
                      </div>
                      <div class="sponsor-details">
                        <div class="mb-3">
                          <div class="mb-2">الإسم</div>
                          <b-form-input v-model="sponsor.name" required></b-form-input>
                        </div>
                        <div class="mb-3">
                          <div class="mb-2">الوصف</div>
                          <b-form-input v-model="sponsor.description" required></b-form-input>
                        </div>
                        <div class="mb-3">
                          <div class="mb-2">المبلغ</div>
                          <b-form-input type="number" v-model="sponsor.value" required></b-form-input>
                        </div>
                      </div>
                    </div>
                  </div>
                  <b-button type="submit" class="save-btn">إنشاء البطولة</b-button>
                </b-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "add-championship",
  data() {
    return {
      is_loading: false,
      error: false,
      error_message: '',
      success: false,
      success_message: '',
      active_info_section: true,
      active_awards_section: false,
      active_sponsors_section: false,
      displayed_section: 'info',
      champion: {
        name: '',
        start_date: '',
        end_date: '',
        start_time: '',
        num_teams: '',
        place: '',
        status: '',
        goal: '',
        awards: [
          { id: new Date(), name: '', value: '' }
        ],
        sponsors: [
          { id: new Date(), name: '', image: '', image_file: '', value: '', description: '' }
        ],
      }
    }
  },
  created() {
    window.scrollTo(0,0);

    if (!this.$store.getters.isAuthenticated || this.$store.getters.role !== this.$store.getters.organizationRole) {
      router.push("/login")
    }
  },
  methods: {
    changeDisplayedSection(to) {
      if (to === 'info') {
        this.displayed_section = 'info'
      } else if (to === 'awards') {
        if (this.active_awards_section)
          this.displayed_section = 'awards'
      } else if (to === 'sponsors') {
        if (this.active_sponsors_section)
          this.displayed_section = 'sponsors'
      }
    },
    addChampionshipInfo() {
      this.displayed_section = 'awards';
      this.active_awards_section = true;
    },
    addChampionshipAwards() {
      this.displayed_section = 'sponsors';
      this.active_sponsors_section = true;
    },
    removeAward(id) {
      let index = this.champion.awards.findIndex(value => value.id === id);
      this.champion.awards.splice(index, 1);
    },
    addAward() {
      this.champion.awards.push({id: new Date(), name: '', value: ''})
    },
    uploadImage(e, index) {
      this.champion.sponsors.forEach((value, index1) => {
        if (index1 === index) {
          value.image_file = e.target.files[0];
          this.$emit('input', value.image_file);
          let reader = new FileReader();
          reader.readAsDataURL(value.image_file);
          reader.onload = e => {
            value.image = e.target.result;
          }
        }
      })
    },
    addSponsor() {
      this.champion.sponsors.push({id: new Date(), name: '', image: '', image_file: '', value: '', description: ''});
    },
    removeSponsor(id) {
      let index = this.champion.sponsors.findIndex(value => value.id === id);
      this.champion.sponsors.splice(index, 1);
    },
    async saveChampionship() {
      this.is_loading = true;
      this.error = false;

      let token = this.$store.getters.token;
      let myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);

      let formData = new FormData();
      formData.append("name", this.champion.name);
      formData.append("place", this.champion.place);
      formData.append("goals", this.champion.goal);
      formData.append("start_date", this.champion.start_date);
      formData.append("end_date", this.champion.end_date);
      formData.append("start_time", this.champion.start_time);
      formData.append("number_of_teams", this.champion.num_teams);
      formData.append("status", this.champion.status);

      this.champion.sponsors.forEach((value, index) => {
        formData.append("sponsors[" + index + "][name]", value.name);
        formData.append("sponsors[" + index + "][image]", value.image_file);
        formData.append("sponsors[" + index + "][description]", value.description);
        formData.append("sponsors[" + index + "][value]", value.value);
      })
      this.champion.awards.forEach((value, index) => {
        formData.append("awards[" + index + "][name]", value.name);
        formData.append("awards[" + index + "][value]", value.value);
      })

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow'
      };

      let url = this.$store.getters["main/getURL"] + '/api/organization/create-championship';

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();
      console.log(responseData)

      if (!response.ok || !responseData.status) {
        console.log(responseData)
        this.error = true
        this.error_message = "حدث خطأ ما"
      } else {
        this.is_loading = false
        this.success = true;
        this.success_message = "تم إنشاء البطولة بنجاح"
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/admin-shared";
@import "../../../assets/css/add-championship";

</style>