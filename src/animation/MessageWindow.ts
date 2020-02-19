import * as PIXI from "pixi.js";
import GameManager from "managers/GameManager";

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

  constructor(windowName) {
    super();
    this.windowName = windowName;
  }

  /**
   * ウインドウの立ち上げ
   */
  public ready(params: { x: number; y: number; width: number; height: number; radius: number; visible?: boolean }): void {
    this.graphics = new PIXI.Graphics();
    this.drawMessageWindow(params);
    this.addChild(this.graphics);
  }

  /**
   * ウインドウの描画
   */
  public drawMessageWindow = params => {
    const { x, y, width, height, radius, visible } = params;
    switch (this.windowName) {
      case "system":
        this.graphics.lineStyle(6, 0x290e19, visible ? 0.9 : 0);
        this.graphics.beginFill(0xeac594, visible ? 0.55 : 0);
        this.graphics.drawRoundedRect(x, y, width, height, radius);
        this.graphics.endFill;
        break;
    }
  };

  /**
   * 位置調整
   */
}

export default MessageWindow;
