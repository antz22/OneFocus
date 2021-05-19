<template>
  <div>
    <div class="timer">

      <h1 id="header">Pomodoro Focus <img src="../assets/stopwatch.svg"> </h1>

      <div id="base-timer">
        <BaseTimer :timeLeft="timeLeft" :timeLimit="timeLimit" @timerDone="pauseTimer"/>
      </div>
      <div id="break-timer">
        <BaseTimer :small="true" :timeLeft="breakTimeLeft" :timeLimit="breakTimeLimit" @timerDone="resetTimer"/>
      </div>

      <div class="timer-btns">
        <button v-if="breakTimerOn" @click="breakStartTimer">Start Break?</button>

        <h1 v-if="hours == 0 && mins == 0" class="text-xl">Input a time for a focus session:</h1>
        <button v-if="!timerOn && (hours > 0 || mins > 0)" @click="timerOn = !timerOn; startTimer();">Start</button>
        <button v-if="timerOn" @click="timerOn = !timerOn; resetTimer();">Reset</button>

        <button v-if="showPaused && !paused" @click="pauseTimer">Pause</button>
        <button v-if="showPaused && paused" @click="startTimer">Resume</button>
      </div>

      <div v-if="!timerOn" class="set-timer">
        <h1 class="mr-12">Hours</h1>  
        <h1 class="ml-12">Minutes</h1>

        <br>

        <vue-number-input v-model="hours" :step="1" :min="0" :max="23" inline controls></vue-number-input> 
        <pre> </pre>
        <vue-number-input :attrs="{ class: 'timer-input' }" v-model="mins" :step="5" :min="0" :max="59" inline controls></vue-number-input>

        <br><br>

        <h1>Set a timer for breaks (minutes)</h1><br>
        <vue-number-input v-model="breakMins" :step="5" :min="0" :max="59" inline controls></vue-number-input>

      </div>

    </div>
  </div>
</template>

<script>

import BaseTimer from '../components/BaseTimer.vue'

export default {
  name: 'Pomodoro',
  components: {
    BaseTimer,
  },
  data() {
    return {
      hours: 0,
      mins: 0,
      seconds: 0,
      timePassed: 0,
      timeLimit: 0,
      timerOn: false,
      timerInterval: null,

      breakMins: 0,
      breakSeconds: 0,
      breakTimePassed: 0,
      breakTimeLimit: 0,
      breakTimerOn: false,
      breakTimerInterval: null,

      paused: false,
      showPaused: false,
    }
  },
  methods: {
    startTimer() {
      this.timeLimit = 3600*this.hours + 60*this.mins
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000)
      setTimeout(() => { clearInterval(this.timerInterval); this.breakTimerOn = true }, this.timeLimit*1000+1000)
      this.showPaused = true
      this.paused = false
    },
    pauseTimer() {
      clearInterval(this.timerInterval)
      this.paused = true
    },
    resetTimer() {
      clearInterval(this.timerInterval)
      this.timePassed = 0
      this.timerInterval = null
      clearInterval(this.breakTimerInterval)
      this.breakTimePassed = 0
      this.breakTimerInterval = null
      this.showPaused = false
      this.paused = false
    },
    breakStartTimer() {
      this.breakTimeLimit = 60*this.breakMins
      this.breakTimerInterval = setInterval(() => (this.breakTimePassed += 1), 1000)
      setTimeout(() => { clearInterval(this.breakTimerInterval); this.breakTimerOn = false; this.timerOn = false; }, this.breakTimeLimit*1000+1000)
    }
  },
  computed: {
    timeLeft() {
      return 3600*this.hours + 60*this.mins - this.timePassed
    },
    breakTimeLeft() {
      return 60*this.breakMins - this.breakTimePassed
    }
  },
}

</script>

<style scoped>

.timer {
  text-align: center;
  margin-bottom: 48px;
}

#break-timer {
  margin-left: 320px;
}

#header {
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  padding-bottom: 40px;
}

#header > img {
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
  width: 40px;
  height: 40px;
}

.timer-btns {
  @apply space-x-5;
  padding-top: 40px;
  padding-bottom: 40px; 
}

.timer-btns > button {
  @apply bg-blue-500;
  padding: 12px;
  border-radius: 6px;
}

.set-timer {
  @apply space-y-6;
}

.set-timer > h1 {
  display: inline-block;
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
}

.set-timer > pre {
  display: inline-block;
}

</style>