import React from 'react';
import { PhoneCall, X } from 'lucide-react';
import type { Language } from '../types';

interface EmergencyBannerProps {
  lang: Language;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ lang }) => {
  const [visible, setVisible] = React.useState(true);

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900/90 to-cyan-950/80 border-b border-emerald-500/20 text-slate-200 px-4 py-2 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2.5 overflow-hidden">
          <div className="flex items-center justify-center p-1 rounded-md bg-emerald-500/20 text-emerald-400">
            <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
          </div>
          <p className="truncate font-medium">
            <span className="text-emerald-400 font-bold mr-1.5">
              {lang === 'te' ? 'జాతీయ సైబర్ క్రైమ్ హెల్ప్‌లైన్:' : 'Cybercrime Helpline:'}
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 font-mono font-bold px-1.5 py-0.5 rounded mr-2">
              1930
            </span>
            <span className="text-slate-300 hidden md:inline">
              {lang === 'te' 
                ? 'పోలీసులు లేదా సీబీఐ వీడియో కాల్స్ ద్వారా డిజిటల్ అరెస్ట్ చేయరు. ఎవరికీ డబ్బు బదిలీ చేయవద్దు.'
                : 'Real police / CBI never conduct "Digital Arrest" over Skype or demand money. Stay calm.'}
            </span>
          </p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-slate-400 hover:text-slate-200 ml-3 p-0.5 rounded hover:bg-slate-800"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
