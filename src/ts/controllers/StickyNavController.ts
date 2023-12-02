import { Controller } from "@hotwired/stimulus";

export default class StickyNavController extends Controller<HTMLDivElement> {
  static targets = ["stick"];

  sticked: boolean = false;

  connect() {
    window.addEventListener("load", this.setAbsoluteHeight.bind(this));
    window.addEventListener("scroll", this.stickNav.bind(this));
    window.addEventListener("resize", this.setAbsoluteHeight.bind(this));
  }

  disconnect() {
    window.removeEventListener("load", this.setAbsoluteHeight);
    window.removeEventListener("scroll", this.stickNav);
    window.removeEventListener("resize", this.setAbsoluteHeight);
  }

  get absoluteHeight() {
    const { height, marginTop, marginBottom } = window.getComputedStyle(
      this.element
    );

    const calculatedHeight =
      parseFloat(height) + parseFloat(marginTop) + parseFloat(marginBottom);

    if (this.sticked) {
      return calculatedHeight + this.stickTargetHeight;
    }

    return calculatedHeight;
  }

  get stickTargetHeight() {
    return this.stickTarget.clientHeight;
  }

  setAbsoluteHeight() {
    console.log(this.absoluteHeight);

    this.element.style.removeProperty("--absolute-height");

    this.element.style.setProperty(
      "--absolute-height",
      `${this.absoluteHeight}px`
    );
  }

  stickNav() {
    if (window.scrollY > this.element.clientHeight - this.stickTargetHeight) {
      this.stickTarget.classList.add("sticky-nav");
      this.sticked = true;
    } else {
      this.stickTarget.classList.remove("sticky-nav");
      this.sticked = false;
    }
  }

  declare readonly hasStickTarget: boolean;
  declare readonly stickTarget: HTMLDivElement;
}
