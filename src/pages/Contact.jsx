import { useState } from 'react';
import { motion } from 'framer-motion';
import { submitContact } from '../services/api';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setValidationErrors([]);
    
    try {
      await submitContact(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Error submitting form:', err);
      if (err.response?.status === 400 && err.response?.data?.errors) {
        setValidationErrors(err.response.data.errors);
      } else {
        setError(err.response?.data?.message || 'Failed to send message. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex-grow py-20 px-4 relative z-10">
      <motion.div 
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h1 className="text-5xl md:text-7xl font-black mb-12 text-center tracking-tight">
            <span className="gradient-text">Get in Touch</span>
        </h1>
        
        <div className="glass-panel p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Subtle glow behind form */}
            <div className="absolute top-0 right-0 -m-32 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl rounded-full"></div>
            <div className="absolute bottom-0 left-0 -m-32 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl rounded-full"></div>

            <div className="relative z-10">
                <AnimateNotifications success={success} error={error} validationErrors={validationErrors} />

                <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-2 font-semibold text-gray-300 tracking-wide">Name</label>
                    <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900/50 border border-white/10 px-5 py-4 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-light"
                    placeholder="John Doe"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold text-gray-300 tracking-wide">Email</label>
                    <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900/50 border border-white/10 px-5 py-4 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-light"
                    placeholder="john@example.com"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold text-gray-300 tracking-wide">Message</label>
                    <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full bg-slate-900/50 border border-white/10 px-5 py-4 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-light resize-none"
                    placeholder="Hello Meet..."
                    ></textarea>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full gradient-border-button group rounded-xl disabled:opacity-50"
                    >
                        <div className="gradient-border-inner px-8 py-4 bg-blue-600 group-hover:bg-transparent transition-colors font-bold text-lg tracking-wide rounded-xl">
                            {loading ? 'Sending...' : 'Send Message'}
                        </div>
                    </button>
                </div>
                </form>
            </div>
        </div>

        <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-300 tracking-wide">Connect With Me</h2>
          <div className="flex gap-8 justify-center">
            <a href="https://github.com/meet2104" target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200 hover:from-blue-400 hover:to-blue-200 transition-all hover:scale-110">
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200 hover:from-blue-400 hover:to-blue-200 transition-all hover:scale-110">
              LinkedIn
            </a>
            <a href="mailto:your.email@example.com" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200 hover:from-blue-400 hover:to-blue-200 transition-all hover:scale-110">
              Email
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function AnimateNotifications({ success, error, validationErrors }) {
    if (!success && !error && validationErrors.length === 0) return null;

    return (
        <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
        >
            {success && (
                <div className="bg-green-500/20 border border-green-500/50 text-green-300 p-4 rounded-xl text-center font-semibold">
                ✅ Message sent successfully! I'll get back to you soon.
                </div>
            )}
            
            {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-xl text-center font-semibold">
                ❌ {error}
                </div>
            )}

            {validationErrors.length > 0 && (
                <div className="bg-orange-500/20 border border-orange-500/50 text-orange-300 p-4 rounded-xl">
                <ul className="list-disc list-inside font-semibold">
                    {validationErrors.map((err, index) => (
                    <li key={index}>{err}</li>
                    ))}
                </ul>
                </div>
            )}
        </motion.div>
    );
}