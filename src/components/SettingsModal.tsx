import React from 'react';
import { GameSettings } from '../game/types';
import { sound } from '../game/SoundEngine';
import { ArrowLeft, Volume2, Sparkles, Trash2, Check } from 'lucide-react';

interface SettingsModalProps {
  settings: GameSettings;
  onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
  onResetSave: () => void;
  onBack: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onResetSave,
  onBack
}) => {
  const handleMasterChange = (val: number) => {
    onUpdateSettings({ masterVol: val });
    sound.updateVolumes(val, settings.sfxVol, settings.musicVol);
  };

  const handleSfxChange = (val: number) => {
    onUpdateSettings({ sfxVol: val });
    sound.updateVolumes(settings.masterVol, val, settings.musicVol);
    sound.play('rune');
  };

  const handleMusicChange = (val: number) => {
    onUpdateSettings({ musicVol: val });
    sound.updateVolumes(settings.masterVol, settings.sfxVol, val);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-[520px] rounded-2xl bg-[#0c101a]/95 border-2 border-[#d4af37] p-6 sm:p-8 text-center shadow-[0_0_35px_rgba(212,175,55,0.4),inset_0_0_20px_rgba(0,0,0,0.85)] animate-in fade-in duration-200">
        <h1 className="font-cinzel text-2xl sm:text-3xl font-extrabold tracking-[0.2em] text-[#fde047] mb-1">
          SETTINGS & SAVE
        </h1>
        <p className="font-mono-code text-xs tracking-wider text-[#94a3b8] mb-6 uppercase">
          Audio, Visuals & Expeditions
        </p>

        <div className="space-y-4 text-left font-mono-code text-sm">
          {/* Audio Sliders */}
          <div className="p-4 rounded-xl bg-[#141b2b] border border-[#2d3b55] space-y-3">
            <div className="flex items-center gap-2 text-[#ffd700] font-bold text-xs uppercase mb-1">
              <Volume2 className="w-4 h-4" />
              <span>Audio Synthesis Controls</span>
            </div>

            <div>
              <div className="flex justify-between text-xs text-[#cbd5e1] mb-1">
                <span>Master Volume</span>
                <span>{Math.round(settings.masterVol * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.masterVol}
                onChange={(e) => handleMasterChange(parseFloat(e.target.value))}
                className="w-full accent-[#ffd700] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-[#cbd5e1] mb-1">
                <span>SFX Sound Effects</span>
                <span>{Math.round(settings.sfxVol * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.sfxVol}
                onChange={(e) => handleSfxChange(parseFloat(e.target.value))}
                className="w-full accent-[#ffd700] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-[#cbd5e1] mb-1">
                <span>Ambient Music Drone</span>
                <span>{Math.round(settings.musicVol * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.musicVol}
                onChange={(e) => handleMusicChange(parseFloat(e.target.value))}
                className="w-full accent-[#ffd700] cursor-pointer"
              />
            </div>
          </div>

          {/* Graphics & UI Toggles */}
          <div className="p-4 rounded-xl bg-[#141b2b] border border-[#2d3b55] space-y-3">
            <div className="flex items-center gap-2 text-[#38bdf8] font-bold text-xs uppercase mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Visuals & Controls</span>
            </div>

            <label className="flex items-center justify-between text-xs text-[#cbd5e1] cursor-pointer">
              <span>Dynamic Camera Shake</span>
              <input
                type="checkbox"
                checked={settings.screenShake}
                onChange={(e) => onUpdateSettings({ screenShake: e.target.checked })}
                className="w-4 h-4 accent-[#ffd700] rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between text-xs text-[#cbd5e1] cursor-pointer">
              <span>Retro CRT Scanlines Overlay</span>
              <input
                type="checkbox"
                checked={settings.crtEffect}
                onChange={(e) => onUpdateSettings({ crtEffect: e.target.checked })}
                className="w-4 h-4 accent-[#ffd700] rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between text-xs text-[#cbd5e1] cursor-pointer">
              <span>Always Show Touch Controls</span>
              <input
                type="checkbox"
                checked={settings.showTouchControls}
                onChange={(e) => onUpdateSettings({ showTouchControls: e.target.checked })}
                className="w-4 h-4 accent-[#ffd700] rounded cursor-pointer"
              />
            </label>
          </div>

          {/* Data Reset */}
          <div className="p-3 rounded-xl bg-[#261313] border border-[#5c2424] flex items-center justify-between">
            <div className="text-xs text-slate-300">
              <span className="text-red-400 font-semibold block">Clear Save Data:</span>
              <span className="text-[11px] text-slate-400">Reset temples & high scores</span>
            </div>
            <button
              onClick={onResetSave}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded bg-red-900/60 border border-red-500 text-red-200 text-xs hover:bg-red-800 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>RESET</span>
            </button>
          </div>
        </div>

        {/* Back / Confirm */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onBack}
            className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-gradient-to-b from-[#332615] to-[#1a1309] border border-[#a16207] text-[#fef08a] font-mono-code text-sm font-bold tracking-wider hover:border-[#fde047] hover:shadow-[0_0_15px_rgba(250,204,21,0.3)] transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>SAVE & RETURN</span>
          </button>
        </div>

        <div className="mt-4 pt-3 border-t border-[#334155]/60 text-[11px] font-mono-code text-[#94a3b8]">
          TEMPLE RUNES • <span className="text-[#ffd700]">Tanishq Sharma (AI Engineer)</span>
        </div>
      </div>
    </div>
  );
};
