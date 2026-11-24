// Procedural Web Audio API Sound Synthesizer for TEMPLE RUNES

export class SoundEngine {
  private ctx: AudioContext | null = null;
  public masterVol = 0.7;
  public sfxVol = 0.8;
  public musicVol = 0.5;
  private ambientGain: GainNode | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private isAmbienceRunning = false;

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.startAmbience();
      }
    } else if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public updateVolumes(master: number, sfx: number, music: number) {
    this.masterVol = Math.max(0, Math.min(1, master));
    this.sfxVol = Math.max(0, Math.min(1, sfx));
    this.musicVol = Math.max(0, Math.min(1, music));

    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(this.musicVol * this.masterVol * 0.12, this.ctx.currentTime);
    }
  }

  private startAmbience() {
    if (!this.ctx || this.isAmbienceRunning) return;
    try {
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 (mystic root)
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(82.4, this.ctx.currentTime); // E2 (fifth)

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(150, this.ctx.currentTime);

      gain.gain.setValueAtTime(this.musicVol * this.masterVol * 0.12, this.ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start();
      osc2.start();

      this.ambientOsc1 = osc1;
      this.ambientOsc2 = osc2;
      this.ambientGain = gain;
      this.isAmbienceRunning = true;
    } catch (e) {
      console.warn('Ambience audio initialization notice:', e);
    }
  }

  public play(type: 'jump' | 'double_jump' | 'rune' | 'gem' | 'switch' | 'checkpoint' | 'hit' | 'door' | 'victory' | 'game_over') {
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const master = this.ctx.createGain();
      master.gain.setValueAtTime(this.sfxVol * this.masterVol, now);
      master.connect(this.ctx.destination);

      if (type === 'jump') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(390, now + 0.14);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(master);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'double_jump') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(340, now);
        osc.frequency.exponentialRampToValueAtTime(680, now + 0.18);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.19);
        osc.connect(gain);
        gain.connect(master);
        osc.start(now);
        osc.stop(now + 0.19);
      } else if (type === 'rune') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.05); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.11); // G5
        gain.gain.setValueAtTime(0.28, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.connect(gain);
        gain.connect(master);
        osc.start(now);
        osc.stop(now + 0.28);
      } else if (type === 'gem') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(659.25, now); // E5
        osc.frequency.setValueAtTime(880.00, now + 0.07); // A5
        osc.frequency.setValueAtTime(1046.50, now + 0.14); // C6
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
        osc.connect(gain);
        gain.connect(master);
        osc.start(now);
        osc.stop(now + 0.32);
      } else if (type === 'switch') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(190, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);
        osc.connect(gain);
        gain.connect(master);
        osc.start(now);
        osc.stop(now + 0.13);
      } else if (type === 'checkpoint') {
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc1.type = 'sine';
        osc2.type = 'triangle';
        osc1.frequency.setValueAtTime(440, now);
        osc1.frequency.exponentialRampToValueAtTime(880, now + 0.32);
        osc2.frequency.setValueAtTime(554.37, now);
        osc2.frequency.exponentialRampToValueAtTime(1108.7, now + 0.32);
        gain.gain.setValueAtTime(0.32, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(master);
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.38);
        osc2.stop(now + 0.38);
      } else if (type === 'hit') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(130, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.25);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
        osc.connect(gain);
        gain.connect(master);
        osc.start(now);
        osc.stop(now + 0.26);
      } else if (type === 'door') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(440, now + 0.25);
        osc.frequency.linearRampToValueAtTime(880, now + 0.45);
        gain.gain.setValueAtTime(0.32, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.connect(gain);
        gain.connect(master);
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === 'victory') {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C - E - G - High C
        notes.forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);
          gain.gain.setValueAtTime(0.3, now + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.35);
          osc.connect(gain);
          gain.connect(master);
          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 0.35);
        });
      } else if (type === 'game_over') {
        const notes = [330, 293.66, 261.63, 196]; // E4, D4, C4, G3
        notes.forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now + idx * 0.16);
          gain.gain.setValueAtTime(0.35, now + idx * 0.16);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.16 + 0.3);
          osc.connect(gain);
          gain.connect(master);
          osc.start(now + idx * 0.16);
          osc.stop(now + idx * 0.16 + 0.3);
        });
      }
    } catch (e) {
      console.warn('Audio play notice:', e);
    }
  }
}

export const sound = new SoundEngine();
