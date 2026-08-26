import React from 'react';
import { CheckCircle2, X, ArrowRight, PhoneCall, AlertOctagon } from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../i18n/translations';

interface PanicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToAnalyze: () => void;
  lang: Language;
}

export const PanicModal: React.FC<PanicModalProps> = ({
  isOpen,
  onClose,
  onProceedToAnalyze,
  lang,
}) => {
  if (!isOpen) return null;

  const t = translations[lang];
  const p = t.panicModal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-2xl bg-gradient-to-b from-slate-900 to-[#0B1120] border-2 border-red-500/60 shadow-2xl p-6 sm:p-8 text-slate-100 overflow-hidden">
        
        {/* Ambient warning background glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start space-x-4 mb-6">
          <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 flex-shrink-0">
            <AlertOctagon className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {p.title}
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              {p.subtitle}
            </p>
          </div>
        </div>

        {/* 4 Golden Rules Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
          {p.rules.map((rule, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{lang === 'te' ? `నియమం ${idx + 1}` : `Rule ${idx + 1}`}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1">
                  {rule.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {rule.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Official 1930 Helpline Banner */}
        <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <PhoneCall className="w-5 h-5 text-emerald-400 animate-bounce" />
            <div>
              <p className="text-xs text-emerald-300 font-semibold">
                {lang === 'te' ? 'జాతీయ సైబర్ క్రైమ్ అత్యవసర కాల్ సెంటర్' : 'National Cyber Crime Emergency Helpline'}
              </p>
              <p className="text-lg font-black font-mono text-white tracking-wider">
                1930 <span className="text-xs font-normal text-slate-300">(Toll-Free 24/7)</span>
              </p>
            </div>
          </div>
          <span className="text-xs text-emerald-400 font-medium px-2 py-1 bg-emerald-500/10 rounded-md border border-emerald-500/20">
            {lang === 'te' ? 'ఉచిత కాల్' : 'Golden Hour Support'}
          </span>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors cursor-pointer"
          >
            {p.btnClose}
          </button>
          <button
            onClick={() => {
              onClose();
              onProceedToAnalyze();
            }}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-shield-emerald transition-all cursor-pointer"
          >
            <span>{p.btnProceedAnalyze}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
