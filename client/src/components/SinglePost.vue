<template>
  <div class="mx-auto my-32 max-w-xl rounded overflow-hidden shadow-lg bg-white">
    <img class="w-full" :src="featuredImage">
    <div class="px-6 py-4">
      <div class="relative">
        <div class="font-bold text-xl mb-2">{{ title }}</div>
        <div>
          <svg
            @click="toggleMenu"
            class="cursor-pointer fill-current absolute top-0 right-0 mx-1 text-black h-8 w-8" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20">
            <path d="M16.4 9H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zm0 4H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zM3.6 7h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1z"/>
          </svg>
          <div v-if="openedToggle" class="absolute bg-blue-500 top-0 right-0 text-white mt-8 p-2 overflow-auto z-10">
            <a href="" @click.prevent="$emit('toEditor', articleId)" class="flex items-center p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i class="mr-1 fa fa-cog fa-fw"></i>Edit</a>
            <a href="" @click.prevent="destroy()" class="flex items-center p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i class="mr-1 fa fa-cog fa-fw"></i>Delete</a>
          </div>
        </div>
      </div>
      
      <div v-html="content" class="text-gray-700 text-base mb-2">
        
      </div>
    </div>
    <div class="px-6 py-4">
      <span
        v-for="tag in tags" :key="tag"
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script>
import axios from '../../helpers/axios'
import Swal from 'sweetalert2'
export default {
  name: 'SinglePost',
  props: {
    articleId: String
  },
  data () {
    return {
      title: '',
      content: '',
      date: '',
      author: '',
      featuredImage: '',
      tags: '',
      openedToggle: false
    }
  },
  methods: {
    toggleMenu() {
      this.openedToggle = !this.openedToggle
    },
    fetchPost() {
      axios({
        method: 'get',
        url: `/articles/${this.articleId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.title = data.title
          this.author = data.author.username
          this.content = data.content
          this.date = data.created_at
          this.featuredImage = data.featured_image
          this.tags = data.tags
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    destroy() {
      Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      })
      .then((result) => {
        if (result.value) {
          axios({
            method: 'delete',
            url: `/articles/${this.articleId}`,
            headers: {
              access_token: localStorage.getItem('access_token')
            }
          })
            .then(({ data }) => {
              this.fetchPost()
            })
        }
      })
    }
  },
  created () {
    this.fetchPost()
  },
  computed: {
  }
}
</script>

<style>

</style>