<template>
  <div>
    <TheNavbar
      :isLogin="isLogin"
      @changePage="changePage"
      @showSearch="showSearch"
      @logout="logout"
    >
    </TheNavbar>
    <LoginForm
      v-if="!isLogin && page === 'login'"
      @login="login"
      @changePage="changePage"
      @setIsLogin="setIsLogin">
    </LoginForm>
    <RegisterForm
      v-if="!isLogin && page === 'register'"
      @registered="login">
    </RegisterForm>
    <MyPosts
      v-if="isLogin && page === 'myposts'"
      @singlePost="toSinglePost"
      @showSearch="showSearch"
      @toEditor="toEditor">
    </MyPosts>
    <FeedsPosts
      v-if="isLogin && page === 'feeds'"
      @showSearch="showSearch"
      @toEditor="toEditor"
    >
    </FeedsPosts>
    <SearchResult
      v-if="isLogin && page === 'search'"
      @toEditor="toEditor"
      :search="search"
    >
    </SearchResult>
    <EditorForm
      :articleId="articleId"
      @changePage="changePage"
      v-if="isLogin && page === 'editor'">
    </EditorForm>
    <SinglePost
      :articleId="articleId"
      @toEditor="toEditor"
      v-if="isLogin && page === 'post'">
    </SinglePost>
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar'
import EditorForm from './components/EditorForm'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import MyPosts from './components/MyPosts'
import SinglePost from './components/SinglePost'
import SearchResult from './components/SearchResult'
import FeedsPosts from './components/FeedsPosts'
export default {
  name: 'app',
  components: {
    TheNavbar,
    LoginForm,
    RegisterForm,
    EditorForm,
    MyPosts,
    SinglePost,
    SearchResult,
    FeedsPosts
  },
  data () {
    return {
      isLogin: false,
      page: 'login',
      articleId: null,
      search: {
        keyword: '',
        kind: ''
      }
    }
  },
  methods: {
    changePage(page) {
      this.page = page
    },
    setCurrentArticleId(id) {
      this.articleId = id
    },
    setIsLogin(value) {
      this.isLogin = value
      this.page = 'myposts'
    },
    toSinglePost(articleId) {
      this.page = 'post'
      this.articleId = articleId
    },
    toEditor(articleId) {
      this.page = 'editor'
      this.articleId = articleId
    },
    showSearch(kind, keyword) {
      this.search.kind = kind
      this.search.keyword = keyword,
      this.page = 'search'
    },
    logout() {
      this.isLogin = false
      this.page = 'login'
    },
    login() {
      this.isLogin = true,
      this.page = 'myposts'
    }
  },
  created () {
    const access_token = localStorage.getItem('access_token')
    if (!access_token) {
      this.isLogin = false
    } else {
      this.isLogin = true
      this.page = 'myposts'
      this.articleId = null
      this.searchResult = null
    }
  }
}
</script>

<style>
* {
  font-family: 'Lato', sans-serif;
}

</style>