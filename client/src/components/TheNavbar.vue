<template>
  <div class="container fixed top-0 max-w-full z-30">
    <div class="bg-blue-500">
      <div class="container mx-auto px-4">
        <div class="flex items-center md:justify-between py-4">
          <div class="w-1/4 md:hidden">
            <svg class="fill-current text-white h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16.4 9H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zm0 4H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zM3.6 7h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1z"/></svg>
            <div id="myDropdown" @click.prevent="toggleDropdown" v-if="true" class="absolute bg-blue-500 text-white mt-4 p-4 overflow-auto z-30">
              <a href="#" class="flex items-center p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i class="mr-1 fa fa-user fa-fw"></i>Create New Post</a>
              <a href="#" class="flex items-center p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i class="mr-1 fa fa-cog fa-fw"></i>My Posts</a>
              <a href="#" class="flex items-center p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i class="mr-1 fa fa-cog fa-fw"></i>Feeds</a>
              <div class="border border-white"></div>
              <a href="#" class="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block">
                <i class="fas fa-sign-out-alt fa-fw"></i> 
                Log Out
              </a>
            </div>
          </div>
          <div class="w-1/2 md:w-auto text-center text-white text-2xl font-medium">
            Nano WP
          </div>
          <div v-if="isLogin" @click.prevent="logout" class="w-1/4 md:w-auto md:flex text-right cursor-pointer">
            <div>
              <i class="text-white fas fa-sign-out-alt"></i>
              <!-- <img class="inline-block h-8 w-8 rounded-full" src="https://avatars0.githubusercontent.com/u/36827603?s=460&v=4" alt=""> -->
            </div>
            <div class="hidden md:block md:flex md:items-center ml-1">
              <span class="text-white text-sm mr-1">Log Out</span>
              <!-- <div>
                <svg class="fill-current text-white h-4 w-4 block opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 0 1-1.576 0S4.924 9.581 4.516 9.163c-.409-.418-.436-1.17 0-1.615z"/></svg>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isLogin" class="hidden bg-blue-400 md:block md:bg-white md:border-b">
      <div class="container border-blue-500 md:flex md:justify-between mx-auto px-4">
        <div class="md:flex">
          <div class="flex mr-8">
            <a href="#"
              @click.prevent="$emit('changePage', 'editor')"
              class="no-underline text-white opacity-50 md:text-gray-600 md:opacity-100 flex items-center py-4 border-b border-transparent md:hover:text-gray-900">
              StuckOverflow
            </a>
          </div>
        </div>
        <div class="relative w-1/4 flex items-center text-blue-500">
          <form @submit.prevent="$emit('showSearch', 'all', keyword)" class="w-full">
            <input v-model="keyword" type="search" name="search" placeholder="Search" class="h-10 px-5 w-full pr-10 rounded-full text-sm border border-blue-500 focus:outline-none">
          </form>
          <div class="flex absolute right-0 mr-4">
            <!-- <button  @click.prevent="toggleSearchDropdown" class="">
              <i class="fas fa-caret-down p-2" style='font-size:24px'></i>
            </button> -->
            <button type="submit" class="">
              <svg class="h-4 w-4 fill-current " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve" width="512px" height="512px">
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
              </svg>
            </button>
            <!-- <div v-if="searchDropdown" class="absolute flex flex-col bg-blue-500 right-0 text-white mt-8 w-24 z-10">
              <a href="#" class="p-2">All</a>
              <hr class="mx-2">
              <a href="#" class="p-2">by Tag</a>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../helpers/axios'
import Swal from 'sweetalert2'
export default {
  name: 'TheNavbar',
  props: {
    isLogin: Boolean
  },
  data () {
    return {
      myDropdown: false,
      searchDropdown: false,
      keyword: ''
    }
  },
  methods: {
    toggleDropdown() {
      this.myDropdown = !this.myDropdown
    },
    toggleSearchDropdown() {
      this.searchDropdown = !this.searchDropdown
    },
    logout() {
      Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log me out'
      })
      .then((result) => {
        if (result.value) {
          localStorage.removeItem('access_token')
          localStorage.removeItem('email')
          this.$emit('logout')
        }
      })
    }
  },
  created () {

  }
}
</script>

<style>

</style>