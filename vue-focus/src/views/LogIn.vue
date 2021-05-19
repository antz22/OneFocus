<template>
  <div id="login">
    <form @submit.prevent="submitForm" class="user-form">
      <div>
        <label>Username</label>
        <br>
        <input type="text" v-model="username">
      </div>
      <div>
        <label>Password</label>
        <br>
        <input type="password" v-model="password">
      </div>
      <div v-if="errors.length">
        <div class="form-text">
          <p v-for="error in errors" :key="error">{{ error }}</p>
        </div>
      </div>
      <div>
        <button>Log In</button>
      </div>
    </form>
    <div class="form-text">
      <br>
      <p>Don't have an account yet? <router-link to="/sign-up">Sign up here!</router-link></p>
      <!-- <p>It's easy, get started today :)</p> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'

export default {
  name: 'LogIn',
  data() {
    return {
      username: '',
      password: '',
      errors: []
    }
  },
  mounted() {
    document.title = 'Log In | OneFocus'
  },
  methods: {
    async submitForm() {
      this.errors = []

      axios.defaults.headers.common["Authorization"] = ""

      localStorage.removeItem("token")

      const formData = {
        username: this.username,
        password: this.password
      }

      await axios
        .post("/api/v1/token/login/", formData) 
        .then(response => {
          const token = response.data.auth_token

          this.$store.commit('setToken', token)

          axios.defaults.headers.common["Authorization"] = "Token " + token

          localStorage.setItem("token", token)

          const toPath = this.$route.query.to || '/'

          this.$router.push(toPath)
        })
        .catch(error => {
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.push(`${property}: ${error.response.data[property]}`)
            }
          } else {
            this.errors.push('Something went wrong. Please try again')

            console.log(JSON.stringify(error))
          }
        })
    }

  }
}


</script>

<style scoped>

#login {
  height: 100vh;
}

</style>