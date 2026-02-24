<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login, getAdminToken, setAdminToken } from '../utils/adminClient';

const router = useRouter();
const username = ref('admin');
const password = ref('');
const err = ref('');
const loading = ref(false);

async function doLogin() {
  err.value = '';
  loading.value = true;
  try {
    const res = await login(username.value, password.value);
    setAdminToken(res.token || '');
    await router.push({ name: 'admin' });
  } catch (e) {
    err.value = e?.message || 'Login failed';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="page">
    <div class="container">
      <div class="header">
        <h1>Admin Login</h1>
        <p class="muted">Sign in to manage portfolio content.</p>
      </div>

      <div class="panel">
        <div style="padding:20px; display:flex; gap:10px; align-items:center;">
          <input v-model="username" placeholder="username" />
          <input v-model="password" type="password" placeholder="password" />
          <button class="btn" @click="doLogin" :disabled="loading">{{ loading ? 'Signing in…' : 'Sign in' }}</button>
        </div>

        <div v-if="err" style="color:#7f1d1d; padding:0 20px 20px">{{ err }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { padding: 120px 0; min-height: 60vh; }
.container { max-width: 800px; margin: 0 auto; padding: 0 2rem; }
.header h1 { font-size: 2rem; }
input { padding: 10px; border-radius: 8px; border: 1px solid #e5e7eb; }
.btn { padding: 10px 14px; border-radius: 8px; }
</style>
