import GameManager from "managers/GameManager";
import AnimationParam from "interfaces/AnimationParam";
import IntroScene from "scenes/IntroScene";
import Character from "animation/Character";
import MessageWindow from "animation/MessageWindow";
import Scenario from "scenario/Scenario";

export default class IntroScenario extends Scenario {
  public instance: any;
  private container: PIXI.Container;
  private renderer = GameManager.instance.game.renderer;

  constructor(container) {
    super();
    this.container = container;
    this.instance = {
      yukari: {},
      maki: {},
      windows: { system: {}, yukari: {}, maki: {} }
    };
    this.lists = [
      {
        ...this.setParam({
          startFrame: 10,
          endFrame: 120,
          method: () => {
            if (Object.keys(this.instance.yukari).length === 0) {
              this.instance.yukari = new Character("yukari");
              this.instance.yukari.standup("01", 780, 350, false);
              this.instance.yukari.setScale(0.5);
              this.container.addChild(this.instance.yukari);
            }
            if (Object.keys(this.instance.maki).length === 0) {
              this.instance.maki = new Character("maki");
              this.instance.maki.standup("01", 190, 350, false);
              this.instance.maki.setScale(0.5);
              this.container.addChild(this.instance.maki);
            }
          }
        })
      },
      {
        ...this.setParam({
          startFrame: 20,
          endFrame: 200,
          method: () => {
            if (Object.keys(this.instance.windows.system).length !== 0) return;
            this.instance.windows.system = new MessageWindow("system");
            this.instance.windows.system.ready({
              x: 20,
              y: this.renderer.height - 130,
              width: 920,
              height: 120,
              radius: 10,
              visible: false
            });
            this.container.addChild(this.instance.windows.system);
          }
        })
      }
    ];
  }
}
