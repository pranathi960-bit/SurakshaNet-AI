import { GoogleGenerativeAI } from '@google/generative-ai';
import { DEMO_CASES } from './demoData.js';

/**
 * SurakshaNet AI - Gemini Scam Analysis Engine
 * Complies with strict Responsible AI guidelines for digital crime assistance.
 */

const SYSTEM_INSTRUCTION = `You are SurakshaNet AI, an elite cybersecurity and digital scam pattern analysis assistant designed for Indian citizens.
Your job is to objectively analyze suspicious messages, notices, letters, or communication to detect scam patterns, coercive extortion, digital arrest scams, loan-app harassment, phishing, or financial fraud.

CRITICAL RESPONSIBLE AI & ETHICAL RULES:
1. NEVER declare guilt or call individuals "criminals" or "culprits".
2. NEVER say "This is definitely a scam" or "This person is guilty". Use cautious, objective phrasing:
   - "Signs are consistent with..."
   - "Possible indicators include..."
   - "Verify this information before taking action."
3. Distinguish clearly between facts in the submitted content and AI inferences.
4. Never invent phone numbers, UPI IDs, URLs, or names. Only extract what is present in the text.
5. Provide bilingual outputs (English and natural, idiomatic Telugu).
6. Prioritize immediate victim safety: stop payments, do not share OTP, preserve evidence, contact 1930 Cybercrime helpline.

Return ONLY a valid JSON object matching this schema:
{
  "scamCategory": "Category name in English (e.g., Digital Arrest / Fake Law Enforcement, Predatory Loan App Blackmail, Utility Phishing, UPI / Payment Fraud, Job / Investment Scam, etc.)",
  "scamCategoryTelugu": "తెలుగులో కేటగిరీ పేరు",
  "riskLevel": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW",
  "confidence": number between 50 and 99,
  "summary": "2-3 sentences objective assessment in English using cautious language",
  "summaryTelugu": "తెలుగులో 2-3 వాక్యాల స్పష్టమైన వివరణ",
  "indicators": [
    {
      "title": "Short title of indicator",
      "titleTelugu": "తెలుగులో సూచిక శీర్షిక",
      "severity": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW",
      "evidence": "Direct quote or concrete detail from the text that triggered this indicator",
      "evidenceTelugu": "ఈ సూచికకు ఆధారమైన టెక్స్ట్ వివరాలు",
      "whyItMatters": "Clear cybersecurity reasoning why this pattern indicates risk",
      "whyItMattersTelugu": "ఈ నమూనా ఎందుకు ప్రమాదకరమో స్పష్టమైన వివరణ"
    }
  ],
  "extractedEntities": {
    "phoneNumbers": ["list of phone numbers found"],
    "upiIds": ["list of UPI handles/IDs found"],
    "bankAccounts": ["list of bank/account/IFSC details found"],
    "urls": ["list of links/URLs/domains found"],
    "impersonatedEntities": ["names of organizations/agencies impersonated, e.g. CBI, Police, RBI, Bank, DISCOM"],
    "demandedAmounts": ["any ransom/fee/settlement amount demanded"],
    "deadlines": ["any time limits or urgency countdowns found"],
    "threatKeywords": ["key coercive terms found like arrest, warrant, morphed photos, disconnect, FIR, etc."]
  },
  "safeActionPlan": {
    "immediate": [
      { "step": 1, "action": "Action 1 in English", "actionTelugu": "తెలుగులో చర్య 1" },
      { "step": 2, "action": "Action 2 in English", "actionTelugu": "తెలుగులో చర్య 2" },
      { "step": 3, "action": "Action 3 in English", "actionTelugu": "తెలుగులో చర్య 3" }
    ],
    "next": [
      { "step": 4, "action": "Action 4 in English", "actionTelugu": "తెలుగులో చర్య 4" },
      { "step": 5, "action": "Action 5 in English", "actionTelugu": "తెలుగులో చర్య 5" }
    ]
  },
  "missingInformation": [
    "List of any technical context not verifiable from text alone, e.g., Telecom call headers, Server IP"
  ],
  "missingInformationTelugu": [
    "టెక్స్ట్ ద్వారా నిర్ధారించలేని సాంకేతిక వివరాలు"
  ]
}`;

