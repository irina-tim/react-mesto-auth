const noImage = require("../../images/no-image.jpg");

class Card {
  constructor(
    data,
    userId,
    cardSelector,
    handleCardClick,
    handleTrashButtonClick,
    handleCardLike
  ) {
    this._title = data.name;
    this._link = data.link;
    this._userId = userId;
    this._likes = data.likes;
    this._id = data._id;
    this._cardOwnerId = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashButtonClick = handleTrashButtonClick;
    this._handleCardLike = handleCardLike;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _addLike(cardLikeButton) {
    cardLikeButton.classList.add("card__like-button_active");
  }

  toggleLike(res) {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
    this._cardLikes.textContent = res.likes.length;
  }

  _clickLike(evt) {
    this.like = evt.target.classList.contains("card__like-button_active");
    this._handleCardLike(this);
  }

  removeCard() {
    this._element.remove();
  }

  setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", (evt) => this._clickLike(evt));
    this._element
      .querySelector(".card__trash-button")
      .addEventListener("click", () => this._handleTrashButtonClick(this));
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._title, this._link);
    });
  }

  _setValidImage() {
    const img = new Image();
    img.src = this._link;
    img.onerror = () => {
      this._cardImage.src = noImage;
      this._link = noImage;
    };
  }

  getId() {
    return this._id;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardLikes = this._element.querySelector(".card__like-counter");
    this._cardImage = this._element.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._setValidImage();
    this._cardImage.alt = this._title || "Картинка отсутствует";
    this._element.querySelector(".card__title").textContent =
      this._title || "Без названия";
    this._cardLikes.textContent = this._likes.length;
    this.setEventListeners();
    this._element.id = this._id;
    if (this._likes.some((el) => el._id === this._userId)) {
      this._addLike(this._element.querySelector(".card__like-button"));
    }
    if (this._cardOwnerId != this._userId) {
      this._element.querySelector(".card__trash-button").style.display = "none";
    }
    return this._element;
  }
}

export { Card };
