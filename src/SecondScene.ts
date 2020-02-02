import * as PIXI from "pixi.js";
import GameManager from "./GameManager";
import Scene from "./Scene";
import FirstScene from "./FirstScene";

export default class SecondScene extends Scene {
  private text!: PIXI.Text;
  private count: number = 0;

  /**
   * コンストラクタ
   */
  constructor() {
    super();

    const textStyle = new PIXI.TextStyle({
      fontSize: 20,
      fill: 0xffffff
    });

    const renderer = GameManager.instance.game.renderer;

    this.text = new PIXI.Text("KIRITAN scene", textStyle);
    this.text.interactive = true;
    this.text.anchor.set(0.5, 0.5);
    this.text.position.set(renderer.width * 0.5, renderer.height * 0.5);
    this.addChild(this.text);

    this.text.on("pointerdown", this.nextScene);
  }

  /**
   * 毎フレームの更新処理
   */
  public update(dt: number): void {
    super.update(dt);

    this.text.text = `KIRITAN scene \n${this.count++}`;
  }

  /**
   * 次のシーンへの遷移
   */
  public nextScene(): void {
    GameManager.loadScene(new FirstScene());
  }
}
