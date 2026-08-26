import type { AnalysisResult, DemoCase } from '../types';

const API_BASE = '/api';

export const CLIENT_DEMO_CASES: DemoCase[] = [
  {
    id: "demo-cbi-digital-arrest",
    title: "Fake CBI Digital Arrest & Money Laundering Notice",
    titleTelugu: "నకిలీ CBI డిజిటల్ అరెస్ట్ & మనీలాండరింగ్ నోటీసు",
    category: "Digital Arrest / Fake Law Enforcement Impersonation",
    categoryTelugu: "డిజిటల్ అరెస్ట్ / నకిలీ పోలీస్ & చట్ట అమలు సంస్థల మోసం",
    shortDescription: "Received an urgent official-looking document claiming illegal narcotics in a DHL parcel and demanding ₹2,85,000 for RBI verification over Skype.",
    shortDescriptionTelugu: "DHL పార్సిల్‌లో మాదకద్రవ్యాలు ఉన్నాయని, స్కైప్ ద్వారా RBI వెరిఫికేషన్ కోసం ₹2,85,000 డిమాండ్ చేస్తూ నకిలీ నోటీసు పంపారు.",
    sampleText: `CENTRAL BUREAU OF INVESTIGATION - CYBER CRIME CELL, NEW DELHI
ORDER OF DIGITAL ARREST & COMPLIANCE UNDER SECTION 41A CrPC
Case No: CBI/ECIR/2026/9821-ND | Date: Today

NOTICE TO ACCUSED:
Your Aadhaar and mobile credentials were found associated with 16 international narcotics couriers seized at Mumbai International Airport via FedEx/DHL. 

You are placed under IMMEDIATE DIGITAL ARREST via Skype Custody (Account: cbi.delhi.investigation.desk9).
Do not turn off your video or leave your room.

To prevent execution of NON-BAILABLE ARREST WARRANT within 30 MINUTES, you must transfer temporary security deposit of ₹2,85,000 to the Reserve Bank of India (RBI) Verification Escrow Account:
UPI ID: rbi.security.verification@okhdfcbank
Bank: HDFC Bank A/C 982310029318 (IFSC: HDFC0001282)

Failure to comply will lead to immediate physical arrest by local police unit.
Authorized Officer: IPS Dr. Vikramaditya Singh (+91 98765 43210)`,
    riskLevel: "CRITICAL",
    confidence: 99,
    summary: "Signs are strongly consistent with a classic 'Digital Arrest' coercion scam. Fraudsters fabricate bogus federal agency credentials (CBI/NCB/RBI) and utilize extreme intimidation tactics to compel immediate fund transfers.",
    summaryTelugu: "ఈ సంకేతాలు స్పష్టంగా 'డిజిటల్ అరెస్ట్' బలవంతపు మోసానికి సరిపోలుతున్నాయి. మోసగాళ్లు నకిలీ ప్రభుత్వ పత్రాలను (CBI/NCB/RBI) సృష్టించి, తక్షణమే డబ్బు బదిలీ చేసేలా బాధితులను తీవ్ర భయాందోళనలకు గురిచేస్తున్నారు.",
    indicators: [
      {
        title: "Artificial Extreme Urgency & Threat of Physical Arrest",
        titleTelugu: "కల్పిత అత్యవసర పరిస్థితి & తక్షణ అరెస్ట్ బెదిరింపు",
        severity: "CRITICAL",
        evidence: "Demands ₹2,85,000 within 30 minutes under threat of non-bailable warrant.",
        evidenceTelugu: "నాన్-బెయిలబుల్ వారెంట్ పేరుతో 30 నిమిషాల్లో ₹2,85,000 చెల్లించాలని డిమాండ్ చేశారు.",
        whyItMatters: "Scammers create false urgency so victims cannot contact real police, family members, or legal advisors.",
        whyItMattersTelugu: "బాధితులు నిజమైన పోలీసులను లేదా కుటుంబ సభ్యులను సంప్రదించకుండా భయాందోళనతో వెంటనే స్పందించేలా ఈ ఒత్తిడి తెస్తారు."
      },
      {
        title: "Fabricated 'Digital Arrest' Concept via Skype/Video",
        titleTelugu: "స్కైప్/వీడియో ద్వారా అక్రమ 'డిజిటల్ అరెస్ట్' ప్రచారం",
        severity: "CRITICAL",
        evidence: "Demands user stay on continuous Skype call ('cbi.delhi.investigation.desk9') under 'digital arrest'.",
        evidenceTelugu: "'డిజిటల్ అరెస్ట్' పేరిట స్కైప్ కాల్‌లో ఉండాలని నిర్బంధించారు.",
        whyItMatters: "Under Indian Law (CrPC/BNSS), there is NO legal provision for 'Digital Arrest' or interrogation over video calls. No legitimate police agency operates this way.",
        whyItMattersTelugu: "భారతీయ చట్టం ప్రకారం 'డిజిటల్ అరెస్ట్' అనే పద్ధతి చట్టవిరుద్ధం. ఏ నిజమైన పోలీసు లేదా దర్యాప్తు సంస్థ వీడియో కాల్ ద్వారా అరెస్ట్ చేయదు."
      },
      {
        title: "Demand for Fund Transfer to 'RBI Verification Escrow'",
        titleTelugu: "'RBI వెరిఫికేషన్ ఖాతా' పేరిట డబ్బు డిమాండ్",
        severity: "CRITICAL",
        evidence: "Instructs payment to UPI ID 'rbi.security.verification@okhdfcbank' and HDFC A/C 982310029318.",
        evidenceTelugu: "UPI ID 'rbi.security.verification@okhdfcbank' మరియు HDFC ఖాతాకు డబ్బు పంపాలని పేర్కొన్నారు.",
        whyItMatters: "RBI and police NEVER maintain personal escrow accounts or demand monetary deposits to 'clear' investigation suspects.",
        whyItMattersTelugu: "RBI లేదా పోలీసులు ఎప్పుడూ నిందితులను 'క్లియర్' చేయడానికి డబ్బులు డిమాండ్ చేయరు లేదా ప్రైవేట్ ఖాతాల్లోకి బదిలీ చేయమని చెప్పరు."
      },
      {
        title: "Counterfeit Government Seals & Impersonation",
        titleTelugu: "నకిలీ ప్రభుత్వ ముద్రలు మరియు అధికారుల వేషధారణ",
        severity: "HIGH",
        evidence: "Displays forged CBI Cyber Cell logo, fake IPS officer name, and bogus case numbers.",
        evidenceTelugu: "నకిలీ CBI లోగో, ఐపీఎస్ అధికారి పేరు, నకిలీ కేస్ నంబర్లను ఉపయోగించారు.",
        whyItMatters: "Misrepresenting national security agencies is a punishable offense under Section 66D IT Act and Bharatiya Nyaya Sanhita.",
        whyItMattersTelugu: "ప్రభుత్వ సంస్థల పేరుతో మోసం చేయడం ఐటీ చట్టం 66D మరియు భారతీయ న్యాయ సంహిత కింద తీవ్రమైన నేరం."
      }
    ],
    extractedEntities: {
      phoneNumbers: ["+91 98765 43210"],
      upiIds: ["rbi.security.verification@okhdfcbank"],
      bankAccounts: ["HDFC Bank A/C 982310029318 (IFSC: HDFC0001282)"],
      urls: ["cbi.delhi.investigation.desk9 (Skype)"],
      impersonatedEntities: ["Central Bureau of Investigation (CBI)", "Reserve Bank of India (RBI)", "FedEx / DHL Customs"],
      demandedAmounts: ["₹2,85,000"],
      deadlines: ["30 Minutes before Warrant Execution"],
      threatKeywords: ["Non-bailable arrest warrant", "Digital Custody Skype", "Money laundering investigation", "16 narcotics couriers", "Section 41A CrPC"]
    },
    safeActionPlan: {
      immediate: [
        { step: 1, action: "Immediately disconnect the call / cease all communication. DO NOT transfer any money.", actionTelugu: "వెంటనే కాల్‌ను డిస్‌కనెక్ట్ చేయండి / సంభాషణను ఆపండి. ఎట్టి పరిస్థితుల్లోనూ డబ్బు బదిలీ చేయవద్దు." },
        { step: 2, action: "Do not join any Skype, WhatsApp, or Zoom video calls. Remember: 'Digital Arrest' DOES NOT exist in Indian law.", actionTelugu: "ఎటువంటి స్కైప్, వాట్సాప్ లేదా జూమ్ వీడియో కాల్స్‌లో చేరవద్దు. భారతీయ చట్టంలో 'డిజిటల్ అరెస్ట్' లేదని గుర్తుంచుకోండి." },
        { step: 3, action: "Do not delete messages, letters, or call logs. Keep original files safe for evidence preservation.", actionTelugu: "మెసేజ్‌లు, లేఖలు లేదా కాల్ రికార్డులను డిలీట్ చేయవద్దు. సాక్ష్యాధారాల కోసం వాటిని భద్రపరచండి." }
      ],
      next: [
        { step: 4, action: "If you transferred money, call National Cybercrime Helpline 1930 immediately within the 'Golden Hour' to freeze the recipient bank account.", actionTelugu: "మీరు ఇప్పటికే డబ్బు బదిలీ చేసి ఉంటే, గోల్డెన్ అవర్‌లో ఖాతాను స్తంభింపజేయడానికి వెంటనే 1930 హెల్ప్‌లైన్‌కు కాల్ చేయండి." },
        { step: 5, action: "Report this incident on the National Cyber Crime Reporting Portal (cybercrime.gov.in) with your Evidence Dossier.", actionTelugu: "మీ ఎవిడెన్స్ డాసియర్‌తో cybercrime.gov.in లో అధికారికంగా ఫిర్యాదు నమోదు చేయండి." }
      ]
    },
    missingInformation: [
      "Telecom Carrier metadata / Original Caller IP headers",
      "Recordings of video call / audio demands"
    ],
    missingInformationTelugu: [
      "టెలికాం క్యారియర్ మెటాడేటా / అసలు కాలర్ ఐపీ హెడర్లు",
      "వీడియో కాల్ రికార్డింగ్ / ఆడియో డిమాండ్లు"
    ],
    evidenceHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    fileName: "CBI_Arrest_Warrant_Notice_9821.pdf"
  },
  {
    id: "demo-loan-app-blackmail",
    title: "Predatory Instant Loan App Extortion & Defamation Threat",
    titleTelugu: "అక్రమ లోన్ యాప్ బ్లాక్‌మెయిల్ & పరువు నష్టం బెదిరింపు",
    category: "Loan-App Harassment & Blackmail",
    categoryTelugu: "లోన్ యాప్ వేధింపులు & డిజిటల్ బ్లాక్‌మెయిల్",
    shortDescription: "Threatening WhatsApp messages demanding ₹38,000 for a ₹3,500 micro-loan, threatening to distribute morphed nude photos to all phone contacts.",
    shortDescriptionTelugu: "₹3,500 మైక్రో-లోన్‌కు ₹38,000 డిమాండ్ చేస్తూ, ఫోన్ కాంటాక్టులకు మార్ఫింగ్ చేసిన ఫోటోలు పంపుతామని వాట్సాప్‌లో బెదిరింపులు.",
    sampleText: `WARNING FINAL NOTICE - TIGER RECOVERY TEAM (QUICKRUPEE APP)
TO DEFALUTER:
Your loan of Rs 3,500 is OVERDUE. You must pay Rs 38,000 PENALTY SETTLEMENT IMMEDIATELY within 2 HOURS!

If not paid before 4:00 PM:
1. We have downloaded your 380 contacts & gallery photos.
2. Morphed vulgar obscene photos of you will be sent to your father, sister, employer and all WhatsApp groups.
3. Defamation posters labeling you 'FRAUD CHOR' will be published on Facebook & Instagram.

Pay immediately to UPI: fastcredit.settlement@icici
Contact Agent Rocky: +91 78912 34567 / +91 81234 56789.
Do not block us or consequences will be severe.`,
    riskLevel: "CRITICAL",
    confidence: 97,
    summary: "Signs are consistent with predatory digital lending extortion. Illegal lending entities harvest phone permissions (contacts/gallery) and use illicit blackmail, photo manipulation, and extreme social harassment.",
    summaryTelugu: "ఈ సంకేతాలు అక్రమ డిజిటల్ లోన్ యాప్ వేధింపులకు సరిపోలుతున్నాయి. అనుమతులు లేకుండా కాంటాక్ట్‌లు, గ్యాలరీని దొంగిలించి, మార్ఫింగ్ ఫోటోలు మరియు పరువు నష్టం బెదిరింపులతో బ్లాక్‌మెయిల్ చేస్తున్నారు.",
    indicators: [
      {
        title: "Extortionate Interest & Inflated Penalty (1000%+ Markup)",
        titleTelugu: "విపరీతమైన వడ్డీ & అక్రమ పెనాల్టీ డిమాండ్",
        severity: "CRITICAL",
        evidence: "Demanding ₹38,000 for a small ₹3,500 initial loan within days.",
        evidenceTelugu: "₹3,500 అసలు లోన్‌కు కేవలం కొన్ని రోజుల్లోనే ₹38,000 డిమాండ్ చేశారు.",
        whyItMatters: "Unregistered predatory lenders violate RBI Fair Practices Code and Digital Lending Guidelines with usurious rates and arbitrary penalties.",
        whyItMattersTelugu: "రిజర్వ్ బ్యాంక్ మార్గదర్శకాలకు విరుద్ధంగా అక్రమ లోన్ యాప్‌లు అన్యాయమైన ఛార్జీలు మరియు పెనాల్టీలను విధిస్తాయి."
      },
      {
        title: "Coercive Blackmail & Threat of Morphed Media Distribution",
        titleTelugu: "మార్ఫింగ్ ఫోటోల ప్రచారం & బ్లాక్‌మెయిల్ బెదిరింపు",
        severity: "CRITICAL",
        evidence: "Explicitly threatens to send morphed vulgar photos to family contacts and social media.",
        evidenceTelugu: "కుటుంబ సభ్యులకు, కాంటాక్ట్‌లకు మార్ఫింగ్ చేసిన అసభ్యకర ఫోటోలు పంపుతామని బెదిరించారు.",
        whyItMatters: "This constitutes severe criminal intimidation, extortion, and cyber harassment under Section 67/67A IT Act and BNS.",
        whyItMattersTelugu: "ఇది ఐటీ చట్టం సెక్షన్ 67/67A మరియు భారతీయ న్యాయ సంహిత కింద తీవ్రమైన నేరపూరిత బెదిరింపు మరియు వేధింపు."
      },
      {
        title: "Harassment and Abusive Language via Unregistered Numbers",
        titleTelugu: "అనామక నంబర్ల ద్వారా వేధింపులు మరియు దూషణలు",
        severity: "HIGH",
        evidence: "Threats issued through multiple virtual mobile numbers (+91 78912 34567).",
        evidenceTelugu: "వివిధ మొబైల్ నంబర్ల ద్వారా వాట్సాప్ బెదిరింపులు పంపారు.",
        whyItMatters: "Legitimate recovery agencies must follow strict RBI timing codes and cannot contact third-party family or friends.",
        whyItMattersTelugu: "నిబంధనల ప్రకారం రికవరీ ఏజెంట్లు కుటుంబ సభ్యులను లేదా స్నేహితులను వేధించడం చట్టవిరుద్ధం."
      }
    ],
    extractedEntities: {
      phoneNumbers: ["+91 78912 34567", "+91 81234 56789"],
      upiIds: ["fastcredit.settlement@icici"],
      bankAccounts: [],
      urls: [],
      impersonatedEntities: ["QuickRupee Loan App", "Tiger Recovery Team"],
      demandedAmounts: ["₹38,000 (Original Principal: ₹3,500)"],
      deadlines: ["2 Hours (Before 4:00 PM)"],
      threatKeywords: ["Morphed vulgar photos", "Downloaded 380 contacts", "Send to father and employer", "Defamation posters", "Fraud chor"]
    },
    safeActionPlan: {
      immediate: [
        { step: 1, action: "Do not give in to extortion demands. Paying money rarely stops blackmail and often leads to higher demands.", actionTelugu: "బ్లాక్‌మెయిలర్లకు డబ్బు చెల్లించవద్దు. ఒకసారి చెల్లిస్తే మరింత ఎక్కువ డబ్బు డిమాండ్ చేస్తారు." },
        { step: 2, action: "Revoke app permissions on your phone (Contacts, Storage, SMS) and uninstall the rogue loan application.", actionTelugu: "మీ ఫోన్‌లో యాప్ అనుమతులను (కాంటాక్ట్స్, స్టోరేజ్) రద్దు చేసి, వెంటనే ఆ లోన్ యాప్‌ను అన్‌ఇన్‌స్టాల్ చేయండి." },
        { step: 3, action: "Take full screenshots of all threatening WhatsApp chats, contact numbers, and UPI IDs.", actionTelugu: "అన్ని వాట్సాప్ బెదిరింపు చాట్‌లు, ఫోన్ నంబర్లు, యూపీఐ ఐడీల పూర్తి స్క్రీన్‌షాట్లు తీసి భద్రపరచండి." }
      ],
      next: [
        { step: 4, action: "Inform close family and friends proactively: 'My phone was hacked by a rogue loan app sending fake morphed messages. Please ignore and block.'", actionTelugu: "కుటుంబ సభ్యులకు తెలియజేయండి: 'నా ఫోన్ హ్యాక్ అయింది, ఫేక్ మెసేజ్‌లు వస్తే బ్లాక్ చేయండి'." },
        { step: 5, action: "File a cyber harassment and extortion complaint at cybercrime.gov.in and RBI Sachet portal (sachet.rbi.org.in).", actionTelugu: "cybercrime.gov.in మరియు RBI సచేత్ పోర్టల్ (sachet.rbi.org.in) లో అధికారిక ఫిర్యాదు నమోదు చేయండి." }
      ]
    },
    missingInformation: [
      "Application package name / APK download source",
      "Complete transaction history of initial loan disbursement"
    ],
    missingInformationTelugu: [
      "యాప్ ప్యాకేజీ పేరు / ఏపీకే డౌన్‌లోడ్ లింక్",
      "మొదటి రుణం జమ అయిన బ్యాంక్ లావాదేవీల రికార్డు"
    ],
    evidenceHash: "a4f89d38c110398f623bb6d28913ac8723901bce8276f923b78912c98a0ef982",
    fileName: "WhatsApp_Extortion_Chat_Threat.png"
  },
  {
    id: "demo-electricity-phishing",
    title: "Fake Electricity Disconnection & Malicious APK Phishing SMS",
    titleTelugu: "నకిలీ విద్యుత్ కనెక్షన్ రద్దు & మోసపూరిత APK ఫిషింగ్ మెసేజ్",
    category: "Phishing & Suspicious Messages / Utility Scam",
    categoryTelugu: "ఫిషింగ్ & నకిలీ యుటిలిటీ బిల్లుల మోసం",
    shortDescription: "Urgent SMS claiming power will be cut tonight at 9:30 PM due to unpaid bill, prompting user to call an unknown officer or install an APK link.",
    shortDescriptionTelugu: "కరెంట్ బిల్లు చెల్లించలేదని, రాత్రి 9:30కి విద్యుత్ కట్ చేస్తామని, ఒక నంబర్‌కు కాల్ చేయాలని లేదా APK డౌన్‌లోడ్ చేయాలని వచ్చిన నకిలీ మెసేజ్.",
    sampleText: `Dear Consumer,
Your Electricity power supply will be DISCONNECTED TONIGHT at 9:30 PM from the Electricity Substation Office because your previous month bill was not updated in server.

Immediately call our Electricity Officer Mr. RK Sharma at +91 99887 76655.
Or update bill payment through our official portal app:
http://update-bill-service.in/Mahadiscom_BillPay.apk

Ignore this message if already paid.
- Electricity Board (DISCOM)`,
    riskLevel: "HIGH",
    confidence: 94,
    summary: "Signs are consistent with a deceptive utility disconnection phishing lure. Attackers use urgency and threat of essential service disruption to trick users into calling a scammer or installing malicious screen-sharing APKs.",
    summaryTelugu: "ఈ సంకేతాలు మోసపూరిత విద్యుత్ బిల్లు ఫిషింగ్ మెసేజ్‌కు సరిపోలుతున్నాయి. కరెంట్ కట్ అవుతుందనే భయంతో బాధితులను నకిలీ అధికారికి కాల్ చేయించడం లేదా హానికరమైన APK యాప్ ఇన్‌స్టాల్ చేయించడం వీరి ఉద్దేశం.",
    indicators: [
      {
        title: "Imminent Disconnection Threat with Tonight's Deadline",
        titleTelugu: "ఈ రాత్రే విద్యుత్ కట్ చేస్తామనే అత్యవసర బెదిరింపు",
        severity: "HIGH",
        evidence: "Claims electricity will be disconnected tonight at 9:30 PM.",
        evidenceTelugu: "ఈ రాత్రి 9:30 గంటలకే విద్యుత్ సరఫరా నిలిపివేస్తామని పేర్కొన్నారు.",
        whyItMatters: "State DISCOMs follow statutory notice periods and never disconnect residential power without formal written notice and bill statement.",
        whyItMattersTelugu: "ప్రభుత్వ విద్యుత్ శాఖ నియమావళి ప్రకారం ముందస్తు రాతపూర్వక నోటీసు లేకుండా రాత్రిపూట కరెంట్ కట్ చేయదు."
      },
      {
        title: "Malicious APK Download Link Mimicking Utility Portal",
        titleTelugu: "నకిలీ వెబ్‌సైట్ మరియు హానికరమైన APK డౌన్‌లోడ్ లింక్",
        severity: "CRITICAL",
        evidence: "Links to untrusted third-party domain 'http://update-bill-service.in/Mahadiscom_BillPay.apk'.",
        evidenceTelugu: "నమ్మదగని వెబ్‌సైట్ 'http://update-bill-service.in/Mahadiscom_BillPay.apk' లింక్ ఇచ్చారు.",
        whyItMatters: "Direct APK installation bypasses Google Play Protect and often installs remote access malware (AnyDesk/Spyware) that steals banking OTPs.",
        whyItMattersTelugu: "ఇలాంటి థర్డ్-పార్టీ APK ఫైల్స్ మీ బ్యాంకింగ్ OTPలు మరియు స్క్రీన్‌ను దొంగిలించే స్పైవేర్‌ను ఇన్‌స్టాల్ చేస్తాయి."
      },
      {
        title: "Personal Mobile Number Provided as Official Helpline",
        titleTelugu: "అధికారిక హెల్ప్‌లైన్‌కు బదులు వ్యక్తిగత మొబైల్ నంబర్",
        severity: "HIGH",
        evidence: "Directs caller to personal 10-digit mobile number (+91 99887 76655) instead of 1912 toll-free.",
        evidenceTelugu: "అధికారిక 1912 టోల్‌ఫ్రీ నంబర్‌కు బదులుగా వ్యక్తిగత మొబైల్ నంబర్ ఇచ్చారు.",
        whyItMatters: "State power utilities operate through centralized toll-free customer care centers, not individual personal mobile numbers.",
        whyItMattersTelugu: "విద్యుత్ సంస్థలు అధికారిక కస్టమర్ కేర్ (1912) ద్వారా పనిచేస్తాయి, వ్యక్తిగత నంబర్ల ద్వారా కాదు."
      }
    ],
    extractedEntities: {
      phoneNumbers: ["+91 99887 76655"],
      upiIds: [],
      bankAccounts: [],
      urls: ["http://update-bill-service.in/Mahadiscom_BillPay.apk"],
      impersonatedEntities: ["State Electricity Distribution Company (DISCOM / Mahadiscom / TSSPDCL)"],
      demandedAmounts: ["Unspecified Previous Month Bill"],
      deadlines: ["Tonight at 9:30 PM"],
      threatKeywords: ["Power supply disconnected", "Substation office", "Previous month bill not updated", "Install APK"]
    },
    safeActionPlan: {
      immediate: [
        { step: 1, action: "DO NOT download or install the APK file. DO NOT click the link.", actionTelugu: "ఆ APK ఫైల్‌ను ఎట్టి పరిస్థితుల్లోనూ డౌన్‌లోడ్ చేయవద్దు లేదా లింక్‌పై క్లిక్ చేయవద్దు." },
        { step: 2, action: "DO NOT call the mobile number in the SMS. Do not share any OTP or card details.", actionTelugu: "ఆ మెసేజ్‌లోని మొబైల్ నంబర్‌కు కాల్ చేయవద్దు. ఎవరితోనూ OTP లేదా కార్డ్ వివరాలను పంచుకోవద్దు." },
        { step: 3, action: "If you already installed the APK, immediately turn on Airplane Mode, disconnect WiFi, and factory reset or use antivirus to remove the malware.", actionTelugu: "ఒకవేళ పొరపాటున APK ఇన్‌స్టాల్ చేసి ఉంటే, వెంటనే ఫోన్‌ను ఏరోప్లేన్ మోడ్‌లో పెట్టి, బ్యాంకింగ్ పాస్‌వర్డ్‌లను మార్చండి." }
      ],
      next: [
        { step: 4, action: "Check your actual electricity bill balance using the official state utility app or official portal (or call 1912).", actionTelugu: "అధికారిక విద్యుత్ యాప్ ద్వారా లేదా 1912 కి కాల్ చేసి మీ అసలు విద్యుత్ బిల్లు బకాయిలను సరిచూసుకోండి." },
        { step: 5, action: "Forward phishing SMS to 1909 (Telecom DND spam reporting) and report fraud to cybercrime.gov.in.", actionTelugu: "ఈ మోసపూరిత మెసేజ్‌ను 1909 కి ఫార్వార్డ్ చేయండి మరియు cybercrime.gov.in లో రిపోర్ట్ చేయండి." }
      ]
    },
    missingInformation: [
      "SMS Sender Header ID (e.g. AX-DISCOM)",
      "Official Consumer Account Number"
    ],
    missingInformationTelugu: [
      "ఎస్ఎంఎస్ సెండర్ హెడర్ ఐడీ",
      "అధికారిక విద్యుత్ కస్టమర్ సర్వీస్ నంబర్"
    ],
    evidenceHash: "f71b9e28c30198e721a998c21045db8890123ef6129845701928374619283746",
    fileName: "Electricity_Disconnection_SMS_Screenshot.png"
  }
];