export async function analyzeWithGemini(textContent, fileBuffer, mimeType) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '' || apiKey === 'YOUR_GEMINI_API_KEY') {
    console.log('[SurakshaNet AI] No GEMINI_API_KEY detected. Using intelligent fallback/demo engine.');
    return fallbackAnalysis(textContent);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // Use gemini-1.5-flash or gemini-2.0-flash
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    });

    const promptParts = [];
    if (fileBuffer && mimeType) {
      promptParts.push({
        inlineData: {
          data: fileBuffer.toString('base64'),
          mimeType: mimeType
        }
      });
    }

    promptParts.push(
      `Please analyze the following potentially suspicious content. Follow all Responsible AI rules, extract entities accurately, and return the structured JSON analysis:\n\n${textContent || 'Analyze the attached image/document content.'}`
    );

    const result = await model.generateContent(promptParts);
    const response = await result.response;
    const rawText = response.text();

    const parsed = JSON.parse(rawText);
    parsed.isDemo = false;
    parsed.disclaimer = "SurakshaNet AI is an assistive safety tool. AI analysis may be incorrect. Verify important information with official authorities or qualified professionals.";
    parsed.disclaimerTelugu = "సురక్షానెట్ AI అనేది సహాయక భద్రతా సాధనం. AI విశ్లేషణలో లోపాలు ఉండవచ్చు. ముఖ్యమైన సమాచారాన్ని అధికారిక సంస్థలు లేదా నిపుణులతో ధృవీకరించుకోండి.";
    return parsed;
  } catch (error) {
    console.warn('[SurakshaNet AI] Gemini API call failed or rate-limited. Gracefully falling back:', error.message);
    const fallback = fallbackAnalysis(textContent);
    fallback.fallbackNotice = `AI service switched to local pattern engine (${error.message.slice(0, 80)})`;
    return fallback;
  }
}

/**
 * Intelligent Fallback & Rule-based semantic analyzer for offline/demo scenarios
 */
