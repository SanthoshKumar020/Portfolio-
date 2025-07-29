import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: 'Yogic Connection',
    period: 'Apr 2025-Present',
    title: 'Web Developer',
    description: [
      'Led development of dynamic yoga retreat websites using MongoDB Cloud.',
      'Implemented SEO, SSR, and responsive design best practices to improve page performance and visibility.',
      'Built reusable components for multi-location yoga branches (Goa, Kerala) and integrated content management.',
    ],
  },
  {
    company: 'RIOTA Private Limited',
    period: 'Jan 2024-Apr 2024',
    title: 'Web Developer Intern',
    description: [
      'Designed and built a smart home backend system using AngularJS, Node.js, and SQL.',
      'Developed REST APIs and dashboards to control devices and monitor real-time sensor data.',
      'Enhanced reliability through structured schema design, modular backend logic, and cache optimization.',
    ],
  },
];

const Experience = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const elements = containerRef.current.querySelectorAll('.experience-card');
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold mb-16">Experience</h1>
      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-card bg-gray-900 p-8 rounded-lg shadow-lg max-w-3xl">
            <h2 className="text-3xl font-bold">{exp.title}</h2>
            <p className="text-xl text-gray-400 mb-2">{exp.company} | {exp.period}</p>
            <ul className="list-disc list-inside">
              {exp.description.map((item, i) => (
                <li key={i} className="text-lg">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
