import React from 'react';

import { useState } from 'react';

const Layout = ({ children }) => {
  const navLinks = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-primary text-text font-body">
      <header className="fixed top-0 left-0 w-full bg-primary bg-opacity-80 backdrop-blur-md z-10">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#hero" className="text-2xl font-bold font-heading text-accent">Santhoshkumar K</a>
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="hover:text-accent transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden bg-primary bg-opacity-80 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="block px-6 py-2 hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link}
              </a>
            ))}
          </div>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
