<template>
  <div id="app">
    <MainHeader />
    <router-view />
    <!-- <router-view v-show="showPage" @ready="pageReady" />
    <AppLoading v-show="!showPage" /> -->
  </div>
</template>

<script>
import MainHeader from "./components/MainHeader";
import AppLoading from "./components/AppLoading";
export default {
  name: "app",
  components: {
    MainHeader,
    AppLoading
  },
  data() {
    return {
      showPage: false
    };
  },
  methods: {
    pageReady() {
      this.showPage = true;
    }
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      this.showPage = false;
      next();
    });

    this.$root.$on('dataReady', ()=> {
      this.showLoading = false
    })
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
