<script setup>
import { experiences } from '../data/portfolioData';
</script>

<template>
  <section id="experience" class="section-wrapper">
    <div class="container">
      <h2 class="text-center">My Experience</h2>
      
      <div class="timeline">
        <div v-for="exp in experiences" :key="exp.id" class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <span class="date">{{ exp.year }}</span>
            <h3>{{ exp.title }}</h3>
            <h4 class="company">{{ exp.company }}</h4>
            <p>{{ exp.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-wrapper { padding: 80px 0; background: #f8f9fa; }
.container { max-width: 800px; margin: 0 auto; padding: 0 2rem; }
.text-center { text-align: center; margin-bottom: 3rem; font-size: 2.5rem; color: var(--dark); }

.timeline {
  position: relative;
  border-left: 2px solid var(--primary);
  padding-left: 2rem;
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
}

.timeline-dot {
  position: absolute;
  left: -2.6rem; /* Adjust based on padding/border */
  top: 5px;
  width: 16px;
  height: 16px;
  background: var(--primary);
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 0 0 2px var(--primary);
}

.timeline-content {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s;
}

.timeline-content:hover { transform: translateX(5px); }

.date {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 1px;
}

h3 { margin: 5px 0; color: var(--dark); }
.company { font-size: 1rem; color: #666; font-weight: 500; margin-bottom: 10px; }
p { color: var(--text-gray); font-size: 0.95rem; line-height: 1.5; }
</style>