import GameManager from "managers/GameManager";
import Character from "animation/Character";
import MessageWindow from "animation/MessageWindow";
import Scenario from "scenario/Scenario";

export default class IntroScenario extends Scenario {
  public instance: any;
  private container: PIXI.Container;
  private renderer = GameManager.instance.game.renderer;
  private width = GameManager.instance.game.renderer.width;
  private height = GameManager.instance.game.renderer.height;

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
        // ゆかマキを配置
        ...this.setParam({
          startFrame: 1,
          endFrame: 1,
          method: () => {
            if (Object.keys(this.instance.yukari).length === 0) {
              this.instance.yukari = new Character("yukari");
              this.instance.yukari.initial({ x: this.width - 180, y: this.height - 200, num: "01", scale: 0.6 });
              this.container.addChild(this.instance.yukari);
            }
            if (Object.keys(this.instance.maki).length === 0) {
              this.instance.maki = new Character("maki");
              this.instance.maki.initial({ x: 180, y: this.height - 220, num: "01", scale: 0.6 });
              this.container.addChild(this.instance.maki);
            }
          }
        })
      },
      {
        // メッセージウインドウの初期化・表示
        ...this.setParam({
          startFrame: 40,
          endFrame: 40,
          method: () => {
            if (Object.keys(this.instance.windows.system).length !== 0) return;
            this.instance.windows.system = new MessageWindow("system");
            this.instance.windows.system.initial({
              x: 160,
              y: this.renderer.height - 160,
              width: 920,
              height: 120,
              radius: 10,
              alpha: 0
            });
            this.container.addChild(this.instance.windows.system);
          }
        })
      },
      {
        // フェード初期化
        ...this.setParam({
          startFrame: 41,
          endFrame: 80,
          method: () => {
            this.instance.windows.system.fadeWindow(0.0, 1.0, 0.03);
          }
        })
      },
      {
        // テキスト初期化
        ...this.setParam({
          startFrame: 81,
          endFrame: 81,
          method: () => {
            this.instance.windows.system.textInit();
          }
        })
      },
      {
        // テキスト初期化
        ...this.setParam({
          startFrame: 82,
          endFrame: 180,
          method: () => {
            this.instance.yukari.setCharacter("02");
            this.instance.windows.system.drawOneLine("こんにちは。結月ゆかりです。");
          }
        })
      },
      {
        // テキスト初期化
        ...this.setParam({
          startFrame: 200,
          endFrame: 300,
          method: () => {
            this.instance.yukari.setCharacter("06");
            this.instance.windows.system.drawOneLine("始まりました。「はじおと」第４回目です。");
          }
        })
      },
      {
        // テキスト初期化
        ...this.setParam({
          startFrame: 300,
          endFrame: 400,
          method: () => {
            this.instance.yukari.setCharacter("07");
            this.instance.windows.system.drawOneLine("恥じらう乙女という題名ですけれど、");
          }
        })
      },
      {
        // テキスト初期化
        ...this.setParam({
          startFrame: 401,
          endFrame: 500,
          method: () => {
            this.instance.yukari.setCharacter("09");
            this.instance.windows.system.drawOneLine("恥じらわずにやっていきたいですね (・×・)");
          }
        })
      }
    ];
  }
}
