import React from 'react';
import { 
  ShieldAlert, 
  Search, 
  Sparkles, 
  Lock, 
  Zap, 
  Scale, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import type { Language, DemoCase } from '../../types';
import { translations } from '../../i18n/translations';

interface LandingViewProps {
  onStartAnalyze: () => void;
  onSelectDemo: (demo: DemoCase) => void;
  onOpenPanic: () => void;
  demoCases: DemoCase[];
  lang: Language;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onStartAnalyze,
  onSelectDemo,
  onOpenPanic,
  demoCases,
  lang,
}) => {
  const t = translations[lang];

  return (
    <div className="space-y-16 pb-12">
      
      {/* HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 pb-8 overflow-hidden">
        {/* Background Cyber Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-emerald-500/10 via-teal-500/15 to-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold mb-6 shadow-shield-emerald">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{t.app.tagline}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight sm:leading-[1.15] mb-6">
            <span className="bg-gradient-to-r from-slate-100 via-white to-slate-300 bg-clip-text text-transparent">
              {t.hero.headline}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.hero.subheadline}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-12">
            
            {/* Urgent Panic Button */}
            <button
              onClick={onOpenPanic}
              className="w-full sm:w-auto flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-base shadow-shield-danger transition-all hover:scale-[1.02] active:scale-95 group cursor-pointer"
            >
              <ShieldAlert className="w-5 h-5 group-hover:animate-bounce" />
              <span>{t.hero.btnPanic}</span>
            </button>

            {/* Analyze Button */}
            <button
              onClick={onStartAnalyze}
              className="w-full sm:w-auto flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-base shadow-shield-emerald transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <Search className="w-5 h-5 text-slate-950" />
              <span>{t.hero.btnAnalyze}</span>
            </button>

          </div>

          {/* Core Workflow Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4 border-t border-slate-800/80">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-left">
              <span className="text-emerald-400 font-mono text-xs font-bold block mb-1">STEP 01</span>
              <p className="text-xs text-slate-200 font-medium">
                {lang === 'te' ? 'సమాచారాన్ని అప్‌లోడ్ చేయండి' : 'Upload Suspicious Material'}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-left">
              <span className="text-cyan-400 font-mono text-xs font-bold block mb-1">STEP 02</span>
              <p className="text-xs text-slate-200 font-medium">
                {lang === 'te' ? 'AI నమూనాల విశ్లేషణ' : 'Multi-Vector AI Analysis'}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-left">
              <span className="text-amber-400 font-mono text-xs font-bold block mb-1">STEP 03</span>
              <p className="text-xs text-slate-200 font-medium">
                {lang === 'te' ? 'SHA-256 సాక్ష్యాధారాల సీల్' : 'SHA-256 Evidence Seal'}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-left">
              <span className="text-emerald-400 font-mono text-xs font-bold block mb-1">STEP 04</span>
              <p className="text-xs text-slate-200 font-medium">
                {lang === 'te' ? 'రక్షణ ప్రణాళిక & డాసియర్' : 'Safe Action & PDF Dossier'}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* QUICK DEMO CASES SECTION (Judges highlight) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'te' ? 'తక్షణ డెమో విభాగాలు (హ్యాకథాన్ జడ్జీల కోసం)' : 'Instant Demo Scenarios (For Hackathon Judges)'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {lang === 'te' ? 'భారతదేశంలో అత్యంత ప్రమాదకరమైన మోసాల దృష్టాంతాలు' : 'Test Real-World Extortion & Scam Scenarios'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 md:mt-0 max-w-md">
            {lang === 'te' 
              ? 'ఒక క్లిక్‌తో పూర్తి AI విశ్లేషణ, సాక్ష్యాల సేకరణ మరియు SHA-256 డాసియర్ పొందండి.'
              : 'Click any scenario below to immediately load full AI entity extraction and evidence preservation.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demoCases.map((demo) => {
            const isCritical = demo.riskLevel === 'CRITICAL';
            return (
              <div
                key={demo.id}
                onClick={() => onSelectDemo(demo)}
                className="group relative p-6 rounded-2xl glass-panel hover:border-emerald-500/50 hover:bg-slate-850 transition-all cursor-pointer flex flex-col justify-between hover:-translate-y-1 hover:shadow-shield-emerald"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border ${
                      isCritical
                        ? 'bg-red-500/10 text-red-400 border-red-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}>
                      {demo.riskLevel} RISK • {demo.confidence}% CONFIDENCE
                    </span>
                    <Sparkles className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">
                    {lang === 'te' ? demo.titleTelugu : demo.title}
                  </h3>

                  <p className="text-xs font-semibold text-emerald-400/90 mb-3">
                    {lang === 'te' ? demo.categoryTelugu : demo.category}
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                    {lang === 'te' ? demo.shortDescriptionTelugu : demo.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-slate-300 group-hover:text-emerald-400">
                  <span>{lang === 'te' ? 'ఈ డెమోను విశ్లేషించండి' : 'Launch Demo Analysis'}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CORE CAPABILITIES & RESPONSIBLE AI PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-900/90 to-[#0A0F1D] border border-slate-800 shadow-2xl">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
              {lang === 'te' ? 'బాధ్యతాయుతమైన AI ఆర్కిటెక్చర్' : 'Assistive AI Architecture'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {lang === 'te' ? 'పానిక్ నుండి సురక్షిత చర్యల వరకు' : 'From Panic to Evidence & Safe Action'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pillar 1 */}
            <div className="flex space-x-4">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 h-fit">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1.5">
                  {lang === 'te' ? 'స్పష్టమైన మోసాల గుర్తింపు' : 'Transparent Indicators'}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === 'te'
                    ? 'AI కేవలం అంచనా వేయడమే కాకుండా, పత్రంలో ఏ భాగం అనుమానాస్పదంగా ఉందో ప్రత్యక్ష ఆధారాలతో చూపుతుంది.'
                    : 'SurakshaNet never makes black-box claims. Every flag cites exact text evidence with transparent cybersecurity reasoning.'}
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex space-x-4">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 h-fit">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1.5">
                  {lang === 'te' ? 'SHA-256 సాక్ష్యాధారాల సీల్' : 'SHA-256 Evidence Seal'}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === 'te'
                    ? 'అప్‌లోడ్ చేసిన ఫైల్స్‌కు టైమ్‌స్టాంప్ మరియు హాష్ కేటాయించి, భవిష్యత్తులో అధికారిక ఫిర్యాదుల కోసం భద్రపరుస్తుంది.'
                    : 'Calculates cryptographic hashes locally before analysis. Generates a timestamped Incident Dossier ready for 1930 reporting.'}
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex space-x-4">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 h-fit">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1.5">
                  {lang === 'te' ? 'చట్టబద్ధమైన పరిమితుల గౌరవం' : 'Strict Responsible AI'}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === 'te'
                    ? 'AI నేరాన్ని లేదా వ్యక్తుల దోషాన్ని నిర్ధారించదు. అధికారిక చట్టపరమైన విచారణను మానవుల మరియు పోలీసుల నియంత్రణలో ఉంచుతుంది.'
                    : 'SurakshaNet never declares guilt or claims to replace official police FIRs. Cautious language keeps authorities and humans in control.'}
                </p>
              </div>
            </div>

          </div>

          {/* Responsible AI Disclaimer Box */}
          <div className="mt-8 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
            <p className="text-xs text-slate-400">
              <strong className="text-slate-300 mr-1.5">
                {lang === 'te' ? 'ముఖ్య గమనిక:' : 'Responsible AI Notice:'}
              </strong>
              {t.analysis.disclaimer}
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
