// // src/data/portfolioData.js
// import data from './portfolioData.json';

// export const skills = data.skills;
// export const services = data.services;
// export const experiences = data.experiences;
// export const projects = data.projects;
// export const testimonials = data.testimonials;
// export const contactInfo = data.contactInfo;


import { ref, reactive } from 'vue';

export const projects = ref([]);
export const skills = ref([]);
export const services = ref([]);
export const experiences = ref([]);
export const testimonials = ref([]);
export const blogPosts = ref([]);
export const certifications = ref([]);
export const socialLinks = ref([]);
export const seo = ref({});
export const contactInfo = reactive({});
export const isLoading = ref(true);

export const initPortfolio = async () => {
    try {
        // In production (Vercel), `/api/*` is handled by serverless functions.
        // In local dev with Vite, you typically run `vercel dev` (default :3000)
        // or provide `VITE_API_BASE` to point at your API server.
        const apiBase =
          import.meta.env.VITE_API_BASE ??
          (import.meta.env.DEV ? 'http://localhost:3000' : '');

        const url = `${apiBase}/api/getPortfolio`;
        const res = await fetch(url);

        const contentType = (res.headers.get('content-type') || '').toLowerCase();
        if (!res.ok) {
          const text = await res.text().catch(() => '');
          throw new Error(`GET ${url} failed (${res.status}). ${text ? `Body: ${text.slice(0, 200)}` : ''}`.trim());
        }

        if (!contentType.includes('application/json')) {
          const text = await res.text().catch(() => '');
          throw new Error(
            `Expected JSON from ${url} but got "${contentType || 'unknown'}". ` +
            `This usually means the API isn't running locally. ` +
            `Body starts with: ${JSON.stringify(text.slice(0, 60))}`
          );
        }

        const data = await res.json();
        
        projects.value = data.projects || [];
        skills.value = data.skills || [];
        services.value = data.services || [];
        experiences.value = data.experiences || [];
        testimonials.value = data.testimonials || [];
        blogPosts.value = data.blogPosts || data.blog || [];
        certifications.value = data.certifications || [];
        socialLinks.value = data.socialLinks || [];
        seo.value = data.seo || {};
        Object.assign(contactInfo, data.contactInfo || {});
    } catch (e) {
        console.error("API Error:", e);
    } finally {
        isLoading.value = false;
    }
};

initPortfolio();