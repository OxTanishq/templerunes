import { InputState, LevelData, Particle } from './types';
import { sound } from './SoundEngine';

export class Player {
  public id: number;
  public color: string;
  public accent: string;
  public name: string;
  public isP2: boolean;

  public w = 26;
  public h = 42;
  public x: number;
  public y: number;
  public vx = 0;
  public vy = 0;

  // Platformer Mechanics
  public accel = 1.35;
  public friction = 0.82;
  public maxSpeed = 5.2;
  public gravity = 0.52;
  public jumpPower = -10.4;
  public doubleJumpPower = -9.2;

  public grounded = false;
  public coyoteTimer = 0;
  public coyoteTimeMax = 0.12;
  public jumpBuffer = 0;
  public jumpBufferMax = 0.12;
  public canDoubleJump = true;
  private wasJumpPressed = false;

  public facing: 1 | -1 = 1;
  public animTimer = 0;
  public hitCooldown = 0;
  public active = true;

  constructor(id: number, color: string, accent: string, name: string, isP2 = false, startX = 100, startY = 300) {
    this.id = id;
    this.color = color;
    this.accent = accent;
    this.name = name;
    this.isP2 = isP2;
    this.x = startX;
    this.y = startY;
  }

  public respawn(spawnPoint: { x: number; y: number }) {
    this.x = spawnPoint.x + (this.isP2 ? 24 : 0);
    this.y = spawnPoint.y;
    this.vx = 0;
    this.vy = 0;
    this.grounded = false;
    this.hitCooldown = 1.2;
    sound.play('hit');
  }

  public update(dt: number, input: InputState, level: LevelData, spawnParticles: (x: number, y: number, color: string, count?: number, speed?: number, size?: number, shape?: 'circle' | 'square') => void) {
    if (!this.active) return;

    if (this.hitCooldown > 0) this.hitCooldown -= dt;
    if (this.coyoteTimer > 0) this.coyoteTimer -= dt;
    if (this.jumpBuffer > 0) this.jumpBuffer -= dt;

    // Horizontal Input
    if (input.left) {
      this.vx -= this.accel;
      this.facing = -1;
    }
    if (input.right) {
      this.vx += this.accel;
      this.facing = 1;
    }

    // Velocity Clamping & Friction
    this.vx *= this.friction;
    if (Math.abs(this.vx) > this.maxSpeed) {
      this.vx = Math.sign(this.vx) * this.maxSpeed;
    }
    if (Math.abs(this.vx) < 0.05) this.vx = 0;

    // Jump Buffering
    if (input.jump && !this.wasJumpPressed) {
      this.jumpBuffer = this.jumpBufferMax;
    }
    this.wasJumpPressed = input.jump;

    const isGrounded = this.grounded || this.coyoteTimer > 0;

    if (this.jumpBuffer > 0) {
      if (isGrounded) {
        this.vy = this.jumpPower;
        this.grounded = false;
        this.coyoteTimer = 0;
        this.jumpBuffer = 0;
        this.canDoubleJump = true;
        sound.play('jump');
        spawnParticles(this.x + this.w / 2, this.y + this.h, '#cbd5e1', 7, 1.3, 2.5, 'circle');
      } else if (this.canDoubleJump) {
        this.vy = this.doubleJumpPower;
        this.canDoubleJump = false;
        this.jumpBuffer = 0;
        sound.play('double_jump');
        spawnParticles(this.x + this.w / 2, this.y + this.h, this.accent, 12, 2.8, 3, 'circle');
      }
    }

    // Variable Jump Cut (shorter jump when button let go)
    if (!input.jump && this.vy < -3.5) {
      this.vy *= 0.55;
    }

    // Gravity
    this.vy += this.gravity;
    if (this.vy > 14) this.vy = 14;

    // Movement & Collision
    this.moveWithCollisions(dt, level, spawnParticles);

    // Animation timer
    this.animTimer += dt * 10;
  }

