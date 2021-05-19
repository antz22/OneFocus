<template>
  <div id="home">
    <!-- <div class="home-images">
      <div class="inline-block column">
        <img alt="Pleasant photos." src="../assets/snowystreet.jpg">
      </div>
      <div class="inline-block column">
        <img alt="Pleasant photos." src="../assets/girl.jpg">
      </div>
      <div class="inline-block column">
        <img alt="Pleasant photos." src="../assets/rainystreet.jpg">
      </div>
    </div> -->
    <h1 class="header2 mt-4">Tasks</h1>
    <div class="todos">
      <div v-if="tasks.length === 0">
        <h1>No tasks. All done!</h1>
      </div>
      <div
        class="container mx-auto"
        v-for="task in tasks"
        :key="task.id"
      >
        <div class="display-items">
          <div class="display-task">

            <div class="row1">
              <!--Task-->
              <div class="inline-block">
                <h1 class="font-bold">{{ task.content }}</h1> 
              </div>

              <!--Archive / delete-->
              <div class="inline-block float-right pt-8 btn">
                <button @click="deleteTask(task.id); getTasks()">Archive Task</button>
              </div>
            </div>


            <div class="row2">
              <div class="inline-block text-left">
                <!--Motivation -->
                <p v-if="task.motivation != ''">{{ task.motivation }}</p>
              </div>
              <div class="inline-block float-right">
                <!--Completed or not? -->
                <div v-if="!task.completed">
                  <CheckBox @click="completeTask(task.id, true); getTasks()" />
                </div>
                <div v-else>
                  <div class="pr-16">
                    <i class="fas fa-check"></i>
                  </div>
                </div>
              </div>

            </div>

            <!--Time -->
            <div v-if="task.time > 0">
              <div class="row3">
                <p v-if="task.time < 60">{{ task.time }} mins </p>
                <p v-else-if="task.time === 60">{{ parseInt(task.time/60) }} hour </p>
                <p v-else-if="task.time%60 === 0">{{ parseInt(task.time/60) }} hours </p>
                <p v-else>{{ Math.floor(parseInt(task.time/60)) }} hours, {{ task.time%60 }} mins </p>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
    <h1 class="header2 mt-4">Goals</h1>
    <div class="goals">
      <div v-if="goals.length === 0">
        <h1>You currently do not have any goals set.</h1>
      </div>
      <div v-else
        class="container mx-auto"
        v-for="goal in goals"
        :key="goal.id"
      >
        <div class="display-items">
          <div class="display-goal">
            <div class="row1-goal">
              <div class="float-right">
                <button @click="deleteGoal(goal.id); getGoals()">Archive Goal</button>
              </div>
            </div>
            <br>
            <div class="goal-header">
              <h1>{{ goal.goal }}</h1>
            </div>
            <ProgressBar @changeProgress="updateProgress(goal.id, $event); getGoals()" :progressValue="goal.progress" :progressLimit="goal.progressLimit"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import { toast } from 'bulma-toast'
import CheckBox from '../components/CheckBox.vue'
import ProgressBar from '../components/ProgressBar.vue'
import Burger from '../components/Burger.vue'

export default {
  name: 'Home',
  data() {
    return {
      tasks: [],
      goals: [],
    }
  },
  components: {
    CheckBox,
    ProgressBar,
    Burger,
  },
  computed: {
  },
  mounted() {
    this.getTasks(),
    this.getGoals()
  },
  methods: {
    getTasks() {
      axios
        .get('/api/v1/tasks/')
        .then(response => {
          this.tasks = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getGoals() {
      axios
        .get('/api/v1/goals/')
        .then(response => {
          this.goals = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    completeTask(task_id, completed) {
      const formData = {
        id: task_id,
        completed: completed,
      }
      axios
        .post('/api/v1/create-task/', formData)
        .then(response => {
          toast({
            message: 'Task updated.',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: 'bottom-right',
          })

          this.$router.push('/')
        })
    },
    deleteTask(task_id) {
      confirm('Are you sure?')
      const formData = {
        id: task_id,
      }
      axios
        .post('/api/v1/delete-task/', formData)
        .then(response => {
          toast({
            message: 'Task archived.',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: 'top-right',
          })

          this.$router.push('/')
        })
    },
    updateProgress(goal_id, progress) {
      const formData = {
        id: goal_id,
        progress: progress,
      }
      axios
        .post('/api/v1/create-goal/', formData)
        .then(response => {
          toast({
            message: 'Goal updated.',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: 'bottom-right',
          })

          this.$router.push('/')
        })
    },
    deleteGoal(goal_id) {
      confirm('Are you sure?')
      const formData = {
        id: goal_id,
      }
      axios
        .post('/api/v1/delete-goal/', formData)
        .then(response => {
          toast({
            message: 'Goal archived.',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: 'bottom-right',
          })

          this.$router.push('/')
        })
    },
  }
}
</script>

<style scoped>

#home {
  @apply h-full;
}

.home-images {
  @apply space-x-6 h-auto container mx-auto text-center;
}

.column {
  @apply max-w-sm;
}

.display-items {
  @apply text-xl mb-4;
}

.display-task {
  @apply rounded-md shadow-xl duration-200 m-4 mb-8;
  border-width: 1px;
  border-color: #0395E8;
  background-color: #0395E8;

}

.display-task:hover {
  @apply duration-200;
  background-color: #75CBCA;
  border-color: #75CBCA;
}

.display-task:hover .btn {
  visibility: visible;
  transition: all 0.5s linear;
}

.row1 > div > h1 {
  @apply text-2xl text-left ml-8 mt-8 mb-6;
}

.row1 > div > button {
  @apply float-right pr-16;
}

.btn {
  visibility: hidden;
}


.row2 {
  @apply text-xl ml-8 mb-6;
}

.row3 {
  @apply text-left ml-8 mb-8;
}



/* .side-left {
  @apply text-left float-left;
}

.side-right {
  @apply text-right float-right;
}

.side-left > p {
  @apply mt-8;
}

.display-task > p {
  @apply text-xl text-left ml-8 mt-6 mb-4;
} */


.display-task > input {
  @apply inline-block;
}

.goals {
  @apply mb-12;
}

.display-goal {
  @apply rounded-lg shadow-xl duration-200 m-4 pb-8 mb-8;
  border-width: 1px;
  border-color: #0395E8;
  background-color: #0395E8;

}

.display-goal:hover {
  @apply duration-200;
  background-color: #75CBCA;
  border-color: #75CBCA;

}

.row1-goal > div > h1 {
  @apply text-center mt-4 mb-8;
}

.display-goal > p {
  @apply text-xl text-center;
}

.display-goal > input {
  @apply inline-block;
}

.goal-header > h1 {
  @apply text-center text-3xl mt-4 mb-8;

}


/* input[type="checkbox"] {
  @apply text-left;
}

input[type="checkbox"]:checked {
  display: none;
}

i {
  display: none;
}

input[type="checkbox"]:checked + i,.test {
  display: block;
}

.test {
  display:none;
} */


</style>
