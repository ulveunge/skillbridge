import { Controller } from "@hotwired/stimulus";

export default class AccordionController extends Controller<HTMLElement> {
  static targets = ["button", "content"];

  contentHeight: string = `100vh`;

  opened: boolean = false;

  connect() {
    if (this.hasButtonTarget) {
      this.buttonTarget.addEventListener("click", this.toggle.bind(this));
      window.addEventListener("accordion:close-all", this.close.bind(this));
    }

    if (this.hasContentTarget) {
      this.calculate();
      window.addEventListener("resize", this.calculate.bind(this));
    }
  }

  disconnect() {
    if (this.hasButtonTarget) {
      this.buttonTarget.removeEventListener("click", this.toggle);
      window.removeEventListener("accordion:close-all", this.close);
    }

    if (this.hasContentTarget) {
      this.contentTarget.removeEventListener("resize", this.calculate);
    }
  }

  toggle() {
    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    window.dispatchEvent(new CustomEvent("accordion:close-all"));
    this.element.classList.add("open");
    this.opened = true;
  }

  close() {
    this.element.classList.remove("open");
    this.opened = false;
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
