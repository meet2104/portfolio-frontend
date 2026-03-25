import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] },
    },
  };

  return (
    <div className="home-container w-full">
      <div className="relative z-10 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 pt-20 pb-32">
        <motion.div
          className="max-w-4xl w-full text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <motion.h1
              className="text-6xl md:text-8xl font-black mb-4 tracking-tight drop-shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              Hi, I'm <br className="md:hidden" />
              <span className="gradient-text glow-pulse inline-block">Meet Goswami</span>
            </motion.h1>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-10">
            <p className="text-2xl md:text-4xl mb-4 text-gray-300 font-light tracking-wide">
              MERN Stack Developer <span className="text-blue-500">&</span> Agentic AI Engineer
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12 max-w-3xl mx-auto">
            <div className="glass-panel p-8 md:p-10 rounded-3xl">
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
                I craft intelligent, scalable web applications using the MERN stack and build powerful AI agents with N8N.
                Specializing in turning ideas into reality through premium UX/UI and modern technology.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-6 justify-center flex-wrap">
            <Link
              to="/projects"
              className="gradient-border-button group rounded-2xl p-[2px] transition-transform hover:scale-105"
            >
              <div className="gradient-border-inner px-10 py-5 rounded-2xl hover:bg-transparent transition-colors duration-300 relative overflow-hidden">
                <span className="relative z-10 text-xl font-bold text-white group-hover:text-white transition-colors tracking-wide">View My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></div>
              </div>
            </Link>
            <Link
              to="/contact"
              className="glass-panel group px-10 py-5 rounded-2xl text-xl font-bold text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
            >
              Get in Touch
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-24 pt-10 border-t border-white/10 max-w-4xl mx-auto">
            <p className="text-gray-400 mb-8 text-center font-medium tracking-widest uppercase text-sm">Tech Stack & Tools</p>
            <div className="flex justify-center gap-4 flex-wrap">
              {['React', 'Node.js', 'MongoDB', 'N8N', 'AI Agents', 'Three.js', 'TypeScript', 'TailwindCSS'].map((tech) => (
                <motion.span
                  key={tech}
                  className="glass-panel-hover px-6 py-3 text-gray-200 rounded-xl text-sm font-semibold tracking-wide cursor-default"
                  whileHover={{ scale: 1.1, y: -4 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Interactive Explore Button */}
        <motion.div
          className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Link to="/about" className="group flex flex-col items-center gap-4 cursor-pointer">
            <span className="text-gray-400 group-hover:text-white transition-colors duration-300 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">Explore</span>
            <motion.div
              className="w-12 h-12 md:w-16 md:h-16 rounded-full glass-panel flex items-center justify-center border border-white/10 group-hover:border-blue-500/80 group-hover:bg-blue-500/10 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all duration-500"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-500 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}