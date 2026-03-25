import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjects } from '../services/api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await getProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching projects:', err);
      // Fallback
      setProjects([
         { _id: '1', title: 'AI Assistant Workflow', description: 'Advanced n8n + LangChain agent that automates email replies and data extraction.', techStack: ['N8N', 'OpenAI', 'Node.js'], liveUrl: '#', repoUrl: '#' },
         { _id: '2', title: 'E-Commerce Platform', description: 'Full-stack MERN application with a real-time admin dashboard.', techStack: ['React', 'MongoDB', 'Express', 'Tailwind'], liveUrl: '#', repoUrl: '#' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="w-full flex-grow py-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="gradient-text">My Projects</span>
          </h1>
          <p className="text-gray-300 text-xl font-light tracking-wide">Showcasing MERN stack & AI automation</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error && projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="glass-panel p-8 rounded-3xl inline-block">
              <p className="text-red-400 text-lg mb-4">❌ {error}</p>
              <button 
                onClick={fetchProjects}
                className="gradient-border-button rounded-xl"
              >
                <div className="gradient-border-inner px-6 py-2">Try Again</div>
              </button>
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No projects yet. Check back soon!</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {projects.map((project) => (
                <motion.div
                  key={project._id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="h-full"
                >
                  <div className="glass-panel-hover rounded-3xl overflow-hidden h-full flex flex-col relative group">
                    {/* Animated Edge Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    {/* Image Area */}
                    {project.image ? (
                        <div className="w-full h-48 overflow-hidden">
                            <motion.img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                    ) : (
                        <div className="w-full h-40 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border-b border-white/5">
                            <span className="text-slate-500 font-bold tracking-widest uppercase">Project</span>
                        </div>
                    )}

                    {/* Content */}
                    <div className="p-8 flex flex-col grow relative z-10">
                      <h3 className="text-2xl font-bold mb-3 text-white tracking-tight">{project.title}</h3>
                      <p className="text-gray-400 mb-6 grow font-light leading-relaxed">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-4 pt-6 border-t border-white/10 mt-auto">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-2 transition-colors"
                          >
                            Live Demo <span className="text-xl">↗</span>
                          </a>
                        )}
                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 font-bold flex items-center gap-2 transition-colors ml-auto"
                          >
                            GitHub <span className="text-xl">↗</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}