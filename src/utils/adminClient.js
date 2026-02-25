const STORAGE_KEY = 'adminToken';

export function setAdminToken(token) {
  if (!token) localStorage.removeItem(STORAGE_KEY);
  else localStorage.setItem(STORAGE_KEY, token);
}

export function getAdminToken() {
  return localStorage.getItem(STORAGE_KEY) || '';
}

function authHeaders() {
  const token = getAdminToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function login(username, password) {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    credentials: 'omit',
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    throw new Error(payload?.error || `Login failed (${res.status})`);
  }

  const data = await res.json();
  if (data?.token) setAdminToken(data.token);
  return data;
}

export async function updateSection(section, data) {
  const res = await fetch('/api/admin/updateContent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    credentials: 'omit',
    body: JSON.stringify({ section, data }),
  });

  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    throw new Error(payload?.error || `Update failed (${res.status})`);
  }

  return await res.json().catch(() => ({ success: true }));
}

export async function getMessages() {
  const res = await fetch('/api/admin/messages', {
    headers: {
      ...authHeaders(),
    },
    credentials: 'omit',
  });
  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    throw new Error(payload?.error || `Fetch failed (${res.status})`);
  }
  return await res.json();
}

export async function getTestimonialSubmissions() {
  const res = await fetch('/api/admin/testimonial_submissions', { headers: { ...authHeaders(), Accept: 'application/json' }, credentials: 'omit' });
  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    throw new Error(payload?.error || `Fetch failed (${res.status})`);
  }
  return await res.json();
}

export async function postTestimonialSubmissionAction(action, id) {
  const res = await fetch('/api/admin/testimonial_submissions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders(), Accept: 'application/json' },
    credentials: 'omit',
    body: JSON.stringify({ action, id }),
  });
  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    throw new Error(payload?.error || `Action failed (${res.status})`);
  }
  return await res.json();
}

