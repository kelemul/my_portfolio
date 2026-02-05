// src/data/portfolioData.js

export const skills = [
  { name: 'Vue.js', level: '90%', icon: 'fa-brands fa-vuejs' },
  { name: 'JavaScript', level: '85%', icon: 'fa-brands fa-js' },
  { name: 'Node.js', level: '80%', icon: 'fa-brands fa-node-js' },
  { name: 'Tailwind CSS', level: '95%', icon: 'fa-brands fa-css3-alt' },
  { name: 'Git & GitHub', level: '90%', icon: 'fa-brands fa-github' },
  { name: 'Laravel', level: '85%', icon: 'fa-brands fa-laravel' },
  { name: 'Django', level: '80%', icon: 'fa-brands fa-python' },
  { name: 'Frappe/ERPNext', level: '88%', icon: 'fa-solid fa-database' },
  { name: 'Data Science', level: '75%', icon: 'fa-solid fa-chart-line' },
  { name: 'Python (PyInstaller, XML Parsing)', level: '92%', icon: 'fa-brands fa-python' },
  { name: 'Bootstrap & Custom UI Design', level: '90%', icon: 'fa-brands fa-bootstrap' },
  { name: 'System Architecture & Schema Design', level: '95%', icon: 'fa-solid fa-sitemap' }
];

export const services = [
  { 
    title: 'Modular ERP Development', 
    desc: 'Architecting upgrade-safe agricultural and HR workflow systems with schema-driven clarity.',
    icon: 'fa-solid fa-cubes'
  },
  { 
    title: 'Custom UI/UX Designers', 
    desc: 'Building drag-and-drop UI designers bridging XML and JSON for ERP systems like Odoo.',
    icon: 'fa-solid fa-object-group'
  },
  { 
    title: 'Cross-Platform App Packaging', 
    desc: 'Packaging Python apps with PyInstaller and scripting installers with Inno Setup, including publisher metadata and firewall exceptions.',
    icon: 'fa-solid fa-box'
  },
  { 
    title: 'Operational Dashboards', 
    desc: 'Designing actionable, visually clear dashboards for machinery, field management, and harvesting schemes.',
    icon: 'fa-solid fa-chart-pie'
  },
  { 
    title: 'System Troubleshooting', 
    desc: 'Resolving Linux library dependencies, frontend rendering issues, and backend integration challenges.',
    icon: 'fa-solid fa-screwdriver-wrench'
  }
];

export const experiences = [
  {
    id: 1,
    title: 'App Developer & Systems Architect',
    company: 'Guba Technologies',
    year: '2020 - Present',
    desc: 'Specializing in modular, upgrade-safe agricultural and HR workflow systems. Driving schema design, report scaffolding, and operational clarity across all modules.'
  },
  {
    id: 2,
    title: 'ERP & Workflow Systems Engineer',
    company: 'Independent Projects',
    year: '2017 - 2020',
    desc: 'Architected custom ERP modules, drag-and-drop UI designers, and schema-aligned reporting pipelines for institutional learning.'
  },
  {
    id: 3,
    title: 'Software Developer',
    company: 'Freelance',
    year: '2015 - 2017',
    desc: 'Delivered cross-platform apps, professional installers, and customized dashboards for small businesses and startups.'
  }
];

export const projects = [
  {
    id: 1,
    title: "Grade Automation Pro",
    description: "Packaged with PyInstaller, scripted installer with publisher info and firewall exception, adapted workflow for Linux compilation.",
    tech: ["Python", "PyInstaller", "Inno Setup"],
    link: "https://github.com/kelemu/grade-automation-pro",
    image: "grade.jpg", 
    tags: ["Python", "Installer", "Cross-Platform"]
  },
  {
    id: 2,
    title: "POSAwesome Standalone Build",
    description: "Troubleshot Vite config and asset redirects to enable standalone frontend builds for POSAwesome.",
    tech: ["Vue", "Vite", "Tailwind"],
    link: "https://github.com/kelemu/posawesome",
    image: "pos.jpg",
    tags: ["Vue", "Vite", "Tailwind"]
  },
  {
    id: 3,
    title: "Odoo Drag-and-Drop Designer",
    description: "Architected drag-and-drop UI designer bridging XML and JSON for Odoo ERP components.",
    tech: ["JS", "Bootstrap", "Python", "XML"],
    link: "https://github.com/kelemul/odoo-designer",
    image: "odoo.jpg",
    tags: ["ERP", "UI Designer", "XML", "Python"]
  },
  {
    id: 4,
    title: "Agricultural Dashboard",
    description: "Operational dashboard for machinery utilization, harvesting schemes, and logistics planning.",
    tech: ["Django", "Chart.js", "PostgreSQL"],
    link: "https://github.com/kelemul/agri-dashboard",
    image: "agri.jpg",
    tags: ["Django", "Data Visualization", "Agriculture"]
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Samuel Bekele',
    feedback: 'Keller’s schema-driven approach transformed our agricultural reporting. Every report is now actionable and audit-friendly.',
    designation: 'Operations Manager at Guba Technologies',
    image: 'samuel.jpg'
  },
  {
    id: 2,
    name: 'Marta Alemu',
    feedback: 'His drag-and-drop ERP designer was a game-changer. It bridged XML and JSON seamlessly, saving us months of manual work.',
    designation: 'ERP Consultant',
    image: 'marta.jpg'
  },
  {
    id: 3,
    name: 'John Smith',
    feedback: 'Keller solved our complex state management and packaging issues with precision and professionalism.',
    designation: 'CTO at Web Creators Co.',
    image: 'john.jpg'
  }
];

export const contactInfo = {
  email: 'keller@gubatech.com',
  phone: '+251 911 234 567',
  address: 'Addis Ababa, Ethiopia'
};
