<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <h1>LOG IN</h1>
          </div>
          <ValidationObserver ref="observer" v-slot="{ passes }">
            <form role="form">
              <ValidationProvider rules="required|email" name="email" v-slot="{ valid, errors }">
                <div class="text-muted font-italic">
                  <small>
                    <span class="text-danger font-weight-700">{{errors[0]}}</span>
                  </small>
                </div>
                <base-input
                  placeholder="Email"
                  :valid="errors[0] ? false : (valid ? true : null)"
                  v-model="username"
                ></base-input>
              </ValidationProvider>

              <ValidationProvider rules="required" name="password" v-slot="{ valid, errors }">
                <div class="text-muted font-italic">
                  <small>
                    <span class="text-danger font-weight-700">{{errors[0]}}</span>
                  </small>
                </div>
                <base-input
                  class="input-group"
                  placeholder="Password"
                  type="password"
                  :valid="errors[0] ? false : (valid ? true : null)"
                  v-model="password"
                ></base-input>
              </ValidationProvider>

              <div class="text-center">
                <!-- <base-button type="primary" class="my-4" @click.prevent="passes(login_fun)">Sign in</base-button> -->
                <base-button type="primary" class="my-4" @click.prevent="passes(login_fun)">LOG IN</base-button>
              </div>
            </form>
          </ValidationObserver>
        </div>
        <div class="col-12 text-right ">
          <router-link to="/register"  >
            <medium >Create new account</medium>
          </router-link>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <!-- <a href="#" class="text-light">
            <small>Forgot password?</small>
          </a>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
const axios = require("axios");
import { asyncLoading } from "vuejs-loading-plugin";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  name: "login",
  data() {
    return {
      username: null,
      password: null,
      showDismissibleAlert: false
    };
  },
  methods: {
    remove() {
      localStorage.removeItem("address");
      localStorage.removeItem("mnemonic");
    },
    login_fun() {
      // console.log("buttom login")
      let vm = this;
      const login = new Promise(() => {
        axios
          .post("http://localhost:3000/um/login", {
            username: this.username,
            password: this.password
          })
          .then(res => {
            console.log(res);
            if (res.data.status_text == "success") {
              localStorage.setItem("address", res.data.address);
              localStorage.setItem("mnemonic", res.data.mnemonic);

              this.$router.push({
                path: "/dashboard",
                name: "dashboard",
                params: {
                  balance: res.data.balance,
                  mnemonic: res.data.mnemonic
                }
              });
            } else {
              vm.$notify({
                type: "danger",
                message: "username or password invalid"
              });
            }
            vm.$loading(false);
          })
          .catch(vm.$loading(false));
      });
      asyncLoading(login);
    }
  },
  created() {
    this.remove();
  }
};
</script>
<style>
</style>
