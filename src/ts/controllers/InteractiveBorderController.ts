import { Controller } from "@hotwired/stimulus";

export default class InteractiveBorderController extends Controller<HTMLElement> {
  connect() {
    this.element.addEventListener(
      "mousemove",
      this.calculateRotation.bind(this)
    );
  }

  disconnect() {
    this.element.removeEventListener(
      "mousemove",
      this.calculateRotation.bind(this)
    );
  }

  calculateRotation(e: MouseEvent) {
    const mouseX =
      this.element.offsetLeft + this.element.offsetWidth / 2 - e.pageX;
    const mouseY =
      this.element.offsetTop + this.element.offsetHeight / 2 - e.pageY;
    const angle = Math.atan2(mouseY, mouseX);
    const rotation = Math.round(angle * (180 / Math.PI));
    this.element.style.setProperty("--rotation", `${rotation - 90}deg`);
  }
}
