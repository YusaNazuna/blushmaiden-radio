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
  private text: PIXI.Text;
  private textStyle: PIXI.TextStyle;

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
        this.graphics.beginFill(0xfaebff, 0.7);
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

  public textInit = () => {
    this.textStyle = new PIXI.TextStyle({
      fontFamily: "round-black",
      fontSize: 36,
      fontWeight: "bold",
      fill: "#391332",
      letterSpacing: 0
    });
  };

  /**
   * テキスト描画
   */
  public drawText = (text: string, inX: number, inY: number) => {
    if (this.text) {
      this.text.destroy();
    }
    this.text = new PIXI.Text(text, this.textStyle);
    this.text.x = this.params.x + inX;
    this.text.y = this.params.y + inY;
    this.text.anchor.y = 0.5;
    this.addChild(this.text);
  };

  /**
   * 位置調整
   */
}

export default MessageWindow;
