import { Popup } from "./Popup.js";
import {
  photoViewPopupImageSelector,
  photoViewPopupCaptionSelector,
} from "../utils/constants.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopupPicture = document.querySelector(
      photoViewPopupImageSelector
    );
    this._imageCaption = document.querySelector(photoViewPopupCaptionSelector);
  }

  open(title, link) {
    this._imagePopupPicture.src = link;
    this._imagePopupPicture.alt = title;
    this._imageCaption.textContent = title;
    super.open();
  }
}

export { PopupWithImage };
