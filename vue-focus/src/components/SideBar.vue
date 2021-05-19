<template>
  <div class="sidebar">
    <div class="sidebar-backdrop" @click="closeSidebarPanel" v-if="isPanelOpen"></div>
      <transition name="slide">
        <div v-if="isPanelOpen"
          class="sidebar-panel" @click="closeSidebarPanel">
          <span>One Focus.</span>
          <slot></slot>
        </div>
      </transition>
  </div>
</template>


<script>

// start anew... figure out vuex state management - it's like a way for storing global variables

export default {
  name: "SideBar",
  methods: {
    closeSidebarPanel() {
      this.$store.commit('toggleNav')
    }
  },
  computed: {
    isPanelOpen() {
      return this.$store.state.isNavOpen
    }
  },
}
</script>


<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}


.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  transition: all 150ms ease-in 0s
}

.sidebar-backdrop {
  background-color: rgba(0,0,0,.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
}

.sidebar-panel {
  overflow-y: auto;
  background-color: #355C7D;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 999;
  padding: 3rem 20px 2rem 20px;
  width: 300px;
}

.sidebar-panel > span {
  @apply text-gray-100 hover:text-white transition duration-300;
  text-decoration: none;
  font-size: 2.0rem;
  display: block;
  padding-bottom: 1.0em;
  padding-left: 1.5em;
  top: 50%;
  transform: translate(0%, 50%);

}

</style>