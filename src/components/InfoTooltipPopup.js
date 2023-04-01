import React from "react";
import Popup from "./Popup";
import registerIsOk from '../images/infoTooltipPopup__image-ok.svg';
import registerIsFail from '../images/infoTooltipPopup__image-fail.svg';

function InfoTooltipPopup({isOpen, onClose, res}) {

  return(
    <Popup name={'infoTooltip'} isOpen={isOpen} onClose={onClose}>
      <div className="infoTooltip">
        <img
          src={res.resStatus ? registerIsOk : registerIsFail}
          alt=""
          className="infoTooltip__image infoTooltip__image_size_normal"
        />
        <h1 className="infoTooltip__message">
          {res.resText}
        </h1>
      </div>
    </Popup>
  );
}

export default InfoTooltipPopup;
