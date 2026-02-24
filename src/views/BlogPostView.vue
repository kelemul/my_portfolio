<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { blogPosts, isLoading } from '../data/portfolioData';

const route = useRoute();
const post = computed(() => {
  const list = Array.isArray(blogPosts.value) ? blogPosts.value : [];
  return list.find(p => p?.slug === route.params.slug);
});
</script>

<template>
  <div class="page">
    <div class="container">
      <router-link class="back" to="/blog">← Back to blog</router-link>

      <div v-if="isLoading" class="muted">Loading…</div>

      <article v-else-if="post" class="article">
        <div class="meta">
          <span>{{ post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '' }}</span>
          <span v-if="post.readingTimeMinutes" class="dot">•</span>
          <span v-if="post.readingTimeMinutes">{{ post.readingTimeMinutes }} min read</span>
        </div>
        <h1>{{ post.title }}</h1>
        <p class="excerpt">{{ post.excerpt }}</p>

        <div class="tags">
          <span v-for="t in (post.tags || [])" :key="t" class="tag">{{ t }}</span>
        </div>

        <!-- Simple renderer: supports plain text / basic HTML. For markdown, we can add a renderer later. -->
        <div class="content" v-html="post.contentHtml || ''"></div>
        <pre v-if="post.contentMarkdown" class="md">{{ post.contentMarkdown }}</pre>
      </article>

      <div v-else class="muted">
        Post not found.
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { padding: 120px 0; background: #fff; min-height: 100vh; }
.container { max-width: 900px; margin: 0 auto; padding: 0 2rem; }
.back { display: inline-block; margin-bottom: 1.25rem; color: var(--primary); text-decoration: none; font-weight: 700; }
.article { margin-top: 1.25rem; }
.meta { color: #6b7280; font-size: 0.95rem; display: flex; gap: 0.5rem; align-items: center; }
h1 { margin-top: 0.75rem; font-size: 3rem; line-height: 1.1; color: var(--dark); }
.excerpt { margin-top: 1rem; color: var(--text-gray); font-size: 1.15rem; line-height: 1.8; }
.tags { margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.5rem; }
.tag { font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 999px; background: rgba(66, 184, 131, 0.12); color: var(--primary); }
.content { margin-top: 2rem; color: #111; line-height: 1.9; }
.md { margin-top: 2rem; padding: 1.25rem; background: #f8f9fa; border-radius: 14px; overflow: auto; }
.muted { color: #6b7280; }
</style>