  private moveWithCollisions(dt: number, level: LevelData, spawnParticles: (x: number, y: number, color: string, count?: number, speed?: number, size?: number, shape?: 'circle' | 'square') => void) {
    // Horizontal Movement
    this.x += this.vx * 60 * dt;
    for (const p of level.platforms) {
      if (p.isPassThrough) continue;
      if (this.intersects(p)) {
        if (this.vx > 0) this.x = p.x - this.w;
        else if (this.vx < 0) this.x = p.x + p.w;
        this.vx = 0;
      }
    }

    // Vertical Movement
    const wasGrounded = this.grounded;
    this.grounded = false;
    this.y += this.vy * 60 * dt;

    for (const p of level.platforms) {
      if (this.intersects(p)) {
        if (p.isPassThrough) {
          if (this.vy > 0 && (this.y + this.h - this.vy * 60 * dt) <= p.y + 4) {
            this.y = p.y - this.h;
            this.vy = 0;
            this.grounded = true;
          }
        } else {
          if (this.vy > 0) {
            this.y = p.y - this.h;
            this.vy = 0;
            this.grounded = true;
          } else if (this.vy < 0) {
            this.y = p.y + p.h;
            this.vy = 0;
          }
        }
      }
    }

    // Moving Platform attachment
    for (const mp of level.movingPlatforms) {
      if (this.x + this.w > mp.x && this.x < mp.x + mp.w) {
        if (Math.abs((this.y + this.h) - mp.y) < 7 && this.vy >= 0) {
          this.y = mp.y - this.h;
          this.vy = 0;
          this.grounded = true;
          this.x += mp.vx;
          this.y += mp.vy;
        }
      }
    }

    // Landing Dust effect
    if (!wasGrounded && this.grounded) {
      spawnParticles(this.x + this.w / 2, this.y + this.h, '#cbd5e1', 6, 1.2, 2, 'circle');
      this.canDoubleJump = true;
    }

    // Coyote timer start
    if (wasGrounded && !this.grounded && this.vy >= 0) {
      this.coyoteTimer = this.coyoteTimeMax;
    }
  }

  public intersects(box: { x: number; y: number; w: number; h: number }): boolean {
    return (
      this.x < box.x + box.w &&
      this.x + this.w > box.x &&
      this.y < box.y + box.h &&
      this.y + this.h > box.y
    );
  }

  public render(ctx: CanvasRenderingContext2D, camera: { x: number; y: number }) {
    if (!this.active) return;
    const rx = Math.floor(this.x - camera.x);
    const ry = Math.floor(this.y - camera.y);

    ctx.save();
    // Hit flash
    if (this.hitCooldown > 0 && Math.floor(Date.now() / 90) % 2 === 0) {
      ctx.globalAlpha = 0.45;
    }

    // Feet / Legs
    ctx.fillStyle = '#1e293b';
    const legOffset = Math.sin(this.animTimer) * (this.grounded && Math.abs(this.vx) > 0.5 ? 4 : 0);
    ctx.fillRect(rx + 4, ry + 28, 6, 14 + legOffset);
    ctx.fillRect(rx + 16, ry + 28, 6, 14 - legOffset);

    // Torso / Ancient Tunic
    ctx.fillStyle = this.color;
    ctx.fillRect(rx + 3, ry + 14, 20, 16);

    // Leather Belt & Golden Buckle
    ctx.fillStyle = '#78350f';
    ctx.fillRect(rx + 3, ry + 24, 20, 4);
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(rx + 11, ry + 24, 4, 4);

    // Helmet / Visor Base
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(rx + 5, ry + 3, 16, 13);

    // Dark Visor Slit
    ctx.fillStyle = '#0f172a';
    const eyeX = this.facing === 1 ? rx + 14 : rx + 6;
    ctx.fillRect(eyeX, ry + 7, 5, 3);
    // Glowing Eye Gem
    ctx.fillStyle = this.accent;
    ctx.fillRect(eyeX + (this.facing === 1 ? 2 : 1), ry + 8, 2, 2);

    // Flowing Scarf
    ctx.fillStyle = this.accent;
    ctx.fillRect(rx + 4, ry + 12, 18, 3);
    if (this.facing === -1) {
      ctx.fillRect(rx + 20, ry + 13, 6, 3);
    } else {
      ctx.fillRect(rx - 2, ry + 13, 6, 3);
    }

    // Player Tag above head
    ctx.font = 'bold 9px monospace';
    ctx.fillStyle = '#ffd875';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 4;
    ctx.fillText(this.name, rx + this.w / 2, ry - 4);

    ctx.restore();
  }
}
