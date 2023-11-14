import { Controller } from "@hotwired/stimulus";

export default class MobileNavController extends Controller {
  static targets = ["container"];

  toggle() {
    this.containerTarget.classList.toggle("open");
  }

  declare readonly containerTarget: HTMLUListElement;
}
