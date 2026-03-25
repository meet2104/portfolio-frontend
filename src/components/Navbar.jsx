import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `relative px-4 py-2 font-medium transition-colors ${
      isActive ? 'text-white' : 'text-gray-400 hover:text-white'
    }`;
  };

  return (
    <motion.nav 
      className="sticky top-0 z-50 w-full glass-panel border-b border-white/5 shadow-2xl"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-20 w-full">
          <Link to="/" className="text-2xl font-black tracking-tighter">
            <span className="gradient-text">Meet Goswami</span>
          </Link>
          
          <ul className="hidden md:flex gap-2">
            {[
              { path: '/', label: 'Home' },
              { path: '/about', label: 'About' },
              { path: '/projects', label: 'Projects' },
              { path: '/contact', label: 'Contact' }
            ].map((link) => (
              <li key={link.path}>
                <Link to={link.path} className={getLinkClass(link.path)}>
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}