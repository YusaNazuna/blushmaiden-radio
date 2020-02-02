import * as PIXI from "pixi.js";
import GameManager from "./GameManager";
import Scene from "./Scene";
import SecondScene from "./SecondScene";

export default class TitleScene extends Scene {
  private img!: PIXI.Sprite;
  private text!: PIXI.Text;
  private game: PIXI.Application = GameManager.instance.game;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    const renderer = this.game.renderer;
    // ここで読み込むと、
    // 1. TitleSceneのContainer
    // 2. TransitionのFadeのContainer
    // 3. 読込完了後のスプライトのContainer
    // の順番になるため、画像が浮いたようになる。リソース制御が必要
    this.game.loader.add("sofia.json").load(() => this.setup());
  }

  /**
   * 毎フレームの更新処理
   */
  public update(dt: number): void {
    super.update(dt);
  }

  /**
   * 次のシーンへの遷移
   */
  public nextScene(): void {
    GameManager.loadScene(new SecondScene());
  }

  private setup(): void {
    let id = this.game.loader.resources["sofia.json"].textures;
    let sprite = new PIXI.Sprite(id["sofia-003.png"]);
    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.on("pointerdown", this.nextScene);
    this.addChild(sprite);
  }
}
