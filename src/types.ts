export type EntityCategory =
  | 'SYMPTOM'
  | 'DISEASE'
  | 'BODY_PART'
  | 'MEDICATION'
  | 'SEVERITY'
  | 'DURATION'
  | 'FREQUENCY'
  | 'TRIGGER'
  | 'AGE'
  | 'TEMPERATURE'
  | 'OTHER';

export interface MedicalEntity {
  id: string;
  text: string;
  type: EntityCategory;
  startIndex: number;
  endIndex: number;
  confidence: number;
  normalized?: string;
  description?: string;
}

export interface ExtractedInformation {
  symptoms: string[];
  severity: string;
  duration: string;
  frequency: string;
  triggers: string[];
  bodyParts: string[];
  medications: string[];
  associatedSymptoms: string[];
  missingInformation: string[];
}

export interface FollowUpQuestion {
  id: string;
  question: string;
  description?: string;
  category: string;
  options: string[];
  selectedOption?: string;
  customAnswer?: string;
}

export type OverlapLevel = 'High' | 'Moderate' | 'Low';

export interface RelatedCondition {
  id: string;
  name: string;
  overlap: OverlapLevel;
  overlapPercentage: number;
  matchingSymptoms: string[];
  description: string;
  generalGuidance: string;
  consultationUrgency: 'routine' | 'prompt' | 'immediate';
}

export type RiskLevel = 'low' | 'moderate' | 'urgent';

export interface RiskAssessment {
  level: RiskLevel;
  title: string;
  description: string;
  isUrgentFlag: boolean;
  urgentWarningSigns?: string[];
  recommendedAction: string;
}

export interface GuidanceData {
  monitoring: string[];
  whenToSeekHelp: string[];
  questionsForDoctor: string[];
  generalSelfCare: string[];
}

export interface NLPProcessingTrace {
  rawInput: string;
  preprocessedText: string;
  tokens: string[];
  lemmas: string[];
  removedStopwords: string[];
  entitiesDetected: MedicalEntity[];
  extractedAttributes: Record<string, string | string[]>;
  followUpResponses: Record<string, string>;
  retrievedRules: string[];
  pipelineStages: {
    stage: string;
    description: string;
    durationMs: number;
  }[];
  totalLatencyMs: number;
}

export interface SymptomAnalysisResult {
  id: string;
  timestamp: string;
  inputText: string;
  entities: MedicalEntity[];
  extractedInformation: ExtractedInformation;
  missingInformation: string[];
  followUpQuestions: FollowUpQuestion[];
  followUpAnswers: Record<string, string>;
  riskAssessment: RiskAssessment;
  relatedConditions: RelatedCondition[];
  guidance: GuidanceData;
  nlpTrace: NLPProcessingTrace;
}

export interface HealthTopic {
  id: string;
  title: string;
  category: 'Common Symptoms' | 'Respiratory' | 'Digestive' | 'Neurological' | 'Skin' | 'General Wellness';
  overview: string;
  commonSymptoms: string[];
  associatedSymptoms: string[];
  whenToSeekHelp: string[];
  generalInformation: string[];
  redFlags?: string[];
}

export interface HistoryRecord {
  id: string;
  date: string;
  timestamp: number;
  mainSymptoms: string[];
  duration: string;
  severity: string;
  riskLevel: RiskLevel;
  status: 'Completed' | 'Follow-up Needed' | 'Urgent Review';
  analysisData: SymptomAnalysisResult;
}

export interface UserProfile {
  name: string;
  email: string;
  age?: number;
  preferredLanguage?: string;
  isGuest: boolean;
  historySettings: {
    saveToLocal: boolean;
    autoClearDays: number;
  };
  privacySettings: {
    telemetryOptIn: boolean;
    anonymizeInput: boolean;
  };
}

export interface QAMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  category?: string;
  sources?: string[];
  safetyDisclaimer?: string;
  relatedTopics?: string[];
}

export interface QAItem {
  id?: string;
  keywords?: string[];
  question: string;
  answer: string;
  category: string;
  sources?: string[];
  references?: string[];
  safetyDisclaimer?: string;
  relatedTopics?: string[];
}
