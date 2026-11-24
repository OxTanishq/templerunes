import React, { useEffect, useRef } from 'react';
import { ADVENTURERS } from '../game/levels';
import { Adventurer } from '../game/types';
import { ArrowLeft, Check, Zap } from 'lucide-react';

interface AdventurerSelectModalProps {
  selectedId: string;
  onSelect: (id: string) => void;
  onConfirm: () => void;
  onBack: () => void;
}

export const AdventurerSelectModal: React.FC<AdventurerSelectModalProps> = ({
  selectedId,
  onSelect,
  onConfirm,
  onBack
}) => {
  const canvasRefs = useRef<{ [key: string]: HTMLCanvasElement | null }>({});

  useEffect(() => {
    ADVENTURERS.forEach((adv) => {
      const cvs = canvasRefs.current[adv.id];
      if (!cvs) return;
      const ctx = cvs.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, 64, 64);
      // Legs
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(20, 38, 8, 16);
      ctx.fillRect(36, 38, 8, 16);
      // Torso / Tunic
      ctx.fillStyle = adv.color;
      ctx.fillRect(18, 20, 28, 20);
      // Belt
      ctx.fillStyle = '#78350f';
      ctx.fillRect(18, 34, 28, 4);
      ctx.fillStyle = '#ffd700';
      ctx.fillRect(30, 34, 4, 4);
      // Mask / Head
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(22, 6, 20, 16);
      // Visor & Eye
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(32, 11, 8, 4);
      ctx.fillStyle = adv.accent;
      ctx.fillRect(35, 12, 3, 2);
      // Scarf
      ctx.fillStyle = adv.accent;
      ctx.fillRect(20, 18, 24, 4);
      ctx.fillRect(16, 20, 6, 8); // Flap
    });
  }, []);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-[620px] rounded-2xl bg-[#0c101a]/95 border-2 border-[#d4af37] p-7 text-center shadow-[0_0_35px_rgba(212,175,55,0.4),inset_0_0_20px_rgba(0,0,0,0.85)] animate-in fade-in duration-200">
        <h1 className="font-cinzel text-2xl sm:text-3xl font-extrabold tracking-[0.2em] text-[#fde047] mb-1">
          CHOOSE ADVENTURER
        </h1>
        <p className="font-mono-code text-xs tracking-wider text-[#94a3b8] mb-6 uppercase">
          Each brings ancient fortitude & distinct traits
        </p>

        {/* Adventurers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {ADVENTURERS.map((adv) => {
            const isSelected = selectedId === adv.id;
            return (
              <div
                key={adv.id}
                onClick={() => onSelect(adv.id)}
                className={`relative flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 ${
                  isSelected
                    ? 'border-[#ffd700] bg-[#221c10] shadow-[0_0_20px_rgba(255,215,0,0.35)] scale-[1.02]'
                    : 'border-[#2d3748] bg-[#0f1422] hover:border-[#4b5563] hover:bg-[#151c2e]'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 p-1 rounded-full bg-[#ffd700] text-black">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
                <canvas
                  ref={(el) => {
                    canvasRefs.current[adv.id] = el;
                  }}
                  width={64}
                  height={64}
                  className="w-16 h-16 mb-2 pixel-canvas"
                />
                <h3 className="font-mono-code font-bold text-sm tracking-wider" style={{ color: adv.color }}>
                  {adv.name}
                </h3>
                <p className="font-mono-code text-[11px] text-[#94a3b8] mb-2">{adv.title}</p>
                <div className="w-full text-left text-[11px] font-mono-code text-[#cbd5e1] space-y-1.5 pt-2 border-t border-slate-700/60">
                  <div className="flex items-center gap-1.5 text-[#fef08a]">
                    <Zap className="w-3 h-3 text-[#ffd700] shrink-0" />
                    <span className="text-[10px] leading-tight">{adv.perk}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#1a2233] border border-[#3b4866] text-[#cbd5e1] font-mono-code text-sm font-semibold tracking-wider hover:bg-[#253047] hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK</span>
          </button>
          <button
            onClick={onConfirm}
            className="flex-[2] flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-gradient-to-b from-[#b45309] to-[#78350f] border border-[#f59e0b] text-[#fef08a] font-mono-code text-sm font-bold tracking-wider hover:from-[#d97706] hover:to-[#92400e] hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>CONFIRM SELECTION</span>
          </button>
        </div>

        {/* Footer Credit */}
        <div className="mt-5 pt-3 border-t border-[#334155]/60 text-[11px] font-mono-code text-[#94a3b8]">
          TEMPLE RUNES • Built by <span className="text-[#ffd700]">Tanishq Sharma (AI Engineer)</span>
        </div>
      </div>
    </div>
  );
};
