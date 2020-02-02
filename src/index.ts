import GameManager from "./GameManager";
import TitleScene from "./TitleScene";
import FirstScene from "./FirstScene";

window.onload = () => {
  GameManager.start({
    width: 500,
    height: 350
  });
  GameManager.loadScene(new TitleScene());

  Debug: {
    (window as any).GameManager = GameManager;
  }
};
