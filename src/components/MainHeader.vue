<template>
  <div>
    <header class="header">
      <div class="header__block container container--max-width">
        <router-link :to="{name: 'Schedule'}" class="header__logo">
          <img src="../assets/pl-icon2.png" class="header__img" alt="Premier League" />
        </router-link>

        <nav class="nav">
          <ul class="nav__list">
            <li class="nav__list-item" v-if="!user">
              <router-link class="router-link-active" :to="{name: 'Login'}">Логин</router-link>
              <router-link class="router-link-active" :to="{name: 'Register'}">Регистрация</router-link>
            </li>
            <li class="nav__list-item" v-else>
              <router-link class="router-link-active" :to="{name: 'LiveMatches'}">Мачове на живо</router-link>
              <router-link class="router-link-active" :to="{name: 'Schedule'}">Програма</router-link>
              <router-link class="router-link-active" :to="{name: 'Standings'}">Класиране</router-link>
              <router-link class="router-link-active" :to="{name: 'Profile'}">Профил</router-link>
              <a
                class="router-link-active"
                @click.prevent="logout"
                href="#"
              >Изход</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('logout')
      .then(() => {
        this.$router.push("/login");
      })
    }
  },
  computed: {
    user () {
      return this.$store.getters.authUser;
    }
  }
};
</script>

<style scoped>
.header {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  background: #fff;
}

.header__logo {
  text-transform: uppercase;
  font-size: 20px;
  border: 0px !important;
}

.header__logo a {
  color: inherit;
  text-decoration: none;
}

.header__logo a:hover {
  opacity: 0.9;
}

.header__block {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav__list {
  padding: 0;
  margin: 0;
  list-style: none;

  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  margin-right: 10px;
}

.nav__list-item + .nav__list-item {
  margin-left: 24px;
}

.nav__list-item > li {
  cursor: pointer;
}

.nav__list-link {
  text-decoration: none;
  color: #3498db;
  text-transform: uppercase;
}

.nav__list-link:hover {
  color: #2980b9;
}

.nav__list-link--active {
  border-bottom: 1px solid;
}

.header__img {
  display: block;
  width: 200px;
  height: 40px;
  border: 0 none;
}

.header__logo a {
  display: -webkit-inline-flex;
  display: -moz-inline-flex;
  display: -ms-inline-flex;
  display: -o-inline-flex;
  display: inline-flex;
  align-content: center;
}

.router-link-active {
  text-decoration: none;
  color: #3498db;
  text-transform: uppercase;
  margin-left: 24px;
}

.router-link-exact-active {
  border-bottom: 1px solid;
}
</style>
