import React from 'react';
import { ArrowLeft, Compass, ShieldAlert, Sparkles, KeyRound } from 'lucide-react';

interface HowToPlayModalProps {
  onBack: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ onBack }) => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-[640px] max-h-[90vh] flex flex-col rounded-2xl bg-[#0c101a]/95 border-2 border-[#d4af37] p-6 sm:p-7 text-left shadow-[0_0_35px_rgba(212,175,55,0.4),inset_0_0_20px_rgba(0,0,0,0.85)] animate-in fade-in duration-200">
        <div className="text-center mb-4">
          <h1 className="font-cinzel text-2xl sm:text-3xl font-extrabold tracking-[0.2em] text-[#fde047] mb-1">
            HOW TO PLAY
          </h1>
          <p className="font-mono-code text-xs tracking-wider text-[#94a3b8] uppercase">
            Survival Rules & Ancient Lore
          </p>
        </div>

        {/* Scrollable instructions */}
        <div className="flex-1 overflow-y-auto space-y-5 pr-2 font-mono-code text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
          {/* Controls Box */}
          <div className="p-3.5 rounded-xl bg-[#141b2b] border border-[#2d3b55]">
            <div className="flex items-center gap-2 text-[#ffd700] font-bold text-sm mb-2.5">
              <Compass className="w-4 h-4" />
              <span>PLAYER 1 / SOLO CONTROLS:</span>
            </div>
            <ul className="space-y-1.5 text-slate-300">
              <li><strong className="text-[#fde047]">A / D</strong> — Walk Left & Right</li>
              <li><strong className="text-[#fde047]">W / SPACE</strong> — Jump (Hold longer for maximum leap)</li>
              <li><strong className="text-[#fde047]">DOUBLE JUMP</strong> — Press Jump while mid-air for acrobatic double jump</li>
              <li><strong className="text-[#fde047]">S / E</strong> — Pull Levers, Activate Ancient Switches & Enter Portals</li>
            </ul>
          </div>

          {/* 2-Player Co-Op */}
          <div className="p-3.5 rounded-xl bg-[#141b2b] border border-[#2d3b55]">
            <div className="flex items-center gap-2 text-[#38bdf8] font-bold text-sm mb-2.5">
              <Sparkles className="w-4 h-4" />
              <span>PLAYER 2 CONTROLS (LOCAL CO-OP):</span>
            </div>
            <ul className="space-y-1.5 text-slate-300">
              <li><strong className="text-[#38bdf8]">Arrow Left / Right</strong> — Move Left & Right</li>
              <li><strong className="text-[#38bdf8]">Arrow Up</strong> — Jump & Mid-Air Double Jump</li>
              <li><strong className="text-[#38bdf8]">Arrow Down</strong> — Activate Ancient Switches & Portals</li>
            </ul>
          </div>

          {/* Mechanics & Objectives */}
          <div className="p-3.5 rounded-xl bg-[#141b2b] border border-[#2d3b55]">
            <div className="flex items-center gap-2 text-[#4ade80] font-bold text-sm mb-2.5">
              <KeyRound className="w-4 h-4" />
              <span>OBJECTIVES & TEMPLE RUINS:</span>
            </div>
            <ul className="space-y-2 text-slate-300">
              <li>
                <strong className="text-[#ffd700]">Ancient Runes & Gems:</strong> Collect golden runes and sapphire crystals scattered across the ruins to restore mystic energy and earn points.
              </li>
              <li>
                <strong className="text-[#60a5fa]">Mystic Levers:</strong> Pull ancient wall levers or step onto pressure plates to lower gate barriers and unlock the temple exit.
              </li>
              <li>
                <strong className="text-[#4ade80]">Checkpoints:</strong> Reach glowing stone obelisks to record your spiritual checkpoint. If you succumb to traps, you respawn safely here!
              </li>
            </ul>
          </div>

          {/* Hazards warning */}
          <div className="p-3.5 rounded-xl bg-[#261313] border border-[#5c2424]">
            <div className="flex items-center gap-2 text-[#f87171] font-bold text-sm mb-2">
              <ShieldAlert className="w-4 h-4" />
              <span>LETHAL HAZARDS:</span>
            </div>
            <p className="text-slate-300 text-xs">
              Avoid spike pillars, molten lava pits, and crumbling cliffs. You start with 3 lives; if all are depleted, the expedition is lost.
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-4 pt-3 border-t border-[#334155]/60 flex items-center justify-between">
          <span className="text-[11px] font-mono-code text-[#94a3b8]">
            Author: <strong className="text-[#ffd700]">Tanishq Sharma (AI Engineer)</strong>
          </span>
          <button
            onClick={onBack}
            className="flex items-center gap-2 py-2.5 px-6 rounded-lg bg-[#1a2233] border border-[#3b4866] text-[#cbd5e1] font-mono-code text-sm font-semibold tracking-wider hover:bg-[#253047] hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO MENU</span>
          </button>
        </div>
      </div>
    </div>
  );
};
