<template>
  <div class="container container--tall container--max-width">

    <div style="padding:20px;"><iframe width="560" height="315"  src="https://www.youtube.com/embed/9NT_7USctcU"  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

    <div class="login">
      <form class="form" @submit.prevent="login">
        <label class="form-row">
          <div class="form-input" >
            <input placeholder="E-mail" type="text" v-model="form.email" :class="{ 'hasError': $v.form.email.$error }"/>
          </div>
        </label>

        <label class="form-row" style="display:block;margin-top:12px;">
          <div class="form-input" >
            <input placeholder="Парола" type="password" v-model="form.password"  :class="{ 'hasError': $v.form.password.$error }"/>
          </div>
        </label>

        <div class="form-row form-row--errors" style="color:red;margin:10px;" v-if="error && isSubmitted">{{ error }}</div>

        <div>
          <div class="error" v-if="$v.form.email.$error">Въведете коректен имейл.</div>
          <div class="error" v-if="!$v.form.password.min">Паролата трябва да е минимум {{$v.form.password.$params.min.min}} символа.</div>
          <div class="error" v-if="$v.form.password.$error">Моля въведете коректна парола</div>
        </div>    

        <div class="form-row form-row--actions" style="display:block;margin-top:12px;">
          <button type="submit" @click="isSubmitted = true">Вход</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: "",
      isSubmitted: false
    };
  },
  validations: {
    form: {
      password: { required, min: minLength(6) },
      email: { required, email }
    }
  },
  methods: {
    login() {
      this.$v.$touch()
      this.isSubmitted = true
      
      if (this.$v.$invalid) {
        return
      }
      this.$store
        .dispatch("signInWithEmailAndPassword", this.form)
        .then(() => {
          this.successRedirect();
        })
        .catch(error => (this.error = error.message));
    },
    successRedirect() {
      const redirectTo = this.$route.query.redirectTo || { name: "Home" };
      this.$router.push(redirectTo);
    }
  },
  created() {
    this.$emit("ready");
  }
};
</script>

<style scoped>
.login {
  max-width: 360px;
  margin: auto;
}
.hasError{
  border-color:red
}
.error{
  color:red;
  margin:10px;
}
.login-page .nav {
  display: none;
}

.login-page .header__block {
  text-align: center;
  justify-content: center;
}

.login-page .header__logo {
  margin-bottom: 0;
}

.login-page .footer {
  text-align: center;
}

.login {
  text-align: center;
}

.login input {
  text-align: center;
  padding: 12px;
  display: block;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: #fff;
  -moz-appearance: none;
  appearance: none;
  font: inherit;
  font-size: 16px;
  -webkit-appearance: none;
  border-radius: 30px;
  outline: 0 none !important;
}

.login button {
  background: #2ecc71;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  padding: 12px 24px;
  border-radius: 20px;
  display: block;
  width: 100%;
  font-family: inherit;
  border: 0 none;
  outline: 0 none !important;
}
</style>
