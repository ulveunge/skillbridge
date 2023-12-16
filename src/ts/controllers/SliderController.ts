import { Controller } from "@hotwired/stimulus";

export default class Slider extends Controller<HTMLElement> {
  static targets = ["wrapper", "slides"];

  slides: Element[] | null = null;
  slidesQuantity: number = 0;
  currentSlide: number = 0;

  connect() {
    if (this.hasWrapperTarget) {
      this.init();
      window.addEventListener("resize", this.init.bind(this));
    }

    if (this.hasSlidesTarget) {
      this.slides = Array.from(this.slidesTarget.children);
      this.slidesQuantity = this.slides.length;
    }
  }

  disconnect() {
    window.removeEventListener("resize", this.init);
  }

  init() {
    const { width } = this.wrapperTarget.getBoundingClientRect();

    this.element.style.setProperty("--slide-width", `${width / 10}rem`);
  }

  prev() {
    if (Math.abs(this.currentSlide - 1) <= 1) {
      this.currentSlide = this.slidesQuantity * -1;
    }

    const position = (this.currentSlide + 1) * 100;

    this.element.style.setProperty("--slider-x", `${position}%`);
    this.currentSlide++;
  }

  next() {
    if (Math.abs(this.currentSlide - 1) >= this.slidesQuantity) {
      this.currentSlide = 1;
    }

    const position = (this.currentSlide - 1) * 100;
    this.element.style.setProperty("--slider-x", `${position}%`);
    this.currentSlide--;
  }

  declare hasWrapperTarget: boolean;
  declare hasSlidesTarget: boolean;
  declare wrapperTarget: HTMLElement;
  declare slidesTarget: HTMLElement;
}
