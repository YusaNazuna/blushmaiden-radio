import * as PIXI from "pixi.js";

/**
 * キャラクターにまつわる動作処理を集約
 * - 固有ロジックを多く記述する予定
 * - リソース配列を受け取り、その処理を実行
 *
 * [ 必要なロジック ]
 * - アニメーションの場合、開始から終了までは実行し続けるような処理がタイムラインで必要
 * - 終了時にdestroyのような削除処理も必要
 */
export default class Character {
  constructor(resources: PIXI.IResourceDictionary) {}

  //
  public startYukari() {}
}
