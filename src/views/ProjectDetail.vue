<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { projects } from '../data/portfolioData';

const route = useRoute();
const project = computed(() => projects.find(p => p.id === parseInt(route.params.id)));

const getImageUrl = (name) => new URL(`../assets/images/${name}`, import.meta.url).href;
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

      <img :src="getImageUrl(project.image)" class="hero-img" />

      <div class="description-box">
        <h2>About this Project</h2>
        <p>{{ project.description }}</p>
        <a :href="project.link" target="_blank" class="github-btn">View on GitHub</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-view { padding: 120px 0; min-height: 100vh; }
.container { max-width: 900px; margin: 0 auto; padding: 0 2rem; }
.back-link { color: var(--primary); text-decoration: none; font-weight: 600; }

.content-header { margin: 2rem 0; text-align: center; }
h1 { font-size: 3rem; color: var(--dark); margin-bottom: 1rem; }

.tech-stack { display: flex; justify-content: center; gap: 10px; }
.tech-stack span { background: #eee; padding: 5px 15px; border-radius: 20px; font-size: 0.9rem; }

.hero-img { width: 100%; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); margin: 2rem 0; }

.description-box { line-height: 1.8; color: var(--text-gray); }
.github-btn {
  display: inline-block; margin-top: 2rem; padding: 12px 25px;
  background: var(--dark); color: white; text-decoration: none; border-radius: 8px;
}
</style>