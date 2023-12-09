import { Controller } from "@hotwired/stimulus";

export default class AccordionController extends Controller<HTMLElement> {
  static targets = ["button", "content"];

  contentHeight: string = `100vh`;

  connect() {
    if (this.hasButtonTarget) {
      this.buttonTarget.addEventListener("click", this.toggle.bind(this));
    }

    if (this.hasContentTarget) {
      this.calculate();
      window.addEventListener("resize", this.calculate.bind(this));
    }
  }

  disconnect() {
    if (this.hasButtonTarget) {
      this.buttonTarget.removeEventListener("click", this.toggle);
    }

    if (this.hasContentTarget) {
      this.contentTarget.removeEventListener("resize", this.calculate);
    }
  }

  toggle() {
    this.element.classList.toggle("open");
  }

  calculate() {
    this.element.style.setProperty("--content-close-height", "fit-content");
    this.element.style.setProperty("--content-open-height", "fit-content");

    this.contentHeight = `${
      this.contentTarget.getBoundingClientRect().height / 10
    }rem`;

    this.element.style.setProperty("--content-open-height", this.contentHeight);
    this.element.style.setProperty("--content-close-height", "0rem");
  }

  declare readonly hasButtonTarget: boolean;
  declare readonly hasContentTarget: boolean;
  declare readonly buttonTarget: HTMLElement;
  declare readonly contentTarget: HTMLElement;
}
