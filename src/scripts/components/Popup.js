import {
  openedPopupSelector,
  closePopupButtonSelector,
} from "../utils/constants.js";

class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popup.classList.add(openedPopupSelector);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(openedPopupSelector);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains(openedPopupSelector) ||
        evt.target.classList.contains(closePopupButtonSelector)
      )
        this.close();
    });
  }
}

export { Popup };
