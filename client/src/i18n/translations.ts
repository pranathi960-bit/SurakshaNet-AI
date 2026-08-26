export const translations = {
  en: {
    app: {
      name: "SurakshaNet AI",
      tagline: "AI-Powered Protection Against Digital Extortion & Online Scams",
      helplineBanner: "In immediate danger or lost money? Call National Cyber Crime Helpline: 1930 (Toll Free)",
      modeLive: "Live Gemini AI Active",
      modeDemo: "Demo / Offline Fallback Mode",
      responsiblePledge: "SurakshaNet AI is an assistive safety tool. It does not replace law enforcement or determine guilt."
    },
    nav: {
      home: "Overview",
      analyze: "Analyze Threat",
      vault: "Evidence Vault",
      report: "Incident Dossier",
      safetyCenter: "Safety Center",
      panicButton: "I'm Being Scammed!"
    },
    hero: {
      headline: "Don't panic. Understand the threat. Protect your evidence.",
      subheadline: "Immediate, objective AI triage for Digital Arrests, Fake CBI/Police Notices, Predatory Loan Apps, and Phishing Extortion in India.",
      btnPanic: "I'm Being Scammed (Urgent)",
      btnAnalyze: "Analyze Suspicious Content",
      btnDemo: "Explore Demo Cases",
      stats: {
        casesAssisted: "10,000+ Patterns",
        scamCategories: "6 Core Threat Vectors",
        preservation: "Cryptographic SHA-256 Seal",
        responseSpeed: "< 3s Instant Triage"
      }
    },
    panicModal: {
      title: "Immediate Safety Protocol - Stay Calm",
      subtitle: "Follow these 4 golden rules immediately before taking any action:",
      rules: [
        {
          title: "DO NOT TRANSFER MONEY",
          desc: "Legitimate police, CBI, ED, or Judges will NEVER ask you to deposit money in 'escrow' or 'verification accounts'."
        },
        {
          title: "DISCONNECT VIDEO / SKYPE CALLS",
          desc: "Under Indian Law, 'Digital Arrest' is completely fake. No police agency arrests people over video calls."
        },
        {
          title: "DO NOT SHARE OTP OR INSTALL APPS",
          desc: "Never reveal OTPs, banking PINs, or install remote access APKs like AnyDesk or TeamViewer."
        },
        {
          title: "PRESERVE SCREENSHOTS & CALL LOGS",
          desc: "Do not delete chats. Upload them here to generate a timestamped SHA-256 evidence record."
        }
      ],
      btnProceedAnalyze: "Proceed to AI Evidence Analysis",
      btnClose: "Close"
    },
    analyze: {
      title: "Suspicious Content Analyzer",
      subtitle: "Paste suspicious WhatsApp/SMS text, or upload notice PDFs/screenshots. SurakshaNet extracts entities and evaluates extortion patterns.",
      tabPaste: "Paste Text / Message",
      tabUpload: "Upload Screenshot / PDF",
      tabDemo: "Select Pre-loaded Demo",
      pastePlaceholder: "Paste the message, notice text, SMS, or extortion demand here...",
      uploadPrompt: "Drag & drop suspicious screenshot or PDF here, or click to browse",
      uploadNote: "Max size: 25 MB. Files are processed securely in-memory with client-side SHA-256 hashing.",
      btnAnalyze: "Analyze with SurakshaNet AI",
      analyzing: "Analyzing Extortion Indicators...",
      demoSelectorTitle: "Select a Real-World Scam Scenario to Test:",
      hashPreview: "Real-time Evidence Hash (SHA-256):",
      disclaimerNote: "Responsible AI Note: Extracted data is labeled objectively. AI does not accuse individuals of crimes."
    },
    analysis: {
      headerTitle: "Threat & Extortion Assessment",
      riskBadge: "Risk Assessment",
      confidenceBadge: "Model Confidence",
      categoryBadge: "Scam Classification",
      whyFlaggedTitle: "Why SurakshaNet Flagged This",
      whyFlaggedSubtitle: "Transparent, evidence-based indicators detected in the submitted content:",
      extractedTitle: "Extracted Evidence Entities",
      extractedSubtitle: "Explicit data points extracted from the submitted material (labeled as-is):",
      extractedDisclaimer: "Extracted from submitted content. SurakshaNet does not invent or alter entity data.",
      safeActionTitle: "Prioritized Safe Action Plan",
      safeActionSubtitle: "Immediate and follow-up steps to protect yourself and your family:",
      immediateActions: "Phase 1: Immediate Defense",
      nextActions: "Phase 2: Reporting & Recovery",
      missingContextTitle: "Technical Context Not in Document",
      downloadReportBtn: "Download Incident Dossier (PDF)",
      viewVaultBtn: "Store in Evidence Vault",
      newAnalysisBtn: "Analyze Another Item",
      disclaimer: "SurakshaNet AI is an assistive safety tool. AI analysis may be incorrect. Verify important information with official authorities or qualified professionals."
    },
    entities: {
      phones: "Phone / Contact Numbers",
      upis: "UPI IDs / Payment Handles",
      banks: "Bank Accounts / IFSC",
      urls: "Suspicious Links / URLs / Skype",
      impersonated: "Impersonated Agencies / Orgs",
      demands: "Demanded Ransom / Extortion Amount",
      deadlines: "Deadlines / Urgency Window",
      keywords: "Threat & Coercion Keywords",
      noneDetected: "None detected in text"
    },
    vault: {
      title: "Evidence Preservation Vault",
      subtitle: "Tamper-evident log of analyzed incidents with cryptographic SHA-256 hashes for official reporting.",
      tableColFile: "Evidence / Source",
      tableColCategory: "Category",
      tableColRisk: "Risk Level",
      tableColHash: "SHA-256 Hash",
      tableColTimestamp: "Timestamp (IST)",
      tableColAction: "Actions",
      copyHash: "Copy Hash",
      hashCopied: "Copied!",
      viewDossier: "View Dossier",
      empty: "No evidence records stored yet. Analyze a threat to record it here.",
      integrityNote: "The SHA-256 hash proves the file has not been modified since the timestamp. Admissibility under Sec 63 Bharatiya Sakshya Adhiniyam (BSA) must be certified by appropriate authorities."
    },
    report: {
      dossierTitle: "EVIDENCE-PRESERVATION INCIDENT DOSSIER",
      dossierSubtitle: "SurakshaNet AI Threat Analysis & Evidence Summary Record",
      generatedOn: "Generated On",
      incidentRef: "Dossier Reference ID",
      summarySection: "1. Incident Classification & Risk Summary",
      evidenceSection: "2. Extracted Entities from Submitted Material",
      indicatorsSection: "3. Detected Scam Indicators & Evidence Citations",
      actionSection: "4. Recommended Safe Protocol",
      integritySection: "5. Digital Evidence Integrity & Cryptographic Seal",
      legalDisclaimerTitle: "Official Advisory & Legal Disclaimer",
      legalDisclaimerText: "This document is an assistive technical analysis generated by SurakshaNet AI to facilitate victim assistance and evidence preservation. It does NOT constitute a judicial finding, legal testimony, or automated police FIR. Final evidentiary certification under Indian Law must be performed by authorized cyber forensics officers or legal professionals.",
      printBtn: "Download PDF Dossier",
      backBtn: "Back to Analysis"
    },
    safetyCenter: {
      title: "Cyber Threat Knowledge & Safety Center",
      subtitle: "Know your rights. Real law enforcement agencies operate within constitutional frameworks.",
      modules: [
        {
          id: "digital-arrest",
          title: "Digital Arrest Scams",
          tag: "Most Dangerous",
          desc: "Fraudsters pose as CBI/Police/Judges over Skype/WhatsApp, claiming your Aadhaar or passport is linked to drug trafficking or money laundering.",
          truth: "Real police NEVER issue arrest warrants over WhatsApp or conduct court trials over Skype. 'Digital Arrest' does not exist in law.",
          actions: ["Cut the video call immediately", "Never transfer 'clearance deposits'", "Call 1930 immediately"]
        },
        {
          id: "loan-app",
          title: "Predatory Loan App Blackmail",
          tag: "Extortion Vector",
          desc: "Unregistered Chinese/illegal micro-loan apps access your gallery and contacts, demanding 1000% usurious interest with threats of morphed photos.",
          truth: "RBI Digital Lending guidelines prohibit unauthorized contact harassment. Morphed photo blackmail is punishable under Sec 67A IT Act.",
          actions: ["Revoke app permissions & uninstall", "Warn family/friends proactively", "File complaint at cybercrime.gov.in & RBI Sachet"]
        },
        {
          id: "phishing-apk",
          title: "Utility Bill / Malicious APK Lures",
          tag: "Banking Fraud",
          desc: "SMS claiming electricity will be disconnected tonight, urging you to call an unknown mobile number or install a '.apk' file.",
          truth: "Electricity boards never disconnect power at night without statutory notices, nor do they distribute raw APK download links.",
          actions: ["Never install .apk files outside Play Store", "Check status on official 1912 helpline", "Turn on airplane mode if installed"]
        },
        {
          id: "upi-refund",
          title: "UPI PIN & QR Code Traps",
          tag: "Payment Scam",
          desc: "Fraudster claims they sent extra money by mistake or are buying an OLX item, asking you to scan a QR code or enter your UPI PIN to 'receive' money.",
          truth: "You NEVER need to enter your UPI PIN or scan a QR code to RECEIVE money. PIN is only for DEBITING.",
          actions: ["Never enter PIN to receive money", "Block the sender on UPI app", "Contact bank's fraud helpline"]
        }
      ],
      helplineCard: {
        title: "Emergency Official Cybercrime Contacts",
        helpline: "National Cybercrime Helpline: 1930",
        portal: "Official Portal: cybercrime.gov.in",
        rbiSachet: "RBI Sachet Portal: sachet.rbi.org.in"
      }
    }
  },

  te: {
    app: {
      name: "సురక్షానెట్ AI",
      tagline: "డిజిటల్ బ్లాక్‌మెయిల్ మరియు ఆన్‌లైన్ మోసాల నుండి AI ఆధారిత రక్షణ",
      helplineBanner: "ఆపదలో ఉన్నారా లేదా డబ్బు నష్టపోయారా? జాతీయ సైబర్ క్రైమ్ హెల్ప్‌లైన్‌కు కాల్ చేయండి: 1930 (టోల్ ఫ్రీ)",
      modeLive: "లైవ్ జెమినీ AI సక్రియంగా ఉంది",
      modeDemo: "డెమో / ఆఫ్‌లైన్ బ్యాకప్ మోడ్",
      responsiblePledge: "సురక్షానెట్ AI అనేది సహాయక భద్రతా సాధనం. ఇది పోలీసులకు ప్రత్యామ్నాయం కాదు, నేరాన్ని నిర్ధారించదు."
    },
    nav: {
      home: "ముఖ్య వివరాలు",
      analyze: "మోసాన్ని విశ్లేషించండి",
      vault: "ఎవిడెన్స్ వాల్ట్",
      report: "ఇన్సిడెంట్ డాసియర్",
      safetyCenter: "సేఫ్టీ సెంటర్",
      panicButton: "నేను మోసపోతున్నాను!"
    },
    hero: {
      headline: "భయపడవద్దు. ప్రమాదాన్ని అర్థం చేసుకోండి. మీ సాక్ష్యాలను కాపాడుకోండి.",
      subheadline: "డిజిటల్ అరెస్ట్‌లు, నకిలీ సీబీఐ/పోలీస్ నోటీసులు, అక్రమ లోన్ యాప్‌ల వేధింపులు మరియు ఫిషింగ్ బెదిరింపుల కోసం తక్షణ AI రక్షణ.",
      btnPanic: "నేను మోసపోతున్నాను (అత్యవసరం)",
      btnAnalyze: "అనుమానాస్పద సమాచారాన్ని విశ్లేషించండి",
      btnDemo: "డెమో కేసులను చూడండి",
      stats: {
        casesAssisted: "10,000+ మోసాల నమూనాలు",
        scamCategories: "6 ప్రధాన ప్రమాద విభాగాలు",
        preservation: "SHA-256 క్రిప్టోగ్రాఫిక్ భద్రత",
        responseSpeed: "< 3 సెకన్ల తక్షణ విశ్లేషణ"
      }
    },
    panicModal: {
      title: "తక్షణ భద్రతా నియమావళి - ప్రశాంతంగా ఉండండి",
      subtitle: "ఏదైనా చర్య తీసుకునే ముందు వెంటనే ఈ 4 ముఖ్యమైన నియమాలను పాటించండి:",
      rules: [
        {
          title: "డబ్బును ఎట్టి పరిస్థితుల్లోనూ బదిలీ చేయవద్దు",
          desc: "నిజమైన పోలీసులు, సీబీఐ లేదా కోర్టులు 'వెరిఫికేషన్ అకౌంట్' పేరుతో డబ్బు పంపమని ఎప్పుడూ అడగవు."
        },
        {
          title: "వీడియో / స్కైప్ కాల్స్‌ను వెంటనే నిలిపివేయండి",
          desc: "భారతీయ చట్టంలో 'డిజిటల్ అరెస్ట్' అనేది పూర్తిగా మోసం. ఏ పోలీసు విభాగం కూడా వీడియో కాల్ ద్వారా అరెస్ట్ చేయదు."
        },
        {
          title: "OTPలను పంచుకోవద్దు & అనుమానాస్పద యాప్‌లను ఇన్‌స్టాల్ చేయవద్దు",
          desc: "ఎవరితోనూ బ్యాంకింగ్ పాస్‌వర్డ్‌లు, OTPలు చెప్పవద్దు. AnyDesk, TeamViewer వంటి యాప్‌లను డౌన్‌లోడ్ చేయవద్దు."
        },
        {
          title: "స్క్రీన్‌షాట్‌లు & మెసేజ్‌లను భద్రపరచండి",
          desc: "చాట్‌లను డిలీట్ చేయవద్దు. సాక్ష్యాధారంగా సమయం మరియు SHA-256 హాష్‌తో రికార్డు పొందడానికి ఇక్కడ అప్‌లోడ్ చేయండి."
        }
      ],
      btnProceedAnalyze: "AI సాక్ష్యాల విశ్లేషణకు వెళ్లండి",
      btnClose: "మూసివేయండి"
    },
    analyze: {
      title: "అనుమానాస్పద సమాచార విశ్లేషణ సాధనం",
      subtitle: "వాట్సాప్/ఎస్ఎంఎస్ మెసేజ్‌ను పేస్ట్ చేయండి లేదా నోటీసు స్క్రీన్‌షాట్‌ను అప్‌లోడ్ చేయండి. సురక్షానెట్ వివరాలను పరిశీలించి విశ్లేషిస్తుంది.",
      tabPaste: "టెక్స్ట్ / మెసేజ్ పేస్ట్ చేయండి",
      tabUpload: "స్క్రీన్‌షాట్ / పీడీఎఫ్ అప్‌లోడ్ చేయండి",
      tabDemo: "డెమో కేసును ఎంచుకోండి",
      pastePlaceholder: "మీకు వచ్చిన అనుమానాస్పద మెసేజ్ లేదా నోటీసు టెక్స్ట్‌ను ఇక్కడ పేస్ట్ చేయండి...",
      uploadPrompt: "స్క్రీన్‌షాట్ లేదా పీడీఎఫ్‌ను ఇక్కడ డ్రాగ్ చేయండి లేదా క్లిక్ చేసి ఎంచుకోండి",
      uploadNote: "గరిష్ట పరిమాణం: 25 MB. ఫైల్స్ సురక్షితంగా మరియు SHA-256 హాషింగ్‌తో ప్రాసెస్ చేయబడతాయి.",
      btnAnalyze: "సురక్షానెట్ AI తో విశ్లేషించండి",
      analyzing: "మోసపూరిత వివరాలను విశ్లేషిస్తోంది...",
      demoSelectorTitle: "పరీక్షించడానికి వాస్తవ దృష్టాంతాన్ని ఎంచుకోండి:",
      hashPreview: "రియల్ టైమ్ ఎవిడెన్స్ హాష్ (SHA-256):",
      disclaimerNote: "బాధ్యతాయుతమైన AI గమనిక: AI ఎవరినీ నేరస్థులుగా ఆరోపించదు. సమాచారాన్ని మాత్రమే విశ్లేషిస్తుంది."
    },
    analysis: {
      headerTitle: "ప్రమాద & బెదిరింపు సమగ్ర నివేదిక",
      riskBadge: "ప్రమాద స్థాయి",
      confidenceBadge: "ఖచ్చితత్వ అంచనా",
      categoryBadge: "మోసం వర్గీకరణ",
      whyFlaggedTitle: "సురక్షానెట్ దీనిని ఎందుకు అనుమానించింది",
      whyFlaggedSubtitle: "సమర్పించిన సమాచారంలో గుర్తించిన ఆధారాలు మరియు కారణాలు:",
      extractedTitle: "గుర్తించిన కీలక వివరాలు",
      extractedSubtitle: "సమర్పించిన పత్రాల నుండి సేకరించిన సమాచారం:",
      extractedDisclaimer: "సమర్పించిన వివరాల నుండి మాత్రమే సేకరించబడింది. సురక్షానెట్ అదనపు వివరాలను సృష్టించదు.",
      safeActionTitle: "తక్షణ సురక్షిత కార్యాచరణ ప్రణాళిక",
      safeActionSubtitle: "మిమ్మల్ని మరియు మీ కుటుంబాన్ని రక్షించుకోవడానికి తీసుకోవాల్సిన చర్యలు:",
      immediateActions: "దశ 1: తక్షణ రక్షణ చర్యలు",
      nextActions: "దశ 2: ఫిర్యాదు & రికవరీ చర్యలు",
      missingContextTitle: "పత్రంలో లేని సాంకేతిక అంశాలు",
      downloadReportBtn: "ఇన్సిడెంట్ డాసియర్ డౌన్‌లోడ్ (PDF)",
      viewVaultBtn: "ఎవిడెన్స్ వాల్ట్‌లో భద్రపరచండి",
      newAnalysisBtn: "మరొకటి విశ్లేషించండి",
      disclaimer: "సురక్షానెట్ AI అనేది సహాయక సాధనం. AI విశ్లేషణలో లోపాలు ఉండవచ్చు. ముఖ్యమైన అంశాలను అధికారిక సంస్థలతో సరిచూసుకోండి."
    },
    entities: {
      phones: "ఫోన్ / సంప్రదింపు నంబర్లు",
      upis: "UPI ఐడీలు / పేమెంట్ హ్యాండిల్స్",
      banks: "బ్యాంక్ ఖాతాలు / IFSC",
      urls: "అనుమానాస్పద లింకులు / వెబ్‌సైట్లు",
      impersonated: "నకిలీ సంస్థలు / ప్రభుత్వ విభాగాలు",
      demands: "డిమాండ్ చేసిన డబ్బు మొత్తం",
      deadlines: "గడువు / అత్యవసర సమయం",
      keywords: "బెదిరింపు పదాలు",
      noneDetected: "ఏవీ గుర్తించబడలేదు"
    },
    vault: {
      title: "సాక్ష్యాల భద్రతా వాల్ట్ (Evidence Vault)",
      subtitle: "అధికారిక ఫిర్యాదుల కోసం SHA-256 హాష్‌లతో కూడిన సాక్ష్యాధారాల రికార్డులు.",
      tableColFile: "ఫైల్ / ఆధారం",
      tableColCategory: "విభాగం",
      tableColRisk: "ప్రమాద స్థాయి",
      tableColHash: "SHA-256 హాష్",
      tableColTimestamp: "సమయం (IST)",
      tableColAction: "చర్యలు",
      copyHash: "హాష్ కాపీ చేయండి",
      hashCopied: "కాపీ అయింది!",
      viewDossier: "డాసియర్ చూడండి",
      empty: "ఇంకా ఎటువంటి రికార్డులు లేవు. భద్రపరచడానికి ఒక అంశాన్ని విశ్లేషించండి.",
      integrityNote: "SHA-256 హాష్ అనేది సమర్పించిన తర్వాత ఫైల్ మార్చబడలేదని నిరూపించడానికి ఉపయోగపడుతుంది. చట్టబద్ధమైన ధృవీకరణను సంబంధిత అధికారులు చేయాల్సి ఉంటుంది."
    },
    report: {
      dossierTitle: "సాక్ష్యాల భద్రతా ఇన్సిడెంట్ డాసియర్",
      dossierSubtitle: "సురక్షానెట్ AI ప్రమాద విశ్లేషణ & సాక్ష్యాధారాల నివేదిక",
      generatedOn: "రూపొందించిన తేదీ",
      incidentRef: "డాసియర్ రిఫరెన్స్ ఐడీ",
      summarySection: "1. మోసం వర్గీకరణ & ప్రమాద సారాంశం",
      evidenceSection: "2. సేకరించిన కీలక సమాచారం",
      indicatorsSection: "3. గుర్తించిన అనుమానాస్పద అంశాలు & ఆధారాలు",
      actionSection: "4. సూచించిన భద్రతా చర్యలు",
      integritySection: "5. డిజిటల్ సాక్ష్యాల సమగ్రత & క్రిప్టోగ్రాఫిక్ సీల్",
      legalDisclaimerTitle: "అధికారిక హెచ్చరిక & చట్టపరమైన నిరాకరణ",
      legalDisclaimerText: "ఈ పత్రం బాధితులకు తక్షణ రక్షణ కల్పించడానికి మరియు సాక్ష్యాలను భద్రపరచడానికి సురక్షానెట్ AI రూపొందించిన సాంకేతిక నివేదిక. ఇది న్యాయస్థాన తీర్పు లేదా అధికారిక పోలీసు FIR కాదు. భారతీయ చట్టం ప్రకారం అంతిమ ధృవీకరణను సైబర్ ఫోరెన్సిక్ అధికారులు నిర్వహించాలి.",
      printBtn: "PDF డాసియర్ డౌన్‌లోడ్ చేయండి",
      backBtn: "విశ్లేషణకు తిరిగి వెళ్లండి"
    },
    safetyCenter: {
      title: "సైబర్ భద్రతా కేంద్రం & అవగాహన",
      subtitle: "మీ హక్కులను తెలుసుకోండి. నిజమైన చట్ట అమలు సంస్థలు రాజ్యాంగ నిబంధనల ప్రకారం పనిచేస్తాయి.",
      modules: [
        {
          id: "digital-arrest",
          title: "డిజిటల్ అరెస్ట్ మోసాలు",
          tag: "అత్యంత ప్రమాదకరం",
          desc: "మీ ఆధార్ లేదా పార్సిల్ మాదకద్రవ్యాల కేసులో ఉందని సీబీఐ/పోలీసుల పేరుతో స్కైప్ లేదా వాట్సాప్ ద్వారా భయపెట్టడం.",
          truth: "నిజమైన పోలీసులు ఎప్పుడూ వాట్సాప్‌లో అరెస్ట్ వారెంట్లు పంపరు లేదా స్కైప్‌లో విచారణ జరపరు. చట్టంలో 'డిజిటల్ అరెస్ట్' లేదు.",
          actions: ["వీడియో కాల్‌ను వెంటనే కట్ చేయండి", "ఎటువంటి డబ్బు డిపాజిట్ చేయవద్దు", "తక్షణమే 1930 హెల్ప్‌లైన్‌కు కాల్ చేయండి"]
        },
        {
          id: "loan-app",
          title: "అక్రమ లోన్ యాప్‌ల బ్లాక్‌మెయిల్",
          tag: "వేధింపుల మోసం",
          desc: "చిన్న మొత్తాల రుణాలు ఇచ్చి, ఫోన్ కాంటాక్ట్‌లు మరియు ఫోటోలను దొంగిలించి, మార్ఫింగ్ ఫోటోలతో బ్లాక్‌మెయిల్ చేయడం.",
          truth: "ఆర్బీఐ నిబంధనల ప్రకారం కాంటాక్టులను వేధించడం చట్టవిరుద్ధం. మార్ఫింగ్ బెదిరింపులు ఐటీ చట్టం 67A ప్రకారం నేరం.",
          actions: ["యాప్ అనుమతులను రద్దు చేసి అన్‌ఇన్‌స్టాల్ చేయండి", "కుటుంబ సభ్యులకు ముందుగానే తెలియజేయండి", "cybercrime.gov.in లో ఫిర్యాదు చేయండి"]
        },
        {
          id: "phishing-apk",
          title: "విద్యుత్ బిల్లు / ప్రమాదకర APK మోసాలు",
          tag: "బ్యాంకింగ్ ఫ్రాడ్",
          desc: "ఈ రాత్రికే కరెంట్ కట్ అవుతుందని ఎస్ఎంఎస్ పంపి, గుర్తుతెలియని నంబర్‌కు కాల్ చేయమని లేదా APK ఫైల్ ఇన్‌స్టాల్ చేయమని మోసం చేయడం.",
          truth: "విద్యుత్ శాఖ రాత్రివేళల్లో ముందస్తు నోటీసు లేకుండా కరెంట్ కట్ చేయదు, థర్డ్ పార్టీ APK ఫైళ్లను పంపదు.",
          actions: ["APK ఫైళ్లను ఎప్పుడూ డౌన్‌లోడ్ చేయవద్దు", "1912 అధికారిక హెల్ప్‌లైన్‌లో సరిచూసుకోండి", "పొరపాటున ఇన్‌స్టాల్ చేస్తే ఏరోప్లేన్ మోడ్ ఆన్ చేయండి"]
        },
        {
          id: "upi-refund",
          title: "UPI పిన్ & క్యూఆర్ కోడ్ మోసాలు",
          tag: "చెల్లింపుల మోసం",
          desc: "డబ్బులు పొరపాటున వచ్చాయని లేదా మీకు డబ్బు పంపుతున్నామని చెప్పి క్యూఆర్ కోడ్ స్కాన్ చేయమని లేదా UPI పిన్ ఎంటర్ చేయమని అడగడం.",
          truth: "డబ్బును స్వీకరించడానికి UPI PIN ఎంటర్ చేయాల్సిన అవసరం లేదు. PIN అనేది మీ ఖాతా నుండి డబ్బు పంపడానికి మాత్రమే.",
          actions: ["డబ్బులు పొందడానికి ఎప్పుడూ PIN కొట్టవద్దు", "యూపీఐ యాప్‌లో నంబర్‌ను బ్లాక్ చేయండి", "బ్యాంక్ ఫ్రాడ్ డెస్క్‌ను సంప్రదించండి"]
        }
      ],
      helplineCard: {
        title: "అత్యవసర అధికారిక సైబర్ క్రైమ్ వివరాలు",
        helpline: "జాతీయ సైబర్ క్రైమ్ హెల్ప్‌లైన్: 1930",
        portal: "అధికారిక వెబ్‌సైట్: cybercrime.gov.in",
        rbiSachet: "ఆర్బీఐ సచేత్ పోర్టల్: sachet.rbi.org.in"
      }
    }
  }
};
