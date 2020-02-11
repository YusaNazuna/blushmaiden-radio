import * as PIXI from "pixi.js";

/**
 * リソースの URL や命名規則のマスタ
 */
const Resource = Object.freeze({
  Static: {
    Title: "bg/title.png"
  },
  Sound: {
    Bgm: {
      Title: "sound/Flingfish.mp3",
      Scene1: "sound/夕焼けレモンティー.mp3"
    }
  }
});

export default Resource;
