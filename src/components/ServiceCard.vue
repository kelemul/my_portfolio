<script setup>
defineProps(['title', 'description', 'icon'])
</script>

<template>
  <div class="service-card">
    <div class="icon-wrapper">
      <i :class="icon"></i>
    </div>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<style scoped>
.service-card {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  text-align: center;
  border: 1px solid #eee;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.08);
  border-color: transparent;
}

.icon-wrapper {
  width: 70px;
  height: 70px;
  background: rgba(66, 184, 131, 0.1); /* Light Green */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem auto;
  transition: background 0.3s ease;
}

.service-card:hover .icon-wrapper {
  background: var(--primary);
}

.icon-wrapper i {
  font-size: 1.8rem;
  color: var(--primary);
  transition: color 0.3s ease;
}

.service-card:hover .icon-wrapper i {
  color: white;
}

h3 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
  color: var(--dark);
}

p {
  color: var(--text-gray);
  font-size: 0.95rem;
  line-height: 1.6;
}
</style>