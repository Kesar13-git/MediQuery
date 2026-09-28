import React, { useState, useEffect } from 'react';
import { SymptomInput } from '../components/SymptomInput';
import { NLPProcessingLoader } from '../components/NLPProcessingLoader';
import { EntityHighlight } from '../components/EntityHighlight';
import { EntityChip } from '../components/EntityChip';
import { ExtractedInformationCard } from '../components/ExtractedInformationCard';
import { FollowUpQA } from '../components/FollowUpQuestion';
import { RiskAssessmentCard } from '../components/RiskBadge';
import { ConditionCard } from '../components/ConditionCard';
import { GuidanceCard } from '../components/GuidanceCard';
import { ExplainabilityPanel } from '../components/ExplainabilityPanel';
import { ReportModal } from '../components/ReportModal';
import { MedicalDisclaimer } from '../components/MedicalDisclaimer';
import { NLPService } from '../services/nlpService';
import { SymptomAnalysisResult, HistoryRecord, UserProfile } from '../types';
import {
  RotateCcw,
  FileText,
  BookmarkPlus,
  BookmarkCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Stethoscope,
  HelpCircle,
} from 'lucide-react';

interface SymptomCheckerPageProps {
  initialPrompt?: string;
  onSaveToHistory: (record: HistoryRecord) => void;
  activeAnalysisResult?: SymptomAnalysisResult | null;
  onClearActiveAnalysis?: () => void;
  user: UserProfile;
}

type CheckerStep = 'input' | 'processing' | 'extracted_review' | 'followup_qa' | 'final_analysis';

