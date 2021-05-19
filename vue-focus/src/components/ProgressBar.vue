<template>
  <div class="container">
    <div class="label">{{ progressValue }}/{{ progressLimit }}</div>
    <div class="loading-bar">
      <div class="percentage" :style="{'width' : progress + '%'}"></div>
    </div>
    <div class="change-progress">
      <input type="number" min="0" :max="progressLimit" step="1" v-model="progressNew"> <button @click="changeProgress">Update!</button> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  data() {
    return {
      progressNew: 0,
    }
  },
  props: {
    progressValue: {
      type: Number,
      required: true
    },
    progressLimit: {
      type: Number,
      required: true
    }
  },
  computed: {
    progress() {
      return parseInt(this.progressValue / this.progressLimit *100)
    },
  },
  methods: {
    changeProgress() {
      this.$emit("changeProgress", this.progressNew)
    }
  }
}
</script>

<style scoped>

.container {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  font-size: 1.25rem;
}

.label {
  padding-bottom: 16px;
}

.loading-bar {
  @apply shadow-md;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  width: 400px;
  height: 15px;
  border-radius: 15px;
  overflow: hidden;
  border: 1.2px solid rgb(0, 109, 136);
  box-shadow: inset 0 1px 2px rgba($color: #000, $alpha: .4), 
    0 -1px 1px #fff, 0 1px 0 #fff;
}

.percentage {
  position: absolute;
  top: 1px; left: 1px; right: 1px;
  display: block;
  height: 100%;
  border-radius: 15px;
  background-color: #32c34a;
  background-size: 30px 30px;
  background-image: linear-gradient(135deg, rgba($color: #fff, $alpha: .15) 25%, transparent 25%,
    transparent 50%, rgba($color: #fff, $alpha: .15) 50%,
    rgba($color: #fff, $alpha: .15) 75%, transparent 75%,
    transparent); 
  animation: animate-stripes 3s linear infinite;
} 

.change-progress {
  height: 0;
  opacity: 0;
  overflow: hidden;
  transition: height 0ms 400ms, opacity 400ms 0ms;
}

.container:hover .change-progress {
  height: auto;
  opacity: 1;
  transition: height 0ms 0ms, opacity 600ms 0ms;
}

.change-progress > input {
  @apply shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:ring-1 border-red-300;
  width: 60px;
  height: 40px;
  border-radius: 6px;
  border-width: 3.0px;
  box-sizing: border-box;
  padding: 8px;
}

.change-progress > button {
  @apply shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:ring-1;
  border-radius: 6px;
  width: 112px;
  height: 40px;
  background-color: rgb(129, 223, 255);
  margin-top: 48px;
}


.change-progress > button:hover {
  @apply bg-blue-300;
}

@media (min-width: 800px) {
  .loading-bar {
    width: 600px;
  }
}

@media (min-width: 1000px) {
  .loading-bar {
    width: 800px;
  }
}

</style>