/**
 * Compute SHA-256 Hash client-side using Web Crypto API
 */
export async function computeClientSha256(input: File | string): Promise<string> {
  try {
    let buffer: ArrayBuffer;
    if (typeof input === 'string') {
      const encoder = new TextEncoder();
      buffer = encoder.encode(input).buffer;
    } else {
      buffer = await input.arrayBuffer();
    }
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (err) {
    console.error('Error computing SHA-256 hash:', err);
    return 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
  }
}

/**
 * Check backend health & Gemini status
 */
export async function checkBackendHealth(): Promise<{ geminiConfigured: boolean; mode: string }> {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  } catch (err) {
    console.warn('Backend server unreachable or running standalone demo mode:', err);
    return { geminiConfigured: false, mode: 'STANDALONE_CLIENT_DEMO' };
  }
}

/**
 * Fetch Demo Cases from backend with instant fallback
 */
export async function fetchDemoCases(): Promise<DemoCase[]> {
  try {
    const res = await fetch(`${API_BASE}/demo-cases`);
    if (!res.ok) throw new Error('Failed to fetch demo cases');
    const data = await res.json();
    return data.cases;
  } catch (err) {
    console.warn('Using client-side fallback demo data');
    return CLIENT_DEMO_CASES;
  }
}

/**
 * Local rule-based analyzer for fallback
 */
