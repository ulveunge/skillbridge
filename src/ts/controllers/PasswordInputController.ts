import { Controller } from "@hotwired/stimulus";

export default class PasswordInputController extends Controller<HTMLElement> {
  static targets = ["input"];

  toggleVisibility() {
    if (!this.hasInputTarget) return;

    this.inputTarget.type =
      this.inputTarget.type === "password" ? "text" : "password";

    this.element.classList.toggle("active");
  }

  declare hasInputTarget: boolean;
  declare inputTarget: HTMLInputElement;
}
