import React, { useState, useEffect } from 'react';
import { Download, Home, User, Folder, Mail } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  // Logic: Expand the island if we are scrolled down OR if we are on the 'projects' page
  const isExpanded = isScrolled || location.pathname === '/projects';

  useEffect(() => {
    const handleScroll = () => {
      // 1. Detect Scroll for Expansion
      setIsScrolled(window.scrollY > 250);

      // 2. Active Section Logic
      if (location.pathname === '/') {
        const sections = ['home', 'about', 'contact'];
        
        // Check if bottom of page (for Contact)
        if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight - 50) {
             setActiveSection('contact');
             return;
        }

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            // Check if section is in viewport
            if (elementTop <= 250 && elementBottom >= 250) {
               setActiveSection(section);
               break;
            }
          }
        }
      } else if (location.pathname === '/projects') {
        setActiveSection('projects');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Handle navigation from other pages with scroll state
  useEffect(() => {
    if (location.pathname === '/' && location.state && (location.state as any).scrollTo) {
      const scrollToId = (location.state as any).scrollTo;
      setTimeout(() => {
        const element = document.getElementById(scrollToId);
        if (element) {
          const offset = 100; // Adjusted for the floating island
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          setActiveSection(scrollToId);
        } else if (scrollToId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setActiveSection('home');
        }
        // Clear state to prevent unwanted scrolling on refresh
        window.history.replaceState({}, document.title);
      }, 100);
    }
  }, [location]);

  const handleNavigation = (id: string) => {
    if (id === 'projects') {
      navigate('/projects');
      window.scrollTo(0, 0);
      return;
    }
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = 100; // Adjusted for the floating island
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        setActiveSection(id);
      } else if (id === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setActiveSection('home');
      }
    }
  };

  const navItems = [
    { name: 'Home', id: 'home', icon: <Home size={18} /> },
    { name: 'About', id: 'about', icon: <User size={18} /> },
    { name: 'Projects', id: 'projects', icon: <Folder size={18} /> },
    { name: 'Contact', id: 'contact', icon: <Mail size={18} /> },
  ];

  return (
    <>
      {/* =======================
          DESKTOP DYNAMIC ISLAND
      ======================== */}
      <div className="hidden md:flex fixed top-6 left-0 right-0 justify-center z-50 pointer-events-none">
        <div 
          className={`pointer-events-auto flex items-center bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-black/20 transition-all duration-500 ease-in-out ${
            isExpanded ? 'px-2 py-1.5 gap-4' : 'px-1.5 py-1.5 gap-2'
          }`}
        >
          {/* 1. BRAND NAME (Collapsible) */}
          <div 
            className={`overflow-hidden transition-all duration-500 ease-in-out flex items-center ${
              isExpanded ? 'w-[100px] opacity-100 ml-3' : 'w-0 opacity-0'
            }`}
          >
            <span 
              onClick={() => handleNavigation('home')}
              className="text-base font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent whitespace-nowrap cursor-pointer hover:opacity-80 transition-opacity"
              style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
            >
              Srinath D K
            </span>
          </div>

          {/* 2. NAVIGATION LINKS (Always Visible) */}
          <div className="flex items-center rounded-full">
             {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 relative ${
                    activeSection === item.id
                      ? 'text-white bg-primary-500 shadow-lg shadow-primary-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </button>
              ))}
          </div>

          {/* 3. RESUME BUTTON (Collapsible) */}
          <div 
             className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isExpanded ? 'w-[100px] opacity-100 mr-1' : 'w-0 opacity-0'
            }`}
          >
            <a
              href="#" // Add your actual resume link here
              className="flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-slate-200 px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap"
            >
              <span>Resume</span>
              <Download size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* =======================
          MOBILE VIEW
      ======================== */}
      
      {/* Mobile Top Island (Only Name & Resume - Appears on Scroll OR on Projects page) */}
      <div 
        className={`md:hidden fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-[350px] transition-all duration-500 pointer-events-none ${
          isExpanded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
        }`}
      >
          <div className="pointer-events-auto flex items-center justify-between pl-5 pr-2 py-1.5 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-black/50">
            <span 
              onClick={() => handleNavigation('home')}
              className="text-sm font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent whitespace-nowrap cursor-pointer"
            >
              Srinath D K
            </span>
             <a href="#" className="flex items-center gap-2 bg-white hover:bg-slate-200 text-slate-900 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-lg shadow-white/10">
                <Download size={12} />
                <span>Resume</span>
             </a>
          </div>
      </div>

      {/* Mobile Bottom Navigation (Always there for links) */}
      <div className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-[350px] pointer-events-none">
        <div className="pointer-events-auto flex items-center justify-between bg-slate-900/90 backdrop-blur-xl rounded-full px-4 py-2 border border-white/10 shadow-2xl shadow-black/50">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.id)}
              className={`flex flex-col items-center justify-center transition-all duration-300 group px-2 py-1 rounded-2xl ${activeSection === item.id ? 'bg-white/5' : ''}`}
              style={{ minWidth: '60px' }}
            >
              <div className={`mb-0.5 transition-colors duration-300 ${activeSection === item.id ? 'text-primary-400' : 'text-slate-400 group-hover:text-slate-200'}`}>
                {item.icon}
              </div>
              <span className={`text-[10px] font-medium transition-all duration-300 ${activeSection === item.id ? 'text-primary-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
