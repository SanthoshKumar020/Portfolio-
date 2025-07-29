import React from 'react';

const projects = [
  {
    title: 'RishikulOnline - Learning Platform',
    technologies: 'MongoDB Cloud',
    description: 'Built a full-stack online yoga learning platform with user authentication, secure routing, and dashboard. Used dynamic API routing to manage user content and fetch schedules based on role-based access. Enabled seamless student experience with video content, program listings, and progress tracking.',
    link: 'https://rishikulonline.com',
  },
  {
    title: 'Rishikul Yogshala Goa - Yoga Retreat Website',
    description: 'Developed a fast-loading, elegant website to showcase Goa yoga programs, schedules, and retreats. Integrated testimonials, forms, and multilingual content support using dynamic components. Applied static generation and route prefetching for optimal user experience and SEO.',
    link: 'https://www.rishikulyogshalagoa.com/',
  },
  {
    title: 'Rishikul Yogshala Kerala - Yoga Retreat Website',
    description: 'Created and deployed a custom website for the Kerala branch of Rishikul Yogshala. Focused on responsive design, route protection, and location-specific landing pages. Maintained design consistency while introducing local content variations.',
    link: null,
  },
  {
    title: 'Wireless Domatica System - Home Automation',
    technologies: 'AngularJS, Node.js, SQL',
    description: 'Developed a smart home automation backend allowing device toggling, state monitoring, and real-time alerts. Designed UI for command execution, and backend logic for device grouping and scheduling. Implemented SQL schema for tracking sensor data, power usage, and user preferences.',
    link: 'https://userlist-hazel.vercel.app/',
  },
];

const Projects = () => {
  return (
    <div id="projects" className="min-h-screen bg-secondary text-text flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold mb-16 font-heading text-accent">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {projects.map((project, index) => (
          <div key={index} className="bg-primary p-8 rounded-lg shadow-lg flex flex-col">
            <h2 className="text-3xl font-bold mb-2 font-heading">{project.title}</h2>
            {project.technologies && <p className="text-xl text-gray-400 mb-4">{project.technologies}</p>}
            <p className="text-lg mb-4">{project.description}</p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link hover:text-accent transition-colors"
              >
                View Project
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
