import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Send, Sparkles, AlertCircle, UploadCloud, X, Image as ImageIcon, CheckCircle, Flame } from 'lucide-react';
import { EXAMPLE_PROMPTS } from '../../lib/mockData';
import { ImageDataPayload } from '../../types';
import { playPop } from '../../lib/sound';
import { BananaMascot } from '../Mascot/BananaMascot';
import { SquigglyUnderline, HandDrawnSparkle } from '../Doodles/DoodleAccents';

interface FilingFormProps {
  onSubmit: (incident: string, image?: ImageDataPayload | null) => void;
  onBack: () => void;
  initialValue?: string;
}

export const FilingForm: React.FC<FilingFormProps> = ({ onSubmit, onBack, initialValue = "" }) => {
  const [grievance, setGrievance] = useState(initialValue);
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [imageFile, setImageFile] = useState<ImageDataPayload | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentExampleIndex((prev) => (prev + 1) % EXAMPLE_PROMPTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleFileSelection = (file: File) => {
    setFileError(null);
    if (!file || !file.type.startsWith('image/')) {
      setFileError("Please upload a valid image file (PNG, JPG, WEBP).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setFileError("Screenshot file size should be under 10MB.");
      return;
    }

    playPop();
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setImagePreviewUrl(dataUrl);
      setImageFile({
        data: dataUrl,
        mimeType: file.type || 'image/png',
        name: file.name
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = () => {
    playPop();
    setImageFile(null);
    setImagePreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = grievance.trim();
    if (!trimmed && !imageFile) return;
    playPop();
    onSubmit(trimmed, imageFile);
  };

  const isFormValid = grievance.trim().length > 0 || imageFile !== null;

  return (
    <div className="w-full max-w-3xl px-4 py-6 mx-auto relative z-10">
      {/* Back button */}
      <button
        id="back-to-landing-btn"
        type="button"
        onClick={() => { playPop(); onBack(); }}
        className="inline-flex items-center gap-2 font-mono-doc text-xs text-[#5C5549] hover:text-[#FF5E57] mb-4 transition-colors cursor-pointer group bg-white hover:bg-[#FAF6EE] px-3.5 py-2 rounded-xl border-2 border-[#E6DFD1] shadow-[2px_2px_0px_#E6DFD1]"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold">RETURN TO HEADQUARTERS</span>
      </button>

      {/* Main Warm Paper Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 22 }}
        className="paper-card p-6 sm:p-9 relative overflow-visible"
      >
        {/* Thinking Banana Mascot peeking in top right */}
        <div className="absolute -top-10 -right-2 sm:-right-4 z-20">
          <BananaMascot
            mood="thinking"
            size={96}
            speechText="Spill the tea! 🍌"
          />
        </div>

        {/* Header */}
        <div className="border-b-2 border-[#E6DFD1] pb-5 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <div className="font-mono-doc text-xs font-bold text-[#FF5E57] tracking-widest uppercase flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#FF5E57]" />
              <span>FORM PZ-42B // REVISION 2026.9</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#1F1C18] tracking-wide mt-1">
              STATE YOUR GRIEVANCE 🚨
            </h2>
            <SquigglyUnderline color="#FFB800" className="w-48 h-2.5 mt-0.5" />
          </div>
          <div className="font-mono-doc text-xs bg-[#FFE3EC] border-2 border-[#FF2A85] text-[#FF2A85] px-3 py-1.5 rounded-xl font-black shadow-[2px_2px_0px_#FF2A85]">
            STATUS: ACCEPTING DELULU ENTRIES
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dual Inputs Grid: Text and Screenshot Upload */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left Column: Text description */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="grievance-input"
                  className="font-chunky text-sm font-extrabold text-[#1F1C18] tracking-wide flex items-center gap-1.5"
                >
                  <span>1. SPILL THE DRAMA (TEXT):</span>
                </label>
                <span className="font-mono-doc text-[11px] text-[#8C8275] font-bold">
                  {grievance.length}/500
                </span>
              </div>

              <textarea
                id="grievance-input"
                value={grievance}
                onChange={(e) => setGrievance(e.target.value.slice(0, 500))}
                placeholder={`e.g. "${EXAMPLE_PROMPTS[currentExampleIndex]}"`}
                rows={7}
                className="w-full bg-[#FAF6EE] border-2 border-[#E6DFD1] p-4 font-chunky text-sm text-[#1F1C18] placeholder:text-[#9E9484] focus:outline-hidden focus:border-[#FF5E57] focus:bg-white rounded-2xl resize-none transition-all shadow-inner"
              />
              <div className="text-[11px] font-mono-doc text-[#8C8275] mt-1.5">
                Include the exact words, typing duration, and how long you stared at the ceiling.
              </div>
            </div>

            {/* Right Column: Screenshot Upload (Multimodal AI) */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <label className="font-chunky text-sm font-extrabold text-[#1F1C18] tracking-wide flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-[#FF5E57]" />
                  <span>2. DROP RECEIPTS 📸 (OPTIONAL):</span>
                </label>
                <span className="font-mono-doc text-[10px] text-[#FF5E57] bg-[#FFE3EC] px-2 py-0.5 rounded-lg border border-[#FF2A85]/40 font-bold">
                  MULTIMODAL AI
                </span>
              </div>

              {/* Upload Drop Zone / Preview */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelection(e.target.files[0]);
                  }
                }}
                className="hidden"
                id="screenshot-file-input"
              />

              {!imagePreviewUrl ? (
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => { playPop(); fileInputRef.current?.click(); }}
                  className={`flex-1 border-2 border-dashed ${
                    isDragging ? "border-[#FF5E57] bg-[#FFEED9] scale-[1.01]" : "border-[#D6CEBE] hover:border-[#FF5E57] bg-[#FAF6EE] hover:bg-white"
                  } rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[175px]` }
                >
                  <UploadCloud className="w-9 h-9 text-[#FF5E57] mb-2" />
                  <div className="font-chunky text-sm font-bold text-[#1F1C18]">
                    DROP CHAT SCREENSHOT HERE
                  </div>
                  <div className="font-mono-doc text-xs text-[#5C5549] mt-1">
                    or <span className="text-[#FF5E57] underline font-bold">browse your camera roll</span>
                  </div>
                  <div className="font-mono-doc text-[10px] text-[#8C8275] mt-2">
                    Supports iMessage, WhatsApp, DMs, Tinder, Slack (PNG/JPG)
                  </div>
                </div>
              ) : (
                <div className="flex-1 border-2 border-[#FF5E57] rounded-2xl p-3.5 bg-white relative flex flex-col justify-between min-h-[175px] shadow-[2px_2px_0px_#FF5E57]">
                  <div className="flex items-center gap-3">
                    <img
                      src={imagePreviewUrl}
                      alt="Screenshot evidence preview"
                      className="w-16 h-20 object-cover rounded-xl border-2 border-[#E6DFD1] shrink-0"
                    />
                    <div className="font-mono-doc text-xs overflow-hidden">
                      <div className="text-[11px] text-[#10B981] font-bold flex items-center gap-1 mb-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>RECEIPT ATTACHED 📸</span>
                      </div>
                      <div className="font-bold text-[#1F1C18] truncate">
                        {imageFile?.name || "chat_screenshot.png"}
                      </div>
                      <div className="text-[11px] text-[#5C5549] mt-1">
                        Forensic analysis will inspect timestamps, bubbles & dry response energy.
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="self-end inline-flex items-center gap-1 text-xs font-mono-doc text-[#FF5E57] hover:text-[#1F1C18] font-bold hover:underline cursor-pointer pt-2"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>REMOVE ATTACHMENT</span>
                  </button>
                </div>
              )}

              {fileError && (
                <div className="mt-2 p-2.5 rounded-xl bg-[#FFF0F0] border-2 border-[#FF5E57] text-[#FF5E57] font-mono-doc text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{fileError}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick-Pick Example Chips */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-1.5 font-mono-doc text-xs text-[#1F1C18] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>OR AUTO-FILL AN UNHINGED SOCIAL EMERGENCY:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_PROMPTS.slice(0, 4).map((ex, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => { playPop(); setGrievance(ex); }}
                  className="font-chunky text-xs text-left bg-[#FAF6EE] hover:bg-[#FFE3EC] text-[#5C5549] hover:text-[#FF2A85] border-2 border-[#E6DFD1] hover:border-[#FF2A85] px-3 py-2 rounded-xl transition-all cursor-pointer jelly-hover shadow-xs"
                >
                  "{ex.slice(0, 48)}..."
                </button>
              ))}
            </div>
          </div>

          {/* Submission Action Bar */}
          <div className="border-t-2 border-[#E6DFD1] pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono-doc text-[#5C5549]">
              <AlertCircle className="w-4 h-4 text-[#FFB800] shrink-0" />
              <span>
                {imageFile
                  ? "Receipt locked: Multimodal analysis will scan chat receipts."
                  : "Submit text or screenshot. All filings roasted with zero mercy."}
              </span>
            </div>

            <motion.button
              id="submit-grievance-btn"
              type="submit"
              disabled={!isFormValid}
              whileHover={isFormValid ? { scale: 1.04, transition: { type: "spring", stiffness: 400, damping: 12 } } : {}}
              whileTap={isFormValid ? { scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 12 } } : {}}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 btn-punchy-coral text-white font-heading text-base sm:text-lg uppercase tracking-wider px-9 py-4 rounded-2xl cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg"
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
              <span>SUBMIT FOR BRAINROT ROAST 🔥</span>
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
