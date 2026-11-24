export type GameMode = 'campaign' | 'endless' | 'coop';

export type ScreenState = 
  | 'menu' 
  | 'playing' 
  | 'char_select' 
  | 'how_to_play' 
  | 'settings' 
  | 'pause' 
  | 'status';

export interface Adventurer {
  id: string;
  name: string;
  title: string;
  color: string;
  accent: string;
  speed: number;
  jumpPower: number;
  description: string;
  perk: string;
}

export interface Platform {
  x: number;
  y: number;
  w: number;
  h: number;
  isPassThrough?: boolean;
}

export interface MovingPlatform extends Platform {
  startX: number;
  endX: number;
  startY: number;
  endY: number;
  vx: number;
  vy: number;
}

export interface Hazard {
  x: number;
  y: number;
  w: number;
  h: number;
  type: 'spikes' | 'lava' | 'pit';
}

export interface SwitchEntity {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  active: boolean;
  targetDoorId: string;
}

export interface DoorEntity {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  locked: boolean;
  isExit: boolean;
}

export interface Collectible {
  id: string;
  x: number;
  y: number;
  type: 'rune' | 'gem';
  value: number;
  taken: boolean;
}

export interface LevelData {
  title: string;
  subtitle: string;
  description: string;
  width: number;
  height: number;
  spawn: { x: number; y: number };
  checkpoint: { x: number; y: number };
  platforms: Platform[];
  movingPlatforms: MovingPlatform[];
  collectibles: Collectible[];
  hazards: Hazard[];
  switches: SwitchEntity[];
  doors: DoorEntity[];
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  decay: number;
  shape: 'circle' | 'square';
}

export interface InputState {
  left: boolean;
  right: boolean;
  jump: boolean;
  interact: boolean;
}

export interface GameSettings {
  masterVol: number;
  sfxVol: number;
  musicVol: number;
  screenShake: boolean;
  crtEffect: boolean;
  showTouchControls: boolean;
}

export interface GameSaveData {
  highestTemple: number;
  endlessHighScore: number;
  totalRunes: number;
  selectedCharId: string;
}
