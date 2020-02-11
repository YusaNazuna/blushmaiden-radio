import * as PIXI from "pixi.js";
import GameManager from "managers/GameManager";
import Scene from "scenes/Scene";
import Resource from "Resource";
import SoundManager from "managers/SoundManager";
import LoaderAddParam from "./LoaderAddParam";
import Fade from "transition/Fade";

export default class IntroScene extends Scene {
  private game: PIXI.Application = GameManager.instance.game;
  private container: PIXI.Container = new PIXI.Container();
  private resources = GameManager.instance.game.loader.resources;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.addChild(this.container);
    this.transitionIn = new Fade(1.0, 0.0, -0.02);
    this.transitionOut = new Fade(0.0, 1.0, 0.02);
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
  public nextScene(): void {}

  /**
   * シーン描画
   */
  protected onLoadedRenderer(): void {
    const renderer = GameManager.instance.game.renderer;
    const title = this.resources[Resource.Static.Title].texture;
    const sprite = new PIXI.Sprite(title);

    sprite.width = renderer.width;
    sprite.height = renderer.height;
    this.container.addChild(sprite);
  }

  protected createInitialResourceList(): (LoaderAddParam | string)[] {
    let assets = [];
    const staticResource = Resource.Static;
    assets = assets.concat(staticResource.Title);
    assets = assets.concat(Resource.Sound.Bgm.Title);
    return assets;
  }
}