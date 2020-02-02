import * as PIXI from "pixi.js";
import GameManager from "./GameManager";
import Scene from "./Scene";
import FirstScene from "./FirstScene";
import Resource from "Resource";
import LoaderAddParam from "./LoaderAddParam";

export default class TitleScene extends Scene {
  private game: PIXI.Application = GameManager.instance.game;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
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
    GameManager.loadScene(new FirstScene());
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
}
