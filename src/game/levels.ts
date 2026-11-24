import { Adventurer, Collectible, Hazard, LevelData, MovingPlatform } from './types';

export const ADVENTURERS: Adventurer[] = [
  {
    id: 'kaelen',
    name: 'KAELEN',
    title: 'Golden Torchbearer',
    color: '#eab308',
    accent: '#38bdf8',
    speed: 5.2,
    jumpPower: -10.4,
    description: 'Swift air-recovery and ancient sight. His golden mantle radiates within dark crypts.',
    perk: 'Balanced speed & double-jump altitude'
  },
  {
    id: 'lyra',
    name: 'LYRA',
    title: 'Rune Seeker',
    color: '#0284c7',
    accent: '#fde047',
    speed: 5.6,
    jumpPower: -10.1,
    description: 'Agile tomb raider attuned to ancient mana. Soft landings and enhanced sprint velocity.',
    perk: '+10% Movement speed & rapid dash'
  },
  {
    id: 'zephyr',
    name: 'ZEPHYR',
    title: 'Windblade Hermit',
    color: '#10b981',
    accent: '#f43f5e',
    speed: 5.0,
    jumpPower: -11.0,
    description: 'Master of atmospheric currents. Leaps higher than any mortal explorer.',
    perk: '+15% High-jump altitude'
  }
];