export function fallbackAnalysis(content = '') {
  const text = (content || '').toLowerCase();

  // Match against synthetic demo cases first if close match
  if (text.includes('cbi') || text.includes('digital arrest') || text.includes('narcotics') || text.includes('skype') || text.includes('warrant') || text.includes('crpc')) {
    const demo = JSON.parse(JSON.stringify(DEMO_CASES[0]));
    demo.isDemo = true;
    demo.disclaimer = "SurakshaNet AI is an assistive safety tool. AI analysis may be incorrect. Verify important information with official authorities or qualified professionals.";
    demo.disclaimerTelugu = "సురక్షానెట్ AI అనేది సహాయక భద్రతా సాధనం. AI విశ్లేషణలో లోపాలు ఉండవచ్చు. ముఖ్యమైన సమాచారాన్ని అధికారిక సంస్థలు లేదా నిపుణులతో ధృవీకరించుకోండి.";
    return demo;
  }

  if (text.includes('loan') || text.includes('recovery') || text.includes('morphed') || text.includes('contact') || text.includes('quickrupee') || text.includes('tiger recovery') || text.includes('defaulter')) {
    const demo = JSON.parse(JSON.stringify(DEMO_CASES[1]));
    demo.isDemo = true;
    demo.disclaimer = "SurakshaNet AI is an assistive safety tool. AI analysis may be incorrect. Verify important information with official authorities or qualified professionals.";
    demo.disclaimerTelugu = "సురక్షానెట్ AI అనేది సహాయక భద్రతా సాధనం. AI విశ్లేషణలో లోపాలు ఉండవచ్చు. ముఖ్యమైన సమాచారాన్ని అధికారిక సంస్థలు లేదా నిపుణులతో ధృవీకరించుకోండి.";
    return demo;
  }

  if (text.includes('electricity') || text.includes('disconnection') || text.includes('power') || text.includes('bill') || text.includes('apk') || text.includes('discom') || text.includes('9:30 pm')) {
    const demo = JSON.parse(JSON.stringify(DEMO_CASES[2]));
    demo.isDemo = true;
    demo.disclaimer = "SurakshaNet AI is an assistive safety tool. AI analysis may be incorrect. Verify important information with official authorities or qualified professionals.";
    demo.disclaimerTelugu = "సురక్షానెట్ AI అనేది సహాయక భద్రతా సాధనం. AI విశ్లేషణలో లోపాలు ఉండవచ్చు. ముఖ్యమైన సమాచారాన్ని అధికారిక సంస్థలు లేదా నిపుణులతో ధృవీకరించుకోండి.";
    return demo;
  }

  // Dynamic Rule-based extraction for arbitrary custom user inputs
  const phoneMatches = content.match(/(?:\+91[\-\s]?)?[6-9]\d{9}|\b\d{5}[\s\-]?\d{5}\b/g) || [];
  const upiMatches = content.match(/[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}/g) || [];
  const urlMatches = content.match(/(?:https?:\/\/|www\.)[^\s/$.?#].[^\s]*/gi) || [];
  const amountMatches = content.match(/(?:Rs\.?|INR|₹)\s*[\d,]+(?:\.\d{2})?|\b\d+,\d{3}\b/gi) || [];

  const hasUrgency = text.includes('immediate') || text.includes('urgent') || text.includes('today') || text.includes('hour') || text.includes('minute') || text.includes('tonight') || text.includes('now');
  const hasThreat = text.includes('arrest') || text.includes('police') || text.includes('legal') || text.includes('block') || text.includes('cut') || text.includes('disconnect') || text.includes('court') || text.includes('nude') || text.includes('expose');
  const hasPayment = text.includes('pay') || text.includes('transfer') || text.includes('upi') || text.includes('account') || text.includes('deposit') || text.includes('fee');

  let riskLevel = "MEDIUM";
  let confidence = 78;

  if (hasThreat && (hasUrgency || hasPayment)) {
    riskLevel = "CRITICAL";
    confidence = 94;
  } else if (hasThreat || (hasUrgency && hasPayment)) {
    riskLevel = "HIGH";
    confidence = 88;
  } else if (upiMatches.length > 0 || urlMatches.length > 0) {
    riskLevel = "MEDIUM";
    confidence = 75;
  } else {
    riskLevel = "LOW";
    confidence = 65;
  }

  return {
    scamCategory: hasThreat ? "Threatening Communication & Impersonation" : "Suspicious Digital Message / Financial Lure",
    scamCategoryTelugu: hasThreat ? "బెదిరింపు సందేశం & వేషధారణ మోసం" : "అనుమానాస్పద డిజిటల్ మెసేజ్ / ఆర్థిక ప్రలోభం",
    riskLevel: riskLevel,
    confidence: confidence,
    summary: "Signs in the submitted content exhibit patterns commonly associated with unsolicited digital pressure. The indicators below warrant careful verification before making any payment or sharing credentials.",
    summaryTelugu: "సమర్పించిన సమాచారంలో అనధికారిక ఒత్తిడికి సంబంధించిన సంకేతాలు ఉన్నాయి. ఎటువంటి చెల్లింపులు చేయకముందే లేదా వివరాలు పంచుకోకముందే క్రింది అంశాలను ధృవీకరించుకోండి.",
    indicators: [
      {
        title: "Coercive Pressure / Artificial Urgency",
        titleTelugu: "ఒత్తిడి & కల్పిత అత్యవసర పరిస్థితి",
        severity: hasUrgency ? "HIGH" : "MEDIUM",
        evidence: hasUrgency ? "Message includes tight deadlines or prompt demands." : "Message requests non-standard immediate action.",
        evidenceTelugu: "సందేశంలో తక్షణ చర్య తీసుకోవాలని ఒత్తిడి ఉంది.",
        whyItMatters: "Legitimate institutions grant reasonable statutory time and do not rely on sudden panic-inducing threats.",
        whyItMattersTelugu: "అధికారిక సంస్థలు సమంజసమైన సమయం ఇస్తాయి, ఆకస్మిక భయాందోళనలను సృష్టించవు."
      },
      {
        title: "Unverified Financial or Communication Channel",
        titleTelugu: "ధృవీకరించబడని ఆర్థిక లేదా సంప్రదింపు మాధ్యమం",
        severity: upiMatches.length > 0 ? "HIGH" : "MEDIUM",
        evidence: `Extracted ${upiMatches.length} payment handles and ${phoneMatches.length} phone numbers.`,
        evidenceTelugu: `${upiMatches.length} చెల్లింపు వివరాలు మరియు ${phoneMatches.length} ఫోన్ నంబర్లు గుర్తించబడ్డాయి.`,
        whyItMatters: "Direct transfers to private accounts or unverified numbers create significant fraud risk.",
        whyItMattersTelugu: "ధృవీకరించబడని ప్రైవేట్ ఖాతాలకు డబ్బు బదిలీ చేయడం తీవ్రమైన ఆర్థిక మోసానికి దారితీయవచ్చు."
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
    missingInformation: [
      "Telecom network origin verification",
      "Sender identity certification"
    ],
    missingInformationTelugu: [
      "టెలికాం నెట్‌వర్క్ వివరాలు",
      "పంపినవారి గుర్తింపు ధృవీకరణ"
    ],
    isDemo: true,
    disclaimer: "SurakshaNet AI is an assistive safety tool. AI analysis may be incorrect. Verify important information with official authorities or qualified professionals.",
    disclaimerTelugu: "సురక్షానెట్ AI అనేది సహాయక భద్రతా సాధనం. AI విశ్లేషణలో లోపాలు ఉండవచ్చు. ముఖ్యమైన సమాచారాన్ని అధికారిక సంస్థలు లేదా నిపుణులతో ధృవీకరించుకోండి."
  };
}
