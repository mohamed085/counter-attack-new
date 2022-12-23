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
        <router-link class="link" to="/journalists" exact>
          <i class="fas fa-users"></i>
          <span>الصحفيين</span>
        </router-link>
      </li>
      <li class="item">
        <router-link class="link" to="/rulers" exact>
          <i class="fas fa-users"></i>
          <span>الحكام</span>
        </router-link>
      </li>
      <li class="item">
        <router-link class="link" to="/photographers" exact>
          <i class="fas fa-users"></i>
          <span>المصوريين</span>
        </router-link>
      </li>
      <li class="item">
        <div @click="championships = !championships" class="parent-link">
          <div>
            <i class="fas fa-users"></i>
            <span>البطولات</span>
          </div>
          <i v-if="!championships" class="fas fa-angle-down me-3 animate__animated animate__fadeIn"></i>
          <i v-if="championships" class="fas fa-angle-up me-3 animate__animated animate__fadeIn"></i>
        </div>
        <div v-if="championships" class="child-content animate__animated animate__fadeIn">
          <router-link class="child-link" to="/championships" exact>
            <i class="fas fa-angle-left"></i>
            <span>البطولات</span>
          </router-link>
          <router-link class="child-link" to="/championships/add" exact>
            <i class="fas fa-angle-left"></i>
            <span>إنشاء بطولة جديدة</span>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "sidebar-items",
  data() {
    return {
      championships: false,
      journalists: false,
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/variables";

.items-container {
  width: 100%;
  color: $color-white;
  transition: all .5s ease-in-out !important;


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