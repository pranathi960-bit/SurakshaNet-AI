import React from 'react';
import { 
  AlertTriangle, 
  Sparkles, 
  FileText, 
  Download, 
  FolderLock, 
  RotateCcw, 
  Phone, 
  CreditCard, 
  Clock, 
  AlertOctagon, 
  CheckCircle2, 
  Info,
  Hash,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import type { AnalysisResult, Language } from '../../types';
import { translations } from '../../i18n/translations';

interface AnalysisResultsViewProps {
  result: AnalysisResult;
  onDownloadDossier: () => void;
  onGoToVault: () => void;
  onReset: () => void;
  lang: Language;
}

export const AnalysisResultsView: React.FC<AnalysisResultsViewProps> = ({
  result,
  onDownloadDossier,
  onGoToVault,
  onReset,
  lang,
}) => {
  const t = translations[lang];
  const a = t.analysis;
  const e = t.entities;

  const isCritical = result.riskLevel === 'CRITICAL';
  const isHigh = result.riskLevel === 'HIGH';
  const isMedium = result.riskLevel === 'MEDIUM';

  const riskColor = isCritical 
    ? 'text-red-400 border-red-500/40 bg-red-500/10'
    : isHigh 
      ? 'text-amber-400 border-amber-500/40 bg-amber-500/10'
      : isMedium
        ? 'text-yellow-400 border-yellow-500/40 bg-yellow-500/10'
        : 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';

  const categoryName = lang === 'te' && result.scamCategoryTelugu 
    ? result.scamCategoryTelugu 
    : result.scamCategory;

  const summaryText = lang === 'te' && result.summaryTelugu 
    ? result.summaryTelugu 
    : result.summary;

  const disclaimerText = lang === 'te' && result.disclaimerTelugu
    ? result.disclaimerTelugu
    : result.disclaimer;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      
      {/* TOP SUMMARY & RISK HEADER */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${isCritical ? 'glass-panel-danger' : 'glass-panel-glow'} shadow-2xl relative overflow-hidden`}>
        
        {result.fallbackNotice && (
          <div className="mb-4 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center space-x-2">
            <Info className="w-4 h-4 flex-shrink-0" />
            <span>{result.fallbackNotice}</span>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6 mb-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-black border uppercase tracking-wider ${riskColor}`}>
                {result.riskLevel} {a.riskBadge}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-900 border border-slate-700 text-cyan-300">
                {a.confidenceBadge}: {result.confidence}%
              </span>
              {result.isDemo && (
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  SYNTHETIC DEMO
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {categoryName}
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-1">
              {lang === 'te' ? 'కేస్ ఐడీ:' : 'Incident Ref:'} <span className="text-slate-200">{result.incidentId}</span> • {new Date(result.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
            </p>
          </div>

          {/* Quick Action buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onDownloadDossier}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs sm:text-sm shadow-shield-emerald transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{a.downloadReportBtn}</span>
            </button>
            <button
              onClick={onReset}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm transition-colors cursor-pointer"
              title={a.newAnalysisBtn}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* AI Summary Statement */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'te' ? 'AI ప్రాథమిక అంచనా సారాంశం' : 'Preliminary AI Assessment Summary'}</span>
          </h4>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {summaryText}
          </p>
        </div>

        {/* Cryptographic SHA-256 seal bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-400">
          <div className="flex items-center space-x-2 overflow-hidden">
            <Hash className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="text-slate-500">{lang === 'te' ? 'సాక్ష్యాధారాల సీల్:' : 'Evidence Seal:'}</span>
            <span className="text-emerald-300 truncate">{result.evidenceHash}</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 sm:mt-0 flex-shrink-0">
            {result.fileName || 'Source Document'} • {result.fileSize || 'N/A'}
          </span>
        </div>

      </div>

      {/* SECTION 1: WHY SURAKSHANET FLAGGED THIS (INDICATORS) */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            <span>{a.whyFlaggedTitle}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {a.whyFlaggedSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.indicators.map((ind, idx) => {
            const title = lang === 'te' && ind.titleTelugu ? ind.titleTelugu : ind.title;
            const evidence = lang === 'te' && ind.evidenceTelugu ? ind.evidenceTelugu : ind.evidence;
            const why = lang === 'te' && ind.whyItMattersTelugu ? ind.whyItMattersTelugu : ind.whyItMatters;
            const isIndCritical = ind.severity === 'CRITICAL';

            return (
              <div
                key={idx}
                className="p-5 rounded-2xl glass-panel border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                      isIndCritical
                        ? 'bg-red-500/10 text-red-400 border-red-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}>
                      {ind.severity} INDICATOR
                    </span>
                    <span className="text-xs font-mono text-slate-500">#{idx + 1}</span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    {title}
                  </h3>

                  {/* Quoted Evidence */}
                  <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 mb-3 border-l-2 border-l-amber-500">
                    <span className="text-[10px] text-amber-400 uppercase font-bold block mb-0.5">
                      {lang === 'te' ? 'సమర్పించిన ఆధారాలు:' : 'Cited Evidence:'}
                    </span>
                    "{evidence}"
                  </div>

                  {/* Why it matters */}
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                      {lang === 'te' ? 'ఇది ఎందుకు ప్రమాదకరం:' : 'Why It Matters:'}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {why}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: EXTRACTED EVIDENCE ENTITIES */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
            <FileText className="w-6 h-6 text-cyan-400" />
            <span>{a.extractedTitle}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {a.extractedSubtitle}
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-panel border-slate-800 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Phone Numbers */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Phone className="w-4 h-4" />
                <span>{e.phones}</span>
              </div>
              {result.extractedEntities.phoneNumbers.length > 0 ? (
                <div className="space-y-1">
                  {result.extractedEntities.phoneNumbers.map((p, i) => (
                    <span key={i} className="block text-xs font-mono text-slate-200 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                      {p}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">{e.noneDetected}</p>
              )}
            </div>

            {/* UPI IDs */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
                <CreditCard className="w-4 h-4" />
                <span>{e.upis}</span>
              </div>
              {result.extractedEntities.upiIds.length > 0 ? (
                <div className="space-y-1">
                  {result.extractedEntities.upiIds.map((u, i) => (
                    <span key={i} className="block text-xs font-mono text-cyan-300 bg-slate-900 px-2 py-1 rounded border border-slate-800 truncate">
                      {u}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">{e.noneDetected}</p>
              )}
            </div>

            {/* Demanded Amounts */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center space-x-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
                <AlertOctagon className="w-4 h-4" />
                <span>{e.demands}</span>
              </div>
              {result.extractedEntities.demandedAmounts.length > 0 ? (
                <div className="space-y-1">
                  {result.extractedEntities.demandedAmounts.map((amt, i) => (
                    <span key={i} className="block text-xs font-mono font-bold text-red-300 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                      {amt}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">{e.noneDetected}</p>
              )}
            </div>

            {/* Deadlines / Urgency */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Clock className="w-4 h-4" />
                <span>{e.deadlines}</span>
              </div>
              {result.extractedEntities.deadlines.length > 0 ? (
                <div className="space-y-1">
                  {result.extractedEntities.deadlines.map((d, i) => (
                    <span key={i} className="block text-xs font-mono text-amber-300 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                      {d}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">{e.noneDetected}</p>
              )}
            </div>

          </div>

          {/* Impersonated Entities & Keywords */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                {e.impersonated}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {result.extractedEntities.impersonatedEntities.map((org, i) => (
                  <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-900 text-slate-200 border border-slate-700">
                    {org}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                {e.keywords}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {result.extractedEntities.threatKeywords.map((kw, i) => (
                  <span key={i} className="text-xs font-mono px-2 py-0.5 rounded bg-red-950/50 text-red-300 border border-red-900/50">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

          </div>

          <p className="text-[11px] text-slate-400 text-center italic">
            * {a.extractedDisclaimer}
          </p>

        </div>
      </div>

      {/* SECTION 3: PRIORITIZED SAFE ACTION PLAN */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <span>{a.safeActionTitle}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {a.safeActionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Phase 1: Immediate Defense */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-red-950/30 to-slate-900 border border-red-500/30 space-y-4">
            <div className="flex items-center space-x-2 text-red-400 font-bold text-sm uppercase tracking-wider pb-2 border-b border-red-500/20">
              <AlertOctagon className="w-4 h-4" />
              <span>{a.immediateActions}</span>
            </div>
            
            <div className="space-y-3">
              {result.safeActionPlan.immediate.map((act, i) => {
                const text = lang === 'te' && act.actionTelugu ? act.actionTelugu : act.action;
                return (
                  <div key={i} className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 text-red-400 text-xs font-bold font-mono flex items-center justify-center border border-red-500/40">
                      {act.step}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                      {text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Phase 2: Reporting & Recovery */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-950/30 to-slate-900 border border-emerald-500/30 space-y-4">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm uppercase tracking-wider pb-2 border-b border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
              <span>{a.nextActions}</span>
            </div>
            
            <div className="space-y-3">
              {result.safeActionPlan.next.map((act, i) => {
                const text = lang === 'te' && act.actionTelugu ? act.actionTelugu : act.action;
                return (
                  <div key={i} className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold font-mono flex items-center justify-center border border-emerald-500/40">
                      {act.step}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                      {text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 4: MISSING TECHNICAL CONTEXT & RESPONSIBLE AI NOTICE */}
      <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
          <HelpCircle className="w-4 h-4 text-slate-500" />
          <span>{a.missingContextTitle}</span>
        </h4>
        <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 font-mono">
          {(lang === 'te' && result.missingInformationTelugu ? result.missingInformationTelugu : result.missingInformation).map((info, idx) => (
            <li key={idx}>{info}</li>
          ))}
        </ul>

        <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
          <strong className="text-slate-300 mr-1.5">
            {lang === 'te' ? 'బాధ్యతాయుతమైన AI నిబంధన:' : 'Responsible AI Rule:'}
          </strong>
          {disclaimerText}
        </div>
      </div>

      {/* BOTTOM ACTIONS BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <button
          onClick={onReset}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{a.newAnalysisBtn}</span>
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onGoToVault}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all cursor-pointer"
          >
            <FolderLock className="w-4 h-4 text-emerald-400" />
            <span>{a.viewVaultBtn}</span>
          </button>

          <button
            onClick={onDownloadDossier}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-shield-emerald transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{a.downloadReportBtn}</span>
          </button>
        </div>
      </div>

    </div>
  );
};
