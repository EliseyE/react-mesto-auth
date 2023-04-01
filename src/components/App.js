import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { apiModule } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { IsLoadingContext } from '../contexts/IsLoadingContext';
import { LastResponseStatusContext } from '../contexts/LastResponseStatusContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPlaceDeletingPopup from './ConfirmPlaceDeletingPopup';
import InfoTooltipPopup from './InfoTooltipPopup';
import Login from './Login';
import Register from './Register';
import * as authApi from "../utils/authApi";
import Spinner from './Spinner';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState({name: '', about: '', avatar: '', _id: '', cohort: ''});
  const [userEmail, setUserEmail] = useState('');
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmDeletingCardPopupOpen, setIsConfirmDeletingCardPopupOpen] = useState({isOpen: false, card: {}});
  const [selectedCard, setSelectedCard] = useState({isOpen: false, card: {}});
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [lastResponseStatus, setLastResponseStatus] = useState({resStatus: false, resStatusCode: 'blank'});

  const navigate = useNavigate();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setIsPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setIsPopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setIsPopupOpen(true);
  };

  function handleDeletePlaceClick(card) {
    setIsConfirmDeletingCardPopupOpen({...isConfirmDeletingCardPopupOpen, isOpen: true, card: card});
    setIsPopupOpen(true);
  };

  function handleInfoTooltipPopupOpen() {
    setIsInfoTooltipPopupOpen(true);
    setIsPopupOpen(true);
  };

  function closeAllPopups() {
    setIsPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({...selectedCard, isOpen: false});
    setIsConfirmDeletingCardPopupOpen({...isConfirmDeletingCardPopupOpen, isOpen: false, card: {}});
    setIsInfoTooltipPopupOpen(false);
  };

  function handleCardClick(card) {
    setSelectedCard({...selectedCard, isOpen: true, card: card});
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    apiModule.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards(state => state.map(с => с._id === card._id ? newCard : с));
      })
      .catch(err => console.log(err));
  };

  function handleCardDelete(card) {
    setIsLoading(true);
    apiModule.deletCard(card._id)
      .then(() => {
        setCards(cards => cards.filter(item => item._id !== card._id));
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.code === 'Escape') {
        closeAllPopups();
        document.removeEventListener('keydown', handleEscapeKey);
      }
    };

    if(isPopupOpen)
      document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isPopupOpen]);

  function handleUpdateUser(userInfo) {
    setIsLoading(true);
    apiModule.uploadUserInfo(userInfo)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  };

  function handleUpdateAvatar(userAvatar) {
    setIsLoading(true);
    apiModule.uploadAvatar({avatar: userAvatar})
      .then(res => {
        setCurrentUser({...currentUser, avatar: res.avatar});
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  };

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    apiModule.uploadCard(card)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleRegister = useCallback( async (regData) => {
    try {
      const res = await authApi.register(regData);
      setLastResponseStatus({...lastResponseStatus, resStatus: res.ok, resStatusCode: res.status});
      navigate('/sign-in', { replace: true });
    } catch (err) {
      setLastResponseStatus({...lastResponseStatus, resStatus: err.ok, resStatusCode: err.status});
    } finally {
      setTimeout(() => {
        handleInfoTooltipPopupOpen();
      }, 300);
    }
  }, []);

  const tokenCheck = useCallback( async () => {
    try {
      const jwt = localStorage.getItem('JWT');
      if(!jwt)
        throw new Error('JWT is empty');
      const resData = await authApi.getContent(jwt);
      if(resData) {
        setCurrentUser({ ...currentUser, email: resData.data.email });
        console.log(resData.data.email);
        setUserEmail(resData.data.email);
        setIsLoggedIn(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    tokenCheck();
  }, []);

  const handleAuthorize = useCallback( async (resData) => {
    localStorage.setItem('JWT', resData.token);
    setIsLoggedIn(true);
    navigate('/', {replace: true});
    tokenCheck();
  }, [tokenCheck]);

  const handleLogin = useCallback( async (loginData) => {
    setLoading(true);
    try {
      const resData = await authApi.authorize(loginData);
      if(resData.token) {
        handleAuthorize(resData);
      }
    } catch (err) {
      console.log(err);
      setLastResponseStatus({...lastResponseStatus, resStatus: err.ok, resStatusCode: err.status});
      handleInfoTooltipPopupOpen();
      } finally {
        setLoading(false);
      }
  }, [handleAuthorize]);

  const updateData = useCallback( () => {

        apiModule.getMyProfileData()
        .then(res => {
          setCurrentUser({ ...currentUser, ...res });
        })
        .catch(err => console.log(err));

        apiModule.getInitialCards()
          .then(res => setCards(res) )
          .catch(err => console.log(err));

  }, [isLoggedIn, currentUser]);


  function LogOut() {
    console.log(currentUser);
    setIsLoggedIn(false);
    localStorage.removeItem('JWT');
  };

  if(loading)
    return <Spinner />;

    return (

    <CurrentUserContext.Provider value={currentUser}>
      <IsLoadingContext.Provider value={isLoading}>
        <LastResponseStatusContext.Provider value={lastResponseStatus.resStatus}>
          <Header onLogOut={LogOut} isLoggedIn={isLoggedIn} userEmail={userEmail}/>
          <Routes>
            <Route
              path='/sign-up'
              element={isLoggedIn ? <Navigate to="/" replace /> :
              <Register
                onRegister={handleRegister}
                resStatus={lastResponseStatus.resStatus}
              />}
            />
            <Route path='/sign-in' element={isLoggedIn ? <Navigate to="/" replace /> : <Login logIn={handleLogin} />} />
            <Route path='/' element={
              <>
                <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    component={Main}
                      cards={cards}
                      onEditAvatar={handleEditAvatarClick}
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      onCardDelete={handleDeletePlaceClick}
                      updateData={updateData}
                />
                <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    component={Footer}
                />
              </>}
            />
            <Route path="/*" element={isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ConfirmPlaceDeletingPopup
            isOpen={isConfirmDeletingCardPopupOpen.isOpen}
            card={isConfirmDeletingCardPopupOpen.card}
            onClose={closeAllPopups}
            onDeletePlace={handleCardDelete}
          />

          <ImagePopup
            card={selectedCard.card}
            isOpen={selectedCard.isOpen}
            onClose={closeAllPopups}
          />

          <InfoTooltipPopup
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
          />
        </LastResponseStatusContext.Provider>
      </IsLoadingContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
