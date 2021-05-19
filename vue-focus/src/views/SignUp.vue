<template>
  <div id="signup">
    <form @submit.prevent="submitForm">
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
      <div>
        <label>Repeat Password</label>
        <br>
        <input type="password" v-model="password2">
      </div>
      <div v-if="errors.length">
        <p v-for="error in errors" :key="error">{{ error }}</p>
      </div>
      <div>
        <button>Sign Up</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'

export default {
  name: 'SignUp',
  data() {
    return {
      username: '',
      password: '',
      password2: '',
      errors: []
    }
  },
  methods: {
    submitForm() {
      this.errors = []

      if (this.username === '') {
        this.errors.push('The username is missing.')
      }

      if (this.password === '') {
        this.errors.push('The password is too short.')
      }

      if (this.password !== this.password2) {
        this.errors.push('THe passwords don\'t match.') }

      if (!this.errors.length) {
        const formData = {
          username: this.username,
          password: this.password
        }

        axios
          .post("/api/v1/users/", formData)
          .then(response => {
            toast({
              message: 'Account created, please log in.',
              type: 'is-success',
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              postition: 'bottom-right',
            })

            this.$router.push('/log-in')
          })
          .catch(error => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(`${property}: ${error.response.data[property]}`)
              }

              console.log(JSON.stringify(error.response.data))

            } else if (error.message) {
              this.errors.push('Something went wrong. Please try again')

              console.log(JSON.stringify(error))
            }
          })
      }
    }
  }

}
</script>

<style>

/* for login page as well */

#signup {
  height: 100vh;
}


form {
  @apply text-center text-xl;
}

label {
  /* @apply text-left; */
}

form > div > input {
  @apply w-64 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:ring-1 h-10 border-red-300 rounded-md;
  border-width: 3.0px;
  box-sizing: border-box;
  padding: 5px;
  font-size: 1.0rem;
}

form > div {
  margin-top: 0px;
  margin-bottom: 0px;
}

form > div > button {
  @apply shadow-sm rounded-md h-10 w-28 mt-12 focus:ring-indigo-500 focus:border-indigo-500 focus:ring-1;
  background-color: rgb(129, 223, 255);
}

form > div > button:hover {
  @apply bg-blue-300;
}

</style>