import { useState, useEffect, useCallback } from "react";
//import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import DeletionConfirmationPopup from "./DeletionConfirmationPopup";
import AddPlacePopup from "./AddPlacePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth.js";

function App() {
  //Popups state
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [cardToRemove, setCardToRemove] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [isRegistrationOk, setIsRegistrationOk] = useState(false);
  const [userData, setUserData] = useState();
  //const history = useNavigate();

  useEffect(() => {
    tokenCheck();
  }, []);

  const handleRegister = ({ email, password }) => {
    return auth
      .register(email, password)
      .then(() => {
        setIsRegistrationOk(true);
      })
      .catch(() => {
        setIsRegistrationOk(false);
      })
      .finally(() => {
        setIsInfoPopupOpen(true);
      });

    //.then(() => {
    //history.push("/signup");
    //});
  };

  const handleLogin = ({ email, password }) => {
    return auth.login(email, password).then((data) => {
      setLoggedIn(true);
      if (data["token"]) {
        localStorage.setItem("jwt", data["token"]);
        tokenCheck();
      }
    });
  };

  const tokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      let jwt = localStorage.getItem("jwt");
      auth.getToken(jwt).then((res) => {
        if (res) {
          let userData = {
            id: res.data._id,
            email: res.data.email,
          };
          setLoggedIn(true);
          setUserData(userData);
          console.log(userData);
        }
      });
    }
  };

  useEffect(() => {
    api
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Popups handlers
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardTrashClick(card) {
    setCardToRemove(card);
    setIsCardDeletePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardDeletePopupOpen(false);
    setIsInfoPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardDelete() {
    setIsLoading(true);
    api
      .deleteCard(cardToRemove._id)
      .then(() => {
        setCards(cards.filter((el) => el._id !== cardToRemove._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api
      .updateUserInfo(name, about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api
      .updateUserAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit({ title, link }) {
    setIsLoading(true);
    api
      .addNewCard(title, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    api
      .getUserData()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, []);

  //Handle esc click
  const closeByEsc = useCallback((event) => {
    if (event.key === "Escape") {
      closeAllPopups();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", closeByEsc, false);
    return () => {
      document.removeEventListener("keydown", closeByEsc, false);
    };
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page" onClick={closeAllPopups}>
        <Header loggedIn={loggedIn} />
        <Routes>
          <Route
            index
            element={
              <PrivateRoute
                component={Main}
                loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick}
                isOpened={isEditProfilePopupOpen}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onTrashButtonClick={handleCardTrashClick}
                cards={cards}
                onCardLike={handleCardLike}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<Register handleRegister={handleRegister} />}
          />
          <Route
            path="/sign-in"
            element={
              <Login handleLogin={handleLogin} tokenCheck={tokenCheck} />
            }
          />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpened={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpened={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpened={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <DeletionConfirmationPopup
          isOpened={isCardDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          isLoading={isLoading}
        />
        <InfoTooltip
          onClose={closeAllPopups}
          isOpened={isInfoPopupOpen}
          isOk={isRegistrationOk}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
