import React from 'react';
import { Play, Infinity as InfinityIcon, Users, UserCheck, BookOpen, Settings, Sparkles } from 'lucide-react';

interface MainMenuModalProps {
  onStartCampaign: () => void;
  onStartEndless: () => void;
  onStartCoop: () => void;
  onOpenCharSelect: () => void;
  onOpenHowToPlay: () => void;
  onOpenSettings: () => void;
}

export const MainMenuModal: React.FC<MainMenuModalProps> = ({
  onStartCampaign,
  onStartEndless,
  onStartCoop,
  onOpenCharSelect,
  onOpenHowToPlay,
  onOpenSettings
}) => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-[500px] rounded-2xl bg-[#0c101a]/95 border-2 border-[#d4af37] p-8 text-center shadow-[0_0_35px_rgba(212,175,55,0.45),inset_0_0_20px_rgba(0,0,0,0.85)] animate-in fade-in zoom-in-95 duration-200">
        {/* Ancient Corner Accent Embellishments */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#ffd700]" />
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#ffd700]" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#ffd700]" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#ffd700]" />

        {/* Title & Subtitle */}
        <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold tracking-[0.25em] text-[#fde047] drop-shadow-[0_2px_10px_rgba(234,179,8,0.6)] mb-2">
          TEMPLE RUNES
        </h1>
        <p className="font-mono-code text-xs sm:text-sm tracking-[0.22em] text-[#94a3b8] mb-7 uppercase">
          Ancient Exploration Platformer
        </p>

        {/* Menu Buttons Stack */}
        <div className="flex flex-col gap-3 my-2">
          {/* 1. Play Campaign */}
          <button
            onClick={onStartCampaign}
            className="group relative flex items-center justify-center gap-3 w-full py-3.5 px-5 rounded-lg bg-gradient-to-b from-[#332615] to-[#1a1309] border border-[#a16207] text-[#fef08a] font-mono-code text-sm sm:text-base font-bold tracking-wider hover:border-[#fde047] hover:from-[#4d391f] hover:to-[#2b1f0f] hover:shadow-[0_0_18px_rgba(250,204,21,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 cursor-pointer shadow-md"
          >
            <span className="text-lg">🏛</span>
            <span>PLAY CAMPAIGN</span>
          </button>

          {/* 2. Endless Survival */}
          <button
            onClick={onStartEndless}
            className="group relative flex items-center justify-center gap-3 w-full py-3.5 px-5 rounded-lg bg-gradient-to-b from-[#332615] to-[#1a1309] border border-[#a16207] text-[#fef08a] font-mono-code text-sm sm:text-base font-bold tracking-wider hover:border-[#fde047] hover:from-[#4d391f] hover:to-[#2b1f0f] hover:shadow-[0_0_18px_rgba(250,204,21,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 cursor-pointer shadow-md"
          >
            <InfinityIcon className="w-5 h-5 text-[#fef08a]" />
            <span>ENDLESS SURVIVAL</span>
          </button>

          {/* 3. 2-Player Co-Op */}
          <button
            onClick={onStartCoop}
            className="group relative flex items-center justify-center gap-3 w-full py-3.5 px-5 rounded-lg bg-gradient-to-b from-[#332615] to-[#1a1309] border border-[#a16207] text-[#fef08a] font-mono-code text-sm sm:text-base font-bold tracking-wider hover:border-[#fde047] hover:from-[#4d391f] hover:to-[#2b1f0f] hover:shadow-[0_0_18px_rgba(250,204,21,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 cursor-pointer shadow-md"
          >
            <Users className="w-5 h-5 text-[#38bdf8]" />
            <span>2-PLAYER CO-OP</span>
          </button>

          {/* 4. Select Adventurer */}
          <button
            onClick={onOpenCharSelect}
            className="group relative flex items-center justify-center gap-3 w-full py-3 px-5 rounded-lg bg-gradient-to-b from-[#1b2233] to-[#0e121c] border border-[#3b4866] text-[#cbd5e1] font-mono-code text-sm font-semibold tracking-wider hover:border-[#60a5fa] hover:text-white hover:from-[#253047] hover:to-[#141a29] hover:shadow-[0_0_14px_rgba(96,165,250,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 cursor-pointer"
          >
            <span className="text-base">🎭</span>
            <span>SELECT ADVENTURER</span>
          </button>

          {/* 5. How To Play */}
          <button
            onClick={onOpenHowToPlay}
            className="group relative flex items-center justify-center gap-3 w-full py-3 px-5 rounded-lg bg-gradient-to-b from-[#1b2233] to-[#0e121c] border border-[#3b4866] text-[#cbd5e1] font-mono-code text-sm font-semibold tracking-wider hover:border-[#60a5fa] hover:text-white hover:from-[#253047] hover:to-[#141a29] hover:shadow-[0_0_14px_rgba(96,165,250,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 cursor-pointer"
          >
            <span className="text-base">📜</span>
            <span>HOW TO PLAY</span>
          </button>

          {/* 6. Settings & Save */}
          <button
            onClick={onOpenSettings}
            className="group relative flex items-center justify-center gap-3 w-full py-3 px-5 rounded-lg bg-gradient-to-b from-[#1b2233] to-[#0e121c] border border-[#3b4866] text-[#cbd5e1] font-mono-code text-sm font-semibold tracking-wider hover:border-[#60a5fa] hover:text-white hover:from-[#253047] hover:to-[#141a29] hover:shadow-[0_0_14px_rgba(96,165,250,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 cursor-pointer"
          >
            <Settings className="w-4 h-4 text-[#94a3b8] group-hover:text-white group-hover:rotate-45 transition-transform duration-200" />
            <span>SETTINGS & SAVE</span>
          </button>
        </div>

        {/* Input Guidance */}
        <p className="font-mono-code text-[11px] text-[#64748b] mt-5 mb-3 tracking-wide">
          Responsive Keyboard (WASD / Arrows) + Touch Screen Supported
        </p>

        {/* Bottom Creator Attribution as explicitly requested by user */}
        <div className="pt-3 border-t border-[#334155]/60 flex items-center justify-center gap-2 text-xs font-mono-code text-[#d4af37]">
          <Sparkles className="w-3.5 h-3.5 text-[#ffd700] animate-pulse" />
          <span className="tracking-wider">Tanishq Sharma (AI Engineer)</span>
          <Sparkles className="w-3.5 h-3.5 text-[#ffd700] animate-pulse" />
        </div>
      </div>
    </div>
  );
};
