<template>
  <div id="home">
    <div class="display-quote">
      <div class="quote-content">
        <p>"{{ quote.content }}"</p>
      </div>
      <div class="quote-author">
        <p>{{ quote.author }}</p>
      </div>
    </div>
    <h1 class="header2 mt-4">Tasks</h1>
    <div class="todos">
      <div v-if="tasks.length === 0">
        <div class="task-header">
          <h1>No tasks. All done!</h1>
        </div>
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
              <div class="inline-block archive-task">
                <button @click="deleteTask(task.id); getTasks()">Archive</button>
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
                  <div class="pr-16 pt-3">
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
        <div class="goal-header">
          <h1>You currently do not have any goals set.</h1>
        </div>
      </div>
      <div v-else
        class="container mx-auto"
        v-for="goal in goals"
        :key="goal.id"
      >
        <div class="display-items">
          <div class="display-goal">
            <br>
            <div class="goal-header">
              <h1>{{ goal.goal }}</h1>
            </div>
            <ProgressBar @changeProgress="updateProgress(goal.id, $event); getGoals()" :progressValue="goal.progress" :progressLimit="goal.progressLimit"/>
            <div class="archive-goal">
              <button @click="deleteGoal(goal.id); getGoals()">Archive</button>
            </div>
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
      quote: [],
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
    this.getGoals(),
    this.getQuote()
  },
  methods: {
		getQuote() {
      axios
        .get('/api/v1/quotes/')
        .then(response => {
          this.quote = response.data
        })
        .catch(error => {
          console.log(error)
        })
		},
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
      if (confirm('Are you sure?')) {
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
      }
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
      if (confirm('Are you sure?')) {
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
      }
    },
  }
}
</script>

<style scoped>

#home {
  height: 100%;
}

.display-quote {
  text-align: center;
}

.quote-content {
  font-size: 24px;
  font-style: italic;
}

.quote-author {
  font-size: 19px;
}

.display-items {
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 16px;
}

.display-task {
  @apply shadow-xl;
  margin: 16px;
  margin-bottom: 32px;
  border-width: 1px;
  border-radius: 6px;
  border-color: #0395E8;
  background-color: #0395E8;
  transition-duration: 200ms;
}

.display-task:hover {
  background-color: #75CBCA;
  border-color: #75CBCA;
  transition-duration: 200ms;
}

.display-task:hover .archive-task > button {
  height: auto;
  opacity: 1;
  /* transition: height 0ms 0ms, opacity 600ms 0ms; */
}

.archive-task {
  margin-top: 32px;
  margin-right: 32px;
  float: right;
}

.archive-task > button {
  @apply shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:ring-1;
  height: 0;
  opacity: 0;
  overflow: hidden;
  /* transition: height 0ms 400ms, opacity 0ms 0ms; */
  font-size: 18px;
  border-radius: 2px;
  width: 80px;
  /* background-color: rgb(129, 223, 255); */
  background-color: #12a7cc;

}

.row1 > div > h1 {
  font-size: 24px;
  line-height: 32px;
  text-align: left;
  margin-left: 32px;
  margin-top: 32px;
  margin-bottom: 24px;
}

.row2 {
  font-size: 20px;
  line-height: 28px;
  margin-left: 32px;
  margin-bottom: 24px;
}

.row3 {
  text-align: left;
  margin-left: 32px;
  margin-bottom: 32px;
}

.goals {
  margin-bottom: 48px;
}

.display-goal {
  @apply shadow-xl;
  margin: 16px;
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #0395E8;
  background-color: #0395E8;
  transition-duration: 200ms;
}

.display-goal:hover {
  background-color: #75CBCA;
  border-color: #75CBCA;
  transition-duration: 200ms;
}

.display-goal:hover .archive-goal > button {
  height: auto;
  opacity: 1;
  transition: height 0ms 0ms, opacity 600ms 0ms;
}

.archive-goal {
  margin-top: -36px;
  margin-right: 42px;
  float: right;
}
.archive-goal > button {
  @apply shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:ring-1;
  height: 0;
  opacity: 0;
  overflow: hidden;
  width: 80px;
  transition: height 0ms 400ms, opacity 0ms 0ms;
  font-size: 18px;
  border-radius: 2px;
  background-color: rgb(129, 223, 255);
}

.goal-header > h1, .task-header > h1 {
  font-size: 30px;
  line-height: 36px;
  text-align: center;
  margin-top: 16px;
  margin-bottom: 32px;
}


</style>