function localRuleBasedAnalysis(content: string = ''): Partial<AnalysisResult> {
  const text = content.toLowerCase();

  if (text.includes('cbi') || text.includes('digital arrest') || text.includes('skype') || text.includes('narcotics')) {
    return { ...CLIENT_DEMO_CASES[0], isDemo: true };
  }
  if (text.includes('loan') || text.includes('recovery') || text.includes('morphed') || text.includes('quickrupee')) {
    return { ...CLIENT_DEMO_CASES[1], isDemo: true };
  }
  if (text.includes('electricity') || text.includes('disconnection') || text.includes('power') || text.includes('apk')) {
    return { ...CLIENT_DEMO_CASES[2], isDemo: true };
  }

  const phoneMatches = content.match(/(?:\+91[\-\s]?)?[6-9]\d{9}|\b\d{5}[\s\-]?\d{5}\b/g) || [];
  const upiMatches = content.match(/[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}/g) || [];
  const urlMatches = content.match(/(?:https?:\/\/|www\.)[^\s/$.?#].[^\s]*/gi) || [];
  const amountMatches = content.match(/(?:Rs\.?|INR|₹)\s*[\d,]+(?:\.\d{2})?|\b\d+,\d{3}\b/gi) || [];

  const hasUrgency = text.includes('immediate') || text.includes('urgent') || text.includes('today') || text.includes('hour') || text.includes('minute');
  const hasThreat = text.includes('arrest') || text.includes('police') || text.includes('legal') || text.includes('block') || text.includes('court');

  return {
    scamCategory: hasThreat ? "Threatening Communication & Impersonation" : "Suspicious Digital Message / Financial Lure",
    scamCategoryTelugu: hasThreat ? "బెదిరింపు సందేశం & వేషధారణ మోసం" : "అనుమానాస్పద డిజిటల్ మెసేజ్ / ఆర్థిక ప్రలోభం",
    riskLevel: hasThreat ? "CRITICAL" : (upiMatches.length > 0 ? "HIGH" : "MEDIUM"),
    confidence: hasThreat ? 94 : 80,
    summary: "Signs in the submitted content exhibit patterns commonly associated with unsolicited digital pressure. The indicators below warrant careful verification before making any payment or sharing credentials.",
    summaryTelugu: "సమర్పించిన సమాచారంలో అనధికారిక ఒత్తిడికి సంబంధించిన సంకేతాలు ఉన్నాయి. ఎటువంటి చెల్లింపులు చేయకముందే లేదా వివరాలు పంచుకోకముందే క్రింది అంశాలను ధృవీకరించుకోండి.",
    indicators: [
      {
        title: "Coercive Pressure / Artificial Urgency",
        titleTelugu: "ఒత్తిడి & కల్పిత అత్యవసర పరిస్థితి",
        severity: hasUrgency ? "HIGH" : "MEDIUM",
        evidence: hasUrgency ? "Message demands urgent response." : "Message requests non-standard immediate action.",
        evidenceTelugu: "సందేశంలో తక్షణ చర్య తీసుకోవాలని ఒత్తిడి ఉంది.",
        whyItMatters: "Legitimate institutions grant reasonable statutory time and do not rely on sudden panic-inducing threats.",
        whyItMattersTelugu: "అధికారిక సంస్థలు సమంజసమైన సమయం ఇస్తాయి, ఆకస్మిక భయాందోళనలను సృష్టించవు."
      }
    ],
    extractedEntities: {
      phoneNumbers: Array.from(new Set(phoneMatches)),
      upiIds: Array.from(new Set(upiMatches)),
      bankAccounts: [],
      urls: Array.from(new Set(urlMatches)),
      impersonatedEntities: hasThreat ? ["Unverified Authority / Caller"] : ["Unverified Sender"],
      demandedAmounts: Array.from(new Set(amountMatches)),
      deadlines: hasUrgency ? ["Immediate / Urgent"] : ["Unspecified"],
      threatKeywords: ["Unsolicited pressure", "Urgent transfer", "Unverified contact"]
    },
    safeActionPlan: {
      immediate: [
        { step: 1, action: "Do not transfer any money, enter UPI PINs, or share OTPs.", actionTelugu: "ఎటువంటి డబ్బు బదిలీ చేయవద్దు, UPI PIN లేదా OTPలను పంచుకోవద్దు." },
        { step: 2, action: "Do not click unverified links or install any APK files.", actionTelugu: "ధృవీకరించబడని లింక్‌లపై క్లిక్ చేయవద్దు లేదా APK ఫైళ్లను ఇన్‌స్టాల్ చేయవద్దు." },
        { step: 3, action: "Preserve the original message and screenshot for your records.", actionTelugu: "అసలు సందేశాన్ని మరియు స్క్రీన్‌షాట్‌ను భద్రపరచండి." }
      ],
      next: [
        { step: 4, action: "Verify independently through official websites or toll-free helplines.", actionTelugu: "అధికారిక వెబ్‌సైట్ లేదా టోల్‌ఫ్రీ హెల్ప్‌లైన్ ద్వారా స్వతంత్రంగా ధృవీకరించుకోండి." },
        { step: 5, action: "If financial loss occurred, call 1930 immediately.", actionTelugu: "డబ్బు నష్టం జరిగితే వెంటనే 1930 కి కాల్ చేయండి." }
      ]
    },
    missingInformation: ["Telecom network origin verification"],
    missingInformationTelugu: ["టెలికాం నెట్‌వర్క్ వివరాలు"],
    disclaimer: "SurakshaNet AI is an assistive safety tool. AI analysis may be incorrect. Verify important information with official authorities or qualified professionals.",
    disclaimerTelugu: "సురక్షానెట్ AI అనేది సహాయక భద్రతా సాధనం. AI విశ్లేషణలో లోపాలు ఉండవచ్చు. ముఖ్యమైన సమాచారాన్ని అధికారిక సంస్థలు లేదా నిపుణులతో ధృవీకరించుకోండి.",
    isDemo: true
  };
}

/**
 * Analyze Incident with SurakshaNet AI
 */
export async function analyzeIncident(params: {
  text?: string;
  file?: File | null;
  evidenceHash?: string;
  fileName?: string;
}): Promise<AnalysisResult> {
  const formData = new FormData();
  if (params.text) formData.append('text', params.text);
  if (params.file) formData.append('file', params.file);
  if (params.evidenceHash) formData.append('evidenceHash', params.evidenceHash);
  if (params.fileName) formData.append('fileName', params.fileName);

  try {
    const res = await fetch(`${API_BASE}/analyze`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error || `Server responded with status ${res.status}`);
    }

    return await res.json();
  } catch (err: any) {
    console.warn('API error, executing client-side fallback simulation:', err.message);
    const hash = params.evidenceHash || (await computeClientSha256(params.file || params.text || 'sample'));
    const fallback = localRuleBasedAnalysis(params.text || (params.file ? params.file.name : ''));
    
    return {
      incidentId: `SRK-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-OFFLINE`,
      timestamp: new Date().toISOString(),
      evidenceHash: hash,
      fileName: params.fileName || (params.file ? params.file.name : 'pasted-text.txt'),
      fileSize: params.file ? `${(params.file.size / 1024).toFixed(1)} KB` : 'N/A',
      submittedContent: params.text || (params.file ? `[File: ${params.file.name}]` : ''),
      scamCategory: fallback.scamCategory || "Suspicious Communication",
      scamCategoryTelugu: fallback.scamCategoryTelugu,
      riskLevel: fallback.riskLevel || "MEDIUM",
      confidence: fallback.confidence || 75,
      summary: fallback.summary || "Pattern analysis completed.",
      summaryTelugu: fallback.summaryTelugu,
      indicators: fallback.indicators || [],
      extractedEntities: fallback.extractedEntities || {
        phoneNumbers: [],
        upiIds: [],
        bankAccounts: [],
        urls: [],
        impersonatedEntities: [],
        demandedAmounts: [],
        deadlines: [],
        threatKeywords: []
      },
      safeActionPlan: fallback.safeActionPlan || { immediate: [], next: [] },
      missingInformation: fallback.missingInformation || [],
      missingInformationTelugu: fallback.missingInformationTelugu || [],
      disclaimer: "SurakshaNet AI is an assistive safety tool. AI analysis may be incorrect. Verify important information with official authorities or qualified professionals.",
      disclaimerTelugu: "సురక్షానెట్ AI అనేది సహాయక భద్రతా సాధనం. AI విశ్లేషణలో లోపాలు ఉండవచ్చు. ముఖ్యమైన సమాచారాన్ని అధికారిక సంస్థలు లేదా నిపుణులతో ధృవీకరించుకోండి.",
      isDemo: true,
      fallbackNotice: 'Executed in safe offline client fallback mode.'
    };
  }
}
