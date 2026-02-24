<script setup>
import { computed } from 'vue';
import { blogPosts, isLoading } from '../data/portfolioData';

const posts = computed(() => {
  const list = Array.isArray(blogPosts.value) ? blogPosts.value : [];
  return list
    .filter(p => (p?.status || 'published') === 'published')
    .slice()
    .sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0));
});
</script>

<template>
  <div class="page">
    <div class="container">
      <div class="header">
        <h1>Blog</h1>
        <p>Notes on engineering, architecture, and building systems that scale.</p>
      </div>

      <div v-if="isLoading" class="muted">Loading…</div>
      <div v-else class="grid">
        <router-link
          v-for="p in posts"
          :key="p.slug"
          class="card"
          :to="`/blog/${p.slug}`"
        >
          <div class="meta">
            <span class="date">{{ p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : '' }}</span>
            <span v-if="p.readingTimeMinutes" class="dot">•</span>
            <span v-if="p.readingTimeMinutes" class="rt">{{ p.readingTimeMinutes }} min read</span>
          </div>
          <h2>{{ p.title }}</h2>
          <p class="excerpt">{{ p.excerpt }}</p>
          <div class="tags">
            <span v-for="t in (p.tags || [])" :key="t" class="tag">{{ t }}</span>
          </div>
        </router-link>

        <div v-if="posts.length === 0" class="muted">
          No blog posts yet. Add some from the Admin page.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { padding: 120px 0; background: #fff; min-height: 100vh; }
.container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }
.header { margin-bottom: 2.5rem; }
h1 { font-size: 3rem; color: var(--dark); }
.header p { color: var(--text-gray); margin-top: 0.5rem; }

.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; }
.card {
  text-decoration: none;
  color: inherit;
  border: 1px solid #eee;
  border-radius: 16px;
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(0,0,0,0.08); }
.meta { color: #6b7280; font-size: 0.9rem; display: flex; gap: 0.5rem; align-items: center; }
h2 { margin-top: 0.75rem; font-size: 1.4rem; color: var(--dark); }
.excerpt { margin-top: 0.75rem; color: var(--text-gray); line-height: 1.6; }
.tags { margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.5rem; }
.tag { font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 999px; background: rgba(66, 184, 131, 0.12); color: var(--primary); }
.muted { color: #6b7280; }
</style>

