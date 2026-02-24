<template>
  <div>
    <div class="section-actions">
      <button class="btn" @click="startAdd">Add {{ label }}</button>
      <button class="btn" @click="onSaveAll">Save</button>
    </div>

    <div v-if="isArray" class="cards">
      <div v-for="(item, idx) in itemsLocal" :key="item._id || idx" class="card">
        <div class="card-head">
          <strong>{{ item.title || item.name || item.id || ('Item ' + (idx+1)) }}</strong>
          <div>
            <button class="btn" @click="toggleInline(idx)">Edit</button>
            <button class="btn" @click="onDelete(idx)">Delete</button>
          </div>
        </div>

        <div v-if="editingIndex === idx" class="inline-form">
          <component :is="formComponent" :modelValue="itemsLocal[idx]" @update:modelValue="val => onInlineSave(idx, val)" />
        </div>

        <pre v-else class="card-body">{{ short(item) }}</pre>
      </div>
      <div v-if="itemsLocal.length === 0" class="muted">No items yet.</div>
    </div>

    <div v-else class="object-editor">
      <div v-if="editingIndex === -2">
        <component :is="formComponent" :modelValue="itemsLocal" @update:modelValue="val => onInlineSave(-2, val)" />
      </div>
      <div v-else>
        <pre class="card-body">{{ JSON.stringify(itemsLocal, null, 2) }}</pre>
        <div style="margin-top:8px;"><button class="btn" @click="startEditObject">Edit</button></div>
      </div>
    </div>

    <div v-if="showAdd" class="add-panel">
      <h4>New {{ label }}</h4>
      <component :is="formComponent" :modelValue="newItem" @update:modelValue="v => newItem = v" />
      <div style="margin-top:8px;"><button class="btn" @click="confirmAdd">Add</button> <button class="btn" @click="cancelAdd">Cancel</button></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, h } from 'vue';
// lightweight inline form components
const props = defineProps({ section: String, items: [Array, Object], isArray: Boolean, label: String });
const emit = defineEmits(['save']);

const itemsLocal = ref(props.isArray ? (Array.isArray(props.items) ? JSON.parse(JSON.stringify(props.items)) : []) : (props.items ? JSON.parse(JSON.stringify(props.items)) : {}));
watch(() => props.items, (v) => { itemsLocal.value = props.isArray ? (Array.isArray(v) ? JSON.parse(JSON.stringify(v)) : []) : (v ? JSON.parse(JSON.stringify(v)) : {}); });

const editingIndex = ref(null);
const showAdd = ref(false);
const newItem = ref({});

function startAdd() { showAdd.value = true; newItem.value = defaultForSection(props.section); }
function cancelAdd() { showAdd.value = false; newItem.value = {}; }
function confirmAdd() { itemsLocal.value.push(normalizeForSection(props.section, newItem.value)); emit('save', itemsLocal.value); showAdd.value = false; }

function toggleInline(idx) { editingIndex.value = editingIndex.value === idx ? null : idx; }
function startEditObject() { editingIndex.value = -2; }

function onInlineSave(idx, val) {
  if (idx === -2) {
    itemsLocal.value = normalizeForSection(props.section, val);
  } else {
    itemsLocal.value.splice(idx, 1, normalizeForSection(props.section, val));
    editingIndex.value = null;
  }
  emit('save', itemsLocal.value);
}

function onDelete(idx) { if (!confirm('Delete this item?')) return; itemsLocal.value.splice(idx,1); emit('save', itemsLocal.value); }
function onSaveAll() { emit('save', itemsLocal.value); }

function short(obj) { try { return JSON.stringify(obj, null, 2).slice(0, 300); } catch (e) { return String(obj); } }

// Provide simple inline form components mapping
const formComponent = computed(() => {
  const s = props.section;
  if (s === 'projects') return ProjectForm;
  if (s === 'skills') return SkillForm;
  if (s === 'blogPosts') return BlogPostForm;
  if (s === 'testimonials') return TestimonialForm;
  if (s === 'services') return ServiceForm;
  if (s === 'experiences') return ExperienceForm;
  if (s === 'certifications') return CertificationForm;
  if (s === 'socialLinks') return SocialLinkForm;
  if (s === 'seo' || s === 'contactInfo') return ObjectJsonForm;
  return ObjectJsonForm;
});

