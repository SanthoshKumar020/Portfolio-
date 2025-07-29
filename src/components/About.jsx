import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold mb-8"
      >
        About Me
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="max-w-3xl text-center"
      >
        <p className="text-lg mb-4">
          Self-driven Web Developer with expertise in building scalable and responsive full-stack applications using AngularJS, Node.js, and cloud databases.
        </p>
        <p className="text-lg mb-4">
          Experienced in delivering fast-loading, SEO-optimized web platforms and developing smart systems like home automation. Passionate about clean UI/UX, real-time data solutions, and modular component architecture. Highly interested in learning new technologies and building automations that improve efficiency and productivity.
        </p>
        <p className="text-lg">
          Bachelor of Engineering - Electronics and Communication Engineering from Adhiyamaan College of Engineering, Hosur.
        </p>
      </motion.div>
    </div>
  );
};

export default About;
