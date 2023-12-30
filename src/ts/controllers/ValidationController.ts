import { Controller } from "@hotwired/stimulus";
import validator from "validator";

export default class ValidationController extends Controller<HTMLFormElement> {
  static targets = ["block", "submit"];

  inputs: (HTMLInputElement | HTMLTextAreaElement | null)[] | [] = [];
  errorElements: (HTMLInputElement | null)[] | [] = [];
  isValid: boolean = false;

  connect() {
    this.element.reset();

    if (this.hasBlockTarget) {
      this.inputs = this.blockTargets.map((blockTarget) =>
        blockTarget.querySelector(".form__input")
      );

      this.inputs.forEach((input, index) => {
        const eventType =
          input!.getAttribute("type") === "checkbox" ? "change" : "blur";

        input!.addEventListener(
          eventType,
          this.validate.bind(this, input, index)
        );
      });
    }
  }

  disconnect() {
    if (this.hasBlockTarget) {
      this.inputs!.forEach((input, index) => {
        const eventType =
          input!.getAttribute("type") === "checkbox" ? "change" : "blur";

        input!.removeEventListener(
          eventType,
          this.validate.bind(this, input, index)
        );
      });
    }
  }

  validate(
    input: HTMLInputElement | HTMLTextAreaElement | null,
    index: number
  ) {
    const { validationType: type } = input!.dataset;
    const { value } = input!;

    this.blockTargets[index].classList.add("touched");

    let isInputValid = true;

    switch (type) {
      case "name":
        isInputValid =
          validator.isAlpha(value) && validator.isLength(value, { min: 1 });
        break;
      case "email":
        isInputValid = validator.isEmail(value);
        break;
      case "password":
        isInputValid = validator.isStrongPassword(value, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 0,
        });
        break;
      case "checkbox":
        if (input!.getAttribute("type") === "checkbox") {
          isInputValid = (input as HTMLInputElement).checked;
        }
        break;
      case "phone":
        isInputValid = validator.isMobilePhone(value, "any", {
          strictMode: true,
        });
        break;
      default:
        isInputValid = validator.isLength(value, { min: 1 });
    }

    if (!isInputValid) {
      this.blockTargets[index].classList.add("error");
    } else {
      this.blockTargets[index].classList.remove("error");
    }

    this.isValid = this.blockTargets.every(
      (blockTarget) =>
        !blockTarget.classList.contains("error") &&
        blockTarget.classList.contains("touched")
    );

    if (!this.isValid) {
      this.submitTarget.setAttribute("disabled", "true");
    } else {
      this.submitTarget.removeAttribute("disabled");
    }
  }

  declare hasBlockTarget: boolean;
  declare hasSubmitTarget: boolean;
  declare blockTargets: HTMLElement[];
  declare blockTarget: HTMLElement;
  declare submitTarget: HTMLButtonElement;
}
