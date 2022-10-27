<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('tryLogin')
    console.log("App -- isAuthenticated = " , this.$store.getters.isAuthenticated)
  },

}
</script>
<style lang="scss">
@import 'animate.css';
@import "assets/css/variables";
@import "assets/css/mixins";


@font-face {
  font-family: 'The Sans Arabic';
  src: url(assets/fonts/THESANSARABIC-BOLD.ttf);
}

@font-face {
  font-family: 'Cairo';
  src: url(assets/fonts/Cairo-VariableFont_wght.ttf);
}


*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  //font-size: 62.5%; //1 rem = 10px; 10px/16px = 62.5%
  direction: rtl;

}

#app {
  box-sizing: border-box;
  font-family: 'Cairo', sans-serif;
  font-weight: 400;
  color: $color-grey-dark;
}

::selection {
  background-color: $color-primary;
  color: $color-white;
}

a,
router-link,
a:hover,
router-link:hover {
  text-decoration: none !important;
}

.close {
  border: none !important;
  background: none !important;
  font-size: 16px !important;
}

.hidden {
  display: none;
}
</style>
