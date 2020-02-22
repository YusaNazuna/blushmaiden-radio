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

  public update(): void {}

  /**
   * ウインドウの初期設定
   */
  public initial(params: graphicsParams): void {
    this.params = params;
    this.drawWindow();
  }

  /**
   * ウインドウの描画
   */
  private drawWindow = () => {
    const { x, y, width, height, radius, alpha } = this.params;

    if (this.graphics) {
      this.graphics.destroy();
    }

    this.graphics = new PIXI.Graphics();

    switch (this.windowName) {
      case "system":
        this.graphics.lineStyle(6, 0x290e19, 0.9);
        this.graphics.beginFill(0xd0ffda, 0.7);
        // this.graphics.beginFill(0xfff6d0, 0.7);
        this.graphics.drawRoundedRect(x, y, width, height, radius);
        this.graphics.alpha = alpha;
        this.graphics.endFill;
        break;
    }
    this.addChild(this.graphics);
  };

  /**
   * フェード
   */
  public fadeWindow = (alphaFrom: number, alphaTo: number, alphaProgress: number) => {
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

  public textInit = (params: { fontSize: number }) => {
    this.textStyle = new PIXI.TextStyle({
      fontFamily: "round-black",
      fontWeight: "bold",
      letterSpacing: 0,
      fontSize: 32,
      fill: "#391332"
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
    this.addChild(this.text);
  };

  public drawOneLine = (text: string) => {
    this.drawText(text, 30, 35);
  };

  public drawTwoLine = (text: string) => {
    this.drawText(text, 30, 15);
  };

  /**
   * 位置調整
   */
}

export default MessageWindow;
