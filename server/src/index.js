import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import crypto from 'crypto';
import { DEMO_CASES } from './demoData.js';
import { analyzeWithGemini } from './geminiService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for Vite frontend
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsers with generous limits for documents/images
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Multer memory storage for uploaded screenshots/PDFs
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 } // 25 MB max
});

/**
 * Health & API status
 */
app.get('/api/health', (req, res) => {
  const hasKey = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '' && process.env.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY';
  res.json({
    status: 'ok',
    service: 'SurakshaNet AI Core',
    geminiConfigured: hasKey,
    mode: hasKey ? 'LIVE_GEMINI_AI' : 'INTELLIGENT_DEMO_FALLBACK',
    timestamp: new Date().toISOString()
  });
});

/**
 * Get all synthetic demo cases
 */
app.get('/api/demo-cases', (req, res) => {
  res.json({
    success: true,
    count: DEMO_CASES.length,
    cases: DEMO_CASES
  });
});

/**
 * Get a single demo case by ID
 */
app.get('/api/demo-cases/:id', (req, res) => {
  const found = DEMO_CASES.find(c => c.id === req.params.id);
  if (!found) {
    return res.status(404).json({ success: false, error: 'Demo case not found' });
  }
  res.json({ success: true, case: found });
});

/**
 * Main Analysis Endpoint
 * Supports multipart file upload + text OR JSON payload
 */
app.post('/api/analyze', upload.single('file'), async (req, res) => {
  try {
    const textContent = req.body.text || req.body.sampleText || '';
    const file = req.file;
    const clientHash = req.body.evidenceHash;
    const clientFileName = req.body.fileName;

    if (!textContent && !file) {
      return res.status(400).json({
        success: false,
        error: 'Please provide either text message content or upload an evidence file/screenshot.'
      });
    }

    // Compute Cryptographic SHA-256 Hash for Evidence Preservation Dossier
    let calculatedHash = '';
    let fileName = clientFileName || 'pasted-text-incident.txt';
    let fileSize = 'N/A';

    if (file) {
      calculatedHash = crypto.createHash('sha256').update(file.buffer).digest('hex');
      fileName = file.originalname;
      fileSize = `${(file.size / 1024).toFixed(1)} KB`;
    } else if (clientHash) {
      calculatedHash = clientHash;
    } else {
      calculatedHash = crypto.createHash('sha256').update(Buffer.from(textContent, 'utf-8')).digest('hex');
      fileSize = `${textContent.length} characters`;
    }

    const incidentId = `SRK-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const timestamp = new Date().toISOString();

    // Run AI analysis (Gemini or Fallback)
    const analysis = await analyzeWithGemini(
      textContent,
      file ? file.buffer : null,
      file ? file.mimetype : null
    );

    const responsePayload = {
      success: true,
      incidentId: incidentId,
      timestamp: timestamp,
      evidenceHash: calculatedHash,
      fileName: fileName,
      fileSize: fileSize,
      submittedContent: textContent || `[Uploaded file: ${fileName}]`,
      ...analysis
    };

    res.json(responsePayload);
  } catch (error) {
    console.error('[SurakshaNet API] Error analyzing incident:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred during analysis. Falling back safely.',
      details: error.message
    });
  }
});

/**
 * Utility: Compute SHA-256 Hash
 */
app.post('/api/hash', upload.single('file'), (req, res) => {
  try {
    let hash = '';
    if (req.file) {
      hash = crypto.createHash('sha256').update(req.file.buffer).digest('hex');
    } else if (req.body.text) {
      hash = crypto.createHash('sha256').update(Buffer.from(req.body.text, 'utf-8')).digest('hex');
    } else {
      return res.status(400).json({ error: 'No content provided for hashing' });
    }

    res.json({
      hash: hash,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`[SurakshaNet AI] Server listening on port ${PORT}`);
  console.log(`[SurakshaNet AI] Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`[SurakshaNet AI] Gemini API Key status: ${process.env.GEMINI_API_KEY ? 'Present' : 'Not configured (using fallback)'}`);
});
