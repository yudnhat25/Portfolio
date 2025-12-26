
import React, { useState } from 'react';
import { Menu, X, Mail } from 'lucide-react';
import Portfolio from './components/Portfolio';

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleScroll = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans selection:bg-blue-500/30">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-card border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
              ND
            </div>
            <span>Cao Nhat Duy</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => handleScroll(link.href)}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Contact (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <a href="mailto:nhatduycao29@gmail.com" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 text-sm">
              <Mail size={18} />
              <span>Contact Me</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-slate-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-slate-900 border-b border-slate-800 p-4 space-y-4 shadow-2xl animate-in slide-in-from-top-5">
             {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => handleScroll(link.href)}
                className="w-full text-left px-4 py-2 text-slate-400 hover:text-white"
              >
                {link.label}
              </button>
            ))}
            <div className="flex gap-6 px-4 pt-4 border-t border-slate-800">
               <a href="mailto:nhatduycao29@gmail.com" className="text-slate-400 hover:text-red-400 flex items-center gap-2"><Mail size={20} /> <span>Email Me</span></a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="animate-in fade-in duration-500">
        <Portfolio />
      </main>

      {/* Footer */}
      <footer id="contact" className="border-t border-slate-800 mt-20 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Let's Connect</h3>
              <p className="text-slate-400 mb-8 max-w-md">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-300">
                  <Mail size={20} className="text-blue-400" />
                  <span>nhatduycao29@gmail.com</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center md:items-end justify-center h-full">
              <div className="text-slate-500 text-sm mb-4 text-center md:text-right">
                © 2024 Cao Nhat Duy. Built with React & Tailwind CSS.
              </div>
              <div className="text-slate-600 text-xs italic">
                Data Analyst | Business Analyst | Quantitative Trading
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
