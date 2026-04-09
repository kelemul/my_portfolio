<script setup>
import Navbar from './components/Navbar.vue';
import { Analytics } from '@vercel/analytics/vue';
</script>

<template>
  <div id="app-layout">
    <Analytics />
    <Navbar />
    
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <Analytics />
    <footer class="main-footer">
      <div class="footer-content">
        <p>&copy; {{ new Date().getFullYear() }} Kelemu Leykun. Built with Vue 3.</p>
        <div class="socials">
          <a href="https://github.com/kelemul"><i class="fa-brands fa-github"></i></a>
          <a href="https://www.linkedin.com/in/kelemu-leykun/"><i class="fa-brands fa-linkedin"></i></a>
          <a href="https://twitter.com/kelemu3509"><i class="fa-brands fa-twitter"></i></a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* Global Resets & Variables */
:root {
  --primary: #42b883;
  --secondary: #35495e;
  --dark: #2c3e50;
  --light: #f8f9fa;
  --text-gray: #666;
  --font-main: 'Inter', sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-main);
  color: var(--dark);
  background-color: #ffffff;
  line-height: 1.6;
}

/* Page Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Footer Styles */
.main-footer {
  background: var(--dark);
  color: white;
  padding: 2rem 0;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.socials {
  display: flex;
  gap: 1.5rem;
}

.socials a {
  color: white;
  font-size: 1.2rem;
  transition: color 0.3s;
}

.socials a:hover {
  color: var(--primary);
}

@media (max-width: 768px) {
  .footer-content { flex-direction: column; gap: 1rem; text-align: center; }
}
</style>