import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import HomeView from '@/views/HomeView.vue'
import ManageView from '@/views/ManageView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import LocationView from '@/views/LocationView.vue'
import AssetView from '@/views/AssetView.vue'
import JobView from '@/views/JobView.vue'
import ManageUserView from '@/views/ManageUserView.vue'
import {getUser} from '@/utils/auth'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'home' }
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/manage',
    name: 'manage',
    component: ManageView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView,
  },
  {
    path: '/location',
    name: 'location',
    component: LocationView,
  },
  {
    path: '/asset',
    name: 'asset',
    component: AssetView,
  },
  {
    path: '/job',
    name: 'job',
    component: JobView,
  },
  {
    path: '/manage-user',
    name: 'manage-user',
    component: ManageUserView,
  }
]

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  var user  = store.state.user;

  if (user === null || user === undefined) {
    user  = getUser();
  }

  if (user !== null && user !== undefined) {
    store.dispatch('setUser', user)
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (['/login', '/signup'].indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
});

export default router
