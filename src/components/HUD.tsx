import React from 'react';
import { Pause, Volume2, VolumeX, Maximize2, Sparkles, Heart } from 'lucide-react';

interface HUDProps {
  runes: number;
  score: number;
  lives: number;
  levelTitle: string;
  isMuted: boolean;
  onToggleMute: () => void;
  onPause: () => void;
  notification: string | null;
}

export const HUD: React.FC<HUDProps> = ({
  runes,
  score,
  lives,
  levelTitle,
  isMuted,
  onToggleMute,
  onPause,
  notification
}) => {
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-3 sm:p-5 select-none font-mono-code">
      {/* Top Bar */}
      <div className="flex justify-between items-start w-full">
        {/* Stats Pill */}
        <div className="pointer-events-auto flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 rounded-xl bg-[#0c101a]/90 border border-[#ca8a04]/60 shadow-[0_4px_16px_rgba(0,0,0,0.6)] backdrop-blur-sm text-xs sm:text-sm">
          <div className="flex items-center gap-1.5">
            <span className="text-[#94a3b8] text-[11px] sm:text-xs">RUNES:</span>
            <span className="text-[#ffd700] font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
              {runes}
            </span>
          </div>

          <span className="text-slate-600">|</span>

          <div className="flex items-center gap-1.5">
            <span className="text-[#94a3b8] text-[11px] sm:text-xs">SCORE:</span>
            <span className="text-[#38bdf8] font-bold">{score}</span>
          </div>

          <span className="text-slate-600">|</span>

          <div className="flex items-center gap-1">
            <span className="text-[#94a3b8] text-[11px] sm:text-xs mr-0.5">LIVES:</span>
            <div className="flex gap-0.5">
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                    i < lives ? 'fill-red-500 text-red-500' : 'fill-slate-700 text-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Level Badge */}
          <div className="hidden md:flex items-center px-3 py-1.5 rounded-lg bg-[#0c101a]/90 border border-[#3b4866] text-xs text-[#fde047] font-semibold">
            {levelTitle}
          </div>

          <button
            onClick={onToggleMute}
            className="p-2 sm:px-3 sm:py-2 rounded-lg bg-[#0c101a]/90 border border-[#3b4866] text-slate-300 hover:text-white hover:border-[#60a5fa] transition-all cursor-pointer shadow-md"
            title="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#ffd700]" />}
          </button>

          <button
            onClick={toggleFullscreen}
            className="hidden sm:flex p-2 sm:px-3 sm:py-2 rounded-lg bg-[#0c101a]/90 border border-[#3b4866] text-slate-300 hover:text-white hover:border-[#60a5fa] transition-all cursor-pointer shadow-md"
            title="Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          <button
            onClick={onPause}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-b from-[#332615] to-[#1a1309] border border-[#a16207] text-[#fef08a] font-bold text-xs sm:text-sm hover:border-[#fde047] hover:shadow-[0_0_12px_rgba(250,204,21,0.3)] transition-all cursor-pointer shadow-md"
          >
            <Pause className="w-3.5 h-3.5" />
            <span>PAUSE [ESC]</span>
          </button>
        </div>
      </div>

      {/* Floating Center Notification Toast */}
      {notification && (
        <div className="self-center px-5 py-2 rounded-full bg-[#0c101a]/95 border-2 border-[#ffd700] text-[#ffd700] font-bold text-sm sm:text-base tracking-wider shadow-[0_0_25px_rgba(255,215,0,0.5)] animate-in fade-in zoom-in-95 duration-200">
          {notification}
        </div>
      )}

      {/* Bottom Creator Attribution in HUD */}
      <div className="flex justify-between items-center w-full">
        <div className="text-[10px] sm:text-xs text-[#94a3b8] bg-[#0c101a]/80 px-2.5 py-1 rounded border border-slate-800 backdrop-blur-xs">
          TEMPLE RUNES • <span className="text-[#ffd700]">Tanishq Sharma (AI Engineer)</span>
        </div>
        <div className="hidden sm:block text-[10px] text-slate-500 bg-[#0c101a]/80 px-2 py-1 rounded border border-slate-800">
          [W,A,S,D] / [ARROWS] to move • [SPACE] jump • [S] interact
        </div>
      </div>
    </div>
  );
};
