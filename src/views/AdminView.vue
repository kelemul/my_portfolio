<script setup>
import { computed, ref } from 'vue';
import { blogPosts, certifications, contactInfo, experiences, projects, services, skills, socialLinks, testimonials, seo } from '../data/portfolioData';
import { getAdminToken, setAdminToken, login, updateSection, getMessages, getTestimonialSubmissions, postTestimonialSubmissionAction } from '../utils/adminClient';
import SectionEditor from '../components/SectionEditor.vue';

const username = ref('admin');
const password = ref('');
const token = ref(getAdminToken());
const status = ref('');
const err = ref('');
const activeTab = ref('content');
const submissions = ref([]);
const submissionsLoading = ref(false);

const messages = ref([]);
const messagesLoading = ref(false);

const content = computed(() => ({
  skills: skills.value,
  services: services.value,
  experiences: experiences.value,
  projects: projects.value,
  testimonials: testimonials.value,
  blogPosts: blogPosts.value,
  certifications: certifications.value,
  socialLinks: socialLinks.value,
  seo: seo.value,
  contactInfo,
}));

const editors = ref({
  skills: JSON.stringify(content.value.skills || [], null, 2),
  services: JSON.stringify(content.value.services || [], null, 2),
  experiences: JSON.stringify(content.value.experiences || [], null, 2),
  projects: JSON.stringify(content.value.projects || [], null, 2),
  testimonials: JSON.stringify(content.value.testimonials || [], null, 2),
  blogPosts: JSON.stringify(content.value.blogPosts || [], null, 2),
  certifications: JSON.stringify(content.value.certifications || [], null, 2),
  socialLinks: JSON.stringify(content.value.socialLinks || [], null, 2),
  seo: JSON.stringify(content.value.seo || {}, null, 2),
  contactInfo: JSON.stringify(content.value.contactInfo || {}, null, 2),
});

function syncFromStore() {
  editors.value.skills = JSON.stringify(content.value.skills || [], null, 2);
  editors.value.services = JSON.stringify(content.value.services || [], null, 2);
  editors.value.experiences = JSON.stringify(content.value.experiences || [], null, 2);
  editors.value.projects = JSON.stringify(content.value.projects || [], null, 2);
  editors.value.testimonials = JSON.stringify(content.value.testimonials || [], null, 2);
  editors.value.blogPosts = JSON.stringify(content.value.blogPosts || [], null, 2);
  editors.value.certifications = JSON.stringify(content.value.certifications || [], null, 2);
  editors.value.socialLinks = JSON.stringify(content.value.socialLinks || [], null, 2);
  editors.value.seo = JSON.stringify(content.value.seo || {}, null, 2);
  editors.value.contactInfo = JSON.stringify(content.value.contactInfo || {}, null, 2);
}

async function doLogin() {
  status.value = '';
  err.value = '';
  try {
    const res = await login(username.value, password.value);
    token.value = res.token || '';
    setAdminToken(token.value);
    status.value = 'Logged in';
  } catch (e) {
    err.value = e?.message || 'Login failed';
  }
}

function doLogout() {
  token.value = '';
  setAdminToken('');
  status.value = 'Logged out';
}

async function save(section) {
  status.value = '';
  err.value = '';

  try {
    const parsed = JSON.parse(editors.value[section]);
    await updateSection(section, parsed);
    status.value = `Saved ${section}`;
  } catch (e) {
    err.value = e?.message || 'Save failed';
  }
}

async function handleSave(section, value) {
  status.value = '';
  err.value = '';
  try {
    await updateSection(section, value);
    // Reflect change locally
    switch (section) {
      case 'skills': skills.value = value; break;
      case 'services': services.value = value; break;
      case 'experiences': experiences.value = value; break;
      case 'projects': projects.value = value; break;
      case 'testimonials': testimonials.value = value; break;
      case 'blogPosts': blogPosts.value = value; break;
      case 'certifications': certifications.value = value; break;
      case 'socialLinks': socialLinks.value = value; break;
      case 'seo': seo.value = value; break;
      case 'contactInfo': Object.assign(contactInfo, value || {}); break;
      default: break;
    }
    status.value = `Saved ${section}`;
  } catch (e) {
    err.value = e?.message || 'Save failed';
  }
}

async function loadMessages() {
  messagesLoading.value = true;
  err.value = '';
  status.value = '';
  try {
    messages.value = await getMessages();
  } catch (e) {
    err.value = e?.message || 'Failed to load messages';
  } finally {
    messagesLoading.value = false;
  }
}

async function loadSubmissions() {
  submissionsLoading.value = true;
  err.value = '';
  try {
    submissions.value = await getTestimonialSubmissions();
  } catch (e) {
    err.value = e?.message || 'Failed to load submissions';
  } finally {
    submissionsLoading.value = false;
  }
}

async function actOnSubmission(action, id) {
  try {
    await postTestimonialSubmissionAction(action, id);
    await loadSubmissions();
    status.value = `${action} succeeded`;
  } catch (e) {
    err.value = e?.message || 'Action failed';
  }
}
</script>

