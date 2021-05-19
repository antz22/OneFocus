import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ToDos from '../views/ToDos.vue'
import Goals from '../views/Goals.vue'
import Pomodoro from '../views/Pomodoro.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/log-in',
    name: 'LogIn',
    component: LogIn,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/todos',
    name: 'ToDos',
    component: ToDos,
    meta: {
      progress: {
        func: [
          { call: "color", modifier: "temp", argument: "#355C7D" },
          { call: "fail", modifier: "temp", argument: "#6e0000" },
          { call: "location", modifier: "temp", argument: "top" },
          {
            call: "transition",
            modifier: "temp",
            argument: { speed: "1.5s", opacity: "0.6s", termination: 400 },
          },
        ],
      },
      requireLogin: true
    },
  },
  {
    path: '/goals',
    name: 'Goals',
    component: Goals,
    meta: {
      progress: {
        func: [
          { call: "color", modifier: "temp", argument: "#355C7D" },
          { call: "fail", modifier: "temp", argument: "#6e0000" },
          { call: "location", modifier: "temp", argument: "top" },
          {
            call: "transition",
            modifier: "temp",
            argument: { speed: "1.5s", opacity: "0.6s", termination: 400 },
          },
        ],
      },
      requireLogin: true
    },
  },
  {
    path: '/focus',
    name: 'Focus',
    component: Pomodoro,
    meta: {
      progress: {
        func: [
          { call: "color", modifier: "temp", argument: "#355C7D" },
          { call: "fail", modifier: "temp", argument: "#6e0000" },
          { call: "location", modifier: "temp", argument: "top" },
          {
            call: "transition",
            modifier: "temp",
            argument: { speed: "1.5s", opacity: "0.6s", termination: 400 },
          },
        ],
      },
      requireLogin: true
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    // next({ name: 'LogIn', query: { to: to.path } })
    next({ name: 'LogIn', query: { to: to.path } })
  } else {
    next()
  }
})

export default router
