import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  { name: 'Python', level: 5 },
  { name: 'JavaScript', level: 5 },
  { name: 'HTML', level: 5 },
  { name: 'CSS', level: 5 },
  { name: 'AngularJS', level: 4 },
  { name: 'Node.js', level: 4 },
  { name: 'MongoDB', level: 4 },
  { name: 'SQL', level: 3 },
  { name: 'Git', level: 4 },
  { name: 'GitHub', level: 4 },
  { name: 'VS Code', level: 5 },
];

const Skills = () => {
  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold mb-16">Skills</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-900 p-4 rounded-lg shadow-lg"
          >
            <p className="text-xl">{skill.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
