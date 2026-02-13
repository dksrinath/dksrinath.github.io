import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { PROFILE } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent py-8">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
              <div className="flex space-x-6 mb-4">
          <a 
            href={PROFILE.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="GitHub Profile"
            className="text-slate-400 hover:text-primary-400 transition-colors"
          >
            <Github size={24} />
          </a>
          <a 
            href={PROFILE.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="LinkedIn Profile"
            className="text-slate-400 hover:text-primary-400 transition-colors"
          >
            <Linkedin size={24} />
          </a>
          <a 
            href={`mailto:${PROFILE.email}`} 
            aria-label="Send Email"
            className="text-slate-400 hover:text-primary-400 transition-colors"
          >
            <Mail size={24} />
          </a>
        </div>
        <p className="text-slate-500 text-sm">
          Srinath D K
        </p>
      </div>
    </footer>
  );
};