// Default generators
function defaultForSection(section) {
  switch (section) {
    case 'projects': return { title: '', description: '', link: '', tech: [], tags: [], images: [] };
    case 'skills': return { name: '', level: '', icon: '' };
    case 'blogPosts': return { title: '', slug: '', excerpt: '', contentHtml: '', publishedAt: new Date().toISOString(), status: 'published', tags: [] };
    case 'testimonials': return { name: '', feedback: '', designation: '', image: '', status: 0 };
    case 'services': return { title: '', desc: '', icon: '' };
    case 'experiences': return { title: '', company: '', year: '', desc: '' };
    case 'certifications': return { id: '', title: '', issuer: '', date: '' };
    case 'socialLinks': return { name: '', url: '', icon: '' };
    case 'seo': return {};
    case 'contactInfo': return {};
    default: return {};
  }
}

function normalizeForSection(section, obj) {
  const copy = JSON.parse(JSON.stringify(obj));
  if (section === 'projects') {
    if (typeof copy.tech === 'string') copy.tech = splitToArray(copy.tech);
    if (typeof copy.tags === 'string') copy.tags = splitToArray(copy.tags);
    if (typeof copy.images === 'string') copy.images = splitToArray(copy.images);
  }
  if (section === 'blogPosts') {
    if (typeof copy.tags === 'string') copy.tags = splitToArray(copy.tags);
  }
  return copy;
}

function splitToArray(s) { return s ? s.split(',').map(x => x.trim()).filter(Boolean) : []; }

// Inline small form components
const ProjectForm = {
  props: ['modelValue'], emits: ['update:modelValue'], setup(props, { emit }) {
    const local = ref(JSON.parse(JSON.stringify(props.modelValue || defaultForSection('projects'))));
    watch(() => props.modelValue, (v) => local.value = JSON.parse(JSON.stringify(v || defaultForSection('projects'))));
    return () => h('div', {}, [
      h('label', { style:{fontWeight:700} }, 'Title'), h('input', { value: local.value.title, onInput: e => (local.value.title = e.target.value) }),
      h('label', { style:{fontWeight:700, marginTop:'8px', display:'block'} }, 'Description'), h('textarea', { value: local.value.description, onInput: e => (local.value.description = e.target.value) }),
      h('label', { style:{fontWeight:700, marginTop:'8px', display:'block'} }, 'Link'), h('input', { value: local.value.link, onInput: e => (local.value.link = e.target.value) }),
      h('label', { style:{fontWeight:700, marginTop:'8px', display:'block'} }, 'Tech (comma separated)'), h('input', { value: (local.value.tech || []).join(', '), onInput: e => (local.value.tech = splitToArray(e.target.value)) }),
      h('label', { style:{fontWeight:700, marginTop:'8px', display:'block'} }, 'Tags (comma separated)'), h('input', { value: (local.value.tags || []).join(', '), onInput: e => (local.value.tags = splitToArray(e.target.value)) }),
      h('label', { style:{fontWeight:700, marginTop:'8px', display:'block'} }, 'Images (comma separated)'), h('input', { value: (local.value.images || []).join(', '), onInput: e => (local.value.images = splitToArray(e.target.value)) }),
      h('div', { style:{marginTop:'8px'} }, [ h('button', { class:'btn', onClick: () => emit('update:modelValue', local.value) }, 'Apply') ])
    ]);
  }
};

const SkillForm = {
  props:['modelValue'], emits:['update:modelValue'], setup(props,{emit}){
    const local = ref(JSON.parse(JSON.stringify(props.modelValue || defaultForSection('skills'))));
    watch(() => props.modelValue, (v) => local.value = JSON.parse(JSON.stringify(v || defaultForSection('skills'))));
    return () => h('div', {}, [
      h('label',{style:{fontWeight:700}},'Name'), h('input',{value:local.value.name,onInput:e=>local.value.name=e.target.value}),
      h('label',{style:{fontWeight:700,display:'block',marginTop:'8px'}},'Level'), h('input',{value:local.value.level,onInput:e=>local.value.level=e.target.value}),
      h('label',{style:{fontWeight:700,display:'block',marginTop:'8px'}},'Icon'), h('input',{value:local.value.icon,onInput:e=>local.value.icon=e.target.value}),
      h('div',{style:{marginTop:'8px'}},[ h('button',{class:'btn',onClick:()=>emit('update:modelValue',local.value)},'Apply') ])
    ]);
  }
};

