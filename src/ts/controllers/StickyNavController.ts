import { Controller } from "@hotwired/stimulus";

export default class StickyNavController extends Controller<HTMLDivElement> {
  static targets = ["sticky"];

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
      return calculatedHeight + this.stickyTargetHeight;
    }

    return calculatedHeight;
  }

  get stickyTargetHeight() {
    return this.stickyTarget.clientHeight;
  }

  setAbsoluteHeight() {
    this.element.style.removeProperty("--absolute-height");

    this.element.style.setProperty(
      "--absolute-height",
      `${this.absoluteHeight}px`
    );
  }

  stickNav() {
    if (window.scrollY > this.element.clientHeight - this.stickyTargetHeight) {
      this.stickyTarget.classList.add("sticky-nav");
      this.sticked = true;
    } else {
      this.stickyTarget.classList.remove("sticky-nav");
      this.sticked = false;
    }
  }

  declare readonly hasStickyTarget: boolean;
  declare readonly stickyTarget: HTMLDivElement;
}
