import GameManager from "managers/GameManager";
import Character from "animation/Character";
import Shape from "animation/Shape";
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
      shape: { yukari: {}, maki: {} },
      yukari: {},
      maki: {},
      windows: { system: {}, yukari: {}, maki: {} }
    };

    this.instance.shape.yukari = new Shape("round");
    this.instance.shape.maki = new Shape("round");
    this.instance.yukari = new Character("yukari");
    this.instance.maki = new Character("maki");
    this.instance.windows.system = new MessageWindow("system");

    this.lists = [
      {
        // ゆかマキを配置
        ...this.setParam({
          startFrame: 1,
          endFrame: 1,
          method: () => {
            this.instance.shape.yukari.initial({
              x: this.width - 70,
              y: this.height - 100,
              radius: 300,
              color: 0xff4180,
              lColor: 0xff4180,
              alpha: 1
            });
            this.instance.shape.maki.initial({
              x: 70,
              y: this.height - 100,
              radius: 300,
              color: 0xffdb41,
              lColor: 0xffdb41,
              alpha: 1
            });
            this.container.addChild(this.instance.shape.yukari);
            this.container.addChild(this.instance.shape.maki);
            this.instance.yukari.initial({ x: this.width - 180, y: this.height - 240, num: "01", scale: 0.7 });
            this.container.addChild(this.instance.yukari);
            this.instance.maki.initial({ x: 180, y: this.height - 250, num: "01", scale: 0.7 });
            this.container.addChild(this.instance.maki);
          }
        })
      },
      {
        // フェード初期化
        ...this.setParam({
          startFrame: 2,
          endFrame: 1000,
          method: dt => {
            this.instance.shape.yukari.motionPonyon(0.05, 2);
            this.instance.yukari.motionUkiUki(0.1, 10);
            this.instance.maki.motionAwawa(0.6, 20);
          }
        })
      },
      {
        // メッセージウインドウの初期化・表示
        ...this.setParam({
          startFrame: 40,
          endFrame: 40,
          method: () => {
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
            this.instance.yukari.setCharacter("02");
          }
        })
      },
      {
        // テキスト初期化
        ...this.setParam({
          startFrame: 82,
          endFrame: 180,
          method: dt => {
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
            this.instance.windows.system.drawOneLine("始まりました。「はじおと」第４回目です。");
          }
        })
      },
      {
        // テキスト初期化
        ...this.setParam({
          startFrame: 201,
          endFrame: 201,
          method: () => {
            this.instance.yukari.setCharacter("10");
          }
        })
      },
      {
        // テキスト初期化
        ...this.setParam({
          startFrame: 300,
          endFrame: 400,
          method: dt => {
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
            this.instance.windows.system.drawOneLine("恥じらわずにやっていきたいですね (・×・)");
          }
        })
      }
    ];
  }
}
