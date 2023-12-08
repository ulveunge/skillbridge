import { Controller } from "@hotwired/stimulus";
import YouTubePlayer from "youtube-player";
import { YouTubePlayer as YTPlayer, Options } from "youtube-player/dist/types";

export default class VideoController extends Controller {
  static targets = ["container", "playButton"];
  static values = { id: String };

  player: YTPlayer | null = null;

  connect() {
    if (this.hasContainerTarget) {
      this.init();
    }
  }

  disconnect() {
    if (this.hasContainerTarget) {
      this.playButtonTarget.removeEventListener("click", this.play);
      this.player!.destroy();
    }
  }

  init() {
    const options: Options = {
      videoId: this.idValue,
      playerVars: {
        autoplay: 0,
        color: "white",
      },
    };

    this.player = YouTubePlayer(this.containerTarget, options) as YTPlayer;

    if (this.hasPlayButtonTarget) {
      this.player.on("ready", () => {
        this.playButtonTarget.addEventListener("click", this.play.bind(this));
      });
    }

    this.player.on("stateChange", ({ data }) => {
      if (data === 2) {
        this.element.classList.remove("active");
      } else {
        this.element.classList.add("active");
      }
    });
  }

  play() {
    this.element.classList.add("active");
    this.player!.playVideo();
  }

  declare readonly containerTarget: HTMLIFrameElement;
  declare readonly playButtonTarget: HTMLButtonElement;
  declare readonly hasContainerTarget: boolean;
  declare readonly hasPlayButtonTarget: boolean;
  declare idValue: string;
}
