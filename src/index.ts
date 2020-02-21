import * as WebFont from "webfontloader";
import GameManager from "managers/GameManager";
import TitleScene from "scenes/TitleScene";
import IntroScene from "scenes/IntroScene";
import Resource from "Resource";

let fontLoaded = false;
let windowLoaded = false;

const init = () => {
  GameManager.start({
    width: 1280,
    height: 720
  });
  GameManager.loadScene(new IntroScene());

  Debug: {
    (window as any).GameManager = GameManager;
  }
};

/**
 * フォント読みこみ
 * window 読み込みも完了していたらゲームを起動する
 */
WebFont.load({
  custom: {
    families: [Resource.FontFamily.Default],
    urls: ["base.css"]
  },
  active: () => {
    fontLoaded = true;
    if (windowLoaded) {
      init();
    }
  }
});

window.onload = () => {
  windowLoaded = true;
  if (fontLoaded) {
    init();
  }
};
