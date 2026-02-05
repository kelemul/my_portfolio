<script setup>
import { skills } from '../data/portfolioData';
</script>

<template>
  <section id="skills" class="section-wrapper">
    <div class="container">
      <div class="content-wrapper">
        <div class="text-content">
          <h2>Technical Skills</h2>
          <p>
            I specialize in the JavaScript ecosystem, with a deep focus on Vue.js for frontend development.
            I am always learning new technologies to keep my stack modern.
          </p>
        </div>
        
        <div class="skills-grid">
          <div v-for="skill in skills" :key="skill.name" class="skill-item">
            <div class="skill-info">
              <span class="skill-name">
                <i :class="skill.icon"></i> {{ skill.name }}
              </span>
              <span class="skill-percentage">{{ skill.level }}</span>
            </div>
            <div class="progress-bg">
              <div class="progress-fill" :style="{ width: skill.level }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-wrapper { padding: 100px 0; background: white; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

h2 { font-size: 2.5rem; margin-bottom: 1.5rem; color: var(--dark); }
p { color: var(--text-gray); line-height: 1.7; margin-bottom: 2rem; }

.skill-item { margin-bottom: 1.5rem; }

.skill-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--dark);
}

.skill-name i { color: var(--primary); margin-right: 8px; }

.progress-bg {
  width: 100%;
  height: 8px;
  background: #eee;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--primary);
  border-radius: 4px;
  transition: width 1.5s cubic-bezier(0.1, 0.42, 0.85, 1);
}

@media (max-width: 768px) {
  .content-wrapper { grid-template-columns: 1fr; gap: 2rem; }
}
</style>