import * as PIXI from "pixi.js";
import GameManager from "managers/GameManager";

/**
 * キャラクターにまつわる動作処理を集約
 * - 固有ロジックを多く記述する予定
 * - リソース配列を受け取り、その処理を実行
 *
 * [ 必要なロジック ]
 * - アニメーションの場合、開始から終了までは実行し続けるような処理がタイムラインで必要
 * - 終了時にdestroyのような削除処理も必要
 */
class Character extends PIXI.Container {
  protected filepath: string = "character/";
  protected resources = GameManager.instance.game.loader.resources;
  protected renderer = GameManager.instance.game.renderer;
  protected characterName: string;
  private character!: PIXI.Sprite;

  constructor(name) {
    super();
    this.characterName = name;
  }

  public path(num: string): string {
    return `${this.filepath}${this.characterName}/${num}.png`;
  }

  /**
   * キャラクターを立ち上げ
   */
  public standup(num: string, x?: number, y?: number, flip?: boolean): void {
    const texture = this.resources[this.path(num)].texture;
    this.character = new PIXI.Sprite(texture);
    this.character.anchor.set(0.5);
    this.character.x = x;
    this.character.y = y;
    if (flip === true) {
      this.setFlip({ x: 0, y: 1 });
    }
    this.addChild(this.character);
  }

  /**
   * サイズの設定
   */
  public setScale(scale: number) {
    this.character.scale.set(scale);
  }

  /**
   * 歪みの設定
   * - 整数値の奇数 = 反転
   * - 整数値の偶数 = 通常
   */
  public setFlip(params: { x: number; y: number }): void {
    this.character.skew.x = Math.PI * params.x;
    this.character.skew.y = Math.PI * params.y;
  }
}

export default Character;
