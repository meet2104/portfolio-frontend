import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function InteractiveCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  // Smooth springs for the core cursor
  const springX = useSpring(-100, { stiffness: 500, damping: 28, mass: 0.5 });
  const springY = useSpring(-100, { stiffness: 500, damping: 28, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Offset by half the width/height to center the div on the cursor
      springX.set(e.clientX - 12);
      springY.set(e.clientY - 12);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      // Detect if we're hovering over a clickable or interactive element
      if (
        e.target.tagName.toLowerCase() === 'a' || 
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') !== null ||
        e.target.closest('button') !== null ||
        e.target.classList.contains('glass-panel-hover')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [springX, springY]);

  // If mobile/touch device, don't show custom cursor
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Core Glowing Orb */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[100] mix-blend-screen flex items-center justify-center border border-white/30"
        style={{
          x: springX,
          y: springY,
          backgroundColor: isHovering ? 'rgba(236, 72, 153, 0.5)' : 'rgba(59, 130, 246, 0.4)',
          boxShadow: isHovering 
            ? '0 0 25px 8px rgba(236, 72, 153, 0.6)' 
            : '0 0 20px 4px rgba(59, 130, 246, 0.4)',
          scale: isHovering ? 1.8 : 1,
        }}
        transition={{ scale: { duration: 0.2, ease: "easeOut" } }}
      />
      
      {/* Large soft fluid trail */}
      <motion.div
        className="fixed top-0 left-0 w-48 h-48 rounded-full pointer-events-none z-[90] mix-blend-screen opacity-20 filter blur-3xl"
        style={{
          backgroundColor: isHovering ? '#EC4899' : '#3B82F6'
        }}
        animate={{
          x: mousePosition.x - 96,
          y: mousePosition.y - 96,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.1 }}
      />
    </>
  );
}
