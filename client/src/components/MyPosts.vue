<template>
  <div class="mt-32">
    <div v-for="article in myArticles" :key="article._id" class="mb-4 mx-auto max-w-xl rounded overflow-hidden shadow-lg bg-white">
      <div class="relative z-0">
        <img class="w-full relative z-0" :src="article.featured_image">
        
      </div>
      <div class="px-6 py-4">
        <div class="relative">
          <div
            @click.prevent="$emit('singlePost', article._id)"
            class="font-bold text-xl mb-2 cursor-pointer hover:underline">
            {{ article.title }}
          </div>
          <div>
            <svg
              @click="toggleMenu(article._id)"
              class="cursor-pointer fill-current absolute top-0 right-0 mx-1 text-black h-8 w-8" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20">
              <path d="M16.4 9H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zm0 4H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zM3.6 7h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1z"/>
            </svg>
            <div v-if="openedToggles.includes(article._id)" class="absolute bg-blue-500 top-0 right-0 text-white mt-8 p-2 overflow-auto z-10">
              <a href="" @click.prevent="$emit('toEditor', article._id)" class="flex items-center p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i class="mr-1 fa fa-cog fa-fw"></i>Edit</a>
              <a href="" @click.prevent="destroy(article._id)" class="flex items-center p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i class="mr-1 fa fa-cog fa-fw"></i>Delete</a>
            </div>
          </div>
        </div>
        <div v-html="article.content" class="text-gray-700 mb-2">
          
        </div>
        <!-- <span class="text-gray-600 text-sm">by {{ article.author.username }} </span> -->
      </div>
      <!-- Tags -->
      <div class="px-6 py-4">
        <span
          v-for="tag in article.tags" 
          :key="tag"
          @click.prevent="$emit('showSearch', 'tag', tag)"
          class="inline-block cursor-pointer bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {{ tag }}
        </span>
      </div>
      <!-- End of Tags -->
    </div>
  </div>
</template>

<script>
import axios from '../../helpers/axios'
import Swal from 'sweetalert2'
export default {
  name: 'MyPosts',
  data () {
    return {
      myArticles: [],
      openedToggles: []
    }
  },
  methods: {
    fetchMyPosts() {
      axios({
        method: 'get',
        url: '/user/myarticles',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.myArticles = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    toggleMenu(articleId) {
      if (!this.openedToggles.includes(articleId)) {
        this.openedToggles.push(articleId)
      } else {
        let index = this.openedToggles.indexOf(articleId)
        if (index > -1) {
          this.openedToggles.splice(index, index + 1)
        }
      }
    },
    destroy(articleId) {
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
            url: `/articles/${articleId}`,
            headers: {
              access_token: localStorage.getItem('access_token')
            }
          })
            .then(({ data }) => {
              this.fetchMyPosts()
            })
        }
      })
    }
  },
  created() {
    this.fetchMyPosts()
  },
  watch: {
    searchResult(n, o) {
      this.myArticles = n
    }
  }
}
</script>

<style>

</style>