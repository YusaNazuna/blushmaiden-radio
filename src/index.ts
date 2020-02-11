import GameManager from "managers/GameManager";
import TitleScene from "scenes/TitleScene";

window.onload = () => {
  GameManager.start({
    width: 960,
    height: 540
  });
  GameManager.loadScene(new TitleScene());

  Debug: {
    (window as any).GameManager = GameManager;
  }
};
