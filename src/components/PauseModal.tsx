import React from 'react';
import { Play, RotateCcw, Settings, Home } from 'lucide-react';

interface PauseModalProps {
  onResume: () => void;
  onRestartRoom: () => void;
  onOpenSettings: () => void;
  onExitToMenu: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  onResume,
  onRestartRoom,
  onOpenSettings,
  onExitToMenu
}) => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-[460px] rounded-2xl bg-[#0c101a]/95 border-2 border-[#d4af37] p-7 text-center shadow-[0_0_35px_rgba(212,175,55,0.4),inset_0_0_20px_rgba(0,0,0,0.85)] animate-in fade-in duration-150">
        <h1 className="font-cinzel text-3xl font-extrabold tracking-[0.2em] text-[#fde047] mb-1">
          EXPEDITION PAUSED
        </h1>
        <p className="font-mono-code text-xs tracking-wider text-[#94a3b8] mb-6 uppercase">
          Take a breath before ancient trials
        </p>

        <div className="flex flex-col gap-3 font-mono-code text-sm">
          <button
            onClick={onResume}
            className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-lg bg-gradient-to-b from-[#332615] to-[#1a1309] border border-[#a16207] text-[#fef08a] font-bold tracking-wider hover:border-[#fde047] hover:shadow-[0_0_15px_rgba(250,204,21,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4" />
            <span>RESUME EXPEDITION</span>
          </button>

          <button
            onClick={onRestartRoom}
            className="flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-[#1a2233] border border-[#3b4866] text-[#cbd5e1] font-semibold tracking-wider hover:bg-[#253047] hover:text-white transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>RESTART CHAMBER</span>
          </button>

          <button
            onClick={onOpenSettings}
            className="flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-[#1a2233] border border-[#3b4866] text-[#cbd5e1] font-semibold tracking-wider hover:bg-[#253047] hover:text-white transition-all cursor-pointer"
          >
            <Settings className="w-4 h-4" />
            <span>AUDIO & CONTROLS</span>
          </button>

          <button
            onClick={onExitToMenu}
            className="flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-[#1f1414] border border-[#552d2d] text-[#fca5a5] font-semibold tracking-wider hover:bg-[#2f1c1c] transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>MAIN MENU</span>
          </button>
        </div>

        <div className="mt-6 pt-3 border-t border-[#334155]/60 text-[11px] font-mono-code text-[#94a3b8]">
          TEMPLE RUNES • <span className="text-[#ffd700]">Tanishq Sharma (AI Engineer)</span>
        </div>
      </div>
    </div>
  );
};
