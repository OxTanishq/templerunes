import React from 'react';
import { Trophy, Skull, ArrowRight, RotateCcw, Home, Sparkles } from 'lucide-react';

interface StatusModalProps {
  statusType: 'clear' | 'game_over' | 'campaign_victory';
  title: string;
  subtitle: string;
  score: number;
  runes: number;
  levelTitle: string;
  onContinue: () => void;
  onExitToMenu: () => void;
}

export const StatusModal: React.FC<StatusModalProps> = ({
  statusType,
  title,
  subtitle,
  score,
  runes,
  levelTitle,
  onContinue,
  onExitToMenu
}) => {
  const isSuccess = statusType !== 'game_over';

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
      <div className={`relative w-full max-w-[480px] rounded-2xl bg-[#0c101a]/95 border-2 p-7 text-center shadow-[0_0_35px_rgba(0,0,0,0.9),inset_0_0_20px_rgba(0,0,0,0.85)] animate-in zoom-in-95 duration-200 ${
        isSuccess ? 'border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.4)]' : 'border-[#ef4444] shadow-[0_0_30px_rgba(239,68,68,0.35)]'
      }`}>
        <div className="flex justify-center mb-3">
          {isSuccess ? (
            <div className="p-3 rounded-full bg-[#eab308]/20 border border-[#eab308] text-[#fef08a] shadow-[0_0_20px_rgba(234,179,8,0.4)]">
              <Trophy className="w-8 h-8 animate-bounce" />
            </div>
          ) : (
            <div className="p-3 rounded-full bg-red-950/40 border border-red-500 text-red-400">
              <Skull className="w-8 h-8" />
            </div>
          )}
        </div>

        <h1 className={`font-cinzel text-2xl sm:text-3xl font-extrabold tracking-[0.2em] mb-1 ${
          isSuccess ? 'text-[#fde047]' : 'text-red-400'
        }`}>
          {title}
        </h1>
        <p className="font-mono-code text-xs tracking-wider text-[#94a3b8] mb-5 uppercase">
          {subtitle}
        </p>

        {/* Stats Card */}
        <div className="p-4 rounded-xl bg-[#141b2b] border border-[#2d3b55] mb-6 font-mono-code text-xs sm:text-sm text-slate-300 space-y-2 text-left">
          <div className="flex justify-between items-center pb-2 border-b border-slate-700/60">
            <span className="text-[#94a3b8]">Expedition:</span>
            <span className="text-[#fef08a] font-bold">{levelTitle}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#94a3b8]">Runes Restored:</span>
            <span className="text-[#ffd700] font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
              {runes}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#94a3b8]">Temple Score:</span>
            <span className="text-[#38bdf8] font-bold">{score.toLocaleString()}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 font-mono-code text-sm">
          <button
            onClick={onContinue}
            className={`flex items-center justify-center gap-2 py-3.5 px-5 rounded-lg border font-bold tracking-wider hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer ${
              isSuccess
                ? 'bg-gradient-to-b from-[#332615] to-[#1a1309] border-[#a16207] text-[#fef08a] hover:border-[#fde047] hover:shadow-[0_0_15px_rgba(250,204,21,0.3)]'
                : 'bg-gradient-to-b from-[#3d1818] to-[#200d0d] border-red-700 text-red-200 hover:border-red-400'
            }`}
          >
            {isSuccess ? <ArrowRight className="w-4 h-4" /> : <RotateCcw className="w-4 h-4" />}
            <span>{isSuccess ? (statusType === 'campaign_victory' ? 'PLAY AGAIN' : 'NEXT CHAMBER') : 'TRY AGAIN'}</span>
          </button>

          <button
            onClick={onExitToMenu}
            className="flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-[#1a2233] border border-[#3b4866] text-[#cbd5e1] font-semibold tracking-wider hover:bg-[#253047] hover:text-white transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>MAIN MENU</span>
          </button>
        </div>

        <div className="mt-5 pt-3 border-t border-[#334155]/60 text-[11px] font-mono-code text-[#94a3b8]">
          TEMPLE RUNES • Built by <span className="text-[#ffd700]">Tanishq Sharma (AI Engineer)</span>
        </div>
      </div>
    </div>
  );
};
