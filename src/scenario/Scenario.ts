import GameManager from "managers/GameManager";
import AnimationParam from "interfaces/AnimationParam";

export default abstract class Scenario {
  public instance: any;
  protected lists: AnimationParam[];
  protected resources = GameManager.instance.game.loader.resources;

  public get scenario(): AnimationParam[] {
    return this.lists;
  }

  protected setParam(params): AnimationParam {
    return {
      startFrame: params.startFrame,
      endFrame: params.endFrame,
      method: params.method,
      once: params.once || false,
      isReady: params.isReady || false,
      instance: params.instance || null
    };
  }
}
