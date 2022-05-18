import { Popup } from "./Popup.js";
import { inputData } from "../utils/constants.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._popupForm = this._popup.querySelector(inputData.formSelector);
    this._inputs = Array.from(
      this._popupForm.querySelectorAll(inputData.inputSelector)
    );
    this._button = this._popupForm.querySelector(".popup__submit-button");
  }

  renderLoading(isLoading) {
    this._button.textContent = isLoading ? "Сохранение..." : "Сохранить";
  }

  _getInputValues() {
    const inputsObj = {};
    this._inputs.forEach((input) => (inputsObj[input.name] = input.value));
    return inputsObj;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}

export { PopupWithForm };
