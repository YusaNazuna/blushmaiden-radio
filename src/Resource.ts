import * as PIXI from "pixi.js";
import Scene from "scenes/Scene";

/**
 * リソースの URL や命名規則のマスタ
 */
const Resource = Object.freeze({
  Static: {
    Title: "bg/title.png"
  },
  Character: {
    Yukari: {
      path: "character/yukari",
      len: 47
    },
    Maki: {
      path: "character/maki",
      len: 47
    }
  },
  Sound: {
    Bgm: {
      Intro: "sound/Flingfish.mp3"
    },
    Voice: {
      Yukari: {
        Title: "sound/yukari/title/001_000_恥じらう乙女の.wav"
      }
    }
  }
});

export default Resource;
