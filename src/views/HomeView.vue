  <script setup>
  import { ref, computed } from 'vue';
  import { projects } from '../data/portfolioData';
  import ServiceSection from '../components/ServiceSection.vue';
  import SkillsSection from '../components/SkillsSection.vue';
  import ExperienceSection from '../components/ExperienceSection.vue';
  import ProjectCard from '../components/ProjectCard.vue';
  import ProjectSearch from '../components/ProjectSearch.vue';
import ContactSection from '../components/ContactSection.vue'; 
import ProjectModal from '../components/ProjectModal.vue';
import TestimonialSection from '../components/TestimonialSection.vue';
  const searchQuery = ref('');

  const filteredProjects = computed(() => {
    const query = searchQuery.value.toLowerCase();
    const list = Array.isArray(projects.value) ? projects.value : [];
    return list.filter(p => {
      const title = (p?.title || '').toLowerCase();
      const tech = Array.isArray(p?.tech) ? p.tech : [];
      return title.includes(query) || tech.some(t => (t || '').toLowerCase().includes(query));
    });
  });
  const selectedProject = ref(null);
const isModalOpen = ref(false);

const openModal = (project) => {
  selectedProject.value = project;
  isModalOpen.value = true;
};
  </script>

  <template>
    <div class="home-wrapper">
      <section id="home" class="hero">
        <div class="hero-content">
          <span class="greeting">Welcome to my portfolio</span>
          <h1>Building <span class="highlight">Digital Experiences</span> With Precision</h1>
          <p>I'm Kelemu Leykun, a Full stack developer dedicated to creating interactive and user-friendly web applications, ERP systems, API Development, Backend development and integrations.</p>
          <div class="hero-btns">
            <a href="#projects" class="btn primary">View My Work</a>
            <a href="#contact" class="btn secondary">Hire Me</a>
            <a 
                href="/kelem_CV.pdf" 
                download="kelem_CV.pdf" 
                class="btn outline"
              >
                <i class="fa-solid fa-download"></i> Download CV
              </a>
          </div>
        </div>
      </section>

      <ServiceSection />
      
      <SkillsSection />
      
      <ExperienceSection />
      <ContactSection /> 

      <section id="projects" class="section-wrapper">
        <div class="container">
          <div class="section-header">
            <h2>Featured Projects</h2>
            <p>A collection of my recent work and open-source contributions.</p>
          </div>

          <ProjectSearch v-model="searchQuery" />

          <div class="project-grid">
            <ProjectCard 
          v-for="p in filteredProjects" 
          :key="p.id" 
          :project="p" 
          @click-details="openModal(p)"
        />
          </div>

          <div v-if="filteredProjects.length === 0" class="no-results">
            <i class="fa-solid fa-folder-open"></i>
            <p>No projects found matching "{{ searchQuery }}"</p>
          </div>
          <TestimonialSection />
        </div>
      </section>
      <ProjectModal 
      :project="selectedProject" 
      :is-open="isModalOpen" 
      @close="isModalOpen = false" 
    />
    </div>
  </template>

  <style scoped>
  .hero {
    min-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 10%;
    background: radial-gradient(circle at top right, rgba(66, 184, 131, 0.05), transparent),
                radial-gradient(circle at bottom left, rgba(53, 73, 94, 0.05), transparent);
  }

  .hero-content { max-width: 800px; }

  .greeting {
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: 700;
    color: var(--primary);
    font-size: 0.8rem;
  }

  h1 { font-size: 3.5rem; line-height: 1.2; margin: 20px 0; color: var(--dark); }

  .highlight { color: var(--primary); }

  .hero-btns { display: flex; gap: 1rem; justify-content: center; margin-top: 30px; }

  .btn {
    padding: 12px 30px;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 600;
    transition: 0.3s;
  }

  .btn.primary { background: var(--primary); color: white; }
  .btn.secondary { border: 2px solid var(--dark); color: var(--dark); }

  .section-wrapper { padding: 100px 0; }
  .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
  .section-header { text-align: center; margin-bottom: 3rem; }

  .project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2.5rem;
  }

  .no-results { text-align: center; padding: 50px; color: #999; }
  .no-results i { font-size: 3rem; margin-bottom: 10px; }

  @media (max-width: 768px) {
    h1 { font-size: 2.5rem; }
    .hero-btns { flex-direction: column; }
  }
  </style>