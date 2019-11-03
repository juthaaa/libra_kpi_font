<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <h2>Register</h2>
          </div>
          <ValidationObserver ref="observer" v-slot="{ passes }">
            <form role="form">
              <ValidationProvider rules="required" name="firstname" v-slot="{ valid, errors }">
                <div class="text-muted font-italic">
                  <small>
                    <span class="text-danger font-weight-700">{{errors[0]}}</span>
                  </small>
                </div>
                <base-input
                  class="input-group-alternative mb-3"
                  placeholder="First Name"
                  addon-left-icon="ni ni-hat-3"
                  :valid="errors[0] ? false : (valid ? true : null)"
                  v-model="form_signup.fname"
                ></base-input>
              </ValidationProvider>

              <ValidationProvider rules="required" name="lastname" v-slot="{ valid, errors }">
                <div class="text-muted font-italic">
                  <small>
                    <span class="text-danger font-weight-700">{{errors[0]}}</span>
                  </small>
                </div>
                <base-input
                  class="input-group-alternative mb-3"
                  placeholder="Last Name"
                  addon-left-icon="ni ni-hat-3"
                  :valid="errors[0] ? false : (valid ? true : null)"
                  v-model="form_signup.lname"
                ></base-input>
              </ValidationProvider>

              <ValidationProvider rules="required|email" name="email" v-slot="{ valid, errors }">
                <div class="text-muted font-italic">
                  <small>
                    <span class="text-danger font-weight-700">{{errors[0]}}</span>
                  </small>
                </div>
                <base-input
                  class="input-group-alternative mb-3"
                  placeholder="Email"
                  addon-left-icon="ni ni-email-83"
                  :valid="errors[0] ? false : (valid ? true : null)"
                  v-model="form_signup.email"
                ></base-input>
              </ValidationProvider>

              <ValidationProvider rules="required|min:6" name="password" v-slot="{ valid, errors }">
                <div class="text-muted font-italic">
                  <small>
                    <span class="text-danger font-weight-700">{{errors[0]}}</span>
                  </small>
                </div>
                <base-input
                  class="input-group-alternative"
                  placeholder="Password"
                  type="password"
                  addon-left-icon="ni ni-lock-circle-open"
                  :valid="errors[0] ? false : (valid ? true : null)"
                  v-model="form_signup.password"
                ></base-input>
              </ValidationProvider>

              <ValidationProvider
                rules="required|confirmed:password"
                name="confirm_password"
                v-slot="{ valid, errors }"
              >
                <div class="text-muted font-italic">
                  <small>
                    <span class="text-danger font-weight-700">{{errors[0]}}</span>
                  </small>
                </div>
                <base-input
                  class="input-group-alternative"
                  placeholder="Confirm Password"
                  type="password"
                  addon-left-icon="ni ni-lock-circle-open"
                  :valid="errors[0] ? false : (valid ? true : null)"
                  v-model="passwordconfirm"
                ></base-input>
              </ValidationProvider>

              <!-- <div class="text-muted font-italic">
                            <small>password strength: <span class="text-success font-weight-700">strong</span></small>
              </div>-->

              <!-- <div class="row my-4">
                            <div class="col-12">
                                <base-checkbox class="custom-control-alternative">
                                    <span class="text-muted">I agree with the <a href="#!">Privacy Policy</a></span>
                                </base-checkbox>
                            </div>
              </div>-->
              <div class="text-center">
                <base-button
                  type="primary"
                  class="my-4"
                  @click.prevent="passes(signup_fun)"
                >Create account</base-button>
              </div>
            </form>
          </ValidationObserver>
        </div>
        <div class="col-12 text-right">
          <medium>Already have an account </medium>
          <router-link to="/login" >
            <medium>Login</medium>
          </router-link>
          
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6"></div>
        
      </div>
    </div>
  </div>
</template>
<script>
const axios = require("axios");
import { asyncLoading } from "vuejs-loading-plugin";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  name: "register",
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      form_signup: {
        fname: "",
        lname: "",
        email: "",
        password: ""
      },
      passwordconfirm: ""
    };
  },
  methods: {
    signup_fun() {
    //   console.log("signup_data", this.form_signup);
      let vm = this;
      const signin = new Promise(() => {
        axios
          .post("http://localhost:3000/um/signup", this.form_signup)
          .then(res => {
            // console.log(res);
            vm.$loading(false);
            if(res.data.status == "success"){
                this.$router.push({
                path: "/login",
                name:"login"
                // params: {
                //   balance: res.data.balance,
                //   mnemonic: res.data.mnemonic
                // }
              });
                vm.$notify({type: 'success', message: 'singup success'})
            }else{
                vm.$notify({type: 'danger', message: res.data.message})
            }
          })
          .catch(vm.$loading(false));
      });
      asyncLoading(signin);
    }
  }
};
</script>
<style>
</style>
