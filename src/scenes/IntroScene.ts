import * as PIXI from "pixi.js";
import GameManager from "managers/GameManager";
import SoundManager from "managers/SoundManager";
import Scene from "scenes/Scene";
import Timeline from "Timeline";
import Resource from "Resource";
import LoaderAddParam from "interfaces/LoaderAddParam";
import Fade from "transition/Fade";
import IntroScenario from "scenario/IntroScenario";

export default class IntroScene extends Scene {
  private game: PIXI.Application = GameManager.instance.game;
  private container: PIXI.Container = new PIXI.Container();
  private resources = GameManager.instance.game.loader.resources;
  private timeline: Timeline;
  public introScenario: IntroScenario;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.addChild(this.container);
    this.transitionIn = new Fade(1.0, 0.0, -0.02);
    this.transitionOut = new Fade(0.0, 1.0, 0.02);
    this.introScenario = new IntroScenario(this.container);
  }

  /**
   * 毎フレームの更新処理
   */
  public update(dt: number): void {
    super.update(dt);
    if (this.timeline) {
      this.timeline.update(dt);
      this.timeline.endUpdate(dt);
    }
  }

  /**
   * 次のシーンへの遷移
   */
  public nextScene(): void {}

  /**
   * シーン描画
   */
  protected onLoadedRenderer(): void {
    this.timeline = new Timeline();
    this.introScenario.scenario.map(scenario => {
      this.timeline.timeLineSources1.push(scenario);
    });
    this.timeline.start();
  }

  protected createInitialResourceList(): (LoaderAddParam | string)[] {
    let assets = [];
    const characters = Resource.Character;
    for (let key of Object.keys(characters)) {
      const character = characters[key];
      for (let i = 1; i <= character.len; i++) {
        const num = new Intl.NumberFormat("ja", { minimumIntegerDigits: 2 }).format(i);
        assets = assets.concat(`${character.path}/${num}.png`);
      }
    }
    return assets;
  }
}
