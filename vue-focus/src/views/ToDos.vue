<template>
  <div id="todos">
    <div class="form">
      <form @submit.prevent="submitForm" id="createTask">
        <div>
          <label>What's the task?</label>
          <br>
          <input type="text" v-model="content">
        </div>
        <div>
          <label>What's the motivation? Or maybe, what's the big picture? (this can be left blank)</label>
          <br>
          <input type="text" v-model="motivation">
        </div>
        <div>
          <label>How long will it take?</label>
          <br>
          <input class="num-input" type="number" min="0" max="23" placeholder="00" step="1" v-model.number="hours"> hours, 
          <input class="num-input" type="number" min="0" max="59" placeholder="00" step="5" v-model.number="mins"> mins
        </div>
        <div>
          <button form="createTask">Create Todo</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'

export default {
  name: 'ToDos',
  data() {
    return {
      content: '',
      motivation: '',
      hours: 0,
      mins: 0,
      errors: []
    }
  },
  computed: {
    time() {
      return this.hours*60+this.mins
    },
  },
  methods: {
    submitForm() {
      this.errors = []

      if (this.content === '') {
        this.errors.push('Enter a task')
      }

      if (this.time === '') {
        this.errors.push('Enter a time')
      }
      console.log(this.errors)

      if (!this.errors.length) {
        const formData = {
          content: this.content,
          motivation: this.motivation,
          time: this.time,
          completed: false
        }

        axios
          .post("/api/v1/create-task/", formData)
          .then(response => {
            toast({
              message: 'Task created.',
              type: 'is-success',
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: 'bottom-right',
            })

            this.$router.push('/')
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

#todos {
  height: 100vh;
}

.num-input {
  @apply w-14;
}


/* in common with goals.vue */

.form {
  @apply text-center container mx-auto text-xl space-y-4;
}

form > div {
  @apply space-y-10 mb-10;
}

form > div > div > input {
  @apply shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:ring-1 h-10 mt-1 border-red-300 rounded-md;
  border-width: 3.0px;
  box-sizing: border-box;
  padding: 8px;
}

label {
  @apply font-semibold;
}

</style>