export function getCampaignLevels(): LevelData[] {
  return [
    {
      title: "TEMPLE 1: ANCIENT RUINS",
      subtitle: "The Sunken Vestibule",
      description: "Movement Basics, Rune Gathering, and Ancient Levers",
      width: 1400,
      height: 600,
      spawn: { x: 90, y: 440 },
      checkpoint: { x: 740, y: 440 },
      platforms: [
        { x: 0, y: 520, w: 1400, h: 80 }, // Main floor
        { x: 200, y: 420, w: 140, h: 22 },
        { x: 400, y: 340, w: 150, h: 22 },
        { x: 620, y: 270, w: 160, h: 22 },
        { x: 840, y: 360, w: 140, h: 22 },
        { x: 1040, y: 440, w: 180, h: 22 },
        // Outer boundaries
        { x: -30, y: 0, w: 30, h: 600 },
        { x: 1400, y: 0, w: 30, h: 600 }
      ],
      movingPlatforms: [
        { x: 480, y: 460, w: 100, h: 16, startX: 480, endX: 680, vx: 1.6, startY: 460, endY: 460, vy: 0 }
      ],
      collectibles: [
        { id: 'c1', x: 260, y: 380, type: 'rune', value: 100, taken: false },
        { id: 'c2', x: 470, y: 300, type: 'rune', value: 100, taken: false },
        { id: 'c3', x: 700, y: 230, type: 'gem', value: 300, taken: false },
        { id: 'c4', x: 910, y: 320, type: 'rune', value: 100, taken: false },
        { id: 'c5', x: 1120, y: 400, type: 'rune', value: 100, taken: false }
      ],
      hazards: [
        { x: 340, y: 498, w: 70, h: 22, type: 'spikes' },
        { x: 780, y: 498, w: 90, h: 22, type: 'spikes' }
      ],
      switches: [
        { id: 'sw1', x: 690, y: 246, w: 24, h: 24, active: false, targetDoorId: 'door1' }
      ],
      doors: [
        { id: 'door1', x: 1280, y: 420, w: 42, h: 100, locked: true, isExit: true }
      ]
    },
    {
      title: "TEMPLE 2: FORGOTTEN CAVERNS",
      subtitle: "The Subterranean Pillars",
      description: "Double Jumping, Moving Pillars & Timed Pressure Switches",
      width: 1700,
      height: 650,
      spawn: { x: 80, y: 480 },
      checkpoint: { x: 850, y: 280 },
      platforms: [
        { x: 0, y: 560, w: 360, h: 90 },
        { x: 500, y: 560, w: 340, h: 90 },
        { x: 980, y: 560, w: 720, h: 90 },
        { x: 260, y: 430, w: 120, h: 20 },
        { x: 440, y: 340, w: 130, h: 20 },
        { x: 630, y: 260, w: 120, h: 20 },
        { x: 820, y: 320, w: 150, h: 20 },
        { x: 1050, y: 410, w: 140, h: 20 },
        { x: 1260, y: 330, w: 160, h: 20 },
        { x: -30, y: 0, w: 30, h: 650 },
        { x: 1700, y: 0, w: 30, h: 650 }
      ],
      movingPlatforms: [
        { x: 360, y: 500, w: 90, h: 16, startX: 360, endX: 470, vx: 1.8, startY: 500, endY: 500, vy: 0 },
        { x: 860, y: 480, w: 90, h: 16, startX: 860, endX: 960, vx: 1.6, startY: 480, endY: 480, vy: 0 }
      ],
      collectibles: [
        { id: 'c2_1', x: 310, y: 390, type: 'rune', value: 100, taken: false },
        { id: 'c2_2', x: 490, y: 300, type: 'rune', value: 100, taken: false },
        { id: 'c2_3', x: 680, y: 220, type: 'rune', value: 100, taken: false },
        { id: 'c2_4', x: 1110, y: 370, type: 'gem', value: 350, taken: false },
        { id: 'c2_5', x: 1320, y: 290, type: 'rune', value: 100, taken: false }
      ],
      hazards: [
        { x: 360, y: 620, w: 140, h: 30, type: 'pit' },
        { x: 840, y: 620, w: 140, h: 30, type: 'pit' },
        { x: 620, y: 538, w: 100, h: 22, type: 'spikes' }
      ],
      switches: [
        { id: 'sw2', x: 1330, y: 306, w: 24, h: 24, active: false, targetDoorId: 'door2' }
      ],
      doors: [
        { id: 'door2', x: 1580, y: 460, w: 42, h: 100, locked: true, isExit: true }
      ]
    },
    {
      title: "TEMPLE 3: SKY SANCTUM",
      subtitle: "The Cloud Spire",
      description: "High Altitudes, Wind Columns, and Precision Leaps",
      width: 1900,
      height: 700,
      spawn: { x: 80, y: 500 },
      checkpoint: { x: 920, y: 310 },
      platforms: [
        { x: 0, y: 580, w: 300, h: 120 },
        { x: 370, y: 490, w: 130, h: 22 },
        { x: 570, y: 410, w: 130, h: 22 },
        { x: 770, y: 330, w: 130, h: 22 },
        { x: 900, y: 350, w: 180, h: 22 },
        { x: 1140, y: 270, w: 140, h: 22 },
        { x: 1350, y: 350, w: 140, h: 22 },
        { x: 1560, y: 440, w: 340, h: 260 },
        { x: -30, y: 0, w: 30, h: 700 },
        { x: 1900, y: 0, w: 30, h: 700 }
      ],
      movingPlatforms: [
        { x: 420, y: 320, w: 100, h: 16, startX: 420, endX: 520, vx: 1.4, startY: 320, endY: 180, vy: 1.2 },
        { x: 1180, y: 430, w: 100, h: 16, startX: 1180, endX: 1300, vx: 2.0, startY: 430, endY: 430, vy: 0 }
      ],
      collectibles: [
        { id: 'c3_1', x: 430, y: 450, type: 'rune', value: 100, taken: false },
        { id: 'c3_2', x: 630, y: 370, type: 'rune', value: 100, taken: false },
        { id: 'c3_3', x: 970, y: 310, type: 'rune', value: 100, taken: false },
        { id: 'c3_4', x: 1200, y: 230, type: 'gem', value: 400, taken: false },
        { id: 'c3_5', x: 1410, y: 310, type: 'rune', value: 100, taken: false }
      ],
      hazards: [
        { x: 300, y: 680, w: 1260, h: 40, type: 'pit' },
        { x: 940, y: 328, w: 50, h: 22, type: 'spikes' }
      ],
      switches: [
        { id: 'sw3', x: 1210, y: 246, w: 24, h: 24, active: false, targetDoorId: 'door3' }
      ],
      doors: [
        { id: 'door3', x: 1780, y: 340, w: 42, h: 100, locked: true, isExit: true }
      ]
    },
    {
      title: "TEMPLE 4: MOLTEN FORTRESS",
      subtitle: "The Core of Hephaestus",
      description: "Hazardous Heat, Collapsing Ledges & Ancient Trials",
      width: 2000,
      height: 700,
      spawn: { x: 80, y: 490 },
      checkpoint: { x: 1020, y: 390 },
      platforms: [
        { x: 0, y: 570, w: 320, h: 130 },
        { x: 420, y: 480, w: 120, h: 22 },
        { x: 620, y: 390, w: 140, h: 22 },
        { x: 840, y: 320, w: 130, h: 22 },
        { x: 1000, y: 430, w: 190, h: 22 },
        { x: 1260, y: 360, w: 140, h: 22 },
        { x: 1480, y: 440, w: 150, h: 22 },
        { x: 1720, y: 530, w: 280, h: 170 },
        { x: -30, y: 0, w: 30, h: 700 },
        { x: 2000, y: 0, w: 30, h: 700 }
      ],
      movingPlatforms: [
        { x: 740, y: 490, w: 90, h: 16, startX: 740, endX: 840, vx: 2.2, startY: 490, endY: 490, vy: 0 },
        { x: 1380, y: 480, w: 90, h: 16, startX: 1380, endX: 1470, vx: 1.8, startY: 480, endY: 480, vy: 0 }
      ],
      collectibles: [
        { id: 'c4_1', x: 470, y: 440, type: 'rune', value: 120, taken: false },
        { id: 'c4_2', x: 680, y: 350, type: 'rune', value: 120, taken: false },
        { id: 'c4_3', x: 1080, y: 390, type: 'gem', value: 500, taken: false },
        { id: 'c4_4', x: 1320, y: 320, type: 'rune', value: 120, taken: false },
        { id: 'c4_5', x: 1540, y: 400, type: 'rune', value: 120, taken: false }
      ],
      hazards: [
        { x: 320, y: 660, w: 1400, h: 50, type: 'lava' },
        { x: 640, y: 368, w: 60, h: 22, type: 'spikes' },
        { x: 1280, y: 338, w: 60, h: 22, type: 'spikes' }
      ],
      switches: [
        { id: 'sw4', x: 890, y: 296, w: 24, h: 24, active: false, targetDoorId: 'door4' }
      ],
      doors: [
        { id: 'door4', x: 1880, y: 430, w: 42, h: 100, locked: true, isExit: true }
      ]
    },
    {
      title: "TEMPLE 5: CRYSTAL SANCTUARY",
      subtitle: "The Eternal Chamber of Runes",
      description: "The Final Sanctum: Ultimate Platforming Mastery",
      width: 2200,
      height: 720,
      spawn: { x: 80, y: 520 },
      checkpoint: { x: 1100, y: 320 },
      platforms: [
        { x: 0, y: 600, w: 320, h: 120 },
        { x: 380, y: 500, w: 120, h: 22 },
        { x: 570, y: 420, w: 120, h: 22 },
        { x: 760, y: 340, w: 130, h: 22 },
        { x: 960, y: 270, w: 130, h: 22 },
        { x: 1080, y: 360, w: 180, h: 22 },
        { x: 1340, y: 300, w: 130, h: 22 },
        { x: 1540, y: 380, w: 130, h: 22 },
        { x: 1740, y: 460, w: 140, h: 22 },
        { x: 1940, y: 540, w: 260, h: 180 },
        { x: -30, y: 0, w: 30, h: 720 },
        { x: 2200, y: 0, w: 30, h: 720 }
      ],
      movingPlatforms: [
        { x: 480, y: 370, w: 80, h: 16, startX: 480, endX: 580, vx: 2.0, startY: 370, endY: 370, vy: 0 },
        { x: 1220, y: 420, w: 80, h: 16, startX: 1220, endX: 1340, vx: 2.2, startY: 420, endY: 260, vy: 1.5 }
      ],
      collectibles: [
        { id: 'c5_1', x: 430, y: 460, type: 'rune', value: 150, taken: false },
        { id: 'c5_2', x: 620, y: 380, type: 'rune', value: 150, taken: false },
        { id: 'c5_3', x: 820, y: 300, type: 'rune', value: 150, taken: false },
        { id: 'c5_4', x: 1010, y: 230, type: 'gem', value: 600, taken: false },
        { id: 'c5_5', x: 1390, y: 260, type: 'rune', value: 150, taken: false },
        { id: 'c5_6', x: 1790, y: 420, type: 'rune', value: 150, taken: false }
      ],
      hazards: [
        { x: 320, y: 690, w: 1620, h: 40, type: 'pit' },
        { x: 790, y: 318, w: 60, h: 22, type: 'spikes' },
        { x: 1570, y: 358, w: 60, h: 22, type: 'spikes' }
      ],
      switches: [
        { id: 'sw5', x: 1010, y: 246, w: 24, h: 24, active: false, targetDoorId: 'door5' }
      ],
      doors: [
        { id: 'door5', x: 2090, y: 440, w: 42, h: 100, locked: true, isExit: true }
      ]
    }
  ];
}

