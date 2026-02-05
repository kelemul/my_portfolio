<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="logo">
      <router-link to="/">
        <span class="logo-symbol">&lt;/&gt;</span> KL
      </router-link>
    </div>
    
    <button class="mobile-toggle" @click="isMobileMenuOpen = !isMobileMenuOpen">
      <i :class="isMobileMenuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'"></i>
    </button>

    <ul class="nav-links" :class="{ 'active': isMobileMenuOpen }">
      <li><router-link :to="{ path: '/', hash: '#home' }" @click="closeMenu">Home</router-link></li>
      <li><router-link :to="{ path: '/', hash: '#services' }" @click="closeMenu">Services</router-link></li>
      <li><router-link :to="{ path: '/', hash: '#skills' }" @click="closeMenu">Skills</router-link></li>
      <li><router-link :to="{ path: '/', hash: '#projects' }" @click="closeMenu">Projects</router-link></li>
      <li><router-link :to="{ path: '/', hash: '#contact' }" @click="closeMenu" class="cta-btn">Contact Me</router-link></li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const closeMenu = () => {
  isMobileMenuOpen.value = false;
};

// Add scroll listener for the glassmorphism effect
onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 10%;
  background: transparent; /* Start transparent */
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

/* Glass effect when scrolling */
.navbar.scrolled {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  padding: 1rem 10%; /* Shrink slightly */
}

.logo a {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--dark);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-symbol {
  color: var(--primary);
  font-weight: 900;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: var(--dark);
  font-weight: 500;
  transition: color 0.3s;
  font-size: 0.95rem;
}

.nav-links a:hover {
  color: var(--primary);
}

.cta-btn {
  background: var(--primary);
  color: white !important;
  padding: 10px 24px;
  border-radius: 25px;
  transition: transform 0.2s ease, background 0.3s ease;
}

.cta-btn:hover {
  transform: translateY(-2px);
  background: #3aa876; /* Darker green */
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--dark);
}

/* Mobile Responsive Styles */
@media (max-width: 768px) {
  .navbar { padding: 1rem 5%; }
  
  .mobile-toggle { display: block; }

  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: white;
    flex-direction: column;
    padding: 2rem;
    gap: 1.5rem;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    clip-path: circle(0% at 100% 0); /* Cool reveal animation start */
    transition: clip-path 0.5s ease-in-out;
  }

  .nav-links.active {
    clip-path: circle(150% at 100% 0); /* Cool reveal animation end */
  }
}
</style>