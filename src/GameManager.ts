import * as PIXI from "pixi.js";
import Scene from "./Scene";

export default class GameManager {
  /**
   * シングルトン.インスタンス
   */
  public static instance: GameManager;

  /**
   * 初期化時に生成
   */
  public game!: PIXI.Application;

  /**
   * シーンのトランジション完了フラグ
   * シーントランジションを制御するためのフラグ
   */
  private sceneTransitionOutFinished: boolean = true;

  /**
   * シーンのリソースロード完了フラグ
   * シーントランジションを制御するためのフラグ
   */
  private sceneResourceLoaded: boolean = true;

  /**
   * 現在のシーンインスタンス
   */
  private currentScene?: Scene;

  /**
   * コンストラクタ
   */
  constructor(app: PIXI.Application) {
    if (GameManager.instance) {
      throw new Error("GameManagerは１回だけインスタンス化が可能です");
    }

    // インスタンス化した後のinstanceにthisで追加できる
    this.game = app;
  }

  /**
   * ゲームを起動する
   */
  public static start(params: { width: number; height: number }): void {
    const options = {
      ...params,
      backgroundColor: 0x334fc1,
      antialias: true
    };
    const game = new PIXI.Application(options);
    game.loader.baseUrl = "assets/";
    const instance = new GameManager(game);
    GameManager.instance = instance;

    document.body.appendChild(game.view);

    game.ticker.add((delta: number) => {
      if (instance.currentScene) {
        instance.currentScene.update(delta);
      }
    });
  }

  /**
   * 可能であれば新しいシーンへのトランジションを開始
   */
  public static transitionInIfPossible(newScene: Scene): boolean {
    const instance = GameManager.instance;

    if (!instance.sceneResourceLoaded || !instance.sceneTransitionOutFinished) {
      return false;
    }

    if (instance.currentScene) {
      instance.currentScene.destroy({ children: true });
    }
    instance.currentScene = newScene;

    if (instance.game) {
      instance.game.stage.addChild(newScene);
    }

    newScene.beginTransitionIn((_: Scene) => {});

    return true;
  }

  public static loadScene(newScene: Scene): void {
    const instance = GameManager.instance;

    if (instance.currentScene) {
      instance.sceneResourceLoaded = false;
      instance.sceneTransitionOutFinished = false;
      newScene.beginLoadResource(() => {
        instance.sceneResourceLoaded = true;
        GameManager.transitionInIfPossible(newScene);
      });
      instance.currentScene.beginTransitionOut((_: Scene) => {
        instance.sceneTransitionOutFinished = true;
        GameManager.transitionInIfPossible(newScene);
      });
    } else {
      instance.sceneTransitionOutFinished = true;
      newScene.beginLoadResource(() => {
        instance.sceneResourceLoaded = true;
        GameManager.transitionInIfPossible(newScene);
      });
    }
  }
}
