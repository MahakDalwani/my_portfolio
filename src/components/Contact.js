import React, { useState, useRef } from 'react';
import '../styles/Contact.css';

const Contact = ({ portfolioData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
    alert('Message sent successfully!');
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <h2>Get In Touch</h2>
        <div className="contact-wrapper">
          <div className="contact-info">
            <h3>Contact Information</h3>
            {portfolioData?.email && (
              <p>
                <strong>Email:</strong> <a href={`mailto:${portfolioData.email}`}>{portfolioData.email}</a>
              </p>
            )}
            {portfolioData?.phone && (
              <p>
                <strong>Phone:</strong> <a href={`tel:${portfolioData.phone}`}>{portfolioData.phone}</a>
              </p>
            )}
            {portfolioData?.location && (
              <p>
                <strong>Location:</strong> {portfolioData.location}
              </p>
            )}
          </div>
          <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
