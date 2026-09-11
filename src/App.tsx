import React, { useState, useRef, useCallback } from 'react';
import { ViewState, CaseReport, ImageDataPayload } from './types';
import { Landing } from './components/Landing/Landing';
import { FilingForm } from './components/Filing/FilingForm';
import { ProcessingSequence } from './components/Processing/ProcessingSequence';
import { CaseReportView } from './components/Report/CaseReportView';
import { submitInvestigation, submitAppeal } from './lib/api';
import { generateMockInvestigation, generateMockAppeal } from './lib/mockDataCore';
import { toggleSound, isSoundEnabled, playPop } from './lib/sound';
import { OrganicBackgroundBlobs } from './components/Doodles/DoodleAccents';
import { Flame } from 'lucide-react';

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
  const isAppealModeRef = useRef<boolean>(false);

  const checkTransitionToResult = useCallback(() => {
    if (animationFinishedRef.current && pendingReportRef.current) {
      setCurrentReport(pendingReportRef.current);
      if (isAppealModeRef.current) {
        setView('appeal-result');
      } else {
        setView('result');
      }
    }
  }, []);

  const handleGrievanceSubmit = (incident: string, image?: ImageDataPayload | null) => {
    setIncidentText(incident);
    setAttachedImage(image || null);
    setIsAppealMode(false);
    isAppealModeRef.current = false;
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
        console.error('Investigation error, applying guaranteed fallback:', err);
        const fallback = generateMockInvestigation(incident || "Screenshot receipt", Boolean(image));
        if (image) fallback.imageAttachment = image.data;
        pendingReportRef.current = fallback;
        checkTransitionToResult();
      });
  };

  const handleAppealRequest = () => {
    if (!currentReport) return;
    setIsAppealMode(true);
    isAppealModeRef.current = true;
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
        console.error('Appeal error, applying guaranteed fallback:', err);
        const fallback = generateMockAppeal(incidentText, currentReport);
        if (attachedImage) fallback.imageAttachment = attachedImage.data;
        pendingReportRef.current = fallback;
        checkTransitionToResult();
      });
  };

  const handleProcessingAnimationComplete = useCallback(() => {
    animationFinishedRef.current = true;
    checkTransitionToResult();
  }, [checkTransitionToResult]);

  const handleNewCase = () => {
    setCurrentReport(null);
    setIsAppealMode(false);
    setIncidentText('');
    setAttachedImage(null);
    setView('filing');
  };

  const handleSoundToggle = () => {
    playPop();
    const newState = toggleSound();
    setAudioActive(newState);
  };

  return (
    <div className="min-h-screen text-[#1F1C18] flex flex-col justify-between relative selection:bg-[#FF2A85] selection:text-white">
      {/* Organic Background Blobs */}
      <OrganicBackgroundBlobs />

      {/* Top Status Bar - Warm Paper & Friendly Bureau Style */}
      <header className="w-full max-w-4xl mx-auto mt-4 px-4 relative z-20">
        <div className="flex justify-between items-center py-2.5 px-4 sm:px-6 rounded-2xl bg-white border-2 border-[#E6DFD1] font-mono-doc text-xs sm:text-sm text-[#1F1C18] shadow-[2px_3px_0px_#E6DFD1]">
          <button
            onClick={() => { playPop(); setView('landing'); }}
            className="flex items-center gap-2 hover:text-[#FF5E57] transition-colors cursor-pointer text-left font-bold"
          >
            <span className="text-xl">🍌</span>
            <span className="tracking-tight font-heading text-sm sm:text-base">PAZHAM // Overthinking Task Force</span>
          </button>

          <div className="flex gap-2.5 items-center">
            <button
              id="sfx-toggle"
              type="button"
              onClick={handleSoundToggle}
              className="cursor-pointer hover:bg-[#FAF6EE] text-[#1F1C18] transition-all text-xs font-mono-doc font-bold px-3 py-1.5 rounded-xl bg-white border-2 border-[#E6DFD1] shadow-xs jelly-hover"
              title={audioActive ? "Mute SFX" : "Enable SFX"}
            >
              {audioActive ? "🔊 SFX: ON" : "🔇 SFX: OFF"}
            </button>
            <span className="bg-[#FFE3EC] text-[#FF2A85] border-2 border-[#FF2A85] text-[11px] font-mono-doc font-black px-2.5 py-1 rounded-xl shadow-[1px_1px_0px_#FF2A85] shrink-0 hidden sm:inline-block">
              ROASTED IN 4K
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 py-4">
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

      {/* Warm Paper Footer */}
      <footer className="border-t-2 border-[#E6DFD1] bg-white/80 backdrop-blur-md py-4 px-4 text-center font-chunky text-xs text-[#5C5549] relative z-10 mt-6">
        <div className="max-w-xl mx-auto space-y-1">
          <div className="font-bold text-[#1F1C18] flex items-center justify-center gap-1.5">
            <span>PAZHAM — Department of Unnecessary Intelligence</span>
            <span>🍌</span>
          </div>
          <div className="text-[11px] text-[#8C8275]">
            Investigating your pettiest overthinking moments with 96.8% confidence in nonsense • Made with ❤️ at TinkerHub Useless Projects
          </div>
        </div>
      </footer>
    </div>
  );
}
