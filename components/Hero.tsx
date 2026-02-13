import React, { useState, useEffect } from 'react';
import { ArrowRight, Github, Linkedin, Mail, ExternalLink, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PROFILE, PROJECTS } from '../constants';

export const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [delta, setDelta] = useState(150);
  const navigate = useNavigate();
  
  const toRotate = ["Full-Stack Developer & AI Engineer"];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text, delta]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(150);
    } else {
      setDelta(100);
    }
  };

  const featuredProjects = PROJECTS.filter(p => p.featured).slice(0, 2);

  return (
    <section className="min-h-[calc(100vh-64px)] flex flex-col justify-center pt-12 pb-32 md:py-20">
      <div className="container mx-auto px-4">
        {/* Intro */}
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Hi, I'm <span 
              className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent"
              style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
            >
              Srinath D K
            </span>
          </h1>
          <div className="h-10 md:h-12 mb-6">
            <span className="text-xl md:text-2xl text-slate-300 font-light border-r-2 border-primary-400 pr-2">
              {text}
            </span>
          </div>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {PROFILE.bio}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => navigate('/projects')}
              className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-full font-medium transition-all transform hover:scale-105 shadow-lg shadow-primary-500/25 flex items-center gap-2"
            >
              View My Projects <ArrowRight size={18} />
            </button>
            <a 
              href="#"
              className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-primary-400 border border-slate-700 rounded-full font-medium transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <Download size={18} /> Resume
            </a>
          </div>
          
          <div className="mt-12 flex justify-center gap-6">
            <a 
              href={PROFILE.github} 
              target="_blank" 
              rel="noreferrer" 
              aria-label="GitHub Profile"
              className="p-3 bg-slate-800/50 rounded-full hover:bg-slate-800 hover:text-primary-400 transition-colors border border-slate-700/50"
            >
              <Github size={24} />
            </a>
            <a 
              href={PROFILE.linkedin} 
              target="_blank" 
              rel="noreferrer" 
              aria-label="LinkedIn Profile"
              className="p-3 bg-slate-800/50 rounded-full hover:bg-slate-800 hover:text-primary-400 transition-colors border border-slate-700/50"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href={`mailto:${PROFILE.email}`} 
              aria-label="Send Email"
              className="p-3 bg-slate-800/50 rounded-full hover:bg-slate-800 hover:text-primary-400 transition-colors border border-slate-700/50"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>

        {/* Featured Preview */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Featured Projects</h2>
            <p className="text-slate-400">A glimpse of my recent work</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {featuredProjects.map((project) => (
              <div key={project.id} className="group relative bg-slate-800/40 rounded-3xl overflow-hidden border border-slate-700/50 hover:border-primary-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4 gap-4">
                    <h3 className="text-xl font-bold group-hover:text-primary-400 transition-colors leading-tight">{project.title}</h3>
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-semibold bg-secondary-500/10 text-secondary-400 px-3 py-1 rounded-full border border-secondary-500/20 shrink-0 hover:bg-secondary-500/20 transition-colors">
                        <ExternalLink size={12} />
                        DEMO
                      </a>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.slice(0, 3).map((t, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-slate-700/50 rounded-full text-slate-300">{t}</span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-slate-700/50 rounded-full text-slate-400">+{project.tech.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
             <button 
               onClick={() => navigate('/projects')}
               className="text-primary-400 hover:text-primary-300 font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
             >
               View All Projects <ArrowRight size={16} />
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};