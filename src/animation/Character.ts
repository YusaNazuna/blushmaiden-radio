import * as PIXI from "pixi.js";
import GameManager from "managers/GameManager";

interface characterParams {
  x: number;
  y: number;
  num: string;
  scale?: number;
  flip?: boolean;
  alpha?: number;
}

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
  private params: characterParams;
  private delta: { ukiuki: number; awawa: number };
  constructor(name) {
    super();
    this.characterName = name;
    this.delta = { ukiuki: 0, awawa: 0 };
    this.sortableChildren = true;
  }

  public update(): void {}

  public path(num: string): string {
    return `${this.filepath}${this.characterName}/${num}.png`;
  }

  /**
   * キャラクターの初期設定
   */
  public initial(params: characterParams): void {
    this.params = params;
    this.standup();
  }

  /**
   * キャラクターを立ち上げ
   */
  public standup(): void {
    const { x, y, num, scale, flip } = this.params;

    if (this.character) {
      this.character.destroy();
    }

    const texture = this.resources[this.path(num)].texture;
    this.character = new PIXI.Sprite(texture);
    this.character.anchor.set(0.5);
    this.character.x = x;
    this.character.y = y;
    this.setScale(scale);
    if (flip === true) {
      this.setFlip({ x: 0, y: 1 });
    }
    this.addChild(this.character);
  }

  /**
   * サイズの設定
   */
  public setScale(scale: number): void {
    this.params.scale = scale;
    this.character.scale.set(scale);
  }

  /**
   * 透過の設定
   */
  public setAlpha(alpha: number): void {
    this.params.alpha = alpha;
    this.character.alpha = alpha;
  }

  /**
   * 立ち絵変更
   */
  public setCharacter(num: string): void {
    this.params.num = num;
    this.standup();
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

  /**
   * ウキウキ
   */
  public motionUkiUki(dt: number, level: number): void {
    const { y, scale } = this.params;
    this.character.y = y + Math.sin(this.delta.ukiuki) * level;
    this.character.scale = new PIXI.Point(scale + Math.sin(this.delta.ukiuki) * 0.02, scale);
    this.delta.ukiuki += dt;
  }

  /**
   * あわわ
   */
  public motionAwawa(dt: number, level: number): void {
    const { x } = this.params;
    this.character.x = x + Math.sin(this.delta.awawa) * level;
    this.delta.awawa += dt;
  }
}

export default Character;
