class FormValidator {
  constructor(inputData, formElement) {
    this._inputData = inputData;
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(
      this._inputData.submitButtonSelector
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputData.inputSelector)
    );
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputData.inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._inputData.errorClass);
  }

  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputData.inputErrorClass);
    this._errorElement.classList.remove(this._inputData.errorClass);
    this._errorElement.textContent = "";
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  _enableSubmitButton() {
    this._submitButton.classList.remove(this._inputData.inactiveButtonClass);
    this._submitButton.removeAttribute("disabled");
  }

  disableSubmitButton() {
    this._submitButton.classList.add(this._inputData.inactiveButtonClass);
    this._submitButton.setAttribute("disabled", true);
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._formElement.reset();
    this.disableSubmitButton();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}

export { FormValidator };
