<template>
  <div class="container mx-auto h-screen flex">
    <div class="mx-auto my-24 w-full max-w-xs">
      <h4 class="text-center p-4 font-bold text-gray-700">Register a new account</h4>
      <WarningCard
        @closeWarning="closeWarning"
        v-if="warning"
        class="my-2 px-10"
        :errorMsg="errorMsg">
      </WarningCard>
      <form
        @submit.prevent="submitRegister"
        @keyup.enter="submitRegister"
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2" 
            for="reg-username"
            > Username
          </label>
          <input
            id="reg-username" 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text" 
            placeholder="username"
            v-model="username">
        </div>
        <div class="mb-4">
          <label 
            for="reg-email"
            class="block text-gray-700 text-sm font-bold mb-2"
            > Email
          </label>
          <input 
            id="reg-email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="example@mail.com"
            v-model="email">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            for="reg-password">
            Password
          </label>
          <input
            id="reg-password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="******"
            autocomplete="on"
            v-model="password">
        </div>
        <div class="flex-col items-center justify-between">
          <button
            class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
            type="submit"
            > Register
          </button>
        </div>
        <div class="flex items-center mt-4">
          <span
            class="mx-auto text-sm text-gray-500"
            >Already have an account? 
            <a href="#"
              class="text-blue-500 hover:text-blue-900"
              @click.prevent="toLogin"
              > Log in
            </a>
          </span>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs"
       > &copy;2019 Deprak. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from '../../helpers/axios'
import WarningCard from './WarningCard'
import errorHandler from '../../helpers/errorHandler'
export default {
  name: 'LoginForm',
  components: {
    WarningCard
  },
  data () {
    return {
      username: '',
      email: '',
      password: '',
      warning: false,
      errorMsg: ''
    }
  },
  methods: {
    toLogin() {
      this.$emit('changePage', 'login')
    },
    closeWarning() {
      this.warning = false
    },
    submitRegister() {
      axios({
        method: 'post',
        url: '/user/register',
        data: {
          username: this.username,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('email', data.email)
          this.$emit('registered')
          Swal.fire({
            icon: 'success',
            text: 'Successfully registered'
          })
        })
        .catch(({ response }) => {
          this.errorMsg = errorHandler(response)
          this.warning = true
        })
    }
  }
}
</script>

<style>

</style>