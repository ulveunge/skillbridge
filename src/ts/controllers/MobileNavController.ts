import { Controller } from "@hotwired/stimulus";

export default class MobileNavController extends Controller<HTMLDivElement> {
  static targets = ["container", "icon"];

  open = false;

  toggle() {
    this.open = !this.open;
    this.switchIcon();
    this.containerTarget.classList.toggle("open");
  }

  switchIcon() {
    const newIconIndex = this.open ? 1 : 0;
    const prevIconIndex = this.open ? 0 : 1;

    this.iconTarget.children[newIconIndex].classList.add("visible");
    this.iconTarget.children[prevIconIndex].classList.remove("visible");
  }

  declare readonly containerTarget: HTMLUListElement;
  declare readonly iconTarget: SVGAElement;
}
