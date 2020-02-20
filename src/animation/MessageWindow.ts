import * as PIXI from "pixi.js";
import GameManager from "managers/GameManager";

interface graphicsParams {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  alpha?: number;
}

/**
 * メッセージウインドウにまつわる動作処理を集約
 * - 固有ロジックを多く記述する予定
 * - リソース配列を受け取り、その処理を実行
 */
class MessageWindow extends PIXI.Container {
  protected resources = GameManager.instance.game.loader.resources;
  protected renderer = GameManager.instance.game.renderer;
  private graphics!: PIXI.Graphics;
  protected windowName: string;
  private params: graphicsParams;
  private alphaFrom!: number;
  private alphaTo!: number;
  private alphaProgress: number;

  constructor(windowName) {
    super();
    this.windowName = windowName;
  }

  /**
   * ウインドウの立ち上げ
   */
  public ready(params: graphicsParams): void {
    this.params = params;
    this.graphics = new PIXI.Graphics();
    this.drawMessageWindow();
    this.addChild(this.graphics);
  }

  /**
   * ウインドウの描画
   */
  public drawMessageWindow = () => {
    const { x, y, width, height, radius, alpha } = this.params;
    switch (this.windowName) {
      case "system":
        this.graphics.lineStyle(6, 0x290e19, 0.9);
        this.graphics.beginFill(0xeac594, 0.55);
        this.graphics.drawRoundedRect(x, y, width, height, radius);
        this.graphics.alpha = alpha;
        this.graphics.endFill;
        break;
    }
  };

  /**
   * フェード初期化
   */
  public fadeInit = (alphaFrom: number, alphaTo: number, alphaProgress: number) => {
    this.alphaFrom = alphaFrom;
    this.alphaTo = alphaTo;
    this.alphaProgress = alphaProgress;
    this.graphics.alpha = alphaFrom;
  };

  public fade = () => {
    if (
      (this.alphaTo <= this.alphaFrom && this.graphics.alpha >= this.alphaTo) ||
      (this.alphaTo >= this.alphaFrom && this.graphics.alpha <= this.alphaTo)
    ) {
      this.graphics.alpha += this.alphaProgress;
    }
  };

  /**
   * 位置調整
   */
}

export default MessageWindow;