export function generateEndlessChamber(depth: number): LevelData {
  const width = 1600 + Math.min(depth * 100, 1000);
  const height = 680;
  const platforms = [
    { x: 0, y: 560, w: 320, h: 120 },
    { x: -30, y: 0, w: 30, h: 680 },
    { x: width, y: 0, w: 30, h: 680 }
  ];
  const collectibles: Collectible[] = [];
  const hazards: Hazard[] = [];
  const movingPlatforms: MovingPlatform[] = [];

  let curX = 300;
  let curY = 490;
  let idCounter = 1;

  while (curX < width - 360) {
    const gap = 85 + Math.random() * 95;
    const platW = 90 + Math.random() * 90;
    curY = Math.max(220, Math.min(510, curY + (Math.random() * 150 - 75)));
    curX += gap;

    platforms.push({ x: curX, y: curY, w: platW, h: 22 });
    collectibles.push({
      id: `endless_c_${idCounter++}`,
      x: curX + platW / 2,
      y: curY - 36,
      type: (Math.random() > 0.35 ? 'rune' : 'gem') as 'rune' | 'gem',
      value: 120 + depth * 10,
      taken: false
    });

    if (Math.random() > 0.5 && curX > 500) {
      hazards.push({
        x: curX + 15,
        y: curY - 20,
        w: Math.min(45, platW - 30),
        h: 20,
        type: 'spikes' as const
      });
    }

    if (Math.random() > 0.7) {
      movingPlatforms.push({
        x: curX,
        y: curY - 70,
        w: 80,
        h: 16,
        startX: curX,
        endX: curX + 120,
        vx: 1.5 + (depth * 0.1),
        startY: curY - 70,
        endY: curY - 70,
        vy: 0
      });
    }

    curX += platW;
  }

  // Final landing & exit
  platforms.push({ x: width - 340, y: 540, w: 340, h: 140 });
  hazards.push({ x: 300, y: 640, w: width - 600, h: 50, type: 'pit' as const });

  return {
    title: `ENDLESS SANCTUM - CHAMBER ${depth}`,
    subtitle: `Procedural Gauntlet`,
    description: `Difficulty: ${depth}x Multiplier • Traps: ${hazards.length}`,
    width,
    height,
    spawn: { x: 80, y: 480 },
    checkpoint: { x: Math.floor(width / 2), y: 350 },
    platforms,
    movingPlatforms,
    collectibles,
    hazards,
    switches: [
      { id: 'sw_endless', x: width - 400, y: 516, w: 24, h: 24, active: false, targetDoorId: 'door_endless' }
    ],
    doors: [
      { id: 'door_endless', x: width - 120, y: 440, w: 42, h: 100, locked: true, isExit: true }
    ]
  };
}
