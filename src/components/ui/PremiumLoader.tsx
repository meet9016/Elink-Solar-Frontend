import React from 'react';

interface PremiumLoaderProps {
  text?: string;
  isFullScreen?: boolean;
}

export default function PremiumLoader({ text = 'Loading', isFullScreen = false }: PremiumLoaderProps) {
  return (
    <div
      className={`${
        isFullScreen ? 'fixed inset-0 z-[9999]' : 'absolute inset-0 z-50 rounded-md'
      } flex items-center justify-center bg-white/90 backdrop-blur-sm transition-all duration-300`}
    >
      <div className="flex flex-col items-center justify-center gap-6">
        {/* Sleek multi-ring spinner */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute h-full w-full animate-spin rounded-full border-[3px] border-[#f4e6ec] border-t-primary border-l-primary" style={{ animationDuration: '1.5s' }}></div>
          <div className="absolute h-10 w-10 animate-spin rounded-full border-[3px] border-[#f4e6ec] border-b-primary border-r-primary" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}></div>
          <div className="h-3 w-3 animate-pulse rounded-full bg-primary shadow-[0_0_15px_rgba(166,60,113,0.6)]"></div>
        </div>

        {/* Text with glowing dot animation */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-bold tracking-[0.15em] text-primary uppercase">
              {text}
            </p>
            <div className="flex gap-1 mt-0.5">
              <div className="h-1 w-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="h-1 w-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="h-1 w-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mt-1">
            Please Wait
          </p>
        </div>
      </div>
    </div>
  );
}