<template>
  <div class="page">
    <div class="container">
      <div class="topbar">
        <div>
          <h1>Admin</h1>
          <p class="muted">Manage portfolio content stored in MongoDB.</p>
        </div>

        <div class="auth">
          <template v-if="token">
            <div style="font-weight:700;">Admin</div>
            <button class="btn" @click="doLogout">Logout</button>
            <button class="btn" @click="syncFromStore">Refresh editor</button>
          </template>
          <template v-else>
            <div class="login-form">
              <input placeholder="username" v-model="username" />
              <input placeholder="password" v-model="password" type="password" />
              <button class="btn primary" @click="doLogin">Login</button>
            </div>
          </template>
        </div>
      </div>

      <div v-if="err" class="alert error">{{ err }}</div>
      <div v-if="status" class="alert ok">{{ status }}</div>

      <div class="tabs">
        <button :class="{ active: activeTab === 'content' }" @click="activeTab = 'content'">Content</button>
        <button :class="{ active: activeTab === 'submissions' }" @click="activeTab = 'submissions'; loadSubmissions()">Submissions</button>
        <button :class="{ active: activeTab === 'messages' }" @click="activeTab = 'messages'; loadMessages()">Messages</button>
      </div>

      <div v-if="activeTab === 'content'" class="grid">
        <div class="panel" v-for="section in ['skills','services','experiences','projects','testimonials','blogPosts','certifications','socialLinks','seo','contactInfo']" :key="section">
          <div class="panel-head">
            <h2>{{ section }}</h2>
          </div>
          <div style="padding:14px;">
            <SectionEditor
              :section="section"
              :items="content[section]"
              :isArray="Array.isArray(content[section])"
              :label="section"
              @save="async (v) => { await handleSave(section, v) }"
            />
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'submissions'" class="panel">
        <div class="panel-head">
          <h2>Testimonial Submissions</h2>
          <button class="btn" @click="loadSubmissions" :disabled="submissionsLoading">{{ submissionsLoading ? 'Loading…' : 'Refresh' }}</button>
        </div>

        <div v-if="submissions.length === 0" class="muted">No submissions.</div>
        <div class="messages">
          <div v-for="s in submissions" :key="s._id" class="message">
            <div class="row">
              <strong>{{ s.name }}</strong>
              <span class="muted">{{ s.createdAt ? new Date(s.createdAt).toLocaleString() : '' }}</span>
            </div>
            <p>{{ s.feedback }}</p>
            <div style="display:flex; gap:8px; margin-top:8px;">
              <button class="btn" @click="actOnSubmission('approve', s._id)">Approve</button>
              <button class="btn" @click="actOnSubmission('delete', s._id)">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="panel">
        <div class="panel-head">
          <h2>Contact messages</h2>
          <button class="btn" @click="loadMessages" :disabled="messagesLoading">{{ messagesLoading ? 'Loading…' : 'Refresh' }}</button>
        </div>

        <div v-if="messages.length === 0" class="muted">No messages.</div>
        <div class="messages">
          <div v-for="m in messages" :key="m._id" class="message">
            <div class="row">
              <strong>{{ m.name }}</strong>
              <span class="muted">{{ m.email }}</span>
              <span class="muted">{{ m.createdAt ? new Date(m.createdAt).toLocaleString() : '' }}</span>
            </div>
            <p>{{ m.message }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { padding: 120px 0; background: #f8f9fa; min-height: 100vh; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
.topbar { display: flex; justify-content: space-between; gap: 1.5rem; align-items: flex-end; margin-bottom: 1.25rem; flex-wrap: wrap; }
h1 { font-size: 2.6rem; color: var(--dark); }
.muted { color: #6b7280; }
.auth { display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; }
input {
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  min-width: 260px;
}
.login-form { display:flex; gap:8px; align-items:center; }
.login-form input { min-width: 140px; }
.topbar { padding-bottom: 0.5rem; }
.panel-head h2 { margin: 0; }
.tabs { display: flex; gap: 0.5rem; margin: 1rem 0 1.25rem; }
.tabs button {
  border: 1px solid #e5e7eb;
  background: #fff;
  padding: 10px 14px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 700;
}
.tabs button.active { background: var(--primary); border-color: var(--primary); color: #fff; }

.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: 1rem; }
.panel { background: #fff; border: 1px solid #eee; border-radius: 16px; overflow: hidden; }
.panel-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 14px 10px; gap: 1rem; }
h2 { font-size: 1.1rem; text-transform: none; }
textarea {
  width: 100%;
  min-height: 340px;
  padding: 14px;
  border: none;
  outline: none;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.85rem;
  line-height: 1.5;
  background: #fbfbfb;
}
.btn {
  border: 1px solid #e5e7eb;
  background: #fff;
  padding: 10px 12px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 800;
}
.btn.primary { background: var(--primary); border-color: var(--primary); color: #fff; }
.alert { margin: 0.75rem 0; padding: 12px 14px; border-radius: 12px; font-weight: 700; }
.alert.ok { background: rgba(66, 184, 131, 0.14); color: #14532d; border: 1px solid rgba(66, 184, 131, 0.3); }
.alert.error { background: rgba(239, 68, 68, 0.12); color: #7f1d1d; border: 1px solid rgba(239, 68, 68, 0.3); }

.messages { display: grid; gap: 12px; padding: 0 14px 14px; }
.message { border: 1px solid #eee; border-radius: 14px; padding: 12px 14px; background: #fff; }
.row { display: flex; flex-wrap: wrap; gap: 10px; align-items: baseline; }
.message p { margin-top: 8px; color: #111; line-height: 1.7; }
</style>

