import React, { useState } from 'react';
import { 
  FolderLock, 
  ShieldCheck, 
  Copy, 
  Check, 
  FileCheck, 
  Search
} from 'lucide-react';
import type { EvidenceVaultItem, Language } from '../../types';
import { translations } from '../../i18n/translations';

interface EvidenceVaultViewProps {
  vaultItems: EvidenceVaultItem[];
  onSelectDossier: (item: EvidenceVaultItem) => void;
  lang: Language;
}

export const EvidenceVaultView: React.FC<EvidenceVaultViewProps> = ({
  vaultItems,
  onSelectDossier,
  lang,
}) => {
  const t = translations[lang];
  const v = t.vault;

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCopyHash = (hash: string, id: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredItems = vaultItems.filter(item => 
    item.incidentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.scamCategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <FolderLock className="w-4 h-4" />
            <span>{lang === 'te' ? 'డిజిటల్ సాక్ష్యాధారాల భద్రత' : 'Cryptographic Custody Record'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {v.title}
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            {v.subtitle}
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={lang === 'te' ? 'సాక్ష్యాలను వెతకండి...' : 'Search evidence logs...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Legal & Forensic Integrity Educational Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900 to-emerald-950/40 border border-emerald-500/30 flex items-start space-x-4">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex-shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="space-y-1 text-xs">
          <h4 className="font-bold text-white text-sm">
            {lang === 'te' ? 'క్రిప్టోగ్రాఫిక్ SHA-256 సమగ్రత ఎందుకు ముఖ్యం?' : 'Why SHA-256 Cryptographic Hashing Matters'}
          </h4>
          <p className="text-slate-300 leading-relaxed">
            {v.integrityNote}
          </p>
        </div>
      </div>

      {/* Evidence Table */}
      {filteredItems.length === 0 ? (
        <div className="p-12 rounded-2xl glass-panel text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 mx-auto flex items-center justify-center">
            <FolderLock className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-slate-400">
            {v.empty}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 glass-panel">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">{v.tableColFile}</th>
                <th className="py-3.5 px-4">{v.tableColCategory}</th>
                <th className="py-3.5 px-4">{v.tableColRisk}</th>
                <th className="py-3.5 px-4">{v.tableColHash}</th>
                <th className="py-3.5 px-4">{v.tableColTimestamp}</th>
                <th className="py-3.5 px-4 text-right">{v.tableColAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-200">
              {filteredItems.map((item) => {
                const isCritical = item.riskLevel === 'CRITICAL';
                return (
                  <tr key={item.id} className="hover:bg-slate-850/50 transition-colors">
                    
                    {/* File & Incident Ref */}
                    <td className="py-4 px-4 font-medium">
                      <div className="flex items-center space-x-2.5">
                        <FileCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-white">{item.fileName}</p>
                          <p className="text-[10px] font-mono text-slate-400">{item.incidentId} • {item.fileSize}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 font-semibold text-slate-300">
                      {item.scamCategory}
                    </td>

                    {/* Risk Badge */}
                    <td className="py-4 px-4">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                        isCritical
                          ? 'bg-red-500/10 text-red-400 border-red-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}>
                        {item.riskLevel}
                      </span>
                    </td>

                    {/* SHA-256 Hash with Copy */}
                    <td className="py-4 px-4 font-mono">
                      <div className="flex items-center space-x-1.5 max-w-xs">
                        <span className="truncate text-slate-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                          {item.hash}
                        </span>
                        <button
                          onClick={() => handleCopyHash(item.hash, item.id)}
                          className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex-shrink-0 cursor-pointer"
                          title={v.copyHash}
                        >
                          {copiedId === item.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Timestamp */}
                    <td className="py-4 px-4 text-slate-400 font-mono text-[11px]">
                      {new Date(item.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => onSelectDossier(item)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 font-bold transition-all text-xs cursor-pointer"
                      >
                        {v.viewDossier}
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
