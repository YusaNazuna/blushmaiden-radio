import GameManager from "managers/GameManager";
import TitleScene from "scenes/TitleScene";
import IntroScene from "scenes/IntroScene";

window.onload = () => {
  GameManager.start({
    width: 1280,
    height: 720
  });
  GameManager.loadScene(new IntroScene());

  Debug: {
    (window as any).GameManager = GameManager;
  }
};
