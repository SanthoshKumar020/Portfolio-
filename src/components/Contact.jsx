import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const whatsappLink = `https://wa.me/916374310315?text=${encodeURIComponent("Hi Santhosh, I saw your amazing portfolio and would like to connect!")}`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      setStatus('Failed to send message.');
    }
  };

  return (
    <div id="contact" className="min-h-screen bg-secondary text-text flex flex-col items-center justify-center p-4 sm:p-8">
      <h1 className="text-4xl sm:text-5xl font-bold mb-8 sm:mb-16 font-heading text-accent">Contact Me</h1>
      <div className="w-full max-w-lg">
        <form onSubmit={handleSubmit} className="bg-primary p-8 rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block text-text text-sm font-bold mb-2">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-text" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-text text-sm font-bold mb-2">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-text" />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-text text-sm font-bold mb-2">Message</label>
            <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-text"></textarea>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <button type="submit" className="bg-accent hover:bg-link text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto mb-4 sm:mb-0">
              Send Message
            </button>
            {status && <p className="text-sm">{status}</p>}
          </div>
        </form>
      </div>
      <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-600 transition-colors">
          WhatsApp Me
        </a>
        <a href="https://linkedin.com/in/santhoshkumar-k-624a651b6" target="_blank" rel="noopener noreferrer" className="text-link hover:text-accent transition-colors">
          LinkedIn
        </a>
        <a href="https://github.com/SanthoshKumar020" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
          GitHub
        </a>
      </div>
    </div>
  );
};

export default Contact;
