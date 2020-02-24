import * as PIXI from "pixi.js";
import GameManager from "managers/GameManager";

interface shapeParams {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  color: number;
  lColor: number;
  alpha?: number;
}

/**
 * シェイプにまつわる動作処理を集約
 */
class Shape extends PIXI.Container {
  protected resources = GameManager.instance.game.loader.resources;
  protected renderer = GameManager.instance.game.renderer;
  private graphics!: PIXI.Graphics;
  private shapeName: string;
  private params: shapeParams;
  private alphaFrom!: number;
  private alphaTo!: number;
  private alphaProgress: number;
  private delta: { ponyon: number };

  constructor(shapeName) {
    super();
    this.shapeName = shapeName;
    this.delta = { ponyon: 0 };
  }

  public update(): void {}

  /**
   * シェイプの初期設定
   */
  public initial(params: shapeParams): void {
    this.params = params;
    this.drawShape();
  }

  /**
   * シェイプの描画
   */
  private drawShape = () => {
    const { x, y, width, height, radius, color, lColor, alpha } = this.params;

    if (this.graphics) {
      this.graphics.destroy();
    }

    this.graphics = new PIXI.Graphics();
    switch (this.shapeName) {
      case "round":
        this.graphics.lineStyle(6, lColor, 1);
        this.graphics.beginFill(color, 1);
        this.graphics.drawCircle(x, y, radius);
        break;
    }

    this.graphics.alpha = alpha;
    this.graphics.endFill;
    this.addChild(this.graphics);
  };

  /**
   * フェード
   */
  public fadeShape = (alphaFrom: number, alphaTo: number, alphaProgress: number) => {
    this.alphaFrom = alphaFrom;
    this.alphaTo = alphaTo;
    this.alphaProgress = alphaProgress;

    if (
      (this.alphaTo <= this.alphaFrom && this.graphics.alpha >= this.alphaTo) ||
      (this.alphaTo >= this.alphaFrom && this.graphics.alpha <= this.alphaTo)
    ) {
      this.graphics.alpha += this.alphaProgress;
    }
  };

  /**
   * ぽにょん
   */
  public motionPonyon(dt: number, level: number): void {
    this.params.radius = this.params.radius + Math.sin(this.delta.ponyon) * level;
    this.delta.ponyon += dt;
    this.drawShape();
  }
}

export default Shape;
