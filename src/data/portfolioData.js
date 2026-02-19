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
export const contactInfo = reactive({});
export const isLoading = ref(true);

export const initPortfolio = async () => {
    try {
        // When running locally, this hits http://localhost:3000/api/getPortfolio
        // When deployed on Vercel, it hits your live URL
        const res = await fetch('/api/getPortfolio');
        const data = await res.json();
        
        projects.value = data.projects || [];
        skills.value = data.skills || [];
        Object.assign(contactInfo, data.contactInfo || {});
    } catch (e) {
        console.error("API Error:", e);
    } finally {
        isLoading.value = false;
    }
};

initPortfolio();