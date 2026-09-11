import React, { useState, useRef } from 'react';
import { ViewState, CaseReport, ImageDataPayload } from './types';
import { Landing } from './components/Landing/Landing';
import { FilingForm } from './components/Filing/FilingForm';
import { ProcessingSequence } from './components/Processing/ProcessingSequence';
import { CaseReportView } from './components/Report/CaseReportView';
import { submitInvestigation, submitAppeal } from './lib/api';
import { toggleSound, isSoundEnabled, playBruhTone } from './lib/sound';
import { Volume2, VolumeX, Shield, Sparkles, Skull, Flame } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [incidentText, setIncidentText] = useState<string>('');
  const [attachedImage, setAttachedImage] = useState<ImageDataPayload | null>(null);
  const [currentReport, setCurrentReport] = useState<CaseReport | null>(null);
  const [isAppealMode, setIsAppealMode] = useState<boolean>(false);
  const [audioActive, setAudioActive] = useState<boolean>(isSoundEnabled());

  // References for synchronization between the 3.5s checklist animation & API responses
  const pendingReportRef = useRef<CaseReport | null>(null);
  const animationFinishedRef = useRef<boolean>(false);

  const checkTransitionToResult = () => {
    if (animationFinishedRef.current && pendingReportRef.current) {
      setCurrentReport(pendingReportRef.current);
      if (isAppealMode) {
        setView('appeal-result');
      } else {
        setView('result');
      }
      playBruhTone();
    }
  };

  const handleGrievanceSubmit = (incident: string, image?: ImageDataPayload | null) => {
    setIncidentText(incident);
    setAttachedImage(image || null);
    setIsAppealMode(false);
    pendingReportRef.current = null;
    animationFinishedRef.current = false;
    setView('processing');

    // Launch parallel API request with image & text
    submitInvestigation(incident, image)
      .then((report) => {
        if (image && !report.imageAttachment) {
          report.imageAttachment = image.data;
        }
        pendingReportRef.current = report;
        checkTransitionToResult();
      })
      .catch((err) => {
        console.error('Investigation error:', err);
      });
  };

  const handleAppealRequest = () => {
    if (!currentReport) return;
    setIsAppealMode(true);
    pendingReportRef.current = null;
    animationFinishedRef.current = false;
    setView('processing');

    // Launch parallel appeal API request
    submitAppeal(incidentText, currentReport, attachedImage)
      .then((revisedReport) => {
        if (attachedImage && !revisedReport.imageAttachment) {
          revisedReport.imageAttachment = attachedImage.data;
        }
        pendingReportRef.current = revisedReport;
        checkTransitionToResult();
      })
      .catch((err) => {
        console.error('Appeal error:', err);
      });
  };

  const handleProcessingAnimationComplete = () => {
    animationFinishedRef.current = true;
    checkTransitionToResult();
  };

  const handleNewCase = () => {
    setCurrentReport(null);
    setIsAppealMode(false);
    setIncidentText('');
    setAttachedImage(null);
    setView('filing');
  };

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setAudioActive(newState);
  };

  return (
    <div className="min-h-screen text-[#F8FAFC] flex flex-col justify-between">
      {/* Top Status Bar - Federal Brainrot Task Force */}
      <header className="w-full max-w-(--breakpoint-md) mx-auto mt-4 px-4">
        <div className="flex justify-between items-center py-3 px-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 font-mono-doc text-xs sm:text-sm text-slate-200 shadow-lg">
          <button
            onClick={() => setView('landing')}
            className="flex items-center gap-2 hover:text-[#00f0ff] transition-colors cursor-pointer text-left"
          >
            <span className="text-base sm:text-lg">💀</span>
            <span className="font-bold tracking-tight">/ Federal Overthinking & Down Bad Task Force</span>
          </button>

          <div className="flex gap-3 items-center">
            <button
              id="sfx-toggle"
              type="button"
              onClick={handleSoundToggle}
              className="cursor-pointer hover:text-[#00f0ff] transition-colors text-xs font-mono-doc font-bold px-2 py-1 rounded-md bg-white/5 border border-white/10"
              title={audioActive ? "Mute SFX" : "Enable SFX"}
            >
              {audioActive ? "🔊 SFX: ON" : "🔇 SFX: OFF"}
            </button>
            <span className="badge-clearance text-[11px] uppercase tracking-wider shrink-0">
              ROASTED IN 4K
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10">
        {view === 'landing' && (
          <Landing onFileCase={() => setView('filing')} />
        )}

        {view === 'filing' && (
          <FilingForm
            onSubmit={handleGrievanceSubmit}
            onBack={() => setView('landing')}
            initialValue={incidentText}
          />
        )}

        {view === 'processing' && (
          <ProcessingSequence
            onComplete={handleProcessingAnimationComplete}
            isAppeal={isAppealMode}
          />
        )}

        {(view === 'result' || view === 'appeal-result') && currentReport && (
          <CaseReportView
            caseReport={currentReport}
            onAppeal={handleAppealRequest}
            onNewCase={handleNewCase}
            isAppealing={view === 'processing'}
          />
        )}
      </main>

      {/* Official Government Footer */}
      <footer className="border-t border-white/10 bg-black/40 backdrop-blur-md py-4 px-4 text-center font-chunky text-xs text-slate-400 relative z-10">
        <div className="max-w-xl mx-auto space-y-1">
          <div className="font-bold text-slate-300">
            PAZHAM — Department of Unnecessary Intelligence • Official Internet Bureau
          </div>
          <div className="text-[11px] text-slate-500">
            Fictional Bureaucracy for Trivial Overthinking • Built for Useless Projects Hackathon • Receipts Never Expire on God
          </div>
        </div>
      </footer>
    </div>
  );
}
