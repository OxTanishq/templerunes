/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { GameMode, GameSaveData, GameSettings, InputState, LevelData, Particle, ScreenState } from './game/types';
import { sound } from './game/SoundEngine';
import { ADVENTURERS, generateEndlessChamber, getCampaignLevels } from './game/levels';
import { Player } from './game/Player';
import { MainMenuModal } from './components/MainMenuModal';
import { AdventurerSelectModal } from './components/AdventurerSelectModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { SettingsModal } from './components/SettingsModal';
import { PauseModal } from './components/PauseModal';
import { StatusModal } from './components/StatusModal';
import { HUD } from './components/HUD';
import { MobileControls } from './components/MobileControls';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game Navigation & State
  const [screen, setScreen] = useState<ScreenState>('menu');
  const [gameMode, setGameMode] = useState<GameMode>('campaign');
  const [campaignIndex, setCampaignIndex] = useState(0);
  const [endlessDepth, setEndlessDepth] = useState(1);
  const [score, setScore] = useState(0);
  const [runesCollected, setRunesCollected] = useState(0);
  const [lives, setLives] = useState(3);
  const [notification, setNotification] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  // Status Modal State
  const [statusType, setStatusType] = useState<'clear' | 'game_over' | 'campaign_victory'>('clear');
  const [statusTitle, setStatusTitle] = useState('');
  const [statusSubtitle, setStatusSubtitle] = useState('');

  // Settings & Saves
  const [settings, setSettings] = useState<GameSettings>({
    masterVol: 0.7,
    sfxVol: 0.8,
    musicVol: 0.5,
    screenShake: true,
    crtEffect: false,
    showTouchControls: false
  });

  const [saveData, setSaveData] = useState<GameSaveData>(() => {
    try {
      const stored = localStorage.getItem('temple_runes_save_v2');
      if (stored) return JSON.parse(stored);
    } catch {}
    return {
      highestTemple: 1,
      endlessHighScore: 0,
      totalRunes: 0,
      selectedCharId: 'kaelen'
    };
  });

  // Touch & Key Inputs
  const touchInputs = useRef<InputState>({ left: false, right: false, jump: false, interact: false });
  const keysDown = useRef<{ [key: string]: boolean }>({});

  // Game Engine Runtime Refs
  const currentLevelRef = useRef<LevelData | null>(null);
  const checkpointRef = useRef<{ x: number; y: number }>({ x: 90, y: 440 });
  const player1Ref = useRef<Player | null>(null);
  const player2Ref = useRef<Player | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const cameraRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const screenShakeRef = useRef<number>(0);
  const isPausedRef = useRef<boolean>(true);
  const gameStateRef = useRef<{ score: number; runes: number; lives: number; mode: GameMode; index: number; depth: number }>({
    score: 0,
    runes: 0,
    lives: 3,
    mode: 'campaign',
    index: 0,
    depth: 1
  });

  // Keep state ref in sync
  useEffect(() => {
    gameStateRef.current = {
      score,
      runes: runesCollected,
      lives,
      mode: gameMode,
      index: campaignIndex,
      depth: endlessDepth
    };
  }, [score, runesCollected, lives, gameMode, campaignIndex, endlessDepth]);

  useEffect(() => {
    isPausedRef.current = screen !== 'playing';
  }, [screen]);

  // Save changes to localStorage
  const persistSave = (newData: Partial<GameSaveData>) => {
    setSaveData((prev) => {
      const updated = { ...prev, ...newData };
      try {
        localStorage.setItem('temple_runes_save_v2', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 2200);
  };

  const spawnParticles = (
    x: number,
    y: number,
    color: string,
    count = 8,
    speed = 2,
    size = 3,
    shape: 'circle' | 'square' = 'circle'
  ) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = (Math.random() * 0.7 + 0.3) * speed;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd - 0.5,
        color,
        size: Math.random() * size + 1.5,
        life: 1.0,
        decay: Math.random() * 0.03 + 0.02,
        shape
      });
    }
  };

  // Load a Level
  const loadLevel = (levelDef: LevelData, isCoop = false) => {
    currentLevelRef.current = JSON.parse(JSON.stringify(levelDef));
    checkpointRef.current = { ...levelDef.spawn };

    const selectedAdv = ADVENTURERS.find((a) => a.id === saveData.selectedCharId) || ADVENTURERS[0];
    const p1 = new Player(1, selectedAdv.color, selectedAdv.accent, selectedAdv.name, false, levelDef.spawn.x, levelDef.spawn.y);
    p1.maxSpeed = selectedAdv.speed;
    p1.jumpPower = selectedAdv.jumpPower;
    player1Ref.current = p1;

    if (isCoop) {
      const coopAdv = ADVENTURERS.find((a) => a.id !== saveData.selectedCharId) || ADVENTURERS[1];
      const p2 = new Player(2, coopAdv.color, coopAdv.accent, `${coopAdv.name} (P2)`, true, levelDef.spawn.x + 30, levelDef.spawn.y);
      p2.maxSpeed = coopAdv.speed;
      p2.jumpPower = coopAdv.jumpPower;
      player2Ref.current = p2;
    } else {
      player2Ref.current = null;
    }

    cameraRef.current = {
      x: levelDef.spawn.x - 480,
      y: levelDef.spawn.y - 270
    };
  };

  // Start campaign
  const handleStartCampaign = () => {
    sound.init();
    setGameMode('campaign');
    setCampaignIndex(0);
    setScore(0);
    setRunesCollected(0);
    setLives(3);
    const levels = getCampaignLevels();
    loadLevel(levels[0], false);
    setScreen('playing');
  };

  // Start endless
  const handleStartEndless = () => {
    sound.init();
    setGameMode('endless');
    setEndlessDepth(1);
    setScore(0);
    setRunesCollected(0);
    setLives(3);
    const room = generateEndlessChamber(1);
    loadLevel(room, false);
    setScreen('playing');
  };

  // Start co-op
  const handleStartCoop = () => {
    sound.init();
    setGameMode('coop');
    setCampaignIndex(0);
    setScore(0);
    setRunesCollected(0);
    setLives(3);
    const levels = getCampaignLevels();
    loadLevel(levels[0], true);
    setScreen('playing');
  };

  // Keyboard Event Listeners
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      sound.init();
      keysDown.current[e.code] = true;

      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }

      if (e.code === 'Escape') {
        setScreen((prev) => (prev === 'playing' ? 'pause' : prev === 'pause' ? 'playing' : prev));
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keysDown.current[e.code] = false;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  // Main Game Loop Engine
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set initial preview level if none
    if (!currentLevelRef.current) {
      loadLevel(getCampaignLevels()[0], false);
    }

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const level = currentLevelRef.current;
      const p1 = player1Ref.current;
      const p2 = player2Ref.current;

      if (!isPausedRef.current && level && p1) {
        // 1. Moving Platforms
        for (const mp of level.movingPlatforms) {
          mp.x += mp.vx;
          mp.y += mp.vy;
          if (mp.vx > 0 && mp.x >= mp.endX) mp.vx = -Math.abs(mp.vx);
          if (mp.vx < 0 && mp.x <= mp.startX) mp.vx = Math.abs(mp.vx);
          if (mp.vy > 0 && mp.y >= mp.endY) mp.vy = -Math.abs(mp.vy);
          if (mp.vy < 0 && mp.y <= mp.startY) mp.vy = Math.abs(mp.vy);
        }

        // 2. Input states
        const p1Input: InputState = {
          left: Boolean(keysDown.current['KeyA'] || keysDown.current['KeyQ'] || touchInputs.current.left),
          right: Boolean(keysDown.current['KeyD'] || touchInputs.current.right),
          jump: Boolean(keysDown.current['KeyW'] || keysDown.current['Space'] || touchInputs.current.jump),
          interact: Boolean(keysDown.current['KeyS'] || keysDown.current['KeyE'] || touchInputs.current.interact)
        };

        p1.update(dt, p1Input, level, spawnParticles);

        if (p2) {
          const p2Input: InputState = {
            left: Boolean(keysDown.current['ArrowLeft']),
            right: Boolean(keysDown.current['ArrowRight']),
            jump: Boolean(keysDown.current['ArrowUp'] || keysDown.current['Numpad0']),
            interact: Boolean(keysDown.current['ArrowDown'] || keysDown.current['Numpad1'])
          };
          p2.update(dt, p2Input, level, spawnParticles);
        }

        // 3. Particles
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.x += p.vx * 60 * dt;
          p.y += p.vy * 60 * dt;
          p.vy += 0.08 * 60 * dt;
          p.life -= p.decay * 60 * dt;
          if (p.life <= 0) {
            particlesRef.current.splice(i, 1);
          }
        }

        // 4. Checkpoint Trigger
        const distToCp = (pl: Player) =>
          Math.hypot(pl.x + pl.w / 2 - level.checkpoint.x, pl.y + pl.h / 2 - level.checkpoint.y);

        if (distToCp(p1) < 45 || (p2 && distToCp(p2) < 45)) {
          if (checkpointRef.current.x !== level.checkpoint.x) {
            checkpointRef.current = { ...level.checkpoint };
            sound.play('checkpoint');
            notify('CHECKPOINT SECURED!');
            spawnParticles(level.checkpoint.x, level.checkpoint.y, '#ffd700', 22, 3.5, 4);
          }
        }

        // 5. Collectibles Gathering
        const collectItem = (pl: Player) => {
          for (const c of level.collectibles) {
            if (!c.taken && Math.hypot(pl.x + pl.w / 2 - c.x, pl.y + pl.h / 2 - c.y) < 32) {
              c.taken = true;
              setScore((s) => s + c.value);
              setRunesCollected((r) => r + 1);
              if (c.type === 'gem') {
                sound.play('gem');
                spawnParticles(c.x, c.y, '#38bdf8', 16, 3, 3);
              } else {
                sound.play('rune');
                spawnParticles(c.x, c.y, '#ffd700', 14, 2.5, 3, 'square');
              }
            }
          }
        };
        collectItem(p1);
        if (p2) collectItem(p2);

        // 6. Switches / Pressure Plates
        const activateSwitch = (pl: Player, input: InputState) => {
          for (const s of level.switches) {
            const inRange = Math.hypot(pl.x + pl.w / 2 - (s.x + s.w / 2), pl.y + pl.h / 2 - (s.y + s.h / 2)) < 36;
            if (inRange && (input.interact || Math.abs(pl.y + pl.h - s.y) < 10)) {
              if (!s.active) {
                s.active = true;
                sound.play('switch');
                spawnParticles(s.x + 12, s.y + 12, '#38bdf8', 12, 2.5, 3);
                const door = level.doors.find((d) => d.id === s.targetDoorId);
                if (door) {
                  door.locked = false;
                  sound.play('door');
                  notify('ANCIENT PORTAL UNLOCKED!');
                }
              }
            }
          }
        };
        activateSwitch(p1, p1Input);
        if (p2) {
          activateSwitch(p2, {
            left: false,
            right: false,
            jump: false,
            interact: Boolean(keysDown.current['ArrowDown'])
          });
        }

        // 7. Hazard and Pit Collisions
        const processHazards = (pl: Player) => {
          if (pl.hitCooldown > 0) return;
          let tookHit = false;

          for (const h of level.hazards) {
            if (pl.intersects(h)) {
              tookHit = true;
              break;
            }
          }

          if (pl.y > level.height + 60) {
            tookHit = true;
          }

          if (tookHit) {
            screenShakeRef.current = 10;
            spawnParticles(pl.x + pl.w / 2, pl.y + pl.h / 2, '#ef4444', 18, 3.5, 3);
            setLives((l) => {
              const remaining = l - 1;
              if (remaining <= 0) {
                sound.play('game_over');
                setStatusType('game_over');
                setStatusTitle('EXPEDITION LOST');
                setStatusSubtitle('The temple traps claimed your party.');
                setScreen('status');
              } else {
                pl.respawn(checkpointRef.current);
              }
              return remaining;
            });
          }
        };
        processHazards(p1);
        if (p2) processHazards(p2);

        // 8. Exit Door Portal Reached
        for (const d of level.doors) {
          if (!d.locked) {
            const p1AtDoor = p1.intersects(d);
            const p2AtDoor = !p2 || p2.intersects(d);
            if (p1AtDoor && p2AtDoor) {
              sound.play('victory');
              const currentMode = gameStateRef.current.mode;
              const currentIndex = gameStateRef.current.index;
              const currentDepth = gameStateRef.current.depth;

              if (currentMode === 'campaign' || currentMode === 'coop') {
                const levels = getCampaignLevels();
                const nextIndex = currentIndex + 1;
                if (nextIndex < levels.length) {
                  setStatusType('clear');
                  setStatusTitle('CHAMBER CONQUERED!');
                  setStatusSubtitle('The ancient seals have parted.');
                  setScreen('status');
                } else {
                  setStatusType('campaign_victory');
                  setStatusTitle('ALL TEMPLES RESTOREED!');
                  setStatusSubtitle('Grand Champion of the Ancient Runes.');
                  setScreen('status');
                }
              } else {
                setStatusType('clear');
                setStatusTitle(`CHAMBER ${currentDepth} CLEARED!`);
                setStatusSubtitle('Deeper into the endless catacombs...');
                setScreen('status');
              }
              break;
            }
          }
        }

        // 9. Camera Following & Screen Shake
        let targetX = p1.x;
        let targetY = p1.y;
        if (p2) {
          targetX = (p1.x + p2.x) / 2;
          targetY = (p1.y + p2.y) / 2;
        }

        const camTargetX = targetX - canvas.width / 2;
        const camTargetY = targetY - canvas.height / 2;

        cameraRef.current.x += (camTargetX - cameraRef.current.x) * 0.08;
        cameraRef.current.y += (camTargetY - cameraRef.current.y) * 0.08;

        cameraRef.current.x = Math.max(0, Math.min(cameraRef.current.x, level.width - canvas.width));
        cameraRef.current.y = Math.max(0, Math.min(cameraRef.current.y, level.height - canvas.height));
      }

      // --- RENDERING CANVAS PASS ---
      ctx.save();
      const shakeOffset =
        settings.screenShake && screenShakeRef.current > 0
          ? {
              x: (Math.random() - 0.5) * screenShakeRef.current,
              y: (Math.random() - 0.5) * screenShakeRef.current
            }
          : { x: 0, y: 0 };
      if (screenShakeRef.current > 0) screenShakeRef.current *= 0.88;

      ctx.translate(shakeOffset.x, shakeOffset.y);

      // Deep Parallax Sky & Temple Architecture
      ctx.fillStyle = '#080a0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const camX = cameraRef.current.x;
      const camY = cameraRef.current.y;

      // Far Background Columns
      const farShift = camX * 0.15;
      ctx.fillStyle = '#121624';
      for (let i = 0; i < 12; i++) {
        const px = i * 220 - (farShift % 220);
        ctx.fillRect(px, 30, 48, canvas.height);
        ctx.fillRect(px - 25, 30, 98, 14); // Arch
      }

      // Midground Ruined Stonework
      const midShift = camX * 0.38;
      ctx.fillStyle = '#181f33';
      for (let i = 0; i < 15; i++) {
        const px = i * 160 - (midShift % 160);
        ctx.fillRect(px, 160, 68, canvas.height);
      }

      if (level) {
        // Platforms
        for (const plat of level.platforms) {
          const rx = Math.floor(plat.x - camX);
          const ry = Math.floor(plat.y - camY);

          ctx.fillStyle = '#242e42';
          ctx.fillRect(rx, ry, plat.w, plat.h);

          // Golden Moss / Temple Inscription top
          ctx.fillStyle = '#d4af37';
          ctx.fillRect(rx, ry, plat.w, 4);

          // Carved stone cracks
          ctx.fillStyle = '#161c2c';
          ctx.fillRect(rx + 12, ry + 9, Math.min(24, plat.w - 24), 2);
          if (plat.w > 70) {
            ctx.fillRect(rx + plat.w - 36, ry + 12, 16, 2);
          }
        }

        // Moving Platforms
        for (const mp of level.movingPlatforms) {
          const rx = Math.floor(mp.x - camX);
          const ry = Math.floor(mp.y - camY);

          ctx.fillStyle = '#334155';
          ctx.fillRect(rx, ry, mp.w, mp.h);
          ctx.fillStyle = '#60a5fa';
          ctx.fillRect(rx, ry, mp.w, 3);
          // Power core
          ctx.fillStyle = '#93c5fd';
          ctx.fillRect(rx + mp.w / 2 - 4, ry + 5, 8, 4);
        }

        // Hazards
        for (const h of level.hazards) {
          const rx = Math.floor(h.x - camX);
          const ry = Math.floor(h.y - camY);

          if (h.type === 'spikes') {
            const count = Math.floor(h.w / 14);
            ctx.fillStyle = '#e2e8f0';
            for (let i = 0; i < count; i++) {
              ctx.beginPath();
              ctx.moveTo(rx + i * 14, ry + h.h);
              ctx.lineTo(rx + i * 14 + 7, ry);
              ctx.lineTo(rx + i * 14 + 14, ry + h.h);
              ctx.fill();
            }
          } else if (h.type === 'lava') {
            ctx.fillStyle = '#dc2626';
            ctx.fillRect(rx, ry, h.w, h.h);
            ctx.fillStyle = '#f59e0b';
            ctx.fillRect(rx, ry, h.w, 6);
          } else if (h.type === 'pit') {
            ctx.fillStyle = '#040609';
            ctx.fillRect(rx, ry, h.w, h.h);
          }
        }

        // Checkpoint Obelisk
        const cpx = Math.floor(level.checkpoint.x - camX);
        const cpy = Math.floor(level.checkpoint.y - camY);
        const isCurrentCp = checkpointRef.current.x === level.checkpoint.x;
        ctx.fillStyle = '#475569';
        ctx.fillRect(cpx - 6, cpy - 26, 12, 50);
        ctx.fillStyle = isCurrentCp ? '#ffd700' : '#64748b';
        ctx.beginPath();
        ctx.arc(cpx, cpy - 30, 9, 0, Math.PI * 2);
        ctx.fill();
        if (isCurrentCp) {
          ctx.fillStyle = '#fef08a';
          ctx.fillRect(cpx - 2, cpy - 32, 4, 4);
        }

        // Switches
        for (const s of level.switches) {
          const rx = Math.floor(s.x - camX);
          const ry = Math.floor(s.y - camY);
          ctx.fillStyle = '#334155';
          ctx.fillRect(rx, ry + 16, s.w, 8);
          ctx.strokeStyle = s.active ? '#38bdf8' : '#e2e8f0';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(rx + s.w / 2, ry + 16);
          ctx.lineTo(s.active ? rx + s.w : rx, ry);
          ctx.stroke();
        }

        // Exit Doors
        for (const d of level.doors) {
          const rx = Math.floor(d.x - camX);
          const ry = Math.floor(d.y - camY);
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(rx - 6, ry - 6, d.w + 12, d.h + 6);
          ctx.fillStyle = d.locked ? '#450a0a' : '#0369a1';
          ctx.fillRect(rx, ry, d.w, d.h);

          if (!d.locked) {
            // Animated Portal Ripple
            ctx.fillStyle = '#38bdf8';
            ctx.globalAlpha = 0.6 + Math.sin(Date.now() / 200) * 0.2;
            ctx.fillRect(rx + 4, ry + 4, d.w - 8, d.h - 8);
            ctx.globalAlpha = 1.0;
          }
        }

        // Collectibles
        const pulse = Math.sin(Date.now() / 150) * 3;
        for (const c of level.collectibles) {
          if (c.taken) continue;
          const rx = Math.floor(c.x - camX);
          const ry = Math.floor(c.y - camY + pulse);

          if (c.type === 'gem') {
            ctx.fillStyle = '#38bdf8';
            ctx.beginPath();
            ctx.moveTo(rx, ry - 10);
            ctx.lineTo(rx + 8, ry);
            ctx.lineTo(rx, ry + 10);
            ctx.lineTo(rx - 8, ry);
            ctx.fill();
            ctx.fillStyle = '#bae6fd';
            ctx.fillRect(rx - 2, ry - 2, 4, 4);
          } else {
            // Golden Rune
            ctx.fillStyle = '#ffd700';
            ctx.fillRect(rx - 7, ry - 7, 14, 14);
            ctx.fillStyle = '#78350f';
            ctx.fillRect(rx - 3, ry - 3, 6, 6);
          }
        }

        // Players
        if (p1) p1.render(ctx, cameraRef.current);
        if (p2) p2.render(ctx, cameraRef.current);

        // Particles
        for (const p of particlesRef.current) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.fillStyle = p.color;
          const rx = Math.floor(p.x - camX);
          const ry = Math.floor(p.y - camY);
          if (p.shape === 'square') {
            ctx.fillRect(rx - p.size / 2, ry - p.size / 2, p.size, p.size);
          } else {
            ctx.beginPath();
            ctx.arc(rx, ry, p.size, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      }

      ctx.restore();
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [saveData.selectedCharId, settings.screenShake]);

  // Handle Level Completion Continue
  const handleStatusContinue = () => {
    if (statusType === 'game_over') {
      // Retry current room
      setLives(3);
      if (gameMode === 'campaign' || gameMode === 'coop') {
        const levels = getCampaignLevels();
        loadLevel(levels[campaignIndex], gameMode === 'coop');
      } else {
        loadLevel(generateEndlessChamber(endlessDepth), false);
      }
      setScreen('playing');
    } else if (statusType === 'campaign_victory') {
      // Return to menu
      persistSave({ highestTemple: 5 });
      setScreen('menu');
    } else {
      // Next room
      if (gameMode === 'campaign' || gameMode === 'coop') {
        const nextIdx = campaignIndex + 1;
        setCampaignIndex(nextIdx);
        persistSave({ highestTemple: Math.max(saveData.highestTemple, nextIdx + 1) });
        const levels = getCampaignLevels();
        if (nextIdx < levels.length) {
          loadLevel(levels[nextIdx], gameMode === 'coop');
          setScreen('playing');
        }
      } else {
        const nextDepth = endlessDepth + 1;
        setEndlessDepth(nextDepth);
        persistSave({ endlessHighScore: Math.max(saveData.endlessHighScore, score) });
        loadLevel(generateEndlessChamber(nextDepth), false);
        setScreen('playing');
      }
    }
  };

  // Mute Audio toggle
  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      sound.updateVolumes(next ? 0 : settings.masterVol, settings.sfxVol, settings.musicVol);
      return next;
    });
  };

  // On-screen touch input handlers
  const handleTouchInputStart = (action: 'left' | 'right' | 'jump' | 'interact') => {
    sound.init();
    touchInputs.current[action] = true;
  };

  const handleTouchInputEnd = (action: 'left' | 'right' | 'jump' | 'interact') => {
    touchInputs.current[action] = false;
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#080a0f] flex items-center justify-center select-none">
      {/* 2D HTML5 Canvas Platformer */}
      <canvas
        ref={canvasRef}
        width={960}
        height={540}
        className="w-full h-full object-contain pixel-canvas max-w-full max-h-full"
      />

      {/* CRT Scanline Overlay Effect if enabled in settings */}
      {settings.crtEffect && (
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] z-40" />
      )}

      {/* HUD Layer (visible while playing or paused) */}
      {screen === 'playing' && (
        <HUD
          runes={runesCollected}
          score={score}
          lives={lives}
          levelTitle={currentLevelRef.current?.title || 'TEMPLE 1: RUINS'}
          isMuted={isMuted}
          onToggleMute={toggleMute}
          onPause={() => setScreen('pause')}
          notification={notification}
        />
      )}

      {/* Touch Screen Mobile Buttons */}
      <MobileControls
        visible={screen === 'playing' && (settings.showTouchControls || window.matchMedia('(pointer: coarse)').matches)}
        onInputStart={handleTouchInputStart}
        onInputEnd={handleTouchInputEnd}
      />

      {/* 1. Main Menu (Matches user image & spec) */}
      {screen === 'menu' && (
        <MainMenuModal
          onStartCampaign={handleStartCampaign}
          onStartEndless={handleStartEndless}
          onStartCoop={handleStartCoop}
          onOpenCharSelect={() => setScreen('char_select')}
          onOpenHowToPlay={() => setScreen('how_to_play')}
          onOpenSettings={() => setScreen('settings')}
        />
      )}

      {/* 2. Character Select */}
      {screen === 'char_select' && (
        <AdventurerSelectModal
          selectedId={saveData.selectedCharId}
          onSelect={(id) => persistSave({ selectedCharId: id })}
          onConfirm={() => setScreen('menu')}
          onBack={() => setScreen('menu')}
        />
      )}

      {/* 3. How to Play */}
      {screen === 'how_to_play' && <HowToPlayModal onBack={() => setScreen('menu')} />}

      {/* 4. Settings & Save */}
      {screen === 'settings' && (
        <SettingsModal
          settings={settings}
          onUpdateSettings={(newVals) => setSettings((prev) => ({ ...prev, ...newVals }))}
          onResetSave={() => {
            if (window.confirm('Reset all temple progress and scores?')) {
              localStorage.removeItem('temple_runes_save_v2');
              setSaveData({
                highestTemple: 1,
                endlessHighScore: 0,
                totalRunes: 0,
                selectedCharId: 'kaelen'
              });
              alert('Save data reset successfully.');
            }
          }}
          onBack={() => setScreen('menu')}
        />
      )}

      {/* 5. Pause Menu */}
      {screen === 'pause' && (
        <PauseModal
          onResume={() => setScreen('playing')}
          onRestartRoom={() => {
            setLives(3);
            if (gameMode === 'campaign' || gameMode === 'coop') {
              const levels = getCampaignLevels();
              loadLevel(levels[campaignIndex], gameMode === 'coop');
            } else {
              loadLevel(generateEndlessChamber(endlessDepth), false);
            }
            setScreen('playing');
          }}
          onOpenSettings={() => setScreen('settings')}
          onExitToMenu={() => setScreen('menu')}
        />
      )}

      {/* 6. Level Status / Game Over / Victory */}
      {screen === 'status' && (
        <StatusModal
          statusType={statusType}
          title={statusTitle}
          subtitle={statusSubtitle}
          score={score}
          runes={runesCollected}
          levelTitle={currentLevelRef.current?.title || 'TEMPLE EXPEDITION'}
          onContinue={handleStatusContinue}
          onExitToMenu={() => setScreen('menu')}
        />
      )}
    </div>
  );
}
