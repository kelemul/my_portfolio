<script setup>
import { services } from '../data/portfolioData';
import ServiceCard from './ServiceCard.vue';
</script>

<template>
  <section id="services" class="section-wrapper">
    <div class="container">
      <div class="section-header">
        <h2>What I Do</h2>
        <p class="subtitle">Solving problems with code and design.</p>
      </div>
      
      <div class="grid">
        <ServiceCard 
          v-for="s in services" 
          :key="s.title"
          :title="s.title"
          :description="s.desc"
          :icon="s.icon"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-wrapper {
  padding: 100px 0;
  background-color: #fcfcfc;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

h2 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--dark);
}

.subtitle {
  color: var(--text-gray);
  font-size: 1.1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
}
</style>