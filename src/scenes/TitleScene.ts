import * as PIXI from "pixi.js";
import GameManager from "managers/GameManager";
import Scene from "scenes/Scene";
import Resource from "Resource";
import SoundManager from "managers/SoundManager";
import LoaderAddParam from "./LoaderAddParam";
import Particle from "Particle";
import IntroScene from "scenes/IntroScene";
import Fade from "transition/Fade";

export default class TitleScene extends Scene {
  private game: PIXI.Application = GameManager.instance.game;
  private container: PIXI.Container = new PIXI.Container();
  private particle: Particle;
  private resources = GameManager.instance.game.loader.resources;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.transitionOut = new Fade(0.0, 1.0, 0.02);
    this.transitionIn = new Fade(0, 0.0, 0);
    this.particle = new Particle(960, 500, 100);
    this.addChild(this.particle.container);
    this.addChild(this.container);
  }

  /**
   * 毎フレームの更新処理
   */
  public update(dt: number): void {
    const instance = GameManager.instance;
    super.update(dt);
    this.particle.update(dt);
  }

  /**
   * 次のシーンへの遷移
   */
  public nextScene(): void {
    GameManager.loadScene(new IntroScene());
  }

  /**
   * シーン描画
   */
  protected onLoadedRenderer(): void {
    const renderer = GameManager.instance.game.renderer;
    const title = this.resources[Resource.Static.Title].texture;
    const sprite = new PIXI.Sprite(title);

    sprite.width = renderer.width;
    sprite.height = renderer.height;

    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.on("pointerdown", this.nextScene);
    this.container.addChild(sprite);
  }

  protected createInitialResourceList(): (LoaderAddParam | string)[] {
    let assets = [];
    const staticResource = Resource.Static;
    assets = assets.concat(staticResource.Title);
    return assets;
  }
}
