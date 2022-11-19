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
        <router-link class="link" to="/my-team" exact>
          <i class="fal fa-address-card"></i>
          <span>عن الفريق</span>
        </router-link>
      </li>
      <li class="item">
        <router-link class="link" to="/players-requests" exact>
          <i class="fas fa-users"></i>
          <span>طلبات انضام اللاعبين</span>
        </router-link>
      </li>
      <li class="item">
        <router-link class="link" to="/administrators" exact>
          <i class="fas fa-users"></i>
          <span>الإداريون</span>
        </router-link>
      </li>
      <li class="item">
        <router-link class="link" to="/coaches" exact>
          <i class="fas fa-users"></i>
          <span>المدربون</span>
        </router-link>
      </li>
      <li class="item">
        <router-link class="link" to="/coach-assistants" exact>
          <i class="fas fa-users"></i>
          <span>مساعدون مدرب</span>
        </router-link>
      </li>
      <li class="item">
        <router-link class="link" to="/referees" exact>
          <i class="fas fa-users"></i>
          <span>الحكام</span>
        </router-link>
      </li>
      <li class="item">
        <router-link class="link" to="/shepherds" exact>
          <i class="fas fa-ad"></i>
          <span>الرعاة</span>
        </router-link>
      </li>
      <li class="item">
        <router-link class="link" to="/gifts" exact>
          <i class="fas fa-gifts"></i>
          <span>الهدايا</span>
        </router-link>
      </li>
      <li class="item">
        <router-link class="link" to="/championships" exact>
          <i class="fas fa-trophy-alt"></i>
          <span>البطولات </span>
        </router-link>
      </li>
      <li class="item">
        <router-link class="link" to="/financial-issues" exact>
          <i class="fas fa-money-bill-wave"></i>
          <span>الامور المالية </span>
        </router-link>
      </li>
      <li class="item">
        <router-link class="link" to="/messages" exact>
          <i class="fas fa-inbox"></i>
          <span>الرسائل من الادمن</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "sidebar-items",
  data() {
    return {
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