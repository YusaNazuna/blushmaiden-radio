import * as PIXI from "pixi.js";
import GameManager from "./GameManager";
import Scene from "./Scene";
import Resource from "Resource";
import LoaderAddParam from "./LoaderAddParam";

export default class TitleScene extends Scene {
  private game: PIXI.Application = GameManager.instance.game;
  private container: PIXI.Container = new PIXI.Container();

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.addChild(this.container);
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
    GameManager.loadScene(new TitleScene());
  }

  /**
   * シーン描画
   */
  protected onLoadedRenderer(): void {
    const renderer = GameManager.instance.game.renderer;
    const title = this.game.loader.resources[Resource.Static.Title].texture;
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
