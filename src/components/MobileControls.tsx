import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUp, Hand } from 'lucide-react';

interface MobileControlsProps {
  onInputStart: (action: 'left' | 'right' | 'jump' | 'interact') => void;
  onInputEnd: (action: 'left' | 'right' | 'jump' | 'interact') => void;
  visible: boolean;
}

export const MobileControls: React.FC<MobileControlsProps> = ({
  onInputStart,
  onInputEnd,
  visible
}) => {
  if (!visible) return null;

  const handleTouch = (action: 'left' | 'right' | 'jump' | 'interact') => ({
    onTouchStart: (e: React.TouchEvent) => {
      e.preventDefault();
      onInputStart(action);
    },
    onTouchEnd: (e: React.TouchEvent) => {
      e.preventDefault();
      onInputEnd(action);
    },
    onMouseDown: () => onInputStart(action),
    onMouseUp: () => onInputEnd(action),
    onMouseLeave: () => onInputEnd(action)
  });

  return (
    <div className="absolute bottom-4 left-0 right-0 z-35 flex justify-between px-4 sm:px-8 pointer-events-none select-none">
      {/* Direction Pad Left & Right */}
      <div className="flex gap-3 pointer-events-auto">
        <button
          {...handleTouch('left')}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#161c2c]/85 border-2 border-[#e5a93b]/70 active:bg-[#e5a93b] active:text-black flex items-center justify-center text-[#ffd875] text-xl shadow-[0_4px_14px_rgba(0,0,0,0.6)] cursor-pointer touch-none"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          {...handleTouch('right')}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#161c2c]/85 border-2 border-[#e5a93b]/70 active:bg-[#e5a93b] active:text-black flex items-center justify-center text-[#ffd875] text-xl shadow-[0_4px_14px_rgba(0,0,0,0.6)] cursor-pointer touch-none"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      {/* Action and Jump Pad */}
      <div className="flex gap-3 pointer-events-auto">
        <button
          {...handleTouch('interact')}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#161c2c]/85 border-2 border-[#38bdf8]/70 active:bg-[#38bdf8] active:text-black flex items-center justify-center text-[#38bdf8] font-bold text-xs sm:text-sm shadow-[0_4px_14px_rgba(0,0,0,0.6)] cursor-pointer touch-none"
        >
          ACT
        </button>
        <button
          {...handleTouch('jump')}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#161c2c]/85 border-2 border-[#4ade80]/70 active:bg-[#4ade80] active:text-black flex items-center justify-center text-[#4ade80] text-xl shadow-[0_4px_14px_rgba(0,0,0,0.6)] cursor-pointer touch-none"
        >
          <ArrowUp className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};
