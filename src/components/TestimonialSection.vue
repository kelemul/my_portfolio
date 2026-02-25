<script setup>
import { ref, computed, onMounted } from 'vue';

const testimonials = ref([]);
const load = async () => {
  const apiBase = import.meta.env.VITE_API_BASE ?? '';
  const url = `${apiBase}/api/testimonials`;
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' }, credentials: 'omit' });
    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      console.warn('testimonials fetch failed (primary)', url, res.status, txt.slice ? txt.slice(0, 200) : txt);
      // Try explicit localhost:3000 backend when dev server proxies are misconfigured
      if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        const alt = `http://localhost:3000/api/testimonials`;
        try {
          const r2 = await fetch(alt, { headers: { Accept: 'application/json' }, credentials: 'omit' });
          if (r2.ok && (r2.headers.get('content-type') || '').toLowerCase().includes('application/json')) {
            testimonials.value = await r2.json();
            return;
          }
          const t2 = await r2.text().catch(() => '');
          console.warn('alt testimonials fetch failed', alt, r2.status, t2.slice ? t2.slice(0,200) : t2);
        } catch (e2) {
          console.warn('alt testimonials fetch error', e2);
        }
      }
      throw new Error(`Failed to load testimonials (${res.status})`);
    }
    const contentType = (res.headers.get && res.headers.get('content-type') || '').toLowerCase();
    if (!contentType.includes('application/json')) {
      const txt = await res.text().catch(() => '');
      console.warn('testimonials primary returned non-json', url, contentType, txt.slice ? txt.slice(0,200) : txt);
      // try localhost backend as well
      if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        const alt = `http://localhost:3000/api/testimonials`;
        try {
          const r2 = await fetch(alt, { headers: { Accept: 'application/json' }, credentials: 'omit' });
          if (r2.ok && (r2.headers.get('content-type') || '').toLowerCase().includes('application/json')) {
            testimonials.value = await r2.json();
            return;
          }
        } catch (e2) {
          console.warn('alt testimonials fetch error', e2);
        }
      }
      throw new Error(`Expected JSON from ${url} but got "${contentType}"`);
    }
    const data = await res.json();
    testimonials.value = Array.isArray(data) ? data : [];
    return;
  } catch (e) {
    console.error('load testimonials error', e);
  }

  // Fallback: try the main getPortfolio endpoint and read its testimonials field
  try {
    const apiBase = import.meta.env.VITE_API_BASE ?? '';
    const res2 = await fetch(`${apiBase}/api/getPortfolio`, { headers: { Accept: 'application/json' }, credentials: 'omit' });
    if (res2.ok) {
      const d = await res2.json();
      testimonials.value = Array.isArray(d.testimonials) ? d.testimonials : [];
      return;
    }
  } catch (e2) {
    console.error('fallback getPortfolio failed', e2);
  }

  testimonials.value = [];
};

onMounted(() => { load(); });

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