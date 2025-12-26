
import React, { useState, useEffect } from 'react';
import { Download, Mail, MapPin, Phone, Award, ChevronDown } from 'lucide-react';
import { PROJECTS, SKILLS, TIMELINE } from '../constants';

const Portfolio: React.FC = () => {
  const [typingText, setTypingText] = useState('');
  const words = ['Data Analyst', 'Business Analyst', 'Quantitative Trading', 'Problem Solver', 'Fast Learner'];
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        setTypingText(currentWord.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      } else {
        setTypingText(currentWord.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }

      if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }, isDeleting ? 100 : 200);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center relative px-6 md:px-12 pt-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-4xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-medium text-sm">
              Portfolio
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
              Cao Nhat Duy
            </h1>
            <h2 className="text-2xl md:text-3xl font-light text-slate-300 h-10">
              I am a <span className="gradient-text font-semibold typing-cursor">{typingText}</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
              Third-year FinTech student turning data into insights. Proficient in SQL, Python, and visualization tools to drive decision-making.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/25">
                View Projects
              </button>
              <button className="px-8 py-3 glass-card hover:bg-white/5 text-white rounded-lg font-medium transition-all flex items-center gap-2">
                <Download size={20} />
                Download CV
              </button>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-slate-400 pt-8">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-blue-400" /> nhatduycao29@gmail.com
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-green-400" /> 0385617175
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-red-400" /> Ho Chi Minh City
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative glass-card p-2 rounded-2xl">
              <img 
                src="https://picsum.photos/600/600?grayscale" 
                alt="Cao Nhat Duy" 
                className="rounded-xl w-full object-cover aspect-square shadow-2xl"
              />
            </div>
            {/* Floating Badges */}
            <div className="absolute -right-4 top-10 glass-card p-3 rounded-xl flex items-center gap-3 shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="bg-yellow-500/20 p-2 rounded-lg text-yellow-400">
                <Award size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-400">GPA</p>
                <p className="font-bold text-white">3.52/4.00</p>
              </div>
            </div>
             <div className="absolute -left-4 bottom-20 glass-card p-3 rounded-xl flex items-center gap-3 shadow-xl animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
                <Award size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-400">IELTS</p>
                <p className="font-bold text-white">6.0</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-500">
           <ChevronDown size={32} />
        </div>
      </section>

      {/* About & Timeline */}
      <section id="about" className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 scroll-mt-24">
        <div>
          <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
            About Me
          </h3>
          <div className="glass-card p-8 rounded-2xl space-y-6">
             <p className="text-slate-300 leading-relaxed">
              Third-year FinTech student at <strong className="text-blue-400">University of Economics Ho Chi Minh City</strong> with strong analytical capabilities and hands-on experience in data modeling, user behavior analysis, and dashboard development.
            </p>
            <p className="text-slate-300 leading-relaxed">
              I transform complex datasets into actionable insights that drive decision-making. Proficient in SQL, Python, and data visualization tools, I thrive in collaborative environments and excel at solving challenging problems under pressure.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <p className="text-2xl font-bold text-white">107+</p>
                <p className="text-sm text-slate-400">Survey Responses Analyzed</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <p className="text-2xl font-bold text-white">100+</p>
                <p className="text-sm text-slate-400">Student Records Processed</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-1 bg-purple-500 rounded-full"></span>
            Education
          </h3>
          <div className="space-y-8 pl-4 border-l-2 border-slate-700">
            {TIMELINE.map((item, index) => (
              <div key={index} className="relative pl-8">
                <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-blue-500 border-4 border-slate-900 shadow-lg shadow-blue-500/50"></div>
                <div className="glass-card p-6 rounded-xl hover:bg-slate-800/50 transition-colors">
                  <span className="text-sm text-blue-400 font-mono mb-2 block">{item.year}</span>
                  <h4 className="text-xl font-bold text-white">{item.institution}</h4>
                  <p className="text-slate-300 font-medium mt-1">{item.role}</p>
                  <p className="text-slate-400 text-sm mt-2">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="max-w-6xl mx-auto px-6 scroll-mt-24">
        <h3 className="text-3xl font-bold text-white mb-12 text-center">Technical Proficiency</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <SkillCategory title="Technical Skills" skills={SKILLS.technical} color="blue" />
          <SkillCategory title="Data & Analysis" skills={SKILLS.analysis} color="purple" />
          <SkillCategory title="Soft Skills" skills={SKILLS.soft} color="green" />
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-6xl mx-auto px-6 scroll-mt-24">
        <h3 className="text-3xl font-bold text-white mb-12 text-center">Featured Projects</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div key={project.id} className="glass-card rounded-2xl overflow-hidden hover:translate-y-[-5px] transition-transform duration-300 flex flex-col h-full">
              <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                 <h4 className="text-2xl font-bold text-white text-center relative z-10">{project.title}</h4>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="text-xs font-semibold text-blue-400 mb-2 uppercase tracking-wider">{project.category}</div>
                <p className="text-slate-300 text-sm mb-4 flex-1">{project.description}</p>
                
                <div className="space-y-3 mb-6">
                  {project.achievements.slice(0, 2).map((ach, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                      <div className="min-w-1.5 w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5"></div>
                      {ach}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400 border border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

       {/* Certifications */}
       <section className="max-w-6xl mx-auto px-6">
         <h3 className="text-3xl font-bold text-white mb-10 text-center">Certifications & Courses</h3>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CertCard title="IELTS 6.0" issuer="IDP" icon="🌍" />
            <CertCard title="MS Office Specialist" issuer="IIG" icon="💻" />
            <CertCard title="ITBA Course" issuer="Udemy" icon="📊" />
            <CertCard title="Excel Dashboards" issuer="Alison" icon="📈" />
         </div>
       </section>
    </div>
  );
};

const SkillCategory = ({ title, skills, color }: { title: string, skills: {name: string, level: number}[], color: string }) => {
  const getColor = (c: string) => {
    if (c === 'blue') return 'bg-blue-500';
    if (c === 'purple') return 'bg-purple-500';
    return 'bg-green-500';
  }

  return (
    <div className="glass-card p-6 rounded-2xl">
      <h4 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-2">{title}</h4>
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-300">{skill.name}</span>
              <span className="text-slate-500">{skill.level}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getColor(color)} rounded-full transition-all duration-1000`} 
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CertCard = ({title, issuer, icon}: {title: string, issuer: string, icon: string}) => (
  <div className="glass-card p-4 rounded-xl flex flex-col items-center text-center hover:bg-slate-800/80 transition-colors cursor-default">
    <div className="text-3xl mb-3">{icon}</div>
    <div className="font-bold text-white text-sm">{title}</div>
    <div className="text-xs text-slate-400 mt-1">{issuer}</div>
  </div>
);

export default Portfolio;
