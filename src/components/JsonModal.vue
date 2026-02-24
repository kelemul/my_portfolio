<template>
  <div v-if="show" class="overlay">
    <div class="modal">
      <div class="head">
        <h3>{{ title }}</h3>
        <button class="close" @click="$emit('close')">✕</button>
      </div>
      <textarea v-model="value" spellcheck="false"></textarea>
      <div class="actions">
        <button class="btn" @click="onSave">Save</button>
        <button class="btn" @click="$emit('close')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps({ show: Boolean, title: String, json: Object });
const emit = defineEmits(['close', 'save']);
const value = ref('');

watch(() => props.json, (j) => { value.value = JSON.stringify(j ?? {}, null, 2); }, { immediate: true });

function onSave() {
  try {
    const parsed = JSON.parse(value.value);
    emit('save', parsed);
  } catch (e) {
    alert('Invalid JSON: ' + e.message);
  }
}
</script>

<style scoped>
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display:flex; align-items:center; justify-content:center; z-index:60; }
.modal { width: 780px; background:#fff; border-radius:12px; overflow:hidden; }
.head { display:flex; justify-content:space-between; padding:12px 16px; border-bottom:1px solid #eee; }
.close { background:transparent; border:none; font-size:18px; cursor:pointer; }
textarea { width:100%; height:360px; border:none; padding:12px; font-family:ui-monospace,monospace; }
.actions { display:flex; gap:8px; padding:10px 16px; justify-content:flex-end; }
.btn { padding:8px 12px; border-radius:8px; border:1px solid #e5e7eb; background:#fff; }
</style>
