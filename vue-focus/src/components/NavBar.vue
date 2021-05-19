<template>
  <div>
    <div class="header1">
      <h1>OneFocus</h1>
    </div>
    <div id="sidebar">
      <div id="hamborg">
        <Burger />
      </div>
      <SideBar>
        <ul class="sidebar-panel-nav">
          <li>
            <router-link to="/"><i class="fas fa-home"></i> <p class="inline-block pl-2">Home</p></router-link>
            <!-- <router-link to="/"><p class="inline-block">Home</p><pre class="inline-block pl-4">  </pre>  <i class="fas fa-home"></i></router-link> -->
          </li>
          <li>
            <router-link to="/todos"><i class="fas fa-tasks"></i>  <p class="inline-block pl-3">ToDos</p></router-link>
            <!-- <router-link to="/todos"><p class="inline-block">ToDos</p><pre class="inline-block pl-12"></pre>  <i class="fas fa-tasks"></i></router-link> -->
          </li>
          <li>
            <router-link to="/goals"><i class="fas fa-bookmark"></i> <p class="inline-block pl-5">Goals</p></router-link>
            <!-- <router-link to="/goals"><p class="inline-block">Goals</p><pre class="inline-block pl-7">  </pre>  <i class="fas fa-bookmark"></i></router-link> -->
          </li>
          <li>
            <router-link to="/focus"><i class="fas fa-clock"></i> <p class="inline-block pl-3">Focus</p></router-link>
            <!-- <router-link to="/focus"><p class="inline-block">Focus</p><pre class="inline-block pl-1">   </pre>  <i class="fas fa-clock"></i></router-link> -->
          </li>
          <li>
            <router-link to="/about"><i class="fas fa-question"></i> <p class="inline-block pl-5">About</p></router-link>
            <!-- <router-link to="/about"><p class="inline-block">About</p><pre class="inline-block pl-1">   </pre> <i class="fas fa-question"></i> </router-link> -->
          </li>
        </ul>
      </SideBar>
    </div>
  </div>
</template>

<script>

import SideBar from '@/components/SideBar.vue'
import Burger from '@/components/Burger.vue';

export default {
  name: 'NavBar',
  components: {
    SideBar,
    Burger,
  },
  data() {
    return {
      showMenu: false,
    }
  },
}
</script>

<style scoped>

h1 {
  @apply text-center text-4xl;
}

#hamborg {
  @apply absolute text-center object-none object-center w-12 h-12 transition duration-300 hover:bg-gray-500 hover:bg-opacity-25;
  border-radius: 4px;
  top: 2rem;
  left: 2rem;
  transform: translate(0%, 0%);
}

ul.sidebar-panel-nav {
  list-style-type: none;
  padding-top: 2em;
}

ul.sidebar-panel-nav > li > a {
  @apply text-gray-400 hover:text-white transition duration-300;
  text-decoration: none;
  font-size: 2.0rem;
  display: block;
  padding-bottom: 1.0em;
  padding-left: 1.5em;
  top: 50%;
  transform: translate(0%, 50%);
}

ul.sidebar-panel-nav > li > a > i {
  @apply w-20;
}

ul.sidebar-panel-nav > li > .router-link-exact-active {
  @apply text-white;
}

.btn-menu {
  @apply focus:outline-none focus:border-transparent focus:ring-blue-200;
  outline: none;

}

</style>