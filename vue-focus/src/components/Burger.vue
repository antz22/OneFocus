<template>
  <div id="burger"
    :class="{ 'active' : isBurgerActive }"
    @click.prevent="toggle">
    <slot>
      <button type="button" class="burger-button" title="Menu">
        <span class="burger-bar burger-bar--1"></span>
        <span class="burger-bar burger-bar--2"></span>
        <span class="burger-bar burger-bar--3"></span>
      </button>
    </slot>
  </div>
</template>


<script>

export default {
  computed: {
    isBurgerActive() {
      return this.$store.state.isNavOpen
    }
  },
  methods: {
    toggle() {
      this.$store.commit('toggleNav')
    }
  }
}
</script>


<style>

.hidden {
  visibility: hidden;
}

button {
  cursor: pointer;
}

/* remove blue outline */
button:focus {
  outline: 0;
}

.burger-button {
  outline: 0;
  position: relative;
  height: 48px;
  width: 48px;
  display: block;
  z-index: 999;
  border: 0;
  border-radius: 0;
  background-color: transparent;
  pointer-events: all;
  transition: transform .6s cubic-bezier(.165,.84,.44,1);
}

.burger-bar {
  background-color: #130f40;
  position: absolute;
  top: 50%;
  right: 6px;
  left: 6px;
  height: 3px;
  width: auto;
  margin-top: -1px;
  transition: transform .20 ease,opacity .3s cubic-bezier(.165,.84,.44,1),background-color .6s cubic-bezier(.165,.84,.44,1);
  /* transition: transform .6 cubic-bezier(.165,.84,.44,1),opacity .3s cubic-bezier(.165,.84,.44,1),background-color .6s cubic-bezier(.165,.84,.44,1); */
}

.burger-bar--1 {
  -webkit-transform: translateY(-12px);
  transform: translateY(-12px);
}

.burger-bar--2 {
  transform-origin: 0% 100%;
  transition-duration: .6s;
  transition-timing-function: cubic-bezier(.165,.84,.44,1);
  transform: scaleX(.8);
}

.burger-button:hover .burger-bar--2 {
  transition-duration: .6s;
  transition-timing-function: cubic-bezier(.165,.84,.44,1);
  transform: scaleX(1);
}

.no-touchevents .burger-bar--2:hover {
  transform: scaleX(1);
}

.burger-bar--3 {
  transform: translateY(12px);
}

#burger.active .burger-button {
  outline: 0;
  transform: translateX(285px) rotate(-180deg);
}

#burger.active .burger-bar {
  background-color: rgb(253, 253, 253);
}

#burger.active .burger-bar--1 {
  opacity: 100;
  height: 6px;
  transform: rotate(45deg)
}

#burger.active .burger-bar--2 {
  opacity: 0;
}

#burger.active .burger-bar--3 {
  opacity: 100;
  height: 6px;
  transform: rotate(-45deg)
}
</style>