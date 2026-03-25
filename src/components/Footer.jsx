import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="glass-panel border-t border-white/5 py-8 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-gray-400 font-medium tracking-wide">
          &copy; {new Date().getFullYear()} <span className="text-gray-200">Meet Goswami</span>. All rights reserved.
        </p>
        <div className="flex gap-6 justify-center mt-6">
          <motion.a 
            href="https://github.com/meet2104" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-white transition-colors"
            whileHover={{ y: -3, color: '#3B82F6' }}
          >
            GitHub
          </motion.a>
          <motion.a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-white transition-colors"
            whileHover={{ y: -3, color: '#8B5CF6' }}
          >
            LinkedIn
          </motion.a>
          <motion.a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-white transition-colors"
            whileHover={{ y: -3, color: '#EC4899' }}
          >
            Twitter
          </motion.a>
        </div>
      </div>
    </footer>
  );
}