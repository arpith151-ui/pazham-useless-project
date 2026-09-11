import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Send, Sparkles, AlertCircle, UploadCloud, X, Image as ImageIcon, CheckCircle, Flame, Skull } from 'lucide-react';
import { EXAMPLE_PROMPTS } from '../../lib/mockData';
import { ImageDataPayload } from '../../types';
import { playPop } from '../../lib/sound';

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
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentExampleIndex((prev) => (prev + 1) % EXAMPLE_PROMPTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleFileSelection = (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      alert("Please upload an image file (PNG, JPG, WEBP).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Screenshot file size should be under 10MB.");
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
    <div className="w-full max-w-3xl px-4 py-8 mx-auto">
      {/* Back button */}
      <button
        id="back-to-landing-btn"
        type="button"
        onClick={() => { playPop(); onBack(); }}
        className="inline-flex items-center gap-2 font-mono-doc text-xs text-slate-300 hover:text-[#00F5FF] mb-5 transition-colors cursor-pointer group bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xl border border-white/10"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>ESCAPE TO HEADQUARTERS</span>
      </button>

      {/* Main Glassmorphic Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="glass-card-purple p-6 sm:p-9 rounded-3xl relative overflow-hidden"
      >
        {/* Header */}
        <div className="border-b border-white/15 pb-5 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <div className="font-mono-doc text-xs font-bold text-[#FF007F] tracking-widest uppercase flex items-center gap-1.5">
              <Flame className="w-4 h-4" />
              <span>FORM PZ-42B // REVISION 2026.9</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-wide mt-1 glitch-text">
              STATE YOUR GRIEVANCE 🚨
            </h2>
          </div>
          <div className="font-mono-doc text-xs bg-[#FF007F]/20 border border-[#FF007F]/50 text-[#FF007F] px-3 py-1.5 rounded-xl font-black neon-glow-pink">
            STATUS: ACCEPTING DELULU SUBMISSIONS
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
                  className="font-chunky text-sm font-extrabold text-white tracking-wide flex items-center gap-1.5"
                >
                  <span>1. SPILL THE DRAMA (TEXT):</span>
                </label>
                <span className="font-mono-doc text-[11px] text-slate-400">
                  {grievance.length}/500
                </span>
              </div>

              <textarea
                id="grievance-input"
                value={grievance}
                onChange={(e) => setGrievance(e.target.value.slice(0, 500))}
                placeholder={`e.g. "${EXAMPLE_PROMPTS[currentExampleIndex]}"`}
                rows={7}
                className="w-full bg-black/40 border-2 border-white/20 p-4 font-chunky text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:border-[#FF007F] focus:ring-2 focus:ring-[#FF007F]/40 rounded-2xl resize-none transition-all"
              />
              <div className="text-[11px] font-mono-doc text-slate-400 mt-1.5">
                Include the exact words, typing duration, and how long you stared at the ceiling.
              </div>
            </div>

            {/* Right Column: Screenshot Upload (Multimodal AI) */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <label className="font-chunky text-sm font-extrabold text-[#00F5FF] tracking-wide flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4" />
                  <span>2. DROP RECEIPTS 📸 (OPTIONAL):</span>
                </label>
                <span className="font-mono-doc text-[10px] text-[#00F5FF] bg-[#00F5FF]/10 px-2 py-0.5 rounded-md border border-[#00F5FF]/30 font-bold">
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
                    isDragging ? "border-[#FF007F] bg-[#FF007F]/20 scale-[1.01]" : "border-white/25 hover:border-[#00F5FF] bg-black/30 hover:bg-black/50"
                  } rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[175px]`}
                >
                  <UploadCloud className="w-9 h-9 text-[#00F5FF] mb-2" />
                  <div className="font-chunky text-sm font-bold text-white">
                    DROP CHAT SCREENSHOT HERE
                  </div>
                  <div className="font-mono-doc text-xs text-slate-300 mt-1">
                    or <span className="text-[#00F5FF] underline font-bold">browse your camera roll</span>
                  </div>
                  <div className="font-mono-doc text-[10px] text-slate-400 mt-2">
                    Supports iMessage, WhatsApp, DMs, Tinder, Slack (PNG/JPG)
                  </div>
                </div>
              ) : (
                <div className="flex-1 border-2 border-[#FF007F]/50 rounded-2xl p-3.5 bg-black/60 relative flex flex-col justify-between min-h-[175px]">
                  <div className="flex items-center gap-3">
                    <img
                      src={imagePreviewUrl}
                      alt="Screenshot evidence preview"
                      className="w-16 h-20 object-cover rounded-xl border border-white/30 shrink-0"
                    />
                    <div className="font-mono-doc text-xs overflow-hidden">
                      <div className="text-[11px] text-[#00F5FF] font-bold flex items-center gap-1 mb-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>RECEIPT ATTACHED 📸</span>
                      </div>
                      <div className="font-bold text-white truncate">
                        {imageFile?.name || "chat_screenshot.png"}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Gemini will roast timestamps, grey bubbles & dry responses.
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="self-end inline-flex items-center gap-1 text-xs font-mono-doc text-[#FF007F] hover:text-white font-bold hover:underline cursor-pointer pt-2"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>REMOVE ATTACHMENT</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Quick-Pick Example Chips */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-1.5 font-mono-doc text-xs text-[#00F5FF] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>OR AUTO-FILL AN UNHINGED SOCIAL EMERGENCY:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_PROMPTS.slice(0, 4).map((ex, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => { playPop(); setGrievance(ex); }}
                  className="font-chunky text-xs text-left bg-white/10 hover:bg-[#FF007F]/20 text-slate-200 hover:text-white border border-white/15 hover:border-[#FF007F] px-3 py-2 rounded-xl transition-all cursor-pointer"
                >
                  "{ex.slice(0, 50)}..."
                </button>
              ))}
            </div>
          </div>

          {/* Submission Action Bar */}
          <div className="border-t border-white/15 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono-doc text-slate-300">
              <AlertCircle className="w-4 h-4 text-yellow-300 shrink-0" />
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
              whileHover={isFormValid ? { scale: 1.05 } : {}}
              whileTap={isFormValid ? { scale: 0.95 } : {}}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-linear-to-r from-[#FF007F] via-[#A855F7] to-[#00F5FF] text-white font-heading text-base sm:text-lg uppercase tracking-wider px-9 py-4 rounded-2xl neon-glow-pink cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all border border-white/30"
            >
              <Send className="w-4 h-4 text-yellow-300" />
              <span>SUBMIT FOR BRAINROT ROAST 🔥</span>
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
