<script setup>
defineProps(['modelValue']);
defineEmits(['update:modelValue']);
</script>

<template>
  <div class="search-container">
    <div class="search-box">
      <i class="fa-solid fa-magnifying-glass search-icon"></i>
      <input 
        :value="modelValue" 
        @input="$emit('update:modelValue', $event.target.value)"
        type="text" 
        placeholder="Search projects by tech (e.g. 'Vue', 'Firebase')..." 
        class="search-input" 
      />
    </div>
  </div>
</template>

<style scoped>
.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
}

.search-box {
  position: relative;
  width: 100%;
  max-width: 500px;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-gray);
}

.search-input { 
  width: 100%; 
  padding: 14px 20px 14px 45px; 
  border-radius: 30px; 
  border: 2px solid #eee; 
  outline: none;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 15px rgba(66, 184, 131, 0.1);
}
</style>