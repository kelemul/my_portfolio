// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/', 
      name: 'home', 
      component: HomeView 
    },
    { 
      path: '/project/:id', 
      name: 'project-detail',
      component: () => import('../views/ProjectDetail.vue'), 
      props: true 
    }
    // Note: We removed /contact and /projects routes because they will be SECTIONS on the Home page now.
  ],
  // This function handles the smooth scrolling to #sections
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80 // Offset for the sticky navbar height
      }
    }
    // If we are going to a new page (like Project Details), scroll to top
    return { top: 0 }
  }
})

export default router