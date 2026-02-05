<!-- ContactView.vue -->

<script setup>
import { reactive } from 'vue'

// 'reactive' is like 'ref', but better for objects/forms
const form = reactive({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = () => {
  console.log("Form Data:", form)
  alert(`Thanks ${form.name}, I'll be in touch!`)
  // In production, you'd use 'fetch' to send this to a backend/service
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="form.name" type="text" placeholder="Name" required />
    <input v-model="form.email" type="email" placeholder="Email" required />
    <textarea v-model="form.message" placeholder="Project details"></textarea>
    <button type="submit">Send Message</button>
  </form>
</template>