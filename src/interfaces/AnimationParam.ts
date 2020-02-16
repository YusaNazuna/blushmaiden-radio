import * as PIXI from "pixi.js";

export default interface AnimationParam {
  /**
   * 開始フレーム
   */
  startFrame: number;
  /**
   * 終了フレーム
   */
  endFrame: number;
  /**
   * 実行処理
   */
  method: any;
  /**
   * 初回のみか継続か
   */
  once?: boolean;
  isReady?: boolean;
  instance?: any;
}
