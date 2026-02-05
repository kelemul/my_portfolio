<script setup>
const props = defineProps({
  project: { type: Object, required: true }
});

const getImageUrl = (name) => {
  return new URL(`../assets/images/${name}`, import.meta.url).href;
};
</script>

<template>
  <div class="card">
    <div class="image-container">
      <img :src="getImageUrl(project.image)" :alt="project.title" class="project-img" />
      <div class="overlay">
        <div class="overlay-links">
          <router-link :to="`/project/${project.id}`" class="view-btn">
            <i class="fa-solid fa-eye"></i> Details
          </router-link>
          <a :href="project.link" target="_blank" class="view-btn code">
            <i class="fa-brands fa-github"></i> Code
          </a>
        </div>
      </div>
    </div>

    <div class="card-content">
      <div class="tags">
        <span v-for="t in project.tech" :key="t" class="tag">{{ t }}</span>
      </div>
      <h3>{{ project.title }}</h3>
      <p>{{ project.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #eee;
  transition: all 0.3s ease;
  height: 100%;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.image-container {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.project-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.card:hover .project-img { transform: scale(1.1); }

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(44, 62, 80, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover .overlay { opacity: 1; }

.overlay-links { display: flex; gap: 1rem; }

.view-btn {
  text-decoration: none;
  padding: 8px 18px;
  background: var(--primary);
  color: white;
  font-weight: 600;
  border-radius: 20px;
  font-size: 0.85rem;
}

.view-btn.code { background: transparent; border: 2px solid white; }

.card-content { padding: 1.5rem; }

.tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }

.tag {
  font-size: 0.7rem;
  background: rgba(66, 184, 131, 0.1);
  color: var(--primary);
  padding: 3px 10px;
  border-radius: 12px;
  font-weight: 700;
}

h3 { margin-bottom: 8px; font-size: 1.4rem; color: var(--dark); }

p { color: var(--text-gray); font-size: 0.9rem; line-height: 1.5; }
</style>