<template>
  <div id="goals">
    <div class="form">
      <form @submit.prevent="submitForm" id="createGoal">
        <div>
          <label>What is your goal?</label>
          <br>
          <input type="text" v-model="goal">
        </div>
        <div>
          <label>Have you made any progress yet?</label>
          <br>
          <input class="num-input" type="text" placeholder="hi" v-model="progress"> 
        </div>
        <div>
          <label>Progress limit, upper bound?</label>
          <br>
          <input class="num-input" type="text" placeholder="00" v-model="progressLimit">
        </div>
        <!-- <div>
          <label>How long will it take to accomplish this goal?</label>
          <br>
          <input class="num-input" type="number" min="0" max="23" placeholder="00" step="1" v-model="hours"> hours, 
          <input class="num-input" type="number" min="0" max="59" placeholder="00" step="5" v-model="mins"> mins
        </div> -->
        <div>
          <button form="createGoal">Create Goal</button>
        </div>
      </form>
    </div>
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

.form > form > div > button {
  @apply w-32;
}

</style>