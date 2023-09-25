import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import axios from "axios"
import { user, type User } from '@/context/user';

function requireAuth(_to : any, _from : any, next : Function) {
  const userData = localStorage.getItem('user');

  if (userData) {
    const parsedUser = JSON.parse(userData) as User;
    user.setUser(parsedUser)
    axios.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
    next();
  } else {
    next({ name: 'login' });
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      beforeEnter: requireAuth
    }
  ]
})

export default router
