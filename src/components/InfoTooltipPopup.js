import React from "react";
import Popup from "./Popup";
import registerIsOk from '../images/infoTooltipPopup__image-ok.svg';
import registerIsFail from '../images/infoTooltipPopup__image-fail.svg';

function InfoTooltipPopup({isOpen, onClose, registrationStatus}) {

  return(
    <Popup name={'infoTooltip'} isOpen={isOpen} onClose={onClose}>
      <div className="infoTooltip">
        <img
          src={registrationStatus ? registerIsOk : registerIsFail}
          alt=""
          className="infoTooltip__image infoTooltip__image_size_normal"
        />
        <h1 className="infoTooltip__message">
          {registrationStatus? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h1>
      </div>
    </Popup>
  );
}

export default InfoTooltipPopup;
