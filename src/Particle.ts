import * as PIXI from "pixi.js";

export default class Particle {
  public container: PIXI.Container;
  private particleNumbers: number = 100;
  private time: number = 0;
  private particles: PIXI.Graphics[] = [];
  private _particles = {};
  private width: number;
  private height: number;

  constructor(width: number, height: number, number: number, x?: number, y?: number) {
    this.container = new PIXI.Container();
    this.width = width;
    this.height = height;
    this.container.x = x || 0;
    this.container.y = y || 0;
    this.particleNumbers = number || this.particleNumbers;
    // particles[]に指定数分のループをする
    for (let i = 0; i < this.particleNumbers; i++) {
      const particle = this.createParticle(i, Math.random() * width, Math.random() * height, Math.random() * 3);
      this.particles.push(particle);
      this.container.addChild(particle);
    }
  }

  public update(dt: number): void {
    this.particles.map((particle, index) => {
      particle.x += this._particles[index].xspeed;
      particle.y += this._particles[index].yspeed;
      particle.x += Math.sin(this.time / 50);
      particle.y += Math.cos(this.time / 50);
      particle.rotation += particle.y / 5000;

      if (particle.x < 2 || particle.x > this.width) {
        this._particles[index].xspeed = -this._particles[index].xspeed;
      }
      if (particle.y < 2 || particle.y > this.height) {
        this._particles[index].yspeed = -this._particles[index].yspeed;
      }

      return particle;
    });
    this.time++;
  }

  private createParticle = (index, x: number, y: number, radius: number) => {
    const particle = new PIXI.Graphics();
    particle.x = x;
    particle.y = y;

    switch (index % 3) {
      case 0:
        particle.beginFill(0x17e8aa);
        particle.drawCircle(0, 0, radius);
        particle.endFill();
        break;

      case 1:
        particle.beginFill(0xffffff);
        particle.lineStyle(1, 0x2299ff, 1);
        particle.drawRect(0, 0, radius * 5.5, radius * 5.5);
        particle.endFill();
        break;

      case 2:
        particle.beginFill(0xffffff);
        particle.lineStyle(1, 0xd017e8, 1);
        particle.lineTo(radius, radius);
        particle.lineTo(radius * 10, radius * 10);
        particle.lineTo(radius * 10, radius * 2);
        particle.closePath();
        particle.endFill();
        particle.scale.set(0.2 * radius);
        particle.rotation = 360 - radius * 50;
        break;
    }

    this._particles[index] = {
      xspeed: Math.random() * 2 - 1.5,
      yspeed: Math.random() * 2 - 1.5
    };
    return particle;
  };
}
