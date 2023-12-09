import { Controller } from "@hotwired/stimulus";

export default class TabController extends Controller {
  static targets = ["button", "frame"];

  connect() {
    if (this.hasButtonTarget && this.hasFrameTarget) {
      this.buttonTargets.forEach((buttonTarget, index) => {
        buttonTarget.addEventListener(
          "click",
          this.switchTab.bind(this, index)
        );
      });
    }
  }

  disconnect() {
    if (this.hasButtonTarget && this.hasFrameTarget) {
      this.buttonTargets.forEach((buttonTarget, index) => {
        buttonTarget.removeEventListener(
          "click",
          this.switchTab.bind(this, index)
        );
      });
    }
  }

  switchTab(index: number) {
    const toggleElements = (elements: HTMLElement[]) => {
      elements.forEach((element, elementIndex) => {
        if (elementIndex === index) {
          element.classList.add("active");
        } else {
          element.classList.remove("active");
        }
      });
    };

    toggleElements(this.buttonTargets);
    toggleElements(this.frameTargets);
  }

  declare readonly buttonTargets: HTMLButtonElement[];
  declare readonly frameTargets: HTMLElement[];
  declare readonly hasButtonTarget: boolean;
  declare readonly hasFrameTarget: boolean;
}
