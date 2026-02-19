<script setup>
const props = defineProps({
  project: Object,
  isOpen: Boolean
});
const emit = defineEmits(['close']);

const getImageUrl = (name) => new URL(`../assets/images/${name}`, import.meta.url).href;
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-content">
          <button class="close-btn" @click="$emit('close')">&times;</button>
          
          <div class="modal-body">
            <div class="modal-image">
              <img :src="getImageUrl(project.image)" :alt="project.title" />
            </div>
            
            <div class="modal-info">
              <span class="modal-tag">{{ project.tech[0] }}</span>
              <h2>{{ project.title }}</h2>
              <p>{{ project.description }}</p>
              
              <div class="modal-tech-list">
                <span v-for="t in project.tech" :key="t" class="tech-pill">{{ t }}</span>
              </div>

              <div class="modal-actions">
                <a :href="project.link" target="_blank" class="btn primary">View Code</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  width: 100%;
  max-width: 900px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  animation: slideUp 0.3s ease-out;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  color: #333;
}

.modal-body {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 400px;
}

.modal-info {
  padding: 40px;
}

.modal-tag {
  color: var(--primary);
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

h2 { font-size: 2rem; margin: 10px 0; }

.tech-pill {
  display: inline-block;
  background: #f0f0f0;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  margin: 0 5px 5px 0;
}

.modal-actions { margin-top: 30px; }

/* Transitions */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }

@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@media (max-width: 768px) {
  .modal-body { grid-template-columns: 1fr; }
  .modal-image img { min-height: 200px; }
}
</style>