<script setup>
import { reactive, ref } from 'vue';
import { contactInfo } from '../data/portfolioData';

const form = reactive({ name: '', email: '', message: '' });
const isSending = ref(false);
const success = ref(false);

const handleSubmit = () => {
  isSending.value = true;
  // Simulate API call
  setTimeout(() => {
    isSending.value = false;
    success.value = true;
    form.name = ''; form.email = ''; form.message = '';
    setTimeout(() => success.value = false, 5000);
  }, 1500);
};
</script>

<template>
  <section id="contact" class="section-wrapper">
    <div class="container">
      <div class="contact-grid">
        <div class="contact-info">
          <h2>Let's Talk</h2>
          <p>Have a project in mind? Reach out and let's build something amazing together.</p>
          <div class="info-item">
            <i class="fa-solid fa-envelope"></i>
            <div><span>Email</span><p>{{ contactInfo.email }}</p></div>
          </div>
          <div class="info-item">
            <i class="fa-solid fa-location-dot"></i>
            <div><span>Location</span><p>{{ contactInfo.address }}</p></div>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="contact-form">
          <div class="form-group">
            <input v-model="form.name" type="text" placeholder="Your Name" required />
          </div>
          <div class="form-group">
            <input v-model="form.email" type="email" placeholder="Your Email" required />
          </div>
          <div class="form-group">
            <textarea v-model="form.message" rows="5" placeholder="Your Message" required></textarea>
          </div>
          <button type="submit" :disabled="isSending">
            {{ isSending ? 'Sending...' : 'Send Message' }}
          </button>
          <p v-if="success" class="success-msg">Message sent successfully!</p>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-wrapper { padding: 100px 0; background: var(--secondary); color: white; }
.container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }
.contact-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 4rem; }

h2 { font-size: 2.5rem; margin-bottom: 1rem; color: var(--primary); }
.info-item { display: flex; gap: 1rem; margin-top: 2rem; align-items: center; }
.info-item i { font-size: 1.5rem; color: var(--primary); }
.info-item span { font-size: 0.8rem; text-transform: uppercase; color: #ccc; }

.contact-form { background: white; padding: 2.5rem; border-radius: 15px; }
.form-group { margin-bottom: 1.2rem; }
input, textarea {
  width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; outline: none;
}
button {
  width: 100%; padding: 14px; background: var(--primary); color: white;
  border: none; border-radius: 8px; font-weight: 700; cursor: pointer;
}
.success-msg { color: var(--primary); margin-top: 1rem; text-align: center; }

@media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; } }
</style>