import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Sparkles, Trash2, ArrowRight, ShieldAlert, AlertCircle } from 'lucide-react';
import { DEMO_PRESETS } from '../data/medicalKnowledge';

interface SymptomInputProps {
  initialValue?: string;
  onAnalyze: (text: string) => void;
  isLoading?: boolean;
}

export const SymptomInput: React.FC<SymptomInputProps> = ({
  initialValue = '',
  onAnalyze,
  isLoading = false,
}) => {
  const [text, setText] = useState(initialValue);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setText(initialValue);
  }, [initialValue]);

  // Check speech recognition support
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = 'en-US';

      recog.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recog.onerror = () => {
        setIsListening(false);
      };

      recog.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recog;
    }
  }, []);

  const toggleMic = () => {
    if (!speechSupported) {
      alert('Speech recognition is not supported in this browser environment. You can type freely into the symptom box.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
        setErrorMessage('');
      } catch (e) {
        console.error('Speech recognition error', e);
      }
    }
  };

  const handleClear = () => {
    setText('');
    setErrorMessage('');
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!text.trim()) {
      setErrorMessage('Please describe at least one symptom to begin the analysis.');
      return;
    }
    if (text.trim().length < 5) {
      setErrorMessage('We couldn\'t confidently identify this symptom. Try describing it using a few more words.');
      return;
    }
    setErrorMessage('');
    onAnalyze(text.trim());
  };

  const handleSelectPreset = (presetText: string) => {
    setText(presetText);
    setErrorMessage('');
  };

  const charCount = text.length;

  return (
    <div id="symptom-input-container" className="w-full space-y-4">
      {/* Privacy note */}
      <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800/80 rounded-lg text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60">
        <ShieldAlert className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
        <span>
          <strong>Privacy Note:</strong> Please avoid entering highly sensitive personal identification (passwords, full medical IDs, or contact numbers).
        </span>
      </div>

      {/* Main Text Input Box */}
      <div className="relative p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 focus-within:border-teal-500 dark:focus-within:border-teal-400 focus-within:ring-4 focus-within:ring-teal-500/10 shadow-sm transition-all">
        <textarea
          id="symptom-description-textarea"
          rows={4}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (errorMessage) setErrorMessage('');
          }}
          placeholder="Example: I've had a severe headache and mild fever since yesterday. I also feel nauseous after eating."
          className="w-full bg-transparent text-sm sm:text-base text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden resize-none leading-relaxed"
        />

        {/* Bottom controls inside the box */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 mt-2">
          {/* Left tools: Clear, Mic, Char Counter */}
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-mono text-[11px]">{charCount} characters</span>

            {text && (
              <button
                type="button"
                id="clear-input-btn"
                onClick={handleClear}
                className="flex items-center gap-1 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                title="Clear input"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}

            {/* Mic Button */}
            <button
              type="button"
              id="voice-input-mic-btn"
              onClick={toggleMic}
              className={`p-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                isListening
                  ? 'bg-rose-100 dark:bg-rose-950 text-rose-600 animate-pulse font-medium'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}
              title={speechSupported ? (isListening ? 'Stop listening' : 'Dictate with voice') : 'Voice input placeholder'}
            >
              {isListening ? <MicOff className="w-3.5 h-3.5 text-rose-600" /> : <Mic className="w-3.5 h-3.5" />}
              <span className="text-[11px]">{isListening ? 'Listening...' : 'Voice Input'}</span>
            </button>
          </div>

          {/* Analyze Button */}
          <button
            type="button"
            id="analyze-symptoms-btn"
            disabled={isLoading}
            onClick={() => handleSubmit()}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 hover:from-blue-950 hover:to-teal-800 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-teal-900/15 flex items-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-teal-300" />
            <span>{isLoading ? 'Analyzing...' : 'Analyze Symptoms'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Error state */}
      {errorMessage && (
        <div id="input-error-alert" className="flex items-center gap-2 p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-xs sm:text-sm text-rose-800 dark:text-rose-200">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Example Prompts */}
      <div className="space-y-2 pt-1">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Try these realistic symptom descriptions:
        </div>
        <div className="flex flex-wrap gap-2">
          {DEMO_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              id={`preset-btn-${preset.id}`}
              onClick={() => handleSelectPreset(preset.text)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer text-left ${
                preset.isUrgent
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/60'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-teal-400 dark:hover:border-teal-600 hover:bg-teal-50/40 dark:hover:bg-teal-950/20'
              }`}
            >
              <div className="font-semibold">{preset.label}</div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500">{preset.summary}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
