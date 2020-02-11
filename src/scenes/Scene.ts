import * as PIXI from "pixi.js";
import Transition from "interfaces/Transition";
import Immediate from "transition/Immediate";
import Fade from "transition/Fade";
import GameManager from "managers/GameManager";
import LoaderAddParam from "./LoaderAddParam";
import SoundManager from "managers/SoundManager";

/**
 * ゲームシーンの抽象クラス
 * UiGraph を利用して UI 情報を透過的に読み込み初期化する
 * また、シーン間のトランジションイベントを提供する
 * いずれのイベントも実装クラスにて独自処理の実装を行うことができる
 */
export default abstract class Scene extends PIXI.Container {
  protected transitionIn: Transition = new Immediate();
  protected transitionOut: Transition = new Immediate();

  /**
   * GameManager によって requestAnimationFrame 毎に呼び出されるメソッド
   */
  public update(delta: number): void {
    if (this.transitionIn.isActive()) {
      this.transitionIn.update(delta);
    } else if (this.transitionOut.isActive()) {
      this.transitionOut.update(delta);
    }
  }

  /**
   * 更新処理を行うべきオブジェクトとして渡されたオブジェクトを登録する
   */
  protected registerUpdatingObject(_object): void {}

  /**
   * 更新処理を行うべきオブジェクトを更新する
   */
  protected updateRegisteredObjects(_delta: number): void {}

  /**
   * シーン追加トランジション開始
   * 引数でトランジション終了時のコールバックを指定できる
   */
  public beginTransitionIn(onTransitionFinished: (scene: Scene) => void): void {
    this.transitionIn.setCallback(() => {
      onTransitionFinished(this);
    });

    const container = this.transitionIn.getContainer();
    if (container) {
      this.addChild(container);
    }

    this.transitionIn.begin();
  }

  /**
   * シーン削除トランジション開始
   * 引数でトランジション終了時のコールバックを指定できる
   * - ここのsceneは実際使用している`this`を表している
   */
  public beginTransitionOut(onTransitionFinished: (scene: Scene) => void): void {
    this.transitionOut.setCallback(() => {
      // GameManagerのコールバックの中
      onTransitionFinished(this);
    });
    const container = this.transitionOut.getContainer();
    if (container) {
      this.addChild(container);
    }
    // setCallback内の実行をbeginで始めている、というシンプルな内容
    this.transitionOut.begin();
  }

  /**
   * loadInitialResource に用いるリソースリストを作成するメソッド
   * デフォルトでは UiGraph のリソースリストを作成する
   */
  protected createInitialResourceList(): (LoaderAddParam | string)[] {
    return [];
  }

  /**
   * リソース読込を始める
   * - 全体を制御するManager.tsから呼び出される。
   */
  public beginLoadResource(onLoaded: () => void): Promise<void> {
    return new Promise(resolve => {
      this.loadResource(() => resolve());
    })
      .then(() => {
        // ManagerのCallbackを実行
        onLoaded();
      })
      .then(() => {
        // このシーン独自の描画
        this.onLoadedRenderer();
      });
  }

  private loadResource(onLoaded: () => void): void {
    const game = GameManager.instance.game;
    const assets = this.createInitialResourceList();
    const filteredAssets = this.filterLoadedAssets(assets);
    if (filteredAssets.length > 0) {
      // リソースの読込
      game.loader.add(filteredAssets).load(() => onLoaded());
    } else {
      onLoaded();
    }
  }

  private filterLoadedAssets(assets: (LoaderAddParam | string)[]): LoaderAddParam[] {
    const assetMap = new Map<string, LoaderAddParam>();
    const resources = GameManager.instance.game.loader.resources;

    for (const asset of assets) {
      if (typeof asset === "string") {
        if (!resources[asset] && !assetMap.has(asset)) {
          assetMap.set(asset, { name: asset, url: asset });
        }
      } else {
        if (!resources[asset.name] && !assetMap.has(asset.name)) {
          assetMap.set(asset.name, asset);
        }
      }
    }
    // `.values()`: value内のLoaderAddParamとして返す為
    return Array.from(assetMap.values());
  }

  /**
   * シーン描画
   */
  protected onLoadedRenderer(): void {}

  /**
   * BGM をループ再生する
   */
  protected playBgm(soundName: string): void {
    const bgm = SoundManager.getSound(soundName);
    if (bgm) {
      bgm.play(true);
    }
  }

  /**
   * BGM 再生を止める
   */
  protected stopBgm(soundName: string): void {
    const bgm = SoundManager.getSound(soundName);
    if (bgm) {
      bgm.stop();
    }
  }

  /**
   * 効果音を再生する
   */
  protected playSe(soundName: string): void {
    const se = SoundManager.getSound(soundName);
    if (se) {
      se.play();
    }
  }
}
