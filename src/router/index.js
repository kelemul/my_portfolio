// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAdminToken } from '../utils/adminClient'

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
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogListView.vue'),
    },
    {
      path: '/blog/:slug',
      name: 'blog-post',
      component: () => import('../views/BlogPostView.vue'),
      props: true,
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('../views/AdminLogin.vue'),
    },
    {
      path: '/add-testimonial',
      name: 'add-testimonial',
      component: () => import('../views/AddTestimonial.vue'),
    },
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

router.beforeEach((to, from, next) => {
  const token = getAdminToken();
  if (to.name === 'admin' && !token) return next({ name: 'admin-login' });
  if (to.name === 'admin-login' && token) return next({ name: 'admin' });
  return next();
});

export default router