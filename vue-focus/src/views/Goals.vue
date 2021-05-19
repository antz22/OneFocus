<template>
  <div id="goals">
    <form @submit.prevent="submitForm" class="task-form" id="createGoal">
      <div>
        <label>What is your goal?</label>
        <br>
        <input type="text" v-model="goal">
      </div>
      <div>
        <label>What's the limit of what you want to measure your progress by?</label>
        <br>
        <label>(ex. 90 days, 10 homework assignments, etc)</label>
        <br>
        <input class="num-input" type="number" v-model="progressLimit">
      </div>
      <div>
        <label>Have you made any progress on this goal yet?</label>
        <br>
        <label>(ex. finished 5/10 assignments already)</label>
        <br>
        <input class="num-input" type="number" v-model="progress"> 
      </div>
      <div>
        <button form="createGoal">Create Goal</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'

export default {
  name: 'Goals',
  data() {
    return {
      goal: '',
      progress: 0,
      progressLimit: 0,
      errors: []
    }
  },
  methods: {
    submitForm() {
      this.errors = []

      if (this.goal === '') {
        this.errors.push('Enter a goal')
      }

      if (!this.errors.length) {
        const formData = {
          goal: this.goal,
          time: this.time,
          progress: this.progress,
          progressLimit: this.progressLimit,
        }

        axios
          .post("/api/v1/create-goal/", formData)
          .then(response => {
            toast({
              message: 'Goal created.',
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

#goals {
  height: 100vh;
}

</style>