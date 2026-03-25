import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getSkills } from '../services/api';

export default function About() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const { data } = await getSkills();
      setSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
      // Fallback to hardcoded skills if API fails
      setSkills([
        { category: 'Frontend', skills: ['React', 'JavaScript', 'Tailwind CSS', 'Framer Motion'], proficiency: 'Advanced' },
        { category: 'Backend', skills: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose'], proficiency: 'Advanced' },
        { category: 'AI/Automation', skills: ['N8N', 'OpenAI', 'LangChain', 'AI Agents'], proficiency: 'Intermediate' },
        { category: 'DevOps', skills: ['Docker', 'Git', 'GitHub', 'Vercel'], proficiency: 'Intermediate' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <div className="w-full flex-grow py-20 px-4 relative z-10">
      <motion.div 
        className="max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-black mb-12 text-center"
          variants={itemVariants}
        >
          <span className="gradient-text">About Me</span>
        </motion.h1>
        
        <motion.div variants={itemVariants} className="glass-panel p-8 md:p-12 rounded-3xl mb-16">
          <p className="text-xl leading-relaxed mb-6 font-light text-gray-200">
            I'm a full-stack developer passionate about building premium web applications with the MERN stack and creating intelligent automation solutions using advanced Next-gen AI technologies.
          </p>
          <p className="text-xl leading-relaxed font-light text-gray-200">
            With robust expertise in React, Node.js, and MongoDB, I craft engaging, scalable platforms. My knowledge of Agentic AI and N8N workflows allows me to construct intelligent automation pipelines that solve complex enterprise problems effectively.
          </p>
        </motion.div>

        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-10 text-center tracking-wide"
          variants={itemVariants}
        >
          Skills <span className="text-blue-500">&</span> Expertise
        </motion.h2>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" variants={containerVariants}>
            {skills.map((skill, index) => (
              <motion.div 
                key={index} 
                className="glass-panel-hover p-8 rounded-3xl"
                variants={itemVariants}
              >
                <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                  <h3 className="text-2xl font-bold tracking-tight text-white">{skill.category}</h3>
                  {skill.proficiency && (
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1.5 rounded-full font-semibold uppercase tracking-widest">
                      {skill.proficiency}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-3">
                  {skill.skills.map((item, idx) => (
                    <span 
                      key={idx} 
                      className="bg-white/5 border border-white/10 text-gray-200 px-4 py-2 rounded-xl text-sm font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}