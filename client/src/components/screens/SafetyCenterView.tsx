import React from 'react';
import { 
  BookOpen, 
  ShieldAlert, 
  PhoneCall, 
  CheckCircle2, 
  ExternalLink, 
  Scale, 
  Smartphone,
  CreditCard,
  FileCode
} from 'lucide-react';
import type { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface SafetyCenterViewProps {
  lang: Language;
  onSelectScamType?: (scamKey: string) => void;
}

export const SafetyCenterView: React.FC<SafetyCenterViewProps> = ({
  lang,
}) => {
  const t = translations[lang];
  const s = t.safetyCenter;

  const getIcon = (id: string) => {
    switch (id) {
      case 'digital-arrest':
        return <Scale className="w-6 h-6 text-red-400" />;
      case 'loan-app':
        return <Smartphone className="w-6 h-6 text-amber-400" />;
      case 'phishing-apk':
        return <FileCode className="w-6 h-6 text-cyan-400" />;
      case 'upi-refund':
        return <CreditCard className="w-6 h-6 text-emerald-400" />;
      default:
        return <ShieldAlert className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10 animate-fadeIn">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{lang === 'te' ? 'సైబర్ భద్రతా మార్గదర్శకాలు' : 'Citizen Safety Guidelines'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          {s.title}
        </h1>
        <p className="text-sm text-slate-300 mt-2">
          {s.subtitle}
        </p>
      </div>

      {/* Emergency Helpline Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/80 border border-emerald-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex-shrink-0">
            <PhoneCall className="w-7 h-7 animate-bounce" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              {s.helplineCard.title}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              {lang === 'te' 
                ? 'డబ్బు బదిలీ జరిగినప్పుడు వెంటనే 1930 కాల్ చేయండి (గోల్డెన్ అవర్ రక్షణ).'
                : 'Report within the "Golden Hour" of financial loss to maximize account freeze probability.'}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          <a
            href="tel:1930"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm text-center shadow-shield-emerald transition-all"
          >
            {lang === 'te' ? '1930 కాల్ చేయండి' : 'Dial 1930 Helpline'}
          </a>
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center space-x-1 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
          >
            <span>cybercrime.gov.in</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Educational Threat Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {s.modules.map((mod) => (
          <div
            key={mod.id}
            className="p-6 rounded-2xl glass-panel border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-5"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  {getIcon(mod.id)}
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 uppercase">
                  {mod.tag}
                </span>
              </div>

              <h2 className="text-lg font-bold text-white mb-2">
                {mod.title}
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {mod.desc}
              </p>

              {/* The Constitutional / Legal Truth */}
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 mb-4">
                <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase block mb-1">
                  {lang === 'te' ? 'చట్టబద్ధమైన వాస్తవం:' : 'Constitutional & Legal Reality:'}
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {mod.truth}
                </p>
              </div>

              {/* Recommended Action Checklist */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  {lang === 'te' ? 'రక్షణ చర్యలు:' : 'Immediate Safe Defenses:'}
                </span>
                {mod.actions.map((act, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
