import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { ScrollToTop } from './components/ScrollToTop';
import { StarBackground } from './components/StarBackground';

const HomePage: React.FC = () => {
  return (
    <>
      <section id="home" className="bg-gradient-to-b from-slate-950/40 via-slate-900/40 to-slate-900/40 pt-16 relative z-10">
        <Hero />
      </section>
      <section id="about" className="bg-gradient-to-b from-slate-900/40 via-blue-950/30 to-slate-900/40 relative z-10">
        <About />
      </section>
      <section id="contact" className="bg-gradient-to-b from-slate-900/40 via-slate-900/40 to-transparent relative z-10">
        <Contact />
      </section>
    </>
  );
};

const ProjectsPage: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-transparent pt-24 min-h-screen relative z-10">
      <Projects />
    </section>
  );
};

const AboutPage: React.FC = () => {
  return (
    <section id="about" className="bg-gradient-to-b from-slate-900/40 via-blue-950/30 to-slate-900/40 pt-24 min-h-screen relative z-10">
      <About />
    </section>
  );
};

const ContactPage: React.FC = () => {
  return (
    <section id="contact" className="bg-gradient-to-b from-slate-900/40 via-slate-900/40 to-transparent pt-24 min-h-screen relative z-10">
      <Contact />
    </section>
  );
};

const AppContent: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-0 relative bg-slate-950">
      <StarBackground />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
};

export default App;