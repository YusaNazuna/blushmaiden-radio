import * as PIXI from "pixi.js";
import GameManager from "managers/GameManager";
import SoundManager from "managers/SoundManager";
import LoaderAddParam from "./scenes/LoaderAddParam";
import AnimationParam from "interfaces/AnimationParam";

export default class Timeline {
  private time: number = 0;
  private isInit: boolean = false;
  private isStart: boolean = false;
  public timeLineSources1: AnimationParam[] = [];
  public timeLineSources2: AnimationParam[] = [];
  public timeLineSources3: AnimationParam[] = [];
  public continueSouces: AnimationParam[] = [];

  public get timer(): number {
    return this.time;
  }

  constructor() {}

  /**
   * 毎フレームの更新処理
   */
  public update(dt: number): void {
    if (!this.isStart) return;
    const source = this.timeLineSources1.filter(source => this.time === source.startFrame);

    if (source.length > 0) {
      source[0].method();
      if (!source[0].once) {
        this.continueSouces.push(source[0]);
      }
    }

    this.time++;
  }

  public endUpdate(dt: number): void {
    this.continueSouces
      .filter(source => this.time <= source.endFrame)
      .map(source => {
        source.method();
      });
  }

  /**
   * 起動
   */
  public start(): void {
    if (this.timeLineSources1.length === 0) return;
    this.isStart = true;
  }

  /**
   * 初期化
   */
  public reset(): void {
    this.isInit = true;
    this.isStart = false;
    this.time = 0;
  }
}
