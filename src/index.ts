import GameManager from "managers/GameManager";
import TitleScene from "scenes/TitleScene";
import IntroScene from "scenes/IntroScene";

window.onload = () => {
  GameManager.start({
    width: 960,
    height: 540
  });
  GameManager.loadScene(new IntroScene());

  Debug: {
    (window as any).GameManager = GameManager;
  }
};
