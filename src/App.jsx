import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import AnimatedBackground from './components/3D/AnimatedBackground';
import './App.css';

// 404 Page Component
function NotFound() {
  return (
    <div className="min-h-screen text-white flex items-center justify-center relative z-10">
      <div className="text-center glass-panel p-12 rounded-2xl">
        <h1 className="text-6xl font-bold mb-4 gradient-text">404</h1>
        <p className="text-2xl mb-8">Page Not Found</p>
        <a href="/" className="gradient-border-button inline-block rounded-xl">
          <div className="gradient-border-inner px-6 py-2">
            <span className="text-gray-200">Go Home</span>
          </div>
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container relative min-h-screen z-0 w-full">
        <AnimatedBackground />
        <div className="relative z-10 flex flex-col min-h-screen w-full">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;