import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  Zap, 
  Hash, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  File, 
  X
} from 'lucide-react';
import type { Language, DemoCase } from '../../types';
import { translations } from '../../i18n/translations';
import { computeClientSha256 } from '../../services/api';

interface AnalyzeViewProps {
  onAnalyze: (payload: { text?: string; file?: File | null; hash: string; fileName: string }) => void;
  onSelectDemo: (demo: DemoCase) => void;
  demoCases: DemoCase[];
  isAnalyzing: boolean;
  lang: Language;
}

export const AnalyzeView: React.FC<AnalyzeViewProps> = ({
  onAnalyze,
  onSelectDemo,
  demoCases,
  isAnalyzing,
  lang,
}) => {
  const t = translations[lang];
  const a = t.analyze;

  const [activeTab, setActiveTab] = useState<'paste' | 'upload' | 'demo'>('paste');
  const [pastedText, setPastedText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [liveHash, setLiveHash] = useState<string>('');

  // Compute live hash on input change
  useEffect(() => {
    let isMounted = true;
    async function updateHash() {
      if (selectedFile) {
        const hash = await computeClientSha256(selectedFile);
        if (isMounted) setLiveHash(hash);
      } else if (pastedText.trim().length > 0) {
        const hash = await computeClientSha256(pastedText);
        if (isMounted) setLiveHash(hash);
      } else {
        setLiveHash('');
      }
    }

    const timer = setTimeout(updateHash, 200);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [pastedText, selectedFile]);

  // Handle File change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        setFilePreviewUrl(URL.createObjectURL(file));
      } else {
        setFilePreviewUrl(null);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        setFilePreviewUrl(URL.createObjectURL(file));
      } else {
        setFilePreviewUrl(null);
      }
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    if (filePreviewUrl) URL.revokeObjectURL(filePreviewUrl);
    setFilePreviewUrl(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'paste' && !pastedText.trim()) return;
    if (activeTab === 'upload' && !selectedFile) return;

    onAnalyze({
      text: activeTab === 'paste' ? pastedText : undefined,
      file: activeTab === 'upload' ? selectedFile : undefined,
      hash: liveHash,
      fileName: selectedFile ? selectedFile.name : 'pasted_threat_communication.txt'
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Title & Description */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          {a.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
          {a.subtitle}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center space-x-2 mb-6">
        <button
          onClick={() => setActiveTab('paste')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'paste'
              ? 'bg-emerald-500 text-slate-950 shadow-shield-emerald'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{a.tabPaste}</span>
        </button>

        <button
          onClick={() => setActiveTab('upload')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'upload'
              ? 'bg-emerald-500 text-slate-950 shadow-shield-emerald'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>{a.tabUpload}</span>
        </button>

        <button
          onClick={() => setActiveTab('demo')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'demo'
              ? 'bg-emerald-500 text-slate-950 shadow-shield-emerald'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>{a.tabDemo}</span>
        </button>
      </div>

      {/* Main Analyzer Card */}
      <div className="p-6 sm:p-8 rounded-2xl glass-panel border-slate-800 shadow-2xl relative overflow-hidden">
        
        {/* Loading Overlay */}
        {isAnalyzing && (
          <div className="absolute inset-0 z-30 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
            <div className="relative w-16 h-16 mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 animate-ping" />
              <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-white mb-2">
              {a.analyzing}
            </h3>

            {/* Simulated Live Scan Steps */}
            <div className="space-y-1.5 text-xs text-slate-400 font-mono text-left max-w-sm">
              <p className="flex items-center space-x-2 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Generating SHA-256 cryptographic seal...</span>
              </p>
              <p className="flex items-center space-x-2 text-cyan-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Extracting UPI handles, phones & demands...</span>
              </p>
              <p className="flex items-center space-x-2 text-amber-400 animate-pulse">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Evaluating coercion and extortion vectors...</span>
              </p>
            </div>
          </div>
        )}

        {/* TAB 1: PASTE TEXT */}
        {activeTab === 'paste' && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                {lang === 'te' ? 'అనుమానాస్పద సందేశం లేదా నోటీసు వివరాలు' : 'Suspicious Message / Communication Content'}
              </label>
              <textarea
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder={a.pastePlaceholder}
                rows={7}
                className="w-full p-4 rounded-xl bg-slate-950/80 border border-slate-700/80 text-slate-100 placeholder-slate-500 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all font-mono leading-relaxed resize-y"
              />
            </div>

            {/* Live Hash Box */}
            {liveHash && (
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 overflow-hidden">
                  <Hash className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-slate-400 font-medium">{a.hashPreview}</span>
                  <code className="text-emerald-300 font-mono truncate">{liveHash}</code>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex-shrink-0 ml-2">
                  Tamper Proof
                </span>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-2">
              <p className="text-[11px] text-slate-400 max-w-sm hidden sm:block">
                {a.disclaimerNote}
              </p>
              <button
                type="submit"
                disabled={!pastedText.trim() || isAnalyzing}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-shield-emerald transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>{a.btnAnalyze}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: UPLOAD FILE */}
        {activeTab === 'upload' && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                {lang === 'te' ? 'ఫైల్ లేదా స్క్రీన్‌షాట్ అప్‌లోడ్' : 'Evidence File Upload (Screenshot, PDF, Notice)'}
              </label>

              {!selectedFile ? (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className="relative p-8 sm:p-12 rounded-2xl border-2 border-dashed border-slate-700 hover:border-emerald-500/60 bg-slate-950/40 hover:bg-slate-950/70 transition-all text-center cursor-pointer group"
                >
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-white mb-1">
                    {a.uploadPrompt}
                  </p>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    {a.uploadNote}
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                        <File className="w-5 h-5" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-bold text-white truncate">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-slate-400 font-mono">
                          {(selectedFile.size / 1024).toFixed(1)} KB • {selectedFile.type || 'Unknown'}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleClearFile}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Image Preview if image */}
                  {filePreviewUrl && (
                    <div className="mt-2 rounded-lg overflow-hidden border border-slate-800 max-h-52 flex items-center justify-center bg-black/40">
                      <img
                        src={filePreviewUrl}
                        alt="Evidence Preview"
                        className="max-h-52 object-contain"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Live Hash Box */}
            {liveHash && (
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 overflow-hidden">
                  <Hash className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-slate-400 font-medium">{a.hashPreview}</span>
                  <code className="text-emerald-300 font-mono truncate">{liveHash}</code>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex-shrink-0 ml-2">
                  Tamper Proof
                </span>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-2">
              <p className="text-[11px] text-slate-400 max-w-sm hidden sm:block">
                {a.disclaimerNote}
              </p>
              <button
                type="submit"
                disabled={!selectedFile || isAnalyzing}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-shield-emerald transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>{a.btnAnalyze}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: DEMO CASES */}
        {activeTab === 'demo' && (
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
              {a.demoSelectorTitle}
            </p>

            <div className="grid grid-cols-1 gap-3.5">
              {demoCases.map((demo) => (
                <div
                  key={demo.id}
                  onClick={() => onSelectDemo(demo)}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer flex items-center justify-between group hover:bg-slate-900"
                >
                  <div className="space-y-1 pr-4">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        demo.riskLevel === 'CRITICAL' 
                          ? 'bg-red-500/10 text-red-400 border-red-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}>
                        {demo.riskLevel} RISK
                      </span>
                      <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {lang === 'te' ? demo.titleTelugu : demo.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {lang === 'te' ? demo.shortDescriptionTelugu : demo.shortDescription}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="flex-shrink-0 px-3.5 py-1.5 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500 text-emerald-400 group-hover:text-slate-950 text-xs font-bold transition-all"
                  >
                    {lang === 'te' ? 'ఎంచుకోండి' : 'Load Demo'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
