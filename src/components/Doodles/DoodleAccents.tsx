import React from 'react';

// Hand-drawn squiggly underline
export const SquigglyUnderline: React.FC<{ color?: string; className?: string }> = ({
  color = "#FF5E57",
  className = "w-full h-3",
}) => (
  <svg
    viewBox="0 0 160 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="none"
  >
    <path
      d="M3 11C18 3 32 14 47 6C62 14 78 4 93 11C108 5 123 13 138 7C145 4 153 10 157 8"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Hand-drawn circle highlight
export const HandDrawnCircle: React.FC<{ color?: string; className?: string; children: React.ReactNode }> = ({
  color = "#FFB800",
  className = "",
  children,
}) => (
  <span className={`relative inline-block ${className}`}>
    {children}
    <svg
      viewBox="0 0 120 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute -inset-1.5 w-[calc(100%+12px)] h-[calc(100%+12px)] pointer-events-none"
      preserveAspectRatio="none"
    >
      <path
        d="M10 24C10 12 28 6 60 6C92 6 112 12 112 24C112 36 90 42 58 42C24 42 7 36 8 20"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  </span>
);

// Hand-drawn curvy arrow
export const HandDrawnArrow: React.FC<{ color?: string; className?: string }> = ({
  color = "#FF2A85",
  className = "w-8 h-8",
}) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M6 10C12 14 18 22 22 30M22 30L14 27M22 30L26 21"
      stroke={color}
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Hand-drawn starburst
export const HandDrawnSparkle: React.FC<{ color?: string; className?: string; size?: number }> = ({
  color = "#FFB800",
  className = "",
  size = 20,
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: size, height: size }}
    className={className}
  >
    <path
      d="M12 2L13.5 9.5L21 12L13.5 14.5L12 22L10.5 14.5L3 12L10.5 9.5L12 2Z"
      fill={color}
      stroke="#1F1C18"
      strokeWidth="1.2"
    />
  </svg>
);

// Organic Background Blobs behind key cards
export const OrganicBackgroundBlobs: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-70">
    {/* Warm Coral / Peach Blob top right */}
    <div
      className="absolute -top-24 -right-24 w-[380px] h-[380px] bg-[#FFE0D3] rounded-full blur-2xl organic-blob-1"
    />
    {/* Marigold / Banana Yellow Blob bottom left */}
    <div
      className="absolute -bottom-24 -left-20 w-[420px] h-[420px] bg-[#FFF0BD] rounded-full blur-2xl organic-blob-2"
    />
    {/* Soft Pink Blob middle */}
    <div
      className="absolute top-1/2 -right-32 w-[320px] h-[320px] bg-[#FFE8F0] rounded-full blur-2xl organic-blob-1"
    />
  </div>
);
