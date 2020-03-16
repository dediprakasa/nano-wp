<template>
  <div class="bg-white p-8 w-4/5 mx-auto max-w-xl rounded-lg shadow mt-32">
    <div id="preview" class="mt-4">
      <img v-if="url" :src="url" class=" max-w-lg rounded-lg mx-auto" />
    </div>
    <form @submit.prevent="submitPost" class="my-4 text-lg">
      <div>
        <input v-model="title" class="shadow-md border rounded-sm border-gray-200 w-full p-2" placeholder="Title">
      </div>
      <div class="overflow-auto z-0">
        <wysiwyg v-model="description" class="h-full my-4 w-full rounded-sm shadow-md overflow-auto"/>
      </div>
      <div class="mb-4">
        <h4 class="text-gray-700 mb-2">Set Featured Image: </h4>
        <input type="file" @change="onFileChange">
      </div>
      <div class="mb-4">
        <h4 class="text-gray-700">Add Tags:</h4>
        <span class="text-sm text-gray-600">(Tags are separated by comma and all whitespace between will be omitted)</span>
        <input v-model="tags" class="shadow-md border rounded-sm border-gray-200 w-full p-2" placeholder="Eg. photography, life, travel">
      </div>
      <button
        class="bg-blue-400 px-2 py-1 rounded-sm shadow-md text-white hover:bg-blue-700"
        type="submit">
        Submit 
      </button>
    </form>
  </div>
</template>

<script>
import axios from '../../helpers/axios'
import Swal from 'sweetalert2'
import errorHandler from '../../helpers/errorHandler'
export default {
  name: 'EditorForm',
  props: ['articleId'],
  component: {
  },
  data () {
    return {
      title: '',
      content: '',
      tags: '',
      file: null,
      url: null
    }
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0]
      this.url = URL.createObjectURL(file)
      this.file = file
    },
    submitPost() {
      const fd = new FormData()
      fd.append('title', this.title)
      fd.append('content', this.content)
      fd.append('tags', this.tags)
      if (this.file) {
        fd.append('featured_image', this.file)
      }
      if (!this.articleId) {
        axios({
        method: 'post',
        url: '/articles',
        headers: {
          'Content-Type': 'multipart/form-data',
          access_token: localStorage.getItem('access_token')
        },
        data: fd
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            text: 'Submitted!'
          })
          this.$emit('changePage', 'myposts')
        })
        .catch(({ response }) => {
          let msg = errorHandler(response)
          Swal.fire({
            icon: 'error',
            text: msg
          })
        })
      } else {
        axios({
        method: 'patch',
        url: `/articles/${this.articleId}`,
        headers: {
          'Content-Type': 'multipart/form-data',
          access_token: localStorage.getItem('access_token')
        },
        data: fd
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            text: 'Submitted!'
          })
          this.$emit('changePage', 'myposts')
        })
        .catch(({ response }) => {
          let msg = errorHandler(response)
          Swal.fire({
            icon: 'error',
            text: msg
          })
        })
      }
    }
  },
  created () {
    if (this.articleId) {
      axios({
        method: 'get',
        url: `/articles/${this.articleId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          const { title, content, tags, featured_image } = data
          this.title = title
          this.content = content
          this.tags = tags
          this.url = featured_image
        })
        .catch(({ response }) => {
          let msg = errorHandler(response)
          Swal.fire({
            icon: 'error',
            text: msg
          })
        })
    }
  }
}
</script>

<style scoped>

</style>