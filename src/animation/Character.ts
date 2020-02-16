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
export default class Character extends PIXI.Container {
  protected filepath: string = "character/";
  protected resources = GameManager.instance.game.loader.resources;
  protected characterName: string;
  private character!: PIXI.Sprite;

  constructor(name) {
    super();
    this.characterName = name;
  }

  public path(num): string {
    return `${this.filepath}${this.characterName}/${num}.png`;
  }

  public standup(num) {
    const texture = this.resources[this.path(num)].texture;
    this.character = new PIXI.Sprite(texture);
    this.addChild(this.character);
  }
}
