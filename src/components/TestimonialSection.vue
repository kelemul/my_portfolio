<script setup>
import { computed } from 'vue';
import { testimonials } from '../data/portfolioData';

const visibleTestimonials = computed(() => {
  const list = Array.isArray(testimonials.value) ? testimonials.value : [];
  return list.filter(t => Number(t?.status) === 1);
});
</script>

<template>
  <section id="testimonials" class="section-wrapper">
    <div class="container">
      <h2 class="text-center">Kind Words</h2>
      <div style="display:flex; justify-content:flex-end; margin-bottom:1rem;"><router-link to="/add-testimonial" class="btn">Add Testimonial</router-link></div>
      <div class="testimonial-grid">
        <div v-for="t in visibleTestimonials" :key="t.id || t.name" class="testimonial-card">
          <div class="quote-icon">“</div>
          <p class="feedback">{{ t.feedback }}</p>
          <div class="user-info">
            <div class="details">
              <strong>{{ t.name }}</strong>
              <span>{{ t.designation }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-wrapper { padding: 100px 0; background: #fff; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
.text-center { text-align: center; margin-bottom: 4rem; font-size: 2.5rem; }

.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  padding: 3rem 2rem;
  background: #f8f9fa;
  border-radius: 20px;
  position: relative;
  transition: transform 0.3s;
}

.testimonial-card:hover { transform: translateY(-5px); }

.quote-icon {
  font-size: 5rem;
  color: var(--primary);
  opacity: 0.2;
  position: absolute;
  top: 10px;
  left: 20px;
  font-family: serif;
}

.feedback {
  font-style: italic;
  font-size: 1.1rem;
  color: var(--secondary);
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.details strong { display: block; color: var(--dark); font-size: 1rem; }
.details span { font-size: 0.85rem; color: var(--text-gray); }
</style>