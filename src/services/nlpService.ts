import {
  HealthTopic,
  HistoryRecord,
  QAMessage,
  SymptomAnalysisResult,
  UserProfile,
} from '../types';
import { AcademicNLPEngine } from './nlpEngine';
import { HEALTH_TOPICS, MOCK_QA_DATABASE } from '../data/medicalKnowledge';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const HISTORY_STORAGE_KEY = 'mediquery_history_v1';
const USER_STORAGE_KEY = 'mediquery_user_v1';

// Initial pre-seeded realistic academic history records
const DEFAULT_HISTORY: HistoryRecord[] = [
  {
    id: 'hist-1',
    date: 'Sep 12, 2026',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 9,
    mainSymptoms: ['Headache', 'Fever'],
    duration: '2 days',
    severity: 'Moderate',
    riskLevel: 'moderate',
    status: 'Completed',
    analysisData: AcademicNLPEngine.runAnalysis('I had a headache and mild fever for two days.')
  },
  {
    id: 'hist-2',
    date: 'Sep 18, 2026',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 3,
    mainSymptoms: ['Abdominal Pain', 'Nausea'],
    duration: '3 days',
    severity: 'Severe',
    riskLevel: 'moderate',
    status: 'Completed',
    analysisData: AcademicNLPEngine.runAnalysis('Severe stomach pain after eating for three days with nausea.')
  },
  {
    id: 'hist-3',
    date: 'Sep 20, 2026',
    timestamp: Date.now() - 1000 * 60 * 60 * 18,
    mainSymptoms: ['Cough', 'Sore Throat'],
    duration: '3 days',
    severity: 'Mild',
    riskLevel: 'low',
    status: 'Completed',
    analysisData: AcademicNLPEngine.runAnalysis('Mild coughing and sore throat for three days.')
  }
];

export class NLPService {
  /**
   * Main symptom analysis endpoint (/api/analyze)
   */
  static async analyzeSymptoms(
    inputText: string,
    followUpAnswers: Record<string, string> = {}
  ): Promise<SymptomAnalysisResult> {
    if (API_BASE_URL) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: inputText, }),
        });
        if (response.ok) {
          return await response.json();
        }
      } catch (err) {
        console.warn('Backend API unavailable, falling back to local NLP engine:', err);
      }
    }

    // Local deterministic academic NLP engine
    // Add brief artificial processing delay to allow the multi-stage visual loader to show
    await new Promise((resolve) => setTimeout(resolve, 800));
    const result = AcademicNLPEngine.runAnalysis(inputText, followUpAnswers);

    // Persist to local history
    this.saveAnalysisToHistory(result);

    return result;
  }

  /**
   * Refine an existing symptom analysis with interactive slot-filling answers
   */
  static async refineWithFollowUps(
    currentResult: SymptomAnalysisResult,
    followUpAnswers: Record<string, string>
  ): Promise<SymptomAnalysisResult> {
    const combinedAnswers = {
      ...currentResult.followUpAnswers,
      ...followUpAnswers,
    };
    return this.analyzeSymptoms(currentResult.inputText, combinedAnswers);
  }

  /**
   * Question Answering endpoint (/api/qa)
   */
  static async askQuestion(questionText: string): Promise<QAMessage> {
    if (API_BASE_URL) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/analyze`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
  },
          body: JSON.stringify({
        text: inputText,
  }),
});

if (response.ok) {
  const result: SymptomAnalysisResult = await response.json();

  // Preserve the follow-up answers on the frontend.
  result.followUpAnswers = followUpAnswers;

  return result;
}
      } catch (err) {
        console.warn('Backend QA API unavailable, using local medical QA retrieval:', err);
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    const clean = questionText.toLowerCase();

    // Query medical knowledge base
    const match = MOCK_QA_DATABASE.find((item) =>
      item.keywords.some((kw) => clean.includes(kw.toLowerCase()))
    );

    if (match) {
      return {
        id: `qa-${Date.now()}`,
        role: 'assistant',
        text: match.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: match.category,
        sources: match.sources,
        safetyDisclaimer: match.safetyDisclaimer,
        relatedTopics: [match.category, 'Preventative Wellness', 'Symptom Triage'],
      };
    }

    // General fallback answer based on keyword detection
    let category = 'General Health';
    let answer = `MediQuery's knowledge retrieval engine identified your query regarding health topics. In clinical decision support, early symptom clarification, structured self-monitoring, and hydration are primary initial considerations.`;

    if (clean.includes('fever') || clean.includes('temperature')) {
      category = 'Common Symptoms';
      answer = 'Fever is an elevated body temperature typically signaling an immune response. Stay hydrated with water and oral electrolytes, rest comfortably in light clothing, and consult a physician if fever exceeds 103°F (39.4°C) or lasts over 3 days.';
    } else if (clean.includes('stomach') || clean.includes('nausea') || clean.includes('digestion')) {
      category = 'Digestive';
      answer = 'Digestive discomfort often correlates with meal composition, eating speed, or gastrointestinal irritation. Small, bland meals (such as the BRAT diet) and adequate fluids are gentle initial approaches. Persistent or localized severe pain requires in-person medical evaluation.';
    } else if (clean.includes('headache') || clean.includes('migraine')) {
      category = 'Neurological';
      answer = 'Headaches stem from various mechanisms including muscular tension, dehydration, sleep irregularity, eye strain, or migraines. Rest in a dark, quiet area, maintain hydration, and seek emergency care immediately for sudden "thunderclap" headaches.';
    } else {
      answer = `Based on natural language parsing of your question ("${questionText}"), here is general educational health information: ensure adequate hydration, note any associated signs, and avoid strenuous activity if feeling unwell. Remember that MediQuery does not provide clinical diagnoses; please speak with a certified healthcare professional for individualized care.`;
    }

    return {
      id: `qa-${Date.now()}`,
      role: 'assistant',
      text: answer,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category,
      sources: ['MediQuery Academic Medical Knowledge Base v1.0', 'WHO Essential Guidance Corpus'],
      safetyDisclaimer: 'For educational purposes only. Always consult a healthcare professional for clinical decisions.',
      relatedTopics: [category, 'Educational Guidance'],
    };
  }

  /**
   * Health Topics retrieval (/api/health-topics)
   */
  static async getHealthTopics(): Promise<HealthTopic[]> {
    if (API_BASE_URL) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/health-topics`);
        if (response.ok) return await response.json();
      } catch (err) {
        console.warn('Backend Health Topics API unavailable, using local corpus:', err);
      }
    }
    return HEALTH_TOPICS;
  }

  /**
   * History list retrieval (/api/history)
   */
  static getHistory(): HistoryRecord[] {
    try {
      const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load history from localStorage', e);
    }
    // Initialize default history
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(DEFAULT_HISTORY));
    return DEFAULT_HISTORY;
  }

  static saveAnalysisToHistory(result: SymptomAnalysisResult): void {
    try {
      const current = this.getHistory();
      const newRecord: HistoryRecord = {
        id: result.id,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        timestamp: Date.now(),
        mainSymptoms: result.extractedInformation.symptoms.length > 0 ? result.extractedInformation.symptoms : ['Unspecified Symptoms'],
        duration: result.extractedInformation.duration,
        severity: result.extractedInformation.severity,
        riskLevel: result.riskAssessment.level,
        status: result.riskAssessment.level === 'urgent' ? 'Urgent Review' : 'Completed',
        analysisData: result,
      };

      const updated = [newRecord, ...current.filter((r) => r.id !== result.id)];
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save analysis to history', e);
    }
  }

  static deleteHistoryRecord(id: string): HistoryRecord[] {
    const current = this.getHistory();
    const filtered = current.filter((item) => item.id !== id);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(filtered));
    return filtered;
  }

  static clearAllHistory(): void {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify([]));
  }

  /**
   * User profile management
   */
  static getUserProfile(): UserProfile {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return {
      name: 'Guest User',
      email: 'guest.student@university.edu',
      age: 23,
      preferredLanguage: 'English',
      isGuest: true,
      historySettings: {
        saveToLocal: true,
        autoClearDays: 30,
      },
      privacySettings: {
        telemetryOptIn: false,
        anonymizeInput: true,
      },
    };
  }

  static saveUserProfile(profile: UserProfile): void {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profile));
  }
}
