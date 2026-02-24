<script setup>
import { ref } from 'vue';
const name = ref('');
const feedback = ref('');
const designation = ref('');
const image = ref('');
const status = ref('');

async function submit() {
  status.value = '';
  try {
    const res = await fetch('/api/testimonials/submit', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.value, feedback: feedback.value, designation: designation.value, image: image.value })
    });
    const j = await res.json();
    if (!res.ok) throw new Error(j?.error || 'Submit failed');
    status.value = 'Thanks — your testimonial was submitted for review.';
    name.value = ''; feedback.value = ''; designation.value = ''; image.value = '';
  } catch (e) { status.value = e?.message || 'Submit failed'; }
}
</script>

<template>
  <div class="page">
    <div class="container">
      <h1>Add Testimonial</h1>
      <div class="panel" style="padding:16px;">
        <label>Name</label>
        <input v-model="name" />
        <label>Feedback</label>
        <textarea v-model="feedback"></textarea>
        <label>Designation (optional)</label>
        <input v-model="designation" />
        <label>Image URL (optional)</label>
        <input v-model="image" />
        <div style="margin-top:8px"><button class="btn" @click="submit">Submit</button></div>
        <div style="margin-top:8px; color:var(--primary);">{{ status }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container { max-width:760px; margin:0 auto; padding:2rem; }
input, textarea { width:100%; padding:8px; border:1px solid #e5e7eb; border-radius:8px; margin-bottom:8px }
.btn { padding:8px 12px; }
</style>
