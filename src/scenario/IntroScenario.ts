import GameManager from "managers/GameManager";
import AnimationParam from "interfaces/AnimationParam";
import IntroScene from "scenes/IntroScene";
import Character from "animation/Character";
import Scenario from "scenario/Scenario";

export default class IntroScenario extends Scenario {
  public instance: any;
  private container: PIXI.Container;

  constructor(container) {
    super();
    this.container = container;
    this.instance = {
      yukari: {}
    };
    this.lists = [
      {
        ...this.setParam({
          startFrame: 10,
          endFrame: 120,
          method: () => {
            if (Object.keys(this.instance.yukari).length === 0) {
              this.instance.yukari = new Character("yukari");
              this.instance.yukari.standup("01");
              this.container.addChild(this.instance.yukari);
            }
          }
        })
      }
    ];
  }
}