export const SymptomCheckerPage: React.FC<SymptomCheckerPageProps> = ({
  initialPrompt = '',
  onSaveToHistory,
  activeAnalysisResult = null,
  onClearActiveAnalysis,
  user,
}) => {
  const [step, setStep] = useState<CheckerStep>('input');
  const [inputText, setInputText] = useState(initialPrompt);
  const [analysisResult, setAnalysisResult] = useState<SymptomAnalysisResult | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // If a historical result was passed in, jump straight to final analysis
  useEffect(() => {
    if (activeAnalysisResult) {
      setAnalysisResult(activeAnalysisResult);
      setInputText(activeAnalysisResult.inputText);
      setStep('final_analysis');
    }
  }, [activeAnalysisResult]);

  // Update input text when initialPrompt changes
  useEffect(() => {
    if (initialPrompt && step === 'input') {
      setInputText(initialPrompt);
    }
  }, [initialPrompt]);

  const handleStartAnalysis = (text: string) => {
    setInputText(text);
    setStep('processing');
    setIsSaved(false);
  };

  const handleProcessingComplete = async () => {
    try {
      const result = await NLPService.analyzeSymptoms(inputText);
      setAnalysisResult(result);

      // Auto-save to history if user preferences allow
      if (user.historySettings.saveToLocal) {
        const historyItem: HistoryRecord = {
          id: result.id,
          date: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          timestamp: Date.now(),
          mainSymptoms: result.extractedInformation.symptoms.length > 0
            ? result.extractedInformation.symptoms
            : ['General Discomfort'],
          duration: result.extractedInformation.duration || 'Not specified',
          severity: result.extractedInformation.severity || 'Mild',
          riskLevel: result.riskAssessment.level,
          status: result.riskAssessment.level === 'urgent' ? 'Urgent Review' : 'Completed',
          analysisData: result,
        };
        onSaveToHistory(historyItem);
        setIsSaved(true);
      }

      // If missing information questions exist, prompt the interactive QA step first
      if (result.followUpQuestions && result.followUpQuestions.length > 0) {
        setStep('extracted_review');
      } else {
        setStep('final_analysis');
      }
    } catch (err) {
      console.error('NLP Analysis error', err);
      setStep('input');
    }
  };

  const handleFinishFollowUp = async (answers: Record<string, string>) => {
    if (!analysisResult) return;
    setStep('processing');

    try {
      const refinedResult = await NLPService.refineWithFollowUps(analysisResult, answers);
      setAnalysisResult(refinedResult);
      setStep('final_analysis');
    } catch (err) {
      console.error('Refinement error', err);
      setStep('final_analysis');
    }
  };

  const handleReset = () => {
    setStep('input');
    setInputText('');
    setAnalysisResult(null);
    setIsSaved(false);
    if (onClearActiveAnalysis) onClearActiveAnalysis();
  };

  const handleManualSave = () => {
    if (!analysisResult) return;
    const historyItem: HistoryRecord = {
      id: analysisResult.id,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      timestamp: Date.now(),
      mainSymptoms: analysisResult.extractedInformation.symptoms.length > 0
        ? analysisResult.extractedInformation.symptoms
        : ['General Discomfort'],
      duration: analysisResult.extractedInformation.duration || 'Not specified',
      severity: analysisResult.extractedInformation.severity || 'Mild',
      riskLevel: analysisResult.riskAssessment.level,
      status: analysisResult.riskAssessment.level === 'urgent' ? 'Urgent Review' : 'Completed',
      analysisData: analysisResult,
    };
    onSaveToHistory(historyItem);
    setIsSaved(true);
  };

  return (
    <div id="symptom-checker-page" className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Universal Mandatory Safety Banner */}
      <MedicalDisclaimer />

      {/* Header section */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Symptom Checker
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Describe your symptoms naturally in your own words. You do not need to know or use medical terminology.
        </p>
      </div>

      {/* STEP 1: INPUT */}
      {step === 'input' && (
        <div className="space-y-6">
          <SymptomInput
            initialValue={inputText}
            onAnalyze={handleStartAnalysis}
            isLoading={false}
          />
        </div>
      )}

      {/* STEP 2: PROCESSING ANIMATION */}
      {step === 'processing' && (
        <NLPProcessingLoader onComplete={handleProcessingComplete} />
      )}

      {/* STEP 3: EXTRACTED REVIEW & NER HIGHLIGHTS */}
      {step === 'extracted_review' && analysisResult && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="p-4 bg-teal-50/70 dark:bg-teal-950/40 rounded-xl border border-teal-200/80 dark:border-teal-900/60 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-teal-900 dark:text-teal-200 text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Step 1 of 2: Natural Language Extraction Complete</span>
            </div>
            <button
              type="button"
              onClick={() => setStep('final_analysis')}
              className="text-xs font-semibold text-teal-700 dark:text-teal-300 hover:underline cursor-pointer"
            >
              Skip directly to final analysis &rarr;
            </button>
          </div>

          {/* NER Visualization Component */}
          <EntityHighlight
            originalText={analysisResult.inputText}
            entities={analysisResult.entities}
          />

          {/* Structured Slots Extracted */}
          <ExtractedInformationCard info={analysisResult.extractedInformation} />

          {/* Interactive Follow-up QA Module */}
          {analysisResult.followUpQuestions && analysisResult.followUpQuestions.length > 0 && (
            <FollowUpQA
              questions={analysisResult.followUpQuestions}
              onFinishFollowUp={handleFinishFollowUp}
              onSkip={() => setStep('final_analysis')}
            />
          )}

          {/* Next Button */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              id="proceed-to-final-btn"
              onClick={() => setStep('final_analysis')}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <span>View Full Health Guidance</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: FINAL ANALYSIS DASHBOARD */}
      {step === 'final_analysis' && analysisResult && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Top Bar with Status and Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Evaluation Complete
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Your Symptom Analysis
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                id="generate-report-btn"
                onClick={() => setShowReportModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Generate Report</span>
              </button>

              <button
                type="button"
                onClick={handleManualSave}
                disabled={isSaved}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-xs sm:text-sm font-medium transition-colors cursor-pointer disabled:opacity-60"
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-teal-600" />
                    <span>Saved to History</span>
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="w-4 h-4 text-slate-500" />
                    <span>Save Analysis</span>
                  </>
                )}
              </button>

              <button
                type="button"
                id="new-symptom-check-btn"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>New Check</span>
              </button>
            </div>
          </div>

          {/* Risk / Urgency Card */}
          <RiskAssessmentCard risk={analysisResult.riskAssessment} />

          {/* NER & Extracted Information Recap */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Extracted Clinical Entity Findings</span>
            </h3>
            <EntityHighlight
              originalText={analysisResult.inputText}
              entities={analysisResult.entities}
            />
            <ExtractedInformationCard info={analysisResult.extractedInformation} />
          </div>

          {/* Possible Related Conditions (Overlap Indicators) */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-teal-600" />
                <span>Possible Related Conditions</span>
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Educational symptom overlap &bull; Not a diagnostic confirmation
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {analysisResult.relatedConditions.map((condition) => (
                <ConditionCard key={condition.id} condition={condition} />
              ))}
            </div>
          </div>

          {/* General Guidance Section */}
          <GuidanceCard guidance={analysisResult.guidance} />

          {/* Explainability & NLP Viva Inspector */}
          <ExplainabilityPanel analysis={analysisResult} />

          {/* Bottom Actions */}
          <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-0.5 text-center sm:text-left">
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                Finished with this symptom review?
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Generate an exportable summary or start a new check session.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowReportModal(true)}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Open Health Report
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Start New Check
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && analysisResult && (
        <ReportModal
          analysis={analysisResult}
          onClose={() => setShowReportModal(false)}
        />
      )}
    </div>
  );
};