const BlogPostForm = {
  props:['modelValue'], emits:['update:modelValue'], setup(props,{emit}){
    const local = ref(JSON.parse(JSON.stringify(props.modelValue || defaultForSection('blogPosts'))));
    watch(() => props.modelValue, (v) => local.value = JSON.parse(JSON.stringify(v || defaultForSection('blogPosts'))));
    return () => h('div', {}, [
      h('label',{style:{fontWeight:700}},'Title'), h('input',{value:local.value.title,onInput:e=>local.value.title=e.target.value}),
      h('label',{style:{fontWeight:700,display:'block',marginTop:'8px'}},'Slug'), h('input',{value:local.value.slug,onInput:e=>local.value.slug=e.target.value}),
      h('label',{style:{fontWeight:700,display:'block',marginTop:'8px'}},'Excerpt'), h('textarea',{value:local.value.excerpt,onInput:e=>local.value.excerpt=e.target.value}),
      h('label',{style:{fontWeight:700,display:'block',marginTop:'8px'}},'Content HTML'), h('textarea',{value:local.value.contentHtml,onInput:e=>local.value.contentHtml=e.target.value}),
      h('label',{style:{fontWeight:700,display:'block',marginTop:'8px'}},'Tags (comma)'), h('input',{value:(local.value.tags||[]).join(', '),onInput:e=>local.value.tags=splitToArray(e.target.value)}),
      h('div',{style:{marginTop:'8px'}},[ h('button',{class:'btn',onClick:()=>emit('update:modelValue',local.value)},'Apply') ])
    ]);
  }
};

const TestimonialForm = {
  props:['modelValue'], emits:['update:modelValue'], setup(props,{emit}){
    const local = ref(JSON.parse(JSON.stringify(props.modelValue || defaultForSection('testimonials'))));
    watch(() => props.modelValue, (v) => local.value = JSON.parse(JSON.stringify(v || defaultForSection('testimonials'))));
    return () => h('div', {}, [
      h('label',{style:{fontWeight:700}},'Name'), h('input',{value:local.value.name,onInput:e=>local.value.name=e.target.value}),
      h('label',{style:{fontWeight:700,display:'block',marginTop:'8px'}},'Feedback'), h('textarea',{value:local.value.feedback,onInput:e=>local.value.feedback=e.target.value}),
      h('label',{style:{fontWeight:700,display:'block',marginTop:'8px'}},'Approved'), h('select', { value: local.value.status ?? 0, onChange: e => local.value.status = Number(e.target.value) }, [ h('option',{ value:0 }, 'Not approved'), h('option',{ value:1 }, 'Approved') ]),
      h('div',{style:{marginTop:'8px'}},[ h('button',{class:'btn',onClick:()=>emit('update:modelValue',local.value)},'Apply') ])
    ]);
  }
};

const ServiceForm = {
  props:['modelValue'], emits:['update:modelValue'], setup(props,{emit}){
    const local = ref(JSON.parse(JSON.stringify(props.modelValue || defaultForSection('services'))));
    watch(() => props.modelValue, (v) => local.value = JSON.parse(JSON.stringify(v || defaultForSection('services'))));
    return () => h('div', {}, [
      h('label',{style:{fontWeight:700}},'Title'), h('input',{value:local.value.title,onInput:e=>local.value.title=e.target.value}),
      h('label',{style:{fontWeight:700,display:'block',marginTop:'8px'}},'Desc'), h('textarea',{value:local.value.desc,onInput:e=>local.value.desc=e.target.value}),
      h('div',{style:{marginTop:'8px'}},[ h('button',{class:'btn',onClick:()=>emit('update:modelValue',local.value)},'Apply') ])
    ]);
  }
};

