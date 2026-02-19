<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { projects } from '../data/portfolioData';

const route = useRoute();
const project = computed(() => projects.find(p => p.id === parseInt(route.params.id)));

// Slider Logic
const currentIndex = ref(0);
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % project.value.images.length;
};
const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + project.value.images.length) % project.value.images.length;
};

const getImageUrl = (name) => new URL(`../assets/images/${name}`, import.meta.url).href;

// Ensure page starts at top
onMounted(() => window.scrollTo(0, 0));
</script>

<template>
  <div v-if="project" class="detail-view">
    <div class="container">
      <router-link to="/#projects" class="back-link">← Back to Projects</router-link>
      
      <div class="content-header">
        <h1>{{ project.title }}</h1>
        <div class="tech-stack">
          <span v-for="t in project.tech" :key="t">{{ t }}</span>
        </div>
      </div>

      <div class="slider-box">
        <div class="slider-wrapper">
          <transition name="fade" mode="out-in">
            <img :key="currentIndex" :src="getImageUrl(project.images[currentIndex])" class="hero-img" />
          </transition>
          
          <button @click="prevSlide" class="nav-btn prev" aria-label="Previous">❮</button>
          <button @click="nextSlide" class="nav-btn next" aria-label="Next">❯</button>
        </div>
        
        <div class="dots">
          <span 
            v-for="(_, i) in project.images" :key="i" 
            :class="{ active: i === currentIndex }"
            @click="currentIndex = i"
          ></span>
        </div>
      </div>

      <div class="info-layout">
        <div class="main-content">
          <div v-for="(section, index) in project.details" :key="index" class="detail-section">
            <h2>{{ section.subtitle }}</h2>
            <p>{{ section.text }}</p>
          </div>
        </div>

        <aside class="sidebar">
          <div class="project-meta">
            <h3>Project Details</h3>
            <div class="meta-item">
              <small>Category</small>
              <div class="tags">
                <span v-for="tag in project.tags" :key="tag">#{{ tag }}</span>
              </div>
            </div>
            <a :href="project.link" target="_blank" class="github-btn">
              <i class="fa-brands fa-github"></i> View Source code
            </a>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-view { padding: 120px 0; min-height: 100vh; background: #f9fafb; }
.container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }
.back-link { color: var(--primary); text-decoration: none; font-weight: 600; font-size: 1.1rem; }

.content-header { margin: 3rem 0; }
h1 { font-size: 3.5rem; color: #111; margin-bottom: 1rem; }

.tech-stack { display: flex; gap: 12px; flex-wrap: wrap; }
.tech-stack span { background: #fff; border: 1px solid #e5e7eb; padding: 6px 18px; border-radius: 50px; font-size: 0.9rem; color: #4b5563; font-weight: 500; }

/* Slider Section */
.slider-box { margin: 3rem 0 5rem 0; }
.slider-wrapper { position: relative; border-radius: 24px; overflow: hidden; aspect-ratio: 16 / 9; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); background: #000; }
.hero-img { width: 100%; height: 100%; object-fit: cover; }

.nav-btn {
  position: absolute; top: 50%; transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9); border: none; width: 50px; height: 50px;
  border-radius: 50%; cursor: pointer; font-size: 1.2rem; transition: 0.3s;
  display: flex; align-items: center; justify-content: center;
}
.nav-btn:hover { background: #fff; scale: 1.1; }
.prev { left: 20px; }
.next { right: 20px; }

.dots { display: flex; justify-content: center; gap: 10px; margin-top: 1.5rem; }
.dots span { width: 10px; height: 10px; border-radius: 50%; background: #d1d5db; cursor: pointer; transition: 0.3s; }
.dots span.active { background: var(--primary); width: 30px; border-radius: 10px; }

/* Content Layout */
.info-layout { display: grid; grid-template-columns: 1fr 320px; gap: 4rem; }
.detail-section { margin-bottom: 4rem; }
.detail-section h2 { font-size: 2rem; color: #1f2937; margin-bottom: 1.2rem; }
.detail-section p { font-size: 1.2rem; line-height: 1.8; color: #4b5563; }

/* Sidebar */
.project-meta { background: #fff; padding: 2rem; border-radius: 20px; border: 1px solid #e5e7eb; position: sticky; top: 120px; }
.meta-item { margin: 1.5rem 0; }
.meta-item small { text-transform: uppercase; letter-spacing: 0.05em; color: #9ca3af; font-weight: 700; }
.tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
.tags span { color: var(--primary); font-size: 0.9rem; font-weight: 600; }

.github-btn {
  display: block; text-align: center; margin-top: 2rem; padding: 16px;
  background: #111; color: #fff; text-decoration: none; border-radius: 12px;
  font-weight: 600; transition: 0.3s;
}
.github-btn:hover { background: #333; transform: translateY(-3px); }

/* Animation */
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 900px) {
  .info-layout { grid-template-columns: 1fr; }
  .project-meta { position: static; }
  h1 { font-size: 2.5rem; }
}
</style>