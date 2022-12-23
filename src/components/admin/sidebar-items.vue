<template>
  <div class="items-container">
    <ul class="items">
      <li class="item">
        <router-link class="link" to="/" exact>
          <i class="fas fa-chart-bar"></i>
          <span>الإحصائيات</span>
        </router-link>
      </li>
      <li class="item">
        <router-link class="link" to="/posts" exact>
          <i class="fas fa-pen"></i>
          <span>المنشورات</span>
        </router-link>
      </li>
      <li class="item">
        <div @click="users = !users" class="parent-link">
          <div>
            <i class="fas fa-users"></i>
            <span>الاعضاء</span>
          </div>
          <i
            v-if="!users"
            class="fas fa-angle-down me-3 animate__animated animate__fadeIn"
          ></i>
          <i
            v-if="users"
            class="fas fa-angle-up me-3 animate__animated animate__fadeIn"
          ></i>
        </div>
        <div
          v-if="users"
          class="child-content animate__animated animate__fadeIn"
        >
          <router-link class="child-link" to="/users/all" exact>
            <i class="fas fa-angle-left"></i>
            <span>عرض الكل</span>
          </router-link>
          <router-link class="child-link" to="/users/add" exact>
            <i class="fas fa-angle-left"></i>
            <span>اضافة عضو</span>
          </router-link>
        </div>
      </li>
      <li class="item">
        <div @click="playgrounds = !playgrounds" class="parent-link">
          <div>
            <i class="fas fa-futbol"></i>
            <span>الملاعب</span>
          </div>
          <i
            v-if="!playgrounds"
            class="fas fa-angle-down me-3 animate__animated animate__fadeIn"
          ></i>
          <i
            v-if="playgrounds"
            class="fas fa-angle-up me-3 animate__animated animate__fadeIn"
          ></i>
        </div>
        <div
          v-if="playgrounds"
          class="child-content animate__animated animate__fadeIn"
        >
          <router-link class="child-link" to="/playgrounds/all" exact>
            <i class="fas fa-angle-left"></i>
            <span>الملاعب الموجودة</span>
          </router-link>
          <router-link class="child-link" to="/playgrounds/add" exact>
            <i class="fas fa-angle-left"></i>
            <span>اضافة ملعب</span>
          </router-link>
        </div>
      </li>
      <li class="item">
        <div @click="teams = !teams" class="parent-link">
          <div>
            <i class="fas fa-users"></i>
            <span>الفرق</span>
          </div>
          <i
            v-if="!teams"
            class="fas fa-angle-down me-3 animate__animated animate__fadeIn"
          ></i>
          <i
            v-if="teams"
            class="fas fa-angle-up me-3 animate__animated animate__fadeIn"
          ></i>
        </div>
        <div
          v-if="teams"
          class="child-content animate__animated animate__fadeIn"
        >
          <router-link class="child-link" to="/teams-accepted" exact>
            <i class="fas fa-angle-left"></i>
            <span>الفرق الموجودة</span>
          </router-link>
          <router-link class="child-link" to="/teams-requested" exact>
            <i class="fas fa-angle-left"></i>
            <span>طلبات الفرق</span>
          </router-link>
        </div>
      </li>
      <li class="item">
        <div
          @click="organization_agencies = !organization_agencies"
          class="parent-link"
        >
          <div>
            <i class="fas fa-sitemap"></i>
            <span>اللجان المنظمة</span>
          </div>
          <i
            v-if="!organization_agencies"
            class="fas fa-angle-down me-3 animate__animated animate__fadeIn"
          ></i>
          <i
            v-if="organization_agencies"
            class="fas fa-angle-up me-3 animate__animated animate__fadeIn"
          ></i>
        </div>
        <div
          v-if="organization_agencies"
          class="child-content animate__animated animate__fadeIn"
        >
          <router-link
            class="child-link"
            to="/organization-agencies-accepted"
            exact
          >
            <i class="fas fa-angle-left"></i>
            <span>اللجان المنظمة</span>
          </router-link>
          <router-link
            class="child-link"
            to="/organization-agencies-requested"
            exact
          >
            <i class="fas fa-angle-left"></i>
            <span>طلبات اللجان المنظمة</span>
          </router-link>
        </div>
      </li>
<!--      <li class="item">-->
<!--        <div @click="academies = !academies" class="parent-link">-->
<!--          <div>-->
<!--            <i class="fas fa-futbol"></i>-->
<!--            <span>الأكاديميات</span>-->
<!--          </div>-->
<!--          <i-->
<!--            v-if="!academies"-->
<!--            class="fas fa-angle-down me-3 animate__animated animate__fadeIn"-->
<!--          ></i>-->
<!--          <i-->
<!--            v-if="academies"-->
<!--            class="fas fa-angle-up me-3 animate__animated animate__fadeIn"-->
<!--          ></i>-->
<!--        </div>-->
<!--        <div-->
<!--          v-if="academies"-->
<!--          class="child-content animate__animated animate__fadeIn"-->
<!--        >-->
<!--          <router-link-->
<!--            class="child-link"-->
<!--            to="/organization-agencies-accepted"-->
<!--            exact-->
<!--          >-->
<!--            <i class="fas fa-angle-left"></i>-->
<!--            <span>الأكاديميات الموجودة</span>-->
<!--          </router-link>-->
<!--          <router-link class="child-link" to="/academies-requests" exact>-->
<!--            <i class="fas fa-angle-left"></i>-->
<!--            <span>طلبات الأكاديميات</span>-->
<!--          </router-link>-->
<!--        </div>-->
<!--      </li>-->
      <li class="item">
        <router-link class="link" to="/products">
          <i class="fab fa-product-hunt"></i>
          <span>المنتجات</span>
        </router-link>
      </li>
      <li class="item">
        <router-link class="link" to="/features/all" exact>
          <i class="fas fa-cog"></i>
          <span>الخصائص</span>
        </router-link>
      </li>
      <li class="item">
        <router-link class="link" to="/messages/all" exact>
          <i class="fas fa-inbox"></i>
          <span>الرسائل</span>
        </router-link>
      </li>
      <li class="item">
        <div @click="ads = !ads" class="parent-link">
          <div>
            <i class="fas fa-ad"></i>
            <span>الإعلانات</span>
          </div>
          <i
            v-if="!ads"
            class="fas fa-angle-down me-3 animate__animated animate__fadeIn"
          ></i>
          <i
            v-if="ads"
            class="fas fa-angle-up me-3 animate__animated animate__fadeIn"
          ></i>
        </div>
        <div v-if="ads" class="child-content animate__animated animate__fadeIn">
          <router-link class="child-link" to="/ads" exact>
            <i class="fas fa-angle-left"></i>
            <span>عرض الكل</span>
          </router-link>
          <router-link class="child-link" to="/ads/add" exact>
            <i class="fas fa-angle-left"></i>
            <span>إضافة إعلان جديد</span>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'sidebar-items',
  data() {
    return {
      users: false,
      playgrounds: false,
      messages: false,
      features: false,
      teams: false,
      organization_agencies: false,
      academies: false,
      ads: false,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variables';

.items-container {
  width: 100%;
  color: $color-white;
  transition: all 0.5s ease-in-out !important;

  & .items {
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;

    & .item {
      width: 220px;

      & .link,
      & .parent-link,
      & .child-link {
        display: flex;
        align-items: center;
        padding: 10px 15px 10px 0;
        width: 220px;
        transition: all 0.3s ease-in-out;
        color: $color-grey-dark !important;
        position: relative;
        outline-width: 0;
        white-space: nowrap;
        cursor: pointer;

        & i {
          font-size: 20px;
          margin-left: 10px;
        }
      }
      & .link:hover,
      & .child-link:hover,
      & .link.active,
      & .child-link.active,
      & .link.router-link-active,
      & .child-link.router-link-active {
        color: $color-primary !important;
      }

      & .parent-link {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
      }

      & .child-content {
        margin-right: 10px;

        & .child-link {
          padding: 7px 12px 7px 0;
        }
      }
    }
  }
}
</style>