const ExperienceForm = {
  props:['modelValue'], emits:['update:modelValue'], setup(props,{emit}){
    const local = ref(JSON.parse(JSON.stringify(props.modelValue || defaultForSection('experiences'))));
    watch(() => props.modelValue, (v) => local.value = JSON.parse(JSON.stringify(v || defaultForSection('experiences'))));
    return () => h('div', {}, [
      h('label',{style:{fontWeight:700}},'Title'), h('input',{value:local.value.title,onInput:e=>local.value.title=e.target.value}),
      h('label',{style:{fontWeight:700,display:'block',marginTop:'8px'}},'Company'), h('input',{value:local.value.company,onInput:e=>local.value.company=e.target.value}),
      h('label',{style:{fontWeight:700,display:'block',marginTop:'8px'}},'Year'), h('input',{value:local.value.year,onInput:e=>local.value.year=e.target.value}),
      h('label',{style:{fontWeight:700,display:'block',marginTop:'8px'}},'Desc'), h('textarea',{value:local.value.desc,onInput:e=>local.value.desc=e.target.value}),
      h('div',{style:{marginTop:'8px'}},[ h('button',{class:'btn',onClick:()=>emit('update:modelValue',local.value)},'Apply') ])
    ]);
  }
};

const CertificationForm = {
  props:['modelValue'], emits:['update:modelValue'], setup(props,{emit}){
    const local = ref(JSON.parse(JSON.stringify(props.modelValue || defaultForSection('certifications'))));
    watch(() => props.modelValue, (v) => local.value = JSON.parse(JSON.stringify(v || defaultForSection('certifications'))));
    return () => h('div', {}, [
      h('label',{style:{fontWeight:700}},'Title'), h('input',{value:local.value.title,onInput:e=>local.value.title=e.target.value}),
      h('label',{style:{fontWeight:700,display:'block',marginTop:'8px'}},'Issuer'), h('input',{value:local.value.issuer,onInput:e=>local.value.issuer=e.target.value}),
      h('div',{style:{marginTop:'8px'}},[ h('button',{class:'btn',onClick:()=>emit('update:modelValue',local.value)},'Apply') ])
    ]);
  }
};

const SocialLinkForm = {
  props:['modelValue'], emits:['update:modelValue'], setup(props,{emit}){
    const local = ref(JSON.parse(JSON.stringify(props.modelValue || defaultForSection('socialLinks'))));
    watch(() => props.modelValue, (v) => local.value = JSON.parse(JSON.stringify(v || defaultForSection('socialLinks'))));
    return () => h('div', {}, [
      h('label',{style:{fontWeight:700}},'Name'), h('input',{value:local.value.name,onInput:e=>local.value.name=e.target.value}),
      h('label',{style:{fontWeight:700,display:'block',marginTop:'8px'}},'URL'), h('input',{value:local.value.url,onInput:e=>local.value.url=e.target.value}),
      h('div',{style:{marginTop:'8px'}},[ h('button',{class:'btn',onClick:()=>emit('update:modelValue',local.value)},'Apply') ])
    ]);
  }
};

const ObjectJsonForm = {
  props:['modelValue'], emits:['update:modelValue'], setup(props,{emit}){
    const local = ref(JSON.stringify(props.modelValue || {}, null, 2));
    watch(() => props.modelValue, (v) => local.value = JSON.stringify(v || {}, null, 2));
    return () => h('div', {}, [ h('textarea', { value: local.value, onInput: e => local.value = e.target.value, style:{width:'100%',height:'180px'} }), h('div',{style:{marginTop:'8px'}}, [ h('button',{class:'btn', onClick: ()=> { try { emit('update:modelValue', JSON.parse(local.value)); } catch (e) { alert('Invalid JSON'); } } }, 'Apply') ]) ]);
  }
};

// (no aliasing required) the form components are the variables declared above
</script>

<style scoped>
.section-actions { display:flex; gap:8px; margin-bottom:12px; }
.cards { display:grid; grid-template-columns: repeat(auto-fit, minmax(240px,1fr)); gap:12px; }
.card { border:1px solid #eee; padding:12px; border-radius:12px; background:#fff; }
.card-head { display:flex; justify-content:space-between; align-items:center; gap:8px; }
.card-body { margin-top:8px; color:var(--text-gray); white-space:pre-wrap; max-height:180px; overflow:auto; }
.muted { color:#6b7280; }
.object-editor { padding:12px; border:1px dashed #eee; border-radius:8px; background:#fff; }
.btn { padding:8px 10px; border-radius:8px; border:1px solid #e5e7eb; background:#fff; }
.inline-form { padding:8px 0; }
.add-panel { margin-top:12px; padding:12px; border:1px solid #eee; border-radius:8px; background:#fff; }
input, textarea { width:100%; padding:8px; border-radius:6px; border:1px solid #e5e7eb; margin-bottom:8px; }
</style>
