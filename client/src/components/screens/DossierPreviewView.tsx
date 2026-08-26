import React, { useRef, useState } from 'react';
import { 
  Download, 
  ArrowLeft, 
  ShieldCheck, 
  Lock
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { AnalysisResult, Language } from '../../types';
import { translations } from '../../i18n/translations';

interface DossierPreviewViewProps {
  result: AnalysisResult;
  onBack: () => void;
  lang: Language;
  onToggleLang: (lang: Language) => void;
}

export const DossierPreviewView: React.FC<DossierPreviewViewProps> = ({
  result,
  onBack,
  lang,
  onToggleLang,
}) => {
  const t = translations[lang];
  const r = t.report;
  const e = t.entities;

  const dossierRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const category = lang === 'te' && result.scamCategoryTelugu ? result.scamCategoryTelugu : result.scamCategory;
  const summary = lang === 'te' && result.summaryTelugu ? result.summaryTelugu : result.summary;

  const handleDownloadPdf = async () => {
    if (!dossierRef.current) return;
    setIsGeneratingPdf(true);

    try {
      const element = dossierRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#0F172A'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`SurakshaNet_Incident_Dossier_${result.incidentId}.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      
      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-panel border-slate-800">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-bold text-slate-300 hover:text-white px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{r.backBtn}</span>
        </button>

        <div className="flex items-center space-x-3">
          
          {/* Language Switcher */}
          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-700 p-0.5">
            <button
              onClick={() => onToggleLang('en')}
              className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                lang === 'en' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onToggleLang('te')}
              className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                lang === 'te' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              తెలుగు
            </button>
          </div>

          {/* Download PDF Button */}
          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="flex items-center space-x-2 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs sm:text-sm shadow-shield-emerald transition-all disabled:opacity-50 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isGeneratingPdf ? 'Generating PDF...' : r.printBtn}</span>
          </button>

        </div>
      </div>

      {/* PRINTABLE / EXPORTABLE DOSSIER CARD */}
      <div
        ref={dossierRef}
        className="p-8 sm:p-12 rounded-3xl bg-[#0F172A] border-2 border-emerald-500/40 text-slate-100 shadow-2xl space-y-8 print:border-none print:shadow-none"
      >
        
        {/* Official Header */}
        <div className="border-b-2 border-emerald-500/40 pb-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>SURAKSHANET AI • CYBER INCIDENT TRIAGE</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {r.dossierTitle}
              </h1>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                {r.dossierSubtitle}
              </p>
            </div>
            
            <div className="text-right">
              <div className="inline-block px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold">
                {result.incidentId}
              </div>
              <p className="text-[10px] text-slate-400 font-mono mt-1">
                {new Date(result.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 1: CLASSIFICATION & SUMMARY */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase font-mono tracking-wider text-emerald-400 border-b border-slate-800 pb-1">
            {r.summarySection}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Threat Category</span>
              <span className="text-xs font-bold text-white">{category}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Risk Rating</span>
              <span className="text-xs font-bold text-red-400 font-mono">{result.riskLevel} SEVERITY</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Model Confidence</span>
              <span className="text-xs font-bold text-cyan-400 font-mono">{result.confidence}% Confidence</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 leading-relaxed font-sans">
            {summary}
          </p>
        </div>

        {/* SECTION 2: EXTRACTED ENTITIES */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase font-mono tracking-wider text-cyan-400 border-b border-slate-800 pb-1">
            {r.evidenceSection}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">{e.phones}:</span>
              <p className="font-mono text-slate-200 font-medium">
                {result.extractedEntities.phoneNumbers.join(', ') || 'N/A'}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">{e.upis}:</span>
              <p className="font-mono text-cyan-300 font-medium">
                {result.extractedEntities.upiIds.join(', ') || 'N/A'}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">{e.demands}:</span>
              <p className="font-mono text-red-300 font-bold">
                {result.extractedEntities.demandedAmounts.join(', ') || 'N/A'}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">{e.deadlines}:</span>
              <p className="font-mono text-amber-300 font-medium">
                {result.extractedEntities.deadlines.join(', ') || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: INDICATORS WITH CITED EVIDENCE */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase font-mono tracking-wider text-amber-400 border-b border-slate-800 pb-1">
            {r.indicatorsSection}
          </h2>

          <div className="space-y-2.5">
            {result.indicators.map((ind, i) => {
              const title = lang === 'te' && ind.titleTelugu ? ind.titleTelugu : ind.title;
              const ev = lang === 'te' && ind.evidenceTelugu ? ind.evidenceTelugu : ind.evidence;
              return (
                <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white">#{i + 1}. {title}</span>
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      {ind.severity}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-slate-300 bg-slate-900/80 px-2 py-1 rounded">
                    Evidence: "{ev}"
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 4: SAFE ACTION PLAN */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase font-mono tracking-wider text-emerald-400 border-b border-slate-800 pb-1">
            {r.actionSection}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-900/40 space-y-1.5">
              <span className="text-[10px] font-bold text-red-400 uppercase font-mono block">Phase 1: Immediate Safety</span>
              {result.safeActionPlan.immediate.map((act, i) => (
                <p key={i} className="text-slate-300 text-[11px]">
                  • {lang === 'te' && act.actionTelugu ? act.actionTelugu : act.action}
                </p>
              ))}
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-1.5">
              <span className="text-[10px] font-bold text-emerald-400 uppercase font-mono block">Phase 2: Formal Reporting</span>
              {result.safeActionPlan.next.map((act, i) => (
                <p key={i} className="text-slate-300 text-[11px]">
                  • {lang === 'te' && act.actionTelugu ? act.actionTelugu : act.action}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 5: CRYPTOGRAPHIC HASH SEAL */}
        <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono font-bold uppercase">
            <Lock className="w-4 h-4" />
            <span>{r.integritySection}</span>
          </div>
          <div className="text-[11px] font-mono text-slate-300 bg-slate-900 p-2.5 rounded border border-slate-800 break-all">
            SHA-256: <span className="text-emerald-300 font-bold">{result.evidenceHash}</span>
          </div>
          <p className="text-[10px] text-slate-400 font-mono">
            Source: {result.fileName || 'Submitted Content'} • Preserved in tamper-evident state at {result.timestamp}
          </p>
        </div>

        {/* SECTION 6: LEGAL DISCLAIMER */}
        <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-400 space-y-1">
          <span className="font-bold text-slate-300 uppercase block">{r.legalDisclaimerTitle}</span>
          <p className="leading-relaxed">
            {r.legalDisclaimerText}
          </p>
          <p className="text-emerald-400 font-semibold pt-1">
            National Cyber Crime Reporting Helpline: 1930 | Official Portal: cybercrime.gov.in
          </p>
        </div>

      </div>

    </div>
  );
};
