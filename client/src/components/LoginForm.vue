<template>
  <div class="container mx-auto h-screen flex">
    <div class="mx-auto my-24 w-full max-w-xs">
      <h4 class="text-center p-4 font-bold text-gray-700">Log in to your account</h4>
      <WarningCard
        @closeWarning="closeWarning"
        v-if="warning"
        class="my-2 px-10"
        :errorMsg="errorMsg">
      </WarningCard>
      <form
        @submit.prevent="submitLogin"
        @keyup.enter="submitLogin"
        class=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            id="username"
            v-model="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="example@mail.com">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input
            id="password"
            v-model="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            autocomplete="on"
            placeholder="******">
        </div>
        <div class="flex-col items-center justify-between">
          <button
            @click.prevent="submitLogin"
            class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
            type="submit">
            Log In
          </button>
          <hr>
          <button
            v-google-signin-button="clientId"
            class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
            type="button">
            Continue with Google
          </button>
        </div>
        <div class="flex items-center mt-4">
          <span class="mx-auto text-sm text-gray-500">
            Don't have an account?
            <a href="#" @click.prevent="toRegister" class="text-blue-500 hover:text-blue-900">Register</a>
          </span>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">
        &copy;2019 Deprak. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script>
import axios from '../../helpers/axios'
import Swal from 'sweetalert2'
import GoogleSignInButton from 'vue-google-signin-button-directive'
import WarningCard from './WarningCard'
import errorHandler from '../../helpers/errorHandler'
export default {
  name: 'LoginForm',
  components: {
    WarningCard
  },
  data () {
    return {
      email: '',
      password: '',
      warning: false,
      errorMsg: '',
      clientId: '762236887318-k7scpbh8384at05t8cvhjk5vbs4evra2.apps.googleusercontent.com'
    }
  },
  methods: {
    toRegister() {
      this.$emit('changePage', 'register')
    },
    closeWarning() {
      this.warning = false
    },
    submitLogin() {
      axios({
        method: 'post',
        url: '/user/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('email', data.email)
          this.$emit('setIsLogin', true)
        })
        .catch(({ response }) => {
          this.errorMsg = errorHandler(response)
          this.warning = true
        })
    },
    OnGoogleAuthSuccess (id_token) {
      axios({
        method: 'post',
        url: '/user/login/google',
        data: {
          id_token
        }
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access_token)
          localStorage.setItem('email', data.email)
          this.$emit('login')
          Swal.fire({
            icon: 'success',
            text: "Successfully signed in!"
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err
          })
        })
    },
    OnGoogleAuthFail (err) {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err
      })    
    },

  }
}
</script>

<style>

</style>