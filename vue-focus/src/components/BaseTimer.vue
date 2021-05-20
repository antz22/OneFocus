<template>
  <div v-if="!small">
    <div class="base-timer">
      <svg
        class="base-timer __svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g class="base-timer __circle">
          <circle
            class="base-timer __path-elapsed"
            cx="50"
            cy="50"
            r="45"
          />
          <path
            :stroke-dasharray="circleDasharray"
            :class="remainingPathColor"
            class="base-timer __path-remaining"
            d="
              M 50, 50
              m -45, 0
              a 45, 45 0 1,0 90,0
              a 45, 45 0 1,0 -90,0
            "></path>
        </g>
      </svg>
      <span class="base-timer __label">
        {{ formattedTimeLeft }}

      </span>
    </div>
  </div>
  <div v-else>
    <div class="small-timer">
      <svg
        class="small-timer __svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g class="small-timer __circle">
          <circle
            class="small-timer __path-elapsed"
            cx="50"
            cy="50"
            r="45"
          />
          <path
            :stroke-dasharray="circleDasharray"
            :class="remainingPathColor"
            class="small-timer __path-remaining"
            d="
              M 50, 50
              m -45, 0
              a 45, 45 0 1,0 90,0
              a 45, 45 0 1,0 -90,0
            "></path>
        </g>
      </svg>
      <span class="small-timer small-label">
        {{ formattedTimeLeft }}

      </span>
    </div>
  </div>
</template>

<script>

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

export default {
  name: 'BaseTimer',
  props: {
    timeLeft: {
      type: Number,
      required: true
    },
    timeLimit: {
      type: Number,
      required: true
    },
    small: {
      type: Boolean,
      default: false
    },
    alertThreshold: {
      type: Number,
      default: 5
     },    
    warningThreshold: {
      type: Number,
      default: 10
    },
  },
  computed: {
    formattedTimeLeft() {
      const timeLeft = this.timeLeft   
      const hours = Math.floor(timeLeft / 3600)    
      let minutes = Math.floor((timeLeft % 3600)/60) 
      let seconds = timeLeft % 60
      if (minutes < 10) {
        minutes = `0${minutes}`
      }
      if (seconds < 10) {
        seconds = `0${seconds}`
      }

      if (hours == 0) {
        return `${minutes}:${seconds}`
      } else {
        if (hours < 0 || minutes < 0) {
          this.$emit('timerDone')
          return `00:00`
        } else {
          return `${hours}:${minutes}.${seconds}`
        }
      }
    },
    // Update the dasharray value as time passes, starting with 283
    circleDasharray() {
      return `${(this.timeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`;
    },
    timeFraction() {
      const rawTimeFraction = this.timeLeft / this.timeLimit
      
      return rawTimeFraction - (1 / this.timeLimit) * (1 - rawTimeFraction)
    },
    colorCodes() {
      return {
        info: {
          color: "green"
        },
        warning: {
          color: "orange",
          threshold: this.warningThreshold
        },
        alert: {
          color: "red",
          threshold: this.alertThreshold
        }
      }
    },
    remainingPathColor() {
      const { alert, warning, info } = this.colorCodes
      if (this.timeLeft <= alert.threshold) {
        return alert.color
      } else if (this.timeLeft <= warning.threshold) {
        return warning.color
      } else {
        return info.color
      }
    },
  }
}

</script>

<style scoped>
@font-face {
  font-family: 'RobotoMono';
  src: url(../assets/RobotoMono-Light.ttf);
}

@font-face {
  font-family: 'RobotoMonoBold';
  src: url(../assets/RobotoMono-Regular.ttf);
}

/* Sets the containers height and width */
.base-timer {
  margin-left: auto;
  margin-right: auto;
  position: relative;
  width: 300px;
  height: 300px;/* Removes SVG styling that would hide the time label */
}

.small-timer {
  margin-left: auto;
  margin-right: auto;
  position: relative;
  width: 170px;
  height: 170px;/* Removes SVG styling that would hide the time label */
}

.__circle {
  fill: none;
  stroke: none;
}/* The SVG path that displays the timer's progress */

.__path-elapsed {
  stroke-width: 7px;
  stroke: rgb(143, 143, 143);
}

.__label {
  position: absolute;    
  
  /* Size should match the parent container */    
  width: 300px;
  height: 300px;    /* Keep the label aligned to the top */    
  top: 0;    /* Create a flexible box that centers content vertically and horizontally */
  display: flex;
  align-items: center;
  justify-content: center;    /* Sort of an arbitrary number; adjust to your liking */
  font-size: 48px;

  font-family: 'RobotoMono';
}

.small-label {
  position: absolute;    
  
  /* Size should match the parent container */    
  width: 170px;
  height: 170px;    /* Keep the label aligned to the top */    
  top: 0;    /* Create a flexible box that centers content vertically and horizontally */
  display: flex;
  align-items: center;
  justify-content: center;    /* Sort of an arbitrary number; adjust to your liking */
  font-size: 24px;

  font-family: 'RobotoMonoBold';
}

.__path-remaining {
  /* Just as thick as the original ring */
  stroke-width: 7px;    /* Rounds the line endings to create a seamless circle */
  stroke-linecap: round;    /* Makes sure the animation starts at the top of the circle */
  transform: rotate(90deg);
  transform-origin: center;    /* One second aligns with the speed of the countdown timer */
  transition: 1s linear all;    /* Allows the ring to change color when the color value updates */
  fill-rule: nonzero;
  stroke: currentColor;
}  

.green {
  color: rgb(65, 184, 131);
}

.orange {
  color: orange;
}

.red {
  color: red;
}

.__svg {
  /* Flips the svg and makes the animation to move left-to-right */
  transform: scaleX(-1);
}

</style>