import { Controller } from "@hotwired/stimulus";

export default class HelloWorldController extends Controller {
  static targets = ["output"];

  connect() {
    if (this.hasOutputTarget) {
      this.outputTarget.textContent = "Hello, Stimulus!";
    }
  }

  declare readonly hasOutputTarget: boolean;
  declare readonly outputTarget: HTMLDivElement;
  declare readonly outputTargets: HTMLDivElement[];
}
