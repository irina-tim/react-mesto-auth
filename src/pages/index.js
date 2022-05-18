import "./index.css";
import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { PopupWithConfirmation } from "../scripts/components/PopupWithConfirmation.js";
import { Api } from "../scripts/components/Api.js";
import {
  inputData,
  profileAvatar,
  profileEditButton,
  addCardButton,
  photoViewPopupSelector,
  addCardPopupSelector,
  profileEditPopupSelector,
  avatarUpdatePopupSelector,
  deletionConfirmationPopupSelector,
  cardTemplateSelector,
} from "../scripts/utils/constants.js";

let formList;
const formValidators = {};
let cardsList;
let userId;

//Api
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-39",
  headers: {
    authorization: "722dbccf-1b7d-4d02-92c2-c3e9bbf9e747",
    "Content-Type": "application/json",
  },
});

//User info (profile edit)
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__subtitle",
  profileAvatar,
});

//Get user profile and initial cards from server
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setAvatar(userData.avatar);
    userId = userData._id;
    cardsList = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          createCard(item);
        },
      },
      ".cards"
    );
    //Render initial cards
    cardsList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

function handleCardLike(card) {
  if (!card.like) {
    api
      .addLike(card.getId())
      .then((res) => {
        card.toggleLike(res);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .removeLike(card.getId())
      .then((res) => {
        card.toggleLike(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

//Photo view popup
const photoViewPopup = new PopupWithImage(photoViewPopupSelector);
photoViewPopup.setEventListeners();

//Deletion confirmation popup
const popupDeletionConfirmation = new PopupWithConfirmation(
  deletionConfirmationPopupSelector,
  handleDeletionConfirmationSubmit,
  inputData
);
popupDeletionConfirmation.setEventListeners();

//Add new card popup
const popupCardAdd = new PopupWithForm(addCardPopupSelector, submitCard);
popupCardAdd.setEventListeners();

//Profile edit popup
const popupProfileEdit = new PopupWithForm(
  profileEditPopupSelector,
  handleProfileFormSubmit
);
popupProfileEdit.setEventListeners();

//Avatar update popup
const popupAvatarUpdate = new PopupWithForm(
  avatarUpdatePopupSelector,
  handleAvatarUpdateFormSubmit
);
popupAvatarUpdate.setEventListeners();

//Validation
const enableValidation = (inputData) => {
  formList = Array.from(document.querySelectorAll(inputData.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(inputData, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(inputData);

//Open popup (profile edit)
function openPopupProfile() {
  formValidators["profileEdit"].resetValidation();
  popupProfileEdit.open();
  const userInfoObj = userInfo.getUserInfo();
  popupProfileEdit.setInputValues(userInfoObj);
}

//Open popup (card add)
function openPopupAddCard() {
  formValidators["addCard"].resetValidation();
  popupCardAdd.open();
}

//Open popup (avatar update)
function openPopupAvatarUpdate() {
  formValidators["avatarUpdate"].resetValidation();
  popupAvatarUpdate.open();
}

//Submit button click (profile edit)
function handleProfileFormSubmit(inputValues) {
  popupProfileEdit.renderLoading(true);
  api
    .updateUserInfo(inputValues.name, inputValues.description)
    .then((result) => {
      userInfo.setUserInfo(result.name, result.about);
    })
    .then(() => {
      popupProfileEdit.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfileEdit.renderLoading(false);
    });
}

//Submit button click (add card)
function submitCard(item) {
  popupCardAdd.renderLoading(true);
  api
    .addNewCard(item.title, item.link)
    .then((result) => {
      createCard(result);
    })
    .then(() => {
      popupCardAdd.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupCardAdd.renderLoading(false);
    });
}

//Submit button click (avatar update)
function handleAvatarUpdateFormSubmit({ link }) {
  popupAvatarUpdate.renderLoading(true);
  api
    .updateUserAvatar(link)
    .then((result) => {
      userInfo.setAvatar(result.avatar);
    })
    .then(() => {
      popupAvatarUpdate.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatarUpdate.renderLoading(false);
    });
}

//Submit button click (deletion confirmation)
function handleDeletionConfirmationSubmit(cardId, card) {
  api
    .deleteCard(cardId)
    .then(() => {
      card.removeCard();
    })
    .then(() => {
      popupDeletionConfirmation.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleTrashButtonClick(card) {
  popupDeletionConfirmation.open(card.getId(), card);
}

function handleCardClick(title, link) {
  photoViewPopup.open(title, link);
}

//Add new card
function createCard(data) {
  const card = new Card(
    data,
    userId,
    cardTemplateSelector,
    handleCardClick,
    handleTrashButtonClick,
    handleCardLike
  );
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
}

//Event listeners
profileEditButton.addEventListener("click", openPopupProfile);
addCardButton.addEventListener("click", openPopupAddCard);
profileAvatar.addEventListener("click", openPopupAvatarUpdate);
