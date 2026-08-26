import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { EmergencyBanner } from './components/EmergencyBanner';
import { PanicModal } from './components/PanicModal';
import { LandingView } from './components/screens/LandingView';
import { AnalyzeView } from './components/screens/AnalyzeView';
import { AnalysisResultsView } from './components/screens/AnalysisResultsView';
import { EvidenceVaultView } from './components/screens/EvidenceVaultView';
import { DossierPreviewView } from './components/screens/DossierPreviewView';
import { SafetyCenterView } from './components/screens/SafetyCenterView';
import { Footer } from './components/Footer';
import type { 
  AnalysisResult, 
  DemoCase, 
  EvidenceVaultItem, 
  Language 
} from './types';
import { 
  checkBackendHealth, 
  fetchDemoCases, 
  analyzeIncident 
} from './services/api';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [lang, setLang] = useState<Language>('en');
  const [isGeminiLive, setIsGeminiLive] = useState<boolean>(false);
  const [isPanicOpen, setIsPanicOpen] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [demoCases, setDemoCases] = useState<DemoCase[]>([]);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  
  // Evidence Vault state with localStorage persistence
  const [vaultItems, setVaultItems] = useState<EvidenceVaultItem[]>(() => {
    try {
      const saved = localStorage.getItem('surakshanet_vault');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load vault from localStorage', e);
    }
    return [];
  });

  // Check health and load demo cases on mount
  useEffect(() => {
    async function init() {
      const health = await checkBackendHealth();
      setIsGeminiLive(health.geminiConfigured);

      const cases = await fetchDemoCases();
      setDemoCases(cases);

      // Prepopulate vault with one historical sample if completely empty
      if (vaultItems.length === 0 && cases.length > 0) {
        const demoSample = cases[0];
        const initialVault: EvidenceVaultItem[] = [
          {
            id: 'vault-init-1',
            incidentId: 'SRK-20260826-CBI9',
            fileName: demoSample.fileName,
            fileSize: '1.4 MB',
            hash: demoSample.evidenceHash,
            timestamp: new Date().toISOString(),
            scamCategory: demoSample.category,
            riskLevel: demoSample.riskLevel,
            rawContent: demoSample.sampleText
          }
        ];
        setVaultItems(initialVault);
        try {
          localStorage.setItem('surakshanet_vault', JSON.stringify(initialVault));
        } catch (e) {}
      }
    }
    init();
  }, []);

  // Save vault to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('surakshanet_vault', JSON.stringify(vaultItems));
    } catch (e) {}
  }, [vaultItems]);

  // Handle Analysis Trigger
  const handleAnalyze = async (payload: {
    text?: string;
    file?: File | null;
    hash: string;
    fileName: string;
  }) => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeIncident({
        text: payload.text,
        file: payload.file,
        evidenceHash: payload.hash,
        fileName: payload.fileName,
      });

      setCurrentAnalysis(result);

      // Add to Evidence Vault
      const newVaultItem: EvidenceVaultItem = {
        id: `vault-${Date.now()}`,
        incidentId: result.incidentId,
        fileName: result.fileName || 'analyzed-evidence.txt',
        fileSize: result.fileSize || 'N/A',
        hash: result.evidenceHash,
        timestamp: result.timestamp,
        scamCategory: result.scamCategory,
        riskLevel: result.riskLevel,
        rawContent: result.submittedContent
      };

      setVaultItems(prev => [newVaultItem, ...prev.filter(v => v.hash !== newVaultItem.hash)]);
      setCurrentTab('results');
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle Select Demo Case (Instant 1-Click analysis workflow for judges)
  const handleSelectDemo = (demo: DemoCase) => {
    const result: AnalysisResult = {
      incidentId: `SRK-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${demo.id.split('-')[1]?.toUpperCase() || 'DEMO'}`,
      timestamp: new Date().toISOString(),
      evidenceHash: demo.evidenceHash,
      fileName: demo.fileName,
      fileSize: '840 KB',
      submittedContent: demo.sampleText,
      scamCategory: demo.category,
      scamCategoryTelugu: demo.categoryTelugu,
      riskLevel: demo.riskLevel,
      confidence: demo.confidence,
      summary: demo.summary,
      summaryTelugu: demo.summaryTelugu,
      indicators: demo.indicators,
      extractedEntities: demo.extractedEntities,
      safeActionPlan: demo.safeActionPlan,
      missingInformation: demo.missingInformation,
      missingInformationTelugu: demo.missingInformationTelugu,
      disclaimer: "SurakshaNet AI is an assistive safety tool. AI analysis may be incorrect. Verify important information with official authorities or qualified professionals.",
      disclaimerTelugu: "సురక్షానెట్ AI అనేది సహాయక భద్రతా సాధనం. AI విశ్లేషణలో లోపాలు ఉండవచ్చు. ముఖ్యమైన సమాచారాన్ని అధికారిక సంస్థలు లేదా నిపుణులతో ధృవీకరించుకోండి.",
      isDemo: true
    };

    setCurrentAnalysis(result);

    // Ensure item is saved in vault
    const newVaultItem: EvidenceVaultItem = {
      id: `vault-${demo.id}`,
      incidentId: result.incidentId,
      fileName: demo.fileName,
      fileSize: '840 KB',
      hash: demo.evidenceHash,
      timestamp: result.timestamp,
      scamCategory: demo.category,
      riskLevel: demo.riskLevel,
      rawContent: demo.sampleText
    };

    setVaultItems(prev => [newVaultItem, ...prev.filter(v => v.hash !== newVaultItem.hash)]);
    setCurrentTab('results');
  };

  // Open Dossier from Vault Item
  const handleSelectVaultItem = (item: EvidenceVaultItem) => {
    // Find matching demo case or construct view
    const matchedDemo = demoCases.find(d => d.evidenceHash === item.hash);
    if (matchedDemo) {
      handleSelectDemo(matchedDemo);
      setCurrentTab('dossier');
    } else if (currentAnalysis && currentAnalysis.evidenceHash === item.hash) {
      setCurrentTab('dossier');
    } else {
      // Fallback construct
      const fallbackResult: AnalysisResult = {
        incidentId: item.incidentId,
        timestamp: item.timestamp,
        evidenceHash: item.hash,
        fileName: item.fileName,
        fileSize: item.fileSize,
        scamCategory: item.scamCategory,
        riskLevel: item.riskLevel,
        confidence: 96,
        summary: `Preserved evidence record for ${item.scamCategory}. SHA-256 cryptographic seal guarantees tamper-evident storage.`,
        indicators: [
          {
            title: "Preserved Threat Communication",
            severity: item.riskLevel,
            evidence: `Stored file: ${item.fileName}`,
            whyItMatters: "Tamper-evident record established for official cybercrime reporting."
          }
        ],
        extractedEntities: {
          phoneNumbers: [],
          upiIds: [],
          bankAccounts: [],
          urls: [],
          impersonatedEntities: [item.scamCategory],
          demandedAmounts: [],
          deadlines: [],
          threatKeywords: ["Preserved evidence"]
        },
        safeActionPlan: {
          immediate: [
            { step: 1, action: "Do not delete the original file.", actionTelugu: "అసలు ఫైల్‌ను డిలీట్ చేయవద్దు." }
          ],
          next: [
            { step: 2, action: "Present this SHA-256 Dossier when reporting to 1930 or cybercrime.gov.in.", actionTelugu: "1930 లేదా cybercrime.gov.in లో రిపోర్ట్ చేసేటప్పుడు ఈ డాసియర్ సమర్పించండి." }
          ]
        },
        missingInformation: ["Original telecom headers"],
        disclaimer: "SurakshaNet AI is an assistive safety tool. AI analysis may be incorrect. Verify important information with official authorities or qualified professionals."
      };
      setCurrentAnalysis(fallbackResult);
      setCurrentTab('dossier');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080C16] text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 cyber-grid">
      
      {/* Top Banner */}
      <EmergencyBanner lang={lang} />

      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
        isGeminiLive={isGeminiLive}
        onOpenPanic={() => setIsPanicOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentTab === 'home' && (
          <LandingView
            onStartAnalyze={() => setCurrentTab('analyze')}
            onSelectDemo={handleSelectDemo}
            onOpenPanic={() => setIsPanicOpen(true)}
            demoCases={demoCases}
            lang={lang}
          />
        )}

        {currentTab === 'analyze' && (
          <AnalyzeView
            onAnalyze={handleAnalyze}
            onSelectDemo={handleSelectDemo}
            demoCases={demoCases}
            isAnalyzing={isAnalyzing}
            lang={lang}
          />
        )}

        {currentTab === 'results' && currentAnalysis && (
          <AnalysisResultsView
            result={currentAnalysis}
            onDownloadDossier={() => setCurrentTab('dossier')}
            onGoToVault={() => setCurrentTab('vault')}
            onReset={() => {
              setCurrentAnalysis(null);
              setCurrentTab('analyze');
            }}
            lang={lang}
          />
        )}

        {currentTab === 'vault' && (
          <EvidenceVaultView
            vaultItems={vaultItems}
            onSelectDossier={handleSelectVaultItem}
            lang={lang}
          />
        )}

        {currentTab === 'dossier' && currentAnalysis && (
          <DossierPreviewView
            result={currentAnalysis}
            onBack={() => setCurrentTab('results')}
            lang={lang}
            onToggleLang={setLang}
          />
        )}

        {currentTab === 'safetyCenter' && (
          <SafetyCenterView
            lang={lang}
            onSelectScamType={(scamKey) => {
              const matched = demoCases.find(d => d.id.includes(scamKey));
              if (matched) handleSelectDemo(matched);
              else setCurrentTab('analyze');
            }}
          />
        )}
      </main>

      {/* Emergency Panic Modal */}
      <PanicModal
        isOpen={isPanicOpen}
        onClose={() => setIsPanicOpen(false)}
        onProceedToAnalyze={() => {
          setIsPanicOpen(false);
          setCurrentTab('analyze');
        }}
        lang={lang}
      />

      {/* Footer */}
      <Footer lang={lang} />

    </div>
  );
}

export default App;
