import React from 'react';
import { Shield, Scale, ExternalLink } from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../i18n/translations';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#060A13] text-slate-400 py-10 mt-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand & Mission */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm tracking-tight text-white">
                SURAKSHANET AI
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              {t.app.tagline}
            </p>
            <p className="text-[11px] text-slate-500 font-mono">
              Designed for Hackathon • One-Day High Impact Cyber Defense
            </p>
          </div>

          {/* Responsible AI Pledge */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
              <Scale className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'te' ? 'బాధ్యతాయుతమైన AI నిబద్ధత' : 'Responsible AI Ethics'}</span>
            </h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              {t.app.responsiblePledge}
            </p>
            <p className="text-slate-400 text-[11px]">
              {lang === 'te'
                ? 'వ్యక్తుల నేరాన్ని AI ఎప్పుడూ ప్రకటించదు. అధికారిక దర్యాప్తుకు సహాయపడటమే దీని ముఖ్య ఉద్దేశం.'
                : 'AI analysis supports victim clarity and evidence hashing without replacing judicial or law enforcement authority.'}
            </p>
          </div>

          {/* Official Emergency Helplines */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
              {lang === 'te' ? 'అధికారిక హెల్ప్‌లైన్లు' : 'Official Emergency Portals'}
            </h4>
            <ul className="space-y-2 font-mono text-[11px]">
              <li>
                <a 
                  href="tel:1930" 
                  className="flex items-center space-x-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span>National Cyber Helpline: 1930 (24/7)</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://cybercrime.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-1.5 text-slate-300 hover:text-white transition-colors"
                >
                  <span>National Cyber Crime Portal: cybercrime.gov.in</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://sachet.rbi.org.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-1.5 text-slate-300 hover:text-white transition-colors"
                >
                  <span>RBI Sachet Portal (Unregistered Lenders)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-2">
          <p>© {new Date().getFullYear()} SurakshaNet AI. Empowering ordinary citizens against digital extortion.</p>
          <div className="flex items-center space-x-4">
            <span>Client-Side SHA-256 Hashing</span>
            <span>•</span>
            <span>Zero Unnecessary Data Retention</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
