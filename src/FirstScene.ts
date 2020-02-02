import * as PIXI from "pixi.js";
import GameManager from "./GameManager";
import Scene from "./Scene";
import SecondScene from "./SecondScene";
import TitleScene from "./TitleScene";
import Transition from "interfaces/Transition";
import Immediate from "transition/Immediate";
import Fade from "transition/Fade";
import LoaderAddParam from "./LoaderAddParam";
import Resource from "Resource";

export default class FirstScene extends Scene {
  private text!: PIXI.Text;
  private game: PIXI.Application = GameManager.instance.game;

  private count: number = 0;
  protected transitionIn: Transition = new Fade(1.0, 0.0, -0.01);
  protected transitionOut: Transition = new Fade(0.0, 1.0, 0.01);

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

    this.text = new PIXI.Text("YUKARI", textStyle);
    this.text.interactive = true;
    this.text.buttonMode = true;
    this.text.anchor.set(0.5);
    this.text.position.set(renderer.width * 0.5, renderer.height * 0.5);
    this.addChild(this.text);
    // テキストをクリックされると、this.nextSceneを発火
    this.text.on("pointerdown", this.nextScene);
  }

  /**
   * 毎フレームの更新処理
   */
  public update(dt: number): void {
    super.update(dt);
    this.text.text = `YUKARI scene \n${this.count++}`;
  }

  /**
   * シーン描画
   */
  protected onLoadedRenderer(): void {
    const renderer = GameManager.instance.game.renderer;
    let id = this.game.loader.resources[Resource.Static.Sofia].textures;
    let sprite = new PIXI.Sprite(id["sofia-003.png"]);
    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.on("pointerdown", this.nextScene);
    this.addChild(sprite);
  }

  protected createInitialResourceList(): (LoaderAddParam | string)[] {
    let assets = [];
    const staticResource = Resource.Static;
    assets = assets.concat(staticResource.Sofia);
    return assets;
  }

  /**
   * 次のシーンへの遷移
   */
  public nextScene(): void {
    GameManager.loadScene(new TitleScene());
  }
}
