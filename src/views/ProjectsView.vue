<!-- ProjectsView.vue -->

<template>
  <div class="container">
    <h1>Contact Me</h1>
    <form class="contact-form" @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="form.name" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>
      <div class="form-group
">
        <label for="message">Message:</label>
        <textarea id="message" v-model="form.message" required></textarea>
      </div>
      <button type="submit">Send</button>
    </form>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const form = ref({
  name: '',
  email: '',
  message: ''
});
const successMessage = ref('');         
const submitForm = () => {
  console.log('Form submitted:', form.value);
  successMessage.value = 'Thank you! Your message has been sent.';
  form.value = { name: '', email: '', message: '' };
};
</script>
<style scoped>
.success-message {
  color: green;
  margin-top: 1rem;
}
</style>