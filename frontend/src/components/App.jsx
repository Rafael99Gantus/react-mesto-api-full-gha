import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import PopupWithForm from './PopupWithForm.jsx';
import InfoTooltip from './InfoTooltip.jsx';
import Register from './Register.jsx';
import Login from './Login.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import ImagePopup from './ImagePopup.jsx';
import AddPlacePopup from './AddPlacePopup.js';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CurrentCardInfo } from '../contexts/CurrentCardInfo.js';
import * as Auth from '../utils/Auth.jsx';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsEditCardPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  // const [isAnswerPopupOpen, setIsAnswerPopupOpen] = useState(false);
  const [isInfoTooltipPopup, setIsInfoTooltipPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState('');
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const JWT = localStorage.getItem("jwt");
    if (JWT) {
      Auth.checkToken(JWT)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.email);
            navigate("/", {replace: true})
          }
        })
        .catch((err) => console.log(err));
        api.getInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
  
      api.getAllCards()
        .then((res) => {
          setCards(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [navigate]);

  useEffect(() => {
    if (loggedIn) navigate("/");
  }, [loggedIn, navigate]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeStatus(card._id, !isLiked)
      .then((res) => {
        setCards((state) => state.map((c) => c._id === card._id ? res : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((res) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopup() {
    setIsEditProfilePopupOpen(false);
    setIsEditCardPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipPopup(false)
    setSelectedCard(null);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditCardsClick() {
    setIsEditCardPopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  // function handleAnswerClick() {
  //   setIsAnswerPopupOpen(true);
  // }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(info) {
    api.saveInfoInServ(info)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopup();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api.saveAvatarInServ(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopup();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(name, link) {
    api.createCardInServ(name, link)
      .then((newPlace) => {
        setCards([newPlace, ...cards]);
        closeAllPopup();
      })
      .catch((err) => {
        console.log('Ошибка:', err);
      });
  }

  function handleRegister() {

  }

  const handleLogin = () => {
    setLoggedIn(true);
  }

  function handleIsInfoTooltipClick() {
    setIsInfoTooltipPopup(true)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentCardInfo.Provider value={cards}>
        <div className="root">

          <div className="page">
            <Header loggedIn={loggedIn} userEmail={userEmail} />
            <Routes>

              <Route path="/" element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={Main}
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleEditCardsClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  setCards={setCards}
                  onCardDelete={handleCardDelete}
                  onDeletePopupClick={handleCardDelete}
                />
              }
              />
              <Route path="/sign-up" element={<Register onRegister={handleRegister} onIsInfoTooltip={handleIsInfoTooltipClick} closeFunc={closeAllPopup} />} />
              <Route path="/sign-in" element={<Login onLogin={handleLogin} setUserEmail={setUserEmail} />} />
            </Routes>

            <Footer />
          </div>

          <InfoTooltip
            isOpen={isInfoTooltipPopup}
            closeFunc={closeAllPopup}
            loggedIn={loggedIn}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            closeFunc={closeAllPopup}
            onUpdateUser={handleUpdateUser} />

          <AddPlacePopup
            closeFunc={closeAllPopup}
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit} />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            closeFunc={closeAllPopup}
            onUpdateAvatar={handleUpdateAvatar} />

          <PopupWithForm
            name='answerPopup'
            title='Вы уверены?'
            buttonText='Да'
            closeFunc={closeAllPopup}
          // openFunc={isAnswerPopupOpen} 
          />

          <ImagePopup
            card={selectedCard}
            closeFunc={closeAllPopup}>
          </ImagePopup>

        </div>
      </CurrentCardInfo.Provider>
    </CurrentUserContext.Provider>
  )
}

export